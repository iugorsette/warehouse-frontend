import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Collaborator } from '../interfaces/sector'
import { ConfigService } from '../shared/providers/config'

@Injectable({
  providedIn: 'root',
})
export class CollaboratorService {
  public url = this.configService.getApiUrl('collaborator')
  constructor(
    private http: HttpClient,
    private configService: ConfigService
    ) {}

  addCollaborator(collaborator: Partial<Collaborator>, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
    }

    return this.http.post<{ token: string }>(this.url, collaborator, httpOptions)
  }

  getCollaborator(token: string): Observable<any | Collaborator[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
    }

    return this.http.get(this.url, httpOptions)
  }

  editCollaborator(collaborator: Collaborator, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
      params: { id: collaborator._id },
    }

    return this.http.put(this.url, httpOptions)
  }

  deleteCollaboratorm(collaboratorId: string, token: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
      params: { id: collaboratorId },
    }

    return this.http.delete(this.url, httpOptions)
  }
}
