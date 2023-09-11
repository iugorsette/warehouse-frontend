import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { User } from '../interfaces/user'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public token?: string

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')!
  }

  public login(user: User): Observable<any> {
    const url = `http://localhost:3000/api/login`
    return this.http.post<any>(url, user).pipe(
      tap((res: any) => {
        this.token = res.token
        localStorage.setItem('token', res.token)
      })
    )
  }

  logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  get isLogged() {
    return !!this.token
  }
}
