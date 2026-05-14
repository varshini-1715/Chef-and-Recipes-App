# controllers/recipe_controller.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from services.recipe_service import get_all_recipes, get_recipe_by_id, create_recipe, delete_recipe
from schemas.recipe_schema import RecipeCreate, Recipe
from database import get_db

recipe_router = APIRouter(prefix="/recipes", tags=["Recipes"])

@recipe_router.get("/", response_model=List[Recipe])
def read_recipes(db: Session = Depends(get_db)):
    return get_all_recipes(db)

@recipe_router.get("/{recipe_id}", response_model=Recipe)
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = get_recipe_by_id(db, recipe_id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@recipe_router.post("/", response_model=Recipe)
def create_new_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    return create_recipe(db, recipe)

@recipe_router.delete("/{recipe_id}")
def delete_existing_recipe(recipe_id: int, db: Session = Depends(get_db)):
    success = delete_recipe(db, recipe_id)
    if not success:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return {"message": "Recipe deleted successfully"}
