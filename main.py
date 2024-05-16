import os
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
import openai
from openai import OpenAI
import text_to_speech 
import text_to_story
from fastapi.responses import JSONResponse, StreamingResponse
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

# from fastapi.staticfiles import StaticFiles
# app.mount("/static", StaticFiles(directory="static"), name="static")


allow_origins=[
        "http://localhost:3000",  # React's default port on localhost
        "http://127.0.0.1:3000",  # Localhost with explicit IP
        "https://nadeemstory1.netlify.app",  # Production frontend URL
        "https://nadeem-nadeemstory-aff85867.koyeb.app"  # Your API's production URL
    ],

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

# Story Generation
@app.get("/api/data")
async def read_data():
    return {"message": "Hello from the backend!"}

@app.post("/generate_story/")
def generate_story_endpoint(story_request: text_to_story.Text_to_Story):
    #return story, english_words=keywords
    original_story, english_words = text_to_story.ask_gpt(story_request.insert_prompt,story_request.name, story_request.age, story_request.gender )
    if "An error occurred:" in original_story:
        raise HTTPException(status_code=500, detail=original_story)

    unique_english_words = set(english_words)  
    pattern = r'\b(' + '|'.join(map(re.escape, unique_english_words)) + r')\b|[:,\n"]'
    story_cleaned = re.sub(pattern, '', original_story)
    # get_keywords_endpoint()
    return {story_cleaned}



# Audio Generator
from fastapi import HTTPException
from typing import Literal

@app.post("/generate_speech/{voice}")
async def generate_speech(voice: Literal['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']):
    input = text_to_story.last_story_data["story"]
    model = "tts-1"  # Default model or you could make it dynamic
    if voice not in ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']:
        raise HTTPException(status_code=400, detail="Voice not supported")

    try:
        response = audio_client.audio.speech.create(
            model=model,
            voice=voice,
            input=input
        )
        audio_data = response.content
        audio_base64 = base64.b64encode(audio_data).decode('utf-8')
        audio_string = f"data:audio/mp3;base64,{audio_base64}"
        return {"AudioBase64": audio_string}
    except Exception as e:
        # Handling the exception with an error message and a 500 status code
        raise HTTPException(status_code=500, detail=str(e))


from fastapi.responses import StreamingResponse

@app.post("/generate-image/{prompt}")
async def generate_image(prompt: str):
    try:
        # Query Hugging Face API to get image bytes
        image_bytes = await story_to_image.query_hugging_face(prompt)
        # Return the image bytes as a response
        return StreamingResponse(
            io.BytesIO(image_bytes),
            media_type="image/png",
            headers={"Cache-Control": "no-cache, no-store, must-revalidate"}
)
    except HTTPException as e:
        # In case of an HTTPException from query_hugging_face,
        # it will be caught and returned here.
        return JSONResponse({"error": e.detail}, status_code=e.status_code)




if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
