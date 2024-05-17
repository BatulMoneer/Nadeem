from pydantic import BaseModel, validator
import re
import openai

class TranslationRequest(BaseModel):
    arabic_word: str

    @validator('arabic_word')
    def check_arabic_word(cls, v):
        # Updated regex to include Arabic characters, spaces, and common punctuation
        if not re.fullmatch(r'[\u0600-\u06FF\u0750-\u077F\s،؛:.!-]*', v):
            raise ValueError("The word must be in Arabic.")
        return v

def translate_arabic_to_english(text_client, arabic_word: str):
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
                    "content": arabic_word
                }
            ]
        )

        if response.choices and response.choices[0].message and response.choices[0].message.content:
            translation = response.choices[0].message.content.strip()  # Remove leading and trailing whitespace
            return translation
        return "No translation found."
    except Exception as e:
        raise e
