
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel,  validator
import os
import re  
# re = regular expressions
from openai import OpenAI
from dotenv import load_dotenv
import main 
 # HIIIIIIIIIIII LINA
# A global variable to store the last story and its keywords.
last_story_data = {"story": "", "keywords": []}
#
class Text_to_Story(BaseModel):
    insert_prompt: str
    name: str
    age: str
    gender: str
    
    # validation process for that field whenever a new instance of the model is created.
    @validator('insert_prompt') 
    def check_insert_prompt(cls, v): #v value of the field cls=class itself
        # Check if empty
        if not v:
            raise ValueError("يجب ان تكتب الفكرة الرئيسية للقصة")

        # Check word count not exceeding 20 words
        #method splits the string into a list of substrings based on whitespace by default.
        if len(v.split()) > 20:
            raise ValueError("يجب أن لا تتجاوز الفكرة الرئيسية للقصة 20 كلمة")
        
        # Check if in Arabic
        if not re.fullmatch(r'[\u0600-\u06FF\u0750-\u077F\s]+', v):
            raise ValueError("يجب ان تكون الفكرة الرئيسيه للقصة باللغة العربية")

        return v
    
    @validator('name')
    def validate_arabic_name(cls, v):
        # No spaces are allowed 
        if ' ' in v:
            raise ValueError('يجب ان تدخل الاسم الأول فقط ')
        # No numbers 
        if re.search(r'[\u0660-\u0669]|[0-9]', v):
            raise ValueError('يجب أن لا يحتوي الاسم على ارقام')
         #Ensure the name contains only Arabic letters 
         #re.fullmatch(pattern, string) r= raw string literal don't treat backslashes as escape characters
         # \s whitespace character (+ occur one or more times )
        if not re.fullmatch(r'[\u0600-\u06FF\u0750-\u077F]+', v):
            raise ValueError('يجب ان يكون الاسم باللغة العربيه ولا يحتوي على رموز خاصة')
        return v
def ask_gpt(insert_prompt: str, name: str, age: str, gender: str):
    try:
        response = main.text_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are Nadeem, designed to craft children's stories infused with Arabic and Islamic culture. "
                        "The stories are tailored for young minds, ranging from 3 to 12 years old, woven with simple words, "
                        "and set in familiar places like schools, gardens, mosques, and homes. Each tale is a short adventure, "
                        "about 20-25 sentences, designed to instill values like honesty, helping others, and devotion, "
                        "all while being compatible with Islamic morals and presented in Arabic. "
                        "Start the story directly without opening words. At the end of the story, write a list of keywords of the story in English. "
                        "Do not include the character's name as a keyword. Write the story with the appropriate يجب ان تضع تشكيل على جميع الكلمات.")
                },
                # f"{} is a way to include variables or expressions inside a string.
                {"role": "user", "content": f"{insert_prompt} أكتب علامات التشكيل على جميع الكلمات والحروف."},
                {"role": "user", "content": f"{name} اسم الشخصية الرئيسية."},
                {"role": "user", "content": f"{gender} جنس الشخصية الرئيسية."},
                {"role": "user", "content": f"{age} عمر الطفل الذي سيقرأ القصة."}
            ]
        )

        if response.choices:
            #not empty
            first_choice = response.choices[0]
            # check if first_choice has a message and content
            if hasattr(first_choice, 'message') and hasattr(first_choice.message, 'content'):
                story = first_choice.message.content.strip() #strip whitespace 
                # and removes leading and trailing whitespace from the story text.
                english_words = set(word.lower() for word in re.findall(r'\b[a-zA-Z]+\b', story))
                # Convert each word in the list to lowercase
                english_words = [word.lower() for word in english_words]
                for word in english_words:
                    # Pattern to match the whole word, case-insensitive
                    pattern = r'\b' + re.escape(word) + r'\b'
                    story = re.sub(pattern, '', story, flags=re.IGNORECASE)
                story = re.sub(r'\s{2,}', ' ', story).strip()
                gender_keywords = {"أنثى", "انثى", "بنت", "فتاة", "فتاه"}
                genderEng = "girl" if gender in gender_keywords else "boy"

                
                # Store the story and keywords in the global variable
                last_story_data["story"] = story
                last_story_data["keywords"] = list(english_words) + [genderEng]  # Combine English words with gender
                
                return story, english_words
        return "No response from the model.", []
    except Exception as e:
        return f"An error occurred: {str(e)}", []

def get_keywords_endpoint():
    if not last_story_data["story"]:
        raise HTTPException(status_code=404, detail="No story found. Please generate a story first.")

    # Filter out the word "Keywords" from the list of keywords
    filtered_keywords = [word for word in last_story_data["keywords"] if word.lower() != 'keywords']
    pattern = r"\b(?:school|mosque|garden|girl|boy|girl hijabi|girl hijabi cook|girl hijabi clean|boy study|girl hijabi walk )\w*"

    # Process each word
    processed_words = []
    for word in filtered_keywords:
        if re.match(pattern, word, re.IGNORECASE):
            # If the word matches the pattern, prefix it with "ms"
            processed_words.append("ms" + word)
        else:
            # If the word doesn't match the pattern, leave it as is
            processed_words.append(word)
    
    # Concatenate the filtered keywords into a single string, separated by commas
    model_words = ', '.join(processed_words)
    print(processed_words)
    # Update last_story_data["keywords"] with the processed words
    last_story_data["keywords"] = model_words
    
    return model_words



