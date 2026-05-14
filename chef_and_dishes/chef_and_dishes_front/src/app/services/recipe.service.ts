import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recipe {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = 'http://127.0.0.1:8000/recipes'; // Consistent and reliable base URL

  constructor(private http: HttpClient) {}

  // GET /recipes/
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/`);
  }

  // POST /recipes/
  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.baseUrl}/`, recipe);
  }

  // DELETE /recipes/{id}
  deleteRecipe(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
