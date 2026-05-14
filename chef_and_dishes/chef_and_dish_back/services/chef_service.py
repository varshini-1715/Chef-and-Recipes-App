from sqlalchemy.orm import Session
from models.chef_model import Chef
from schemas.chef_schema import ChefCreate

def get_all_chefs(db: Session):
    return db.query(Chef).all()

def get_chef_by_id(db: Session, chef_id: int):
    return db.query(Chef).filter(Chef.id == chef_id).first()

def create_chef(db: Session, chef: ChefCreate):
    db_chef = Chef(name=chef.name, specialty=chef.specialty)
    db.add(db_chef)
    db.commit()
    db.refresh(db_chef)
    return db_chef

def delete_chef(db: Session, chef_id: int):
    chef = db.query(Chef).filter(Chef.id == chef_id).first()
    if chef:
        db.delete(chef)
        db.commit()
        return True
    return False
