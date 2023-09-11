import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Sector } from '../interfaces/sector'
import { LoginService } from './login.service';
import { ConfigService } from '../shared/providers/config';

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  public token = this.loginService.token;
  public url = this.configService.getApiUrl("department");
  public headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer " + this.token,
  });

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private configService: ConfigService,){}

  getSector(): Observable<any | Sector[]> {
    const httpOptions = {
      headers: this.headers,
    }

    return this.http.get(this.url, httpOptions)
  }

  addSector(sector: Sector): Observable<any | Sector> {
    const httpOptions = {
      headers: this.headers,
    }

    return this.http.post(this.url, sector, httpOptions)
  }
}
