import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IReport, Vinculate } from "../interfaces/movement";
import { LoginService } from "./login.service";
import { ConfigService } from "../shared/providers/config";

@Injectable({
  providedIn: "root",
})
export class MovementService {
  public url = this.configService.getApiUrl("equipments");
  public urlReport = this.configService.getApiUrl("report");

  public token = this.loginService.token;
  public headers = new HttpHeaders({
    Authorization: "Bearer " + this.token,
  });
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private loginService: LoginService
  ) {}

  vinculate(vinculate: Vinculate): Observable<any> {
    const httpOptions = {
      headers: this.headers
    };

    return this.http.post(`${this.url}/vinculateCollaborator`,vinculate, httpOptions);
  }

  removeVinculate(desvinculate: Vinculate): Observable<any> {
    const httpOptions = {
      headers: this.headers,
    };

    return this.http.post(`${this.url}/removeCollaborator`,desvinculate, httpOptions);
  }

  getReport(query?:any): Observable<any | IReport[]> {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: query }),
    };

    return this.http.get(this.urlReport, httpOptions);
  }
}

