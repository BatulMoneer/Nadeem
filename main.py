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

# Load from .env
load_dotenv()
AUDIO_SECRET_KEY = os.getenv("AUDIO_SECRET_KEY")
audio_client = OpenAI(api_key=AUDIO_SECRET_KEY)

TEXT_SECRET_KEY = os.getenv("TEXT_SECRET_KEY")
text_client = OpenAI(api_key=TEXT_SECRET_KEY)


app = FastAPI()


# Story Generation
@app.post("/generate_story/")
def generate_story_endpoint(story_request: text_to_story.Text_to_Story):
    #return story, english_words=keywrods
    original_story, english_words = text_to_story.ask_gpt(story_request.insert_prompt,story_request.name, story_request.age, story_request.gender )
    if "An error occurred:" in original_story:
        raise HTTPException(status_code=500, detail=original_story)

    unique_english_words = set(english_words)  
    pattern = r'\b(' + '|'.join(map(re.escape, unique_english_words)) + r')\b|[:,\n"]'
    story_cleaned = re.sub(pattern, '', original_story)
    return {story_cleaned}



@app.get("/get_keywords/")
def get_keywords_endpoint():
    if not text_to_story.last_story_data["story"]:
        raise HTTPException(status_code=404, detail="No story found. Please generate a story first.")

    # Filter out the word "Keywords" from the list of keywords
    filtered_keywords = [word for word in text_to_story.last_story_data["keywords"] if word.lower() != 'keywords']
    
    # Concatenate the filtered keywords into a single string, separated by commas
    model_words = ', '.join(filtered_keywords)
    
    return {"model_words": model_words}

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

    response.stream_to_file('speech.mp3') # Adjust based on the actual response attribute for audio data

    request_cost = text_to_speech.calculate_cost(input, model)
    
    return {
        "Cost": f"${request_cost:.3f}",
        "File": "speech.mp3"  # In a real application, provide a URL or an endpoint for the client to access the file
    }

# Image Generation
@app.post("/generate-image/")
async def generate_image(request: story_to_image.ImageRequest):
    try:
        image_bytes = await story_to_image.query_hugging_face(request.prompt)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Save the image with a timestamp to ensure uniqueness
        timestamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
        filename = f"generated_image_{timestamp}.png"
        image.save(filename)
        
        return {"message": "Image generated and saved successfully", "filename": filename}
    except HTTPException as e:
        return {"error": e.detail}
#ساشاي شمسسس

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
