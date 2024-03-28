from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import aiohttp
import io
from PIL import Image
import datetime

class ImageRequest(BaseModel):
    prompt: str

app = FastAPI()

API_URL = "https://api-inference.huggingface.co/models/BatulMrakkan/nadeem"
TOKEN = "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"

headers = {"Authorization": f"Bearer {TOKEN}"}

async def query_hugging_face(prompt: str):
    async with aiohttp.ClientSession() as session:
        async with session.post(API_URL, headers=headers, json={"inputs": prompt}) as response:
            if response.status == 200:
                return await response.read()
            else:
                raise HTTPException(status_code=response.status, detail=await response.text())

@app.post("/generate-image/")
async def generate_image(request: ImageRequest):
    try:
        image_bytes = await query_hugging_face(request.prompt)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Save the image with a timestamp to ensure uniqueness
        timestamp = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
        filename = f"generated_image_{timestamp}.png"
        image.save(filename)
        
        return {"message": "Image generated and saved successfully", "filename": filename}
    except HTTPException as e:
        return {"error": e.detail}
