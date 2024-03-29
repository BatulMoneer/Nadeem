
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel,  validator
import os
import re  
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()


app = FastAPI()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)# A global variable to store the last story and its keywords.
last_story_data = {"story": "", "keywords": []}
#
class StoryRequest(BaseModel):
    insert_prompt: str
    name: str
    age: str
    gender: str
    
    
    @validator('insert_prompt')
    def check_insert_prompt(cls, v):
        # Check if empty
        if not v:
            raise ValueError("يجب ان تكتب الفكرة الرئيسية للقصة")

        # Check word count not exceeding 20 words
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
        if not re.fullmatch(r'[\u0600-\u06FF\u0750-\u077F]+', v):
            raise ValueError('يجب ان يكون الاسم باللغة العربيه ولا يحتوي على رموز خاصة')
        return v




   

def ask_gpt(insert_prompt: str, name: str, age: str, gender: str):
    try:
        response = client.chat.completions.create(
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
                {"role": "user", "content": f"{insert_prompt} أكتب علامات التشكيل على جميع الكلمات والحروف."},
                {"role": "user", "content": f"{name} اسم الشخصية الرئيسية."},
                {"role": "user", "content": f"{gender} جنس الشخصية الرئيسية."},
                {"role": "user", "content": f"{age} عمر الطفل الذي سيقرأ القصة."}
            ]
        )

        if response.choices:
            first_choice = response.choices[0]
            if hasattr(first_choice, 'message') and hasattr(first_choice.message, 'content'):
                story = first_choice.message.content.strip()
                english_words = re.findall(r'\b[a-zA-Z]+\b', story)
                
                # Store the story and keywords in the global variable
                last_story_data["story"] = story
                last_story_data["keywords"] = english_words
                
                return story, english_words
        return "No response from the model.", []
    except Exception as e:
        return f"An error occurred: {str(e)}", []


@app.post("/generate_story/")
def generate_story_endpoint(story_request: StoryRequest):
    original_story, english_words = ask_gpt(story_request.insert_prompt,story_request.name, story_request.age, story_request.gender )
    if "An error occurred:" in original_story:
        raise HTTPException(status_code=500, detail=original_story)

    unique_english_words = set(english_words)  
    pattern = r'\b(' + '|'.join(map(re.escape, unique_english_words)) + r')\b|[:,\n"]'
    story_cleaned = re.sub(pattern, '', original_story)
    return {story_cleaned}



@app.get("/get_keywords/")
def get_keywords_endpoint():
    if not last_story_data["story"]:
        raise HTTPException(status_code=404, detail="No story found. Please generate a story first.")

    # Filter out the word "Keywords" from the list of keywords
    filtered_keywords = [word for word in last_story_data["keywords"] if word.lower() != 'keywords']
    
    # Concatenate the filtered keywords into a single string, separated by commas
    model_words = ', '.join(filtered_keywords)
    
    return {"model_words": model_words}

