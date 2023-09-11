import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Movement } from '../interfaces/movement'

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  public url = 'http://localhost:3000/api'
  constructor(private http: HttpClient) {}

  makeMovement(movement: Partial<Movement>, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
    }

    return this.http.post<{ token: string }>(`${this.url}/movement-item`, movement, httpOptions)
  }
  getReport(token: string): Observable<any | Movement[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
    }

    return this.http.get(`${this.url}/movement-report`, httpOptions)
  }
}
