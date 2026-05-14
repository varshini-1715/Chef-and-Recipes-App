# controllers/chef_controller.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from services.chef_service import get_all_chefs, get_chef_by_id, create_chef, delete_chef
from schemas.chef_schema import ChefCreate, Chef
from database import get_db

chef_router = APIRouter(prefix="/chefs", tags=["Chefs"])

@chef_router.get("/", response_model=List[Chef])
def read_chefs(db: Session = Depends(get_db)):
    return get_all_chefs(db)

@chef_router.get("/{chef_id}", response_model=Chef)
def read_chef(chef_id: int, db: Session = Depends(get_db)):
    chef = get_chef_by_id(db, chef_id)
    if not chef:
        raise HTTPException(status_code=404, detail="Chef not found")
    return chef

@chef_router.post("/", response_model=Chef)
def create_new_chef(chef: ChefCreate, db: Session = Depends(get_db)):
    return create_chef(db, chef)

@chef_router.delete("/{chef_id}")
def delete_existing_chef(chef_id: int, db: Session = Depends(get_db)):
    success = delete_chef(db, chef_id)
    if not success:
        raise HTTPException(status_code=404, detail="Chef not found")
    return {"message": "Chef deleted successfully"}
