import os
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
import openai
from openai import OpenAI
import text_to_speech 
import text_to_story
import re  
from PIL import Image
import io
import datetime
import story_to_image
from text_to_story import last_story_data,get_keywords_endpoint
from io import BytesIO
import base64

# Load from .env
load_dotenv()
AUDIO_SECRET_KEY = os.getenv("AUDIO_SECRET_KEY")
audio_client = OpenAI(api_key=AUDIO_SECRET_KEY)

TEXT_SECRET_KEY = os.getenv("TEXT_SECRET_KEY")
text_client = OpenAI(api_key=TEXT_SECRET_KEY)

from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

from fastapi.staticfiles import StaticFiles
app.mount("/static", StaticFiles(directory="static"), name="static")

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



# Story Generation
@app.post("/generate_story/")
def generate_story_endpoint(story_request: text_to_story.Text_to_Story):
    #return story, english_words=keywords
    original_story, english_words = text_to_story.ask_gpt(story_request.insert_prompt,story_request.name, story_request.age, story_request.gender )
    if "An error occurred:" in original_story:
        raise HTTPException(status_code=500, detail=original_story)

    unique_english_words = set(english_words)  
    pattern = r'\b(' + '|'.join(map(re.escape, unique_english_words)) + r')\b|[:,\n"]'
    story_cleaned = re.sub(pattern, '', original_story)
    get_keywords_endpoint()
    return {story_cleaned}



# Audio Generator
@app.post("/generate_speech/")
# async def generate_speech(text_input: str, model: str = "tts-1", voice: str = "nova"):
async def generate_speech():
    input = text_to_story.last_story_data["story"] 
    model = "tts-1"
    voice = "nova"
    if model not in ['tts-1', 'tts-1-hd']:
        raise HTTPException(status_code=400, detail="Model not supported")
    try:
        response = audio_client.audio.speech.create(
            model=model,
            voice=voice,
            input=input
        )
    except AttributeError:
        raise HTTPException(status_code=500, detail="Speech synthesis method not found. Please check the OpenAI documentation for the correct usage.")
    
    request_cost = text_to_speech.calculate_cost(input, model)
    
    audio_data = response.content
    audio_base64 = base64.b64encode(audio_data).decode('utf-8')
    audio_string = f"data:audio/mp3;base64,{audio_base64}"

    return {
        "Cost": f"${request_cost:.3f}",
        "AudioBase64": audio_string  # Send the Base64 string
    }

@app.post("/generate-image/")
async def generate_image():
    prompt= last_story_data["keywords"]
    
    try:
        image_bytes = await story_to_image.query_hugging_face(prompt)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Save the image with a timestamp to ensure uniqueness
        timestamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
        filename = f"generated_image_{timestamp}.png"
        image.save(filename)
        
        return {"message": "Image generated and saved successfully", "filename": filename, "imagePrompt":prompt }
    except HTTPException as e:
        # In case of an HTTPException from query_hugging_face,
        # it will be caught and returned here.
        return {"error": e.detail}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
