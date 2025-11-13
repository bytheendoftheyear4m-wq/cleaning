from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from models import Booking, BookingCreate
from email_service import email_service

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Services data (matching frontend)
SERVICES = {
    '1': 'Exterior Wash & Wax',
    '2': 'Interior Detailing',
    '3': 'Premium Full Detail',
    '4': 'Engine Bay Cleaning',
    '5': 'Home Cleaning',
    '6': 'Event Cleaning',
    '7': 'Contract Cleaning',
    '8': 'New Home Cleaning'
}

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class StatusUpdate(BaseModel):
    status: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Booking endpoints
@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking_data: BookingCreate):
    """Create a new booking"""
    try:
        # Get service name from service ID
        service_name = SERVICES.get(booking_data.service, booking_data.service)
        
        # Create booking object
        booking = Booking(
            **booking_data.model_dump(),
            serviceName=service_name
        )
        
        # Convert to dict for MongoDB
        booking_dict = booking.model_dump()
        booking_dict['createdAt'] = booking_dict['createdAt'].isoformat()
        booking_dict['updatedAt'] = booking_dict['updatedAt'].isoformat()
        
        # Insert into database
        result = await db.bookings.insert_one(booking_dict)
        
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to create booking")
        
        # Send emails (non-blocking)
        try:
            await email_service.send_customer_confirmation(booking_dict)
            await email_service.send_business_notification(booking_dict)
        except Exception as e:
            logger.error(f"Failed to send emails for booking {booking.bookingId}: {str(e)}")
        
        return booking
        
    except Exception as e:
        logger.error(f"Error creating booking: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create booking")

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings():
    """Get all bookings"""
    try:
        bookings = await db.bookings.find({}, {"_id": 0}).to_list(1000)
        
        # Convert ISO string timestamps back to datetime objects
        for booking in bookings:
            if isinstance(booking.get('createdAt'), str):
                booking['createdAt'] = datetime.fromisoformat(booking['createdAt'])
            if isinstance(booking.get('updatedAt'), str):
                booking['updatedAt'] = datetime.fromisoformat(booking['updatedAt'])
        
        return bookings
    except Exception as e:
        logger.error(f"Error fetching bookings: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch bookings")

@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str):
    """Get a specific booking by ID"""
    try:
        booking = await db.bookings.find_one({"bookingId": booking_id}, {"_id": 0})
        
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        # Convert ISO string timestamps back to datetime objects
        if isinstance(booking.get('createdAt'), str):
            booking['createdAt'] = datetime.fromisoformat(booking['createdAt'])
        if isinstance(booking.get('updatedAt'), str):
            booking['updatedAt'] = datetime.fromisoformat(booking['updatedAt'])
        
        return booking
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching booking {booking_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch booking")

@api_router.put("/bookings/{booking_id}/status")
async def update_booking_status(booking_id: str, status: str):
    """Update booking status"""
    try:
        valid_statuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
        
        result = await db.bookings.update_one(
            {"bookingId": booking_id},
            {
                "$set": {
                    "status": status,
                    "updatedAt": datetime.now(timezone.utc).isoformat()
                }
            }
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Booking not found")
        
        return {"message": "Status updated successfully", "status": status}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating booking status {booking_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update booking status")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()