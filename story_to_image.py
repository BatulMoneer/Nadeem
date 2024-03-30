from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import aiohttp
import io
from dotenv import load_dotenv
import os
from PIL import Image
import datetime
import main

load_dotenv()
IMAGE_SERECT_KEY = os.getenv("IMAGE_SERECT_KEY")

class ImageRequest(BaseModel):
    prompt: str

API_URL = "https://api-inference.huggingface.co/models/BatulMrakkan/nadeem"


headers = {"Authorization": f"Bearer {IMAGE_SERECT_KEY}"}

async def query_hugging_face(prompt: str):
    async with aiohttp.ClientSession() as session:
        async with session.post(API_URL, headers=headers, json={"inputs": prompt}) as response:
            if response.status == 200:
                return await response.read()
            else:
                raise HTTPException(status_code=response.status, detail=await response.text())

