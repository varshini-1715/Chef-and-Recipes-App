from sqlalchemy.orm import Session
from models.dish_model import Dish
from schemas.dish_schema import DishCreate

def get_all_dishes(db: Session):
    return db.query(Dish).all()

def get_dish_by_id(db: Session, dish_id: int):
    return db.query(Dish).filter(Dish.id == dish_id).first()

def create_dish(db: Session, dish: DishCreate):
    db_dish = Dish(name=dish.name, type=dish.type, chef_id=dish.chef_id)
    db.add(db_dish)
    db.commit()
    db.refresh(db_dish)
    return db_dish

def delete_dish(db: Session, dish_id: int):
    dish = db.query(Dish).filter(Dish.id == dish_id).first()
    if dish:
        db.delete(dish)
        db.commit()
        return True
    return False
