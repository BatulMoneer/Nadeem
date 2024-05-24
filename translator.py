<<<<<<< HEAD
from pydantic import BaseModel, validator
import re
=======
from pydantic import BaseModel
>>>>>>> origin/shahdNadeem
import openai

class TranslationRequest(BaseModel):
    arabic_word: str

<<<<<<< HEAD
    # @validator('arabic_word')
    # def check_arabic_word(cls, v):
    #     # Updated regex to include Arabic characters, spaces, and common punctuation
    #     if not re.fullmatch(r'[\u0600-\u06FF\u0750-\u077F\s،؛:.!-]*', v):
    #         raise ValueError("The word must be in Arabic.")
    #     return v

def translate_arabic_to_english(text_client, arabic_word: str):
=======
def translate_arabic_to_english(text_client, arabic_word: str):
    # Create an instance of TranslationRequest without validation
    request = TranslationRequest(arabic_word=arabic_word)

>>>>>>> origin/shahdNadeem
    try:
        response = text_client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "This assistant is designed to translate Arabic words to English."
                },
                {
                    "role": "user",
<<<<<<< HEAD
                    "content": arabic_word
=======
                    "content": request.arabic_word
>>>>>>> origin/shahdNadeem
                }
            ]
        )

        if response.choices and response.choices[0].message and response.choices[0].message.content:
            translation = response.choices[0].message.content.strip()  # Remove leading and trailing whitespace
            return translation
        return "No translation found."
    except Exception as e:
        raise e
