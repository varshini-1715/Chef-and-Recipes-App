from sqlalchemy.orm import Session
from models.recipe_model import Recipe
from schemas.recipe_schema import RecipeCreate

def get_all_recipes(db: Session):
    return db.query(Recipe).all()

def get_recipe_by_id(db: Session, recipe_id: int):
    return db.query(Recipe).filter(Recipe.id == recipe_id).first()

def create_recipe(db: Session, recipe: RecipeCreate):
    db_recipe = Recipe(name=recipe.name, dish_id=recipe.dish_id)
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

def delete_recipe(db: Session, recipe_id: int):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe:
        db.delete(recipe)
        db.commit()
        return True
    return False
