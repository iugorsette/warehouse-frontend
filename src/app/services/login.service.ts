import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'
import { User } from '../interfaces/user'
import { ConfigService } from '../shared/providers/config'

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public token?: string
  public url = this.configService.getApiUrl('auth/login')


  constructor(private http: HttpClient,
    private configService: ConfigService
    ) {
    this.token = localStorage.getItem('token')!

  }

  public login(user: User): Observable<any> {
    return this.http.post<any>(this.url, user).pipe(
      tap((res: any) => {
        this.token = res.access_token
        localStorage.setItem('token', res.access_token)
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
