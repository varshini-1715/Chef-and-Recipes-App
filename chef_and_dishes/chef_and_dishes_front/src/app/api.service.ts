import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define interfaces for your data (optional but recommended)
export interface Chef {
  id: number;
  name: string;
  // add other fields as needed
}

export interface Dish {
  id: number;
  name: string;
  chef_id: number;
  // add other fields as needed
}

export interface Recipe {
  id: number;
  description: string;
  dish_id: number;
  // add other fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8000';  // Your backend URL here

  constructor(private http: HttpClient) { }

  // Fetch all chefs
  getChefs(): Observable<Chef[]> {
    return this.http.get<Chef[]>(`${this.baseUrl}/chefs`);
  }

  // Fetch all dishes
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.baseUrl}/dishes`);
  }

  // Fetch all recipes
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes`);
  }

  // Fetch recipes by dish id
  getRecipesByDish(dishId: number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/dishes/${dishId}/recipes`);
  }

  // Add a new chef (example)
  addChef(chef: Partial<Chef>): Observable<Chef> {
    return this.http.post<Chef>(`${this.baseUrl}/chefs`, chef);
  }

  // Add a new dish (example)
  addDish(dish: Partial<Dish>): Observable<Dish> {
    return this.http.post<Dish>(`${this.baseUrl}/dishes`, dish);
  }

  // Add a new recipe (example)
  addRecipe(recipe: Partial<Recipe>): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/recipes`, recipe);
  }

  // Delete a chef by ID
  deleteChef(chefId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/chefs/${chefId}`);
  }

  // Delete a dish by ID
  deleteDish(dishId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/dishes/${dishId}`);
  }

  // Delete a recipe by ID
  deleteRecipe(recipeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recipes/${recipeId}`);
  }
}
