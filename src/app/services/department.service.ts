import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";
import { ConfigService } from "../shared/providers/config";
import { IDepartment } from "../interfaces/department";

@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  public token = this.loginService.token;
  public url = this.configService.getApiUrl("department");
  public headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer " + this.token,
  });

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private configService: ConfigService
  ) {}

  getDepartment(query?:any): Observable<any> {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: query }),
    };

    return this.http.get(this.url, httpOptions);
  }

  addDepartment(deparment: IDepartment): Observable<any | IDepartment> {
    const httpOptions = {
      headers: this.headers,
    };

    return this.http.post(this.url, deparment, httpOptions);
  }

  editDepartment(deparment: IDepartment): Observable<any | IDepartment> {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: { id: deparment.id } }),
    };

    return this.http.put(this.url, deparment, httpOptions);
  }

  deleteDepartment(id: string): Observable<any> {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: { id } }),
    };

    return this.http.delete(this.url, httpOptions);
  }
}
