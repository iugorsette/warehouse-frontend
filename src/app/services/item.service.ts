import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Item } from '../interfaces/item'

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  public url = 'http://localhost:3000/api/item'
  constructor(private http: HttpClient) {}

  addItem(item: Partial<Item>, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
    }

    return this.http.post<{ token: string }>(this.url, item, httpOptions)
  }

  getItens(token: string, query?: any): Observable<any | Item[]> {
    console.log(new HttpParams({ fromObject: query }))
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
      params: new HttpParams({ fromObject: query }),
    }
    return this.http.get(this.url, httpOptions)
  }

  editItem(item: Item, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
      params: new HttpParams({ fromObject: { id: item._id } }),
    }

    return this.http.put(this.url, item, httpOptions)
  }

  deleteItem(itemId: string, token: string) {
    console.log(`itemId: ${itemId} token: ${token}`)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token,
      }),
      params: new HttpParams({ fromObject: { id: itemId } }),
    }

    return this.http.delete(this.url, httpOptions)
  }
}
