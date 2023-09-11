import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  public makeRegister(user: {
    name: string
    email: string
    password: string
    confirmPassword: string
    admin?: boolean
  }): Observable<any> {
    return this.http.post(`http://localhost:3000/api/register`, user, this.httpOptions)
  }
}
