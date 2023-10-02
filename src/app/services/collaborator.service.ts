import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ICollaborator } from "../interfaces/collaborator";
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

  addCollaborator(collaborator: Partial<ICollaborator>): Observable<any> {
    const httpOptions = {
      headers: this.headers,
    };

    return this.http.post(this.url, collaborator, httpOptions);
  }

  getCollaborator(query?: any): Observable<any | ICollaborator[]> {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: query }),
    };

    return this.http.get(this.url, httpOptions);
  }

  searchCollaborators(searchTerm: string): Observable<any|ICollaborator> {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: { title: searchTerm } }),
    };
    return this.http.get<ICollaborator>(this.url, httpOptions);
  }

  editCollaborator(collaborator: ICollaborator): Observable<any> {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: { id: collaborator.id } }),
    };

    return this.http.put(this.url, collaborator, httpOptions);
  }

  deleteCollaboratorm(collaboratorId: string): Observable<any> {
    const httpOptions = {
      headers: this.headers,
      params: { id: collaboratorId },
    };

    return this.http.delete(this.url, httpOptions);
  }
}
