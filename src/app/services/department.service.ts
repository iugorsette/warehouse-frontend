import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { LoginService } from './login.service';
import { ConfigService } from '../shared/providers/config';
import { IDepartment } from '../interfaces/department';

@Injectable({
  providedIn: 'root',
})

export class DeparmentService {
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

  getDepartment(): Observable<any> {
    const httpOptions = {
      headers: this.headers,
    }

    return this.http.get(this.url, httpOptions)
  }

  addDepartment(deparment: IDepartment): Observable<any | IDepartment> {
    const httpOptions = {
      headers: this.headers,
    }

    return this.http.post(this.url, deparment, httpOptions)
  }

  editDepartment( deparment: IDepartment): Observable<any | IDepartment> {
    const httpOptions = {
      headers: this.headers,
    }

    return this.http.put(this.url, deparment, httpOptions)
  }
  
  deleteDepartment(deparmentId: string): Observable<any> {
    const httpOptions = {
      headers: this.headers,
      params: { id: deparmentId },
    }

    return this.http.delete(this.url, httpOptions)
  }
}
