from pydantic import BaseModel
import openai

class TranslationRequest(BaseModel):
    arabic_word: str

def translate_arabic_to_english(text_client, arabic_word: str):
    # Create an instance of TranslationRequest without validation
    request = TranslationRequest(arabic_word=arabic_word)

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
                    "content": request.arabic_word
                }
            ]
        )

        if response.choices and response.choices[0].message and response.choices[0].message.content:
            translation = response.choices[0].message.content.strip()  # Remove leading and trailing whitespace
            return translation
        return "No translation found."
    except Exception as e:
        raise e
