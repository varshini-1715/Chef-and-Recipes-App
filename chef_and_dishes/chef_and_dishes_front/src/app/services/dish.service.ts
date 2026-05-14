import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Dish {
  id?: number;
  name: string;
  type: string;
  recipeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private baseUrl = 'http://localhost:8000/dishes'; // change as needed

  constructor(private http: HttpClient) {}

  getAllDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.baseUrl);
  }

  addDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.baseUrl, dish);
  }

  deleteDish(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
