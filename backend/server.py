from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


import urllib.parse
import re

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

def sanitize_mongo_uri(uri: str) -> str:
    """Safely escape username and password in Mongo URI for RFC 3986 compliance."""
    if not uri:
        return 'mongodb://localhost:27017'
    # Match mongodb:// or mongodb+srv:// credentials pattern
    match = re.match(r'^(mongodb(?:\+srv)?://)([^:]+):(.+)@([^@]+)$', uri)
    if match:
        prefix, user, raw_pass, host_and_query = match.groups()
        # Remove literal < and > if user accidentally kept them
        user = user.strip('<>')
        raw_pass = raw_pass.strip('<>')
        user_enc = urllib.parse.quote_plus(urllib.parse.unquote_plus(user))
        pass_enc = urllib.parse.quote_plus(urllib.parse.unquote_plus(raw_pass))
        return f"{prefix}{user_enc}:{pass_enc}@{host_and_query}"
    return uri

# MongoDB connection
raw_mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
mongo_url = sanitize_mongo_uri(raw_mongo_url)
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'rivaz_db')]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    phone: str
    message: str

# Root health check endpoints for cloud deployment platforms (Render/Vercel)
@app.get("/")
async def app_root():
    return {"status": "ok", "message": "Rivaz Boutique Backend API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Routes
@api_router.get("/")
async def root():
    return {"message": "Welcome to Rivaz Boutique API"}

@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(input: ContactMessageCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.contact_messages.insert_one(doc)
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contacts():
    contacts = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    
    for contact in contacts:
        if isinstance(contact['timestamp'], str):
            contact['timestamp'] = datetime.fromisoformat(contact['timestamp'])
    
    return contacts

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()