import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Sector } from '../interfaces/sector'

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  public url = 'http://localhost:3000/api/sector'
  constructor(private http: HttpClient) {}

  getSector(token: string): Observable<any | Sector[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
    }

    return this.http.get(this.url, httpOptions)
  }

  addSector(sector: Sector, token: string): Observable<any | Sector> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
    }

    return this.http.post(this.url, sector, httpOptions)
  }
}
