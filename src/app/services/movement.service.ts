import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Movement } from "../interfaces/movement";
import { LoginService } from "./login.service";

type Vinculate = { collaboratorId: string; equipmentId: string };
@Injectable({
  providedIn: "root",
})
export class MovementService {
  public url = "http://localhost:3000/";
  constructor(private http: HttpClient, private loginService: LoginService) {}

  vinculate(vinculate: Vinculate): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.loginService.token,
      }),
      params: new HttpParams({ fromObject: vinculate }),
    };

    return this.http.post(
      `${this.url}/equipments/vinculateCollaborator`,
      httpOptions
    );
  }

  removeVinculate(desvinculate: Vinculate): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.loginService.token,
      }),
      params: new HttpParams({ fromObject: desvinculate }),
    };

    return this.http.post(
      `${this.url}/equipments/removeCollaborator`,
      httpOptions
    );
  }

  getReport(): Observable<any | Movement[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.loginService.token,
      }),
    };

    return this.http.get(`${this.url}/report`, httpOptions);
  }
}
