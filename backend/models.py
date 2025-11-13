from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid


class BookingCreate(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: str
    address: str
    service: str
    vehicleType: Optional[str] = None
    date: str
    time: str
    notes: Optional[str] = None


class Booking(BaseModel):
    bookingId: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: Optional[str] = None
    phone: str
    address: str
    service: str
    serviceName: str
    vehicleType: Optional[str] = None
    date: str
    time: str
    notes: Optional[str] = None
    status: str = Field(default='pending')
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
