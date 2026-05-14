# controllers/dish_controller.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from services.dish_service import get_all_dishes, get_dish_by_id, create_dish, delete_dish
from schemas.dish_schema import DishCreate, Dish
from database import get_db

dish_router = APIRouter(prefix="/dishes", tags=["Dishes"])

@dish_router.get("/", response_model=List[Dish])
def read_dishes(db: Session = Depends(get_db)):
    return get_all_dishes(db)

@dish_router.get("/{dish_id}", response_model=Dish)
def read_dish(dish_id: int, db: Session = Depends(get_db)):
    dish = get_dish_by_id(db, dish_id)
    if not dish:
        raise HTTPException(status_code=404, detail="Dish not found")
    return dish

@dish_router.post("/", response_model=Dish)
def create_new_dish(dish: DishCreate, db: Session = Depends(get_db)):
    return create_dish(db, dish)

@dish_router.delete("/{dish_id}")
def delete_existing_dish(dish_id: int, db: Session = Depends(get_db)):
    success = delete_dish(db, dish_id)
    if not success:
        raise HTTPException(status_code=404, detail="Dish not found")
    return {"message": "Dish deleted successfully"}
