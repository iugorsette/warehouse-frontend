import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ConfigService } from '../shared/providers/config'
import { LoginService } from './login.service'
import { IEquipment } from '../interfaces/equipment'

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  public url = this.configService.getApiUrl('equipments')
  public token = this.loginService.token
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token,
  })

  constructor(private http: HttpClient,
    private configService: ConfigService,
    private loginService: LoginService
    ) {}

  addEquipment(equipments: Partial<IEquipment>) {
    const httpOptions = {
      headers: this.headers
    }
    return this.http.post(this.url, equipments, httpOptions)
  }

  getEquipments( query?: any): Observable<any | IEquipment[]> {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: query }),
    }
    return this.http.get(this.url, httpOptions)
  }

  editEquipment(equipments: IEquipment) {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: { id: equipments.id } }),
    }

    return this.http.put(this.url, equipments, httpOptions)
  }

  deleteEquipment(id: string) {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: { id } }),
    }

    return this.http.delete(this.url, httpOptions)
  }
}
