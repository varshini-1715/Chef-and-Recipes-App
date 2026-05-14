import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chef {
  id?: number;
  name: string;
  specialty: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChefService {
  private baseUrl = 'http://127.0.0.1:8000/chefs'; // FastAPI running locally

  constructor(private http: HttpClient) {}

  // GET /chefs/
  getAllChefs(): Observable<Chef[]> {
    return this.http.get<Chef[]>(`${this.baseUrl}/`);
  }

  // POST /chefs/
  addChef(chef: Chef): Observable<Chef> {
    return this.http.post<Chef>(`${this.baseUrl}/`, chef);
  }

  // DELETE /chefs/{id}
  deleteChef(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
