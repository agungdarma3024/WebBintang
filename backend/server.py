from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import json
import os
from datetime import datetime
from pathlib import Path
import logging

# Setup paths
ROOT_DIR = Path(__file__).parent
DATA_DIR = ROOT_DIR / 'data'
CONTACTS_FILE = DATA_DIR / 'contacts.json'
PORTFOLIO_FILE = DATA_DIR / 'portfolio.json'

# Create data directory if it doesn't exist
DATA_DIR.mkdir(exist_ok=True)

# Initialize data files if they don't exist
if not CONTACTS_FILE.exists():
    with open(CONTACTS_FILE, 'w') as f:
        json.dump([], f)

if not PORTFOLIO_FILE.exists():
    # Initialize with sample portfolio data
    portfolio_data = [
        {
            "id": 1,
            "title": "International Business Summit 2024",
            "description": "Large-scale international convention with 1000+ attendees, featuring keynote speakers and networking sessions.",
            "category": "MICE",
            "client": "PT. Bank Mandiri",
            "year": "2024",
            "location": "Jakarta Convention Center"
        },
        {
            "id": 2,
            "title": "National Industry Workshop Series",
            "description": "Multi-city workshop series focusing on SME development and industrial revitalization.",
            "category": "Workshops",
            "client": "Kementerian Perindustrian",
            "year": "2024",
            "location": "Jakarta, Bandung, Semarang"
        },
        {
            "id": 3,
            "title": "Corporate Brand Launch Event",
            "description": "Comprehensive multimedia production for product launch including video, photography, and live streaming.",
            "category": "Multimedia",
            "client": "Tech Startup Indonesia",
            "year": "2024",
            "location": "Jakarta"
        },
        {
            "id": 4,
            "title": "Asia Pacific Excellence Awards",
            "description": "Prestigious awards ceremony recognizing business excellence with 500+ VIP guests.",
            "category": "Ceremonies",
            "client": "BusinessNews Asia",
            "year": "2023",
            "location": "Bali International Convention Centre"
        },
        {
            "id": 5,
            "title": "Digital Marketing Summit",
            "description": "Two-day marketing conference featuring industry experts and hands-on workshops.",
            "category": "MICE",
            "client": "Marketing Association Indonesia",
            "year": "2023",
            "location": "Jakarta"
        },
        {
            "id": 6,
            "title": "Furniture Design Training Program",
            "description": "Technical training for SME furniture makers focusing on modern design techniques.",
            "category": "Workshops",
            "client": "Dinas Perindustrian Jawa Tengah",
            "year": "2023",
            "location": "Semarang"
        },
        {
            "id": 7,
            "title": "Corporate Annual Gathering",
            "description": "Full event management including multimedia, photography, and entertainment coordination.",
            "category": "Ceremonies",
            "client": "PT. Indonesia Power",
            "year": "2023",
            "location": "Bandung"
        },
        {
            "id": 8,
            "title": "Startup Tech Provider Conference",
            "description": "Technology conference connecting startups with industry stakeholders.",
            "category": "MICE",
            "client": "Startup Indonesia Network",
            "year": "2024",
            "location": "Jakarta"
        },
        {
            "id": 9,
            "title": "Government Agency Media Production",
            "description": "Comprehensive video documentation and photography for government programs.",
            "category": "Multimedia",
            "client": "Sekretariat Jenderal Kemenperin",
            "year": "2023",
            "location": "Jakarta"
        },
        {
            "id": 10,
            "title": "Entrepreneurship Development Workshop",
            "description": "Capacity building program for new entrepreneurs in manufacturing sector.",
            "category": "Workshops",
            "client": "Direktorat IKM",
            "year": "2024",
            "location": "Jakarta, Banten"
        },
        {
            "id": 11,
            "title": "Industry Exhibition & Trade Fair",
            "description": "Large exhibition showcasing Indonesian manufacturing excellence.",
            "category": "MICE",
            "client": "Ministry of Industry",
            "year": "2023",
            "location": "JIExpo Kemayoran"
        },
        {
            "id": 12,
            "title": "Coffee Processing Training Program",
            "description": "Specialized training for coffee industry professionals on processing techniques.",
            "category": "Workshops",
            "client": "Direktorat Jenderal Industri Agro",
            "year": "2023",
            "location": "Bandung"
        }
    ]
    with open(PORTFOLIO_FILE, 'w') as f:
        json.dump(portfolio_data, f, indent=2)

# Create FastAPI app
app = FastAPI(title="Bintang Solusindo Abadi API")

# Create API router with /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Pydantic Models
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str]
    message: str
    timestamp: str
    status: str = "new"

class PortfolioItem(BaseModel):
    id: int
    title: str
    description: str
    category: str
    client: str
    year: str
    location: str

# Helper functions
def read_json_file(file_path: Path) -> list:
    """Read data from JSON file"""
    try:
        with open(file_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error reading {file_path}: {e}")
        return []

def write_json_file(file_path: Path, data: list) -> bool:
    """Write data to JSON file"""
    try:
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        logger.error(f"Error writing {file_path}: {e}")
        return False

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Welcome to Bintang Solusindo Abadi API"}

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(contact: ContactMessage):
    """Submit a contact form message"""
    try:
        # Read existing contacts
        contacts = read_json_file(CONTACTS_FILE)
        
        # Create new contact entry
        contact_id = f"CNT-{datetime.now().strftime('%Y%m%d%H%M%S')}"
        new_contact = {
            "id": contact_id,
            "name": contact.name,
            "email": contact.email,
            "phone": contact.phone,
            "message": contact.message,
            "timestamp": datetime.now().isoformat(),
            "status": "new"
        }
        
        # Add to list
        contacts.append(new_contact)
        
        # Save to file
        if write_json_file(CONTACTS_FILE, contacts):
            logger.info(f"New contact message saved: {contact_id}")
            return ContactResponse(**new_contact)
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact message")
            
    except Exception as e:
        logger.error(f"Error submitting contact: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/contacts", response_model=List[ContactResponse])
async def get_contacts():
    """Get all contact messages"""
    try:
        contacts = read_json_file(CONTACTS_FILE)
        return [ContactResponse(**contact) for contact in contacts]
    except Exception as e:
        logger.error(f"Error getting contacts: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/portfolio", response_model=List[PortfolioItem])
async def get_portfolio():
    """Get all portfolio items"""
    try:
        portfolio = read_json_file(PORTFOLIO_FILE)
        return [PortfolioItem(**item) for item in portfolio]
    except Exception as e:
        logger.error(f"Error getting portfolio: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/portfolio/{category}")
async def get_portfolio_by_category(category: str):
    """Get portfolio items by category"""
    try:
        portfolio = read_json_file(PORTFOLIO_FILE)
        
        if category.lower() == "all":
            filtered = portfolio
        else:
            filtered = [item for item in portfolio if item["category"].lower() == category.lower()]
        
        return filtered
    except Exception as e:
        logger.error(f"Error getting portfolio by category: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Include router in app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
