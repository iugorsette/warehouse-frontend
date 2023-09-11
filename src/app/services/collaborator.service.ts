import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Collaborator } from "../interfaces/sector";
import { ConfigService } from "../shared/providers/config";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root",
})
export class CollaboratorService {
  public token = this.loginService.token;
  public url = this.configService.getApiUrl("collaborator");
  public headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer " + this.token,
  });

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private configService: ConfigService
  ) {}

  addCollaborator(
    collaborator: Partial<Collaborator>,
    token: string
  ): Observable<any> {
    const httpOptions = {
      headers: this.headers,
    };

    return this.http.post(this.url, collaborator, httpOptions);
  }

  getCollaborator(): Observable<any | Collaborator[]> {
    const httpOptions = {
      headers: this.headers,
    };

    return this.http.get(this.url, httpOptions);
  }

  editCollaborator(collaborator: Collaborator): Observable<any> {
    const httpOptions = {
      headers: this.headers,
      params: { id: collaborator._id },
    };

    return this.http.put(this.url, httpOptions);
  }

  deleteCollaboratorm(collaboratorId: string): Observable<any> {
    const httpOptions = {
      headers: this.headers,
      params: { id: collaboratorId },
    };

    return this.http.delete(this.url, httpOptions);
  }
}
