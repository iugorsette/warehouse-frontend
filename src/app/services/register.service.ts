import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import { ConfigService } from "../shared/providers/config";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  public url = this.configService.getApiUrl("users");
  public token = this.loginService.token;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private configService: ConfigService
  ) {}

  public makeRegister(user: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    admin?: boolean;
  }): Observable<any> {
    return this.http.post(this.url, user, this.httpOptions);
  }
}
