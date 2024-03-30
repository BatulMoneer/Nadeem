import os
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv
import openai
from openai import OpenAI
from text_to_speech import Text_to_Speech


load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
client = OpenAI(api_key=SECRET_KEY)

app = FastAPI()


@app.post("/generate_speech/")
async def generate_speech(text_input: str, model: str = "tts-1", voice: str = "nova"):
    if model not in ['tts-1', 'tts-1-hd']:
        raise HTTPException(status_code=400, detail="Model not supported")
    try:
        response = client.audio.speech.create(
            model=model,
            voice=voice,
            input=text_input
        )
    except AttributeError:
        raise HTTPException(status_code=500, detail="Speech synthesis method not found. Please check the OpenAI documentation for the correct usage.")

    response.stream_to_file('speech.mp3') # Adjust based on the actual response attribute for audio data

    request_cost = calculate_cost(text_input, model)
    
    return {
        "Cost": f"${request_cost:.3f}",
        "File": "speech.mp3"  # In a real application, provide a URL or an endpoint for the client to access the file
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
