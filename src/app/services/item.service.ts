import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Item } from '../interfaces/item'
import { ConfigService } from '../shared/providers/config'
import { LoginService } from './login.service'

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  public url = this.configService.getApiUrl('items')
  public token = this.loginService.token
  public headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.token,
  })

  constructor(private http: HttpClient,
    private configService: ConfigService,
    private loginService: LoginService
    ) {}

  addItem(item: Partial<Item>) {
    const httpOptions = {
      headers: this.headers
    }
    return this.http.post(this.url, item, httpOptions)
  }

  getItens( query?: any): Observable<any | Item[]> {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: query }),
    }
    return this.http.get(this.url, httpOptions)
  }

  editItem(item: Item) {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: { id: item._id } }),
    }

    return this.http.put(this.url, item, httpOptions)
  }

  deleteItem(itemId: string) {
    const httpOptions = {
      headers: this.headers,
      params: new HttpParams({ fromObject: { id: itemId } }),
    }

    return this.http.delete(this.url, httpOptions)
  }
}
