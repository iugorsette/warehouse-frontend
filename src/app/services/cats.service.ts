import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatsService {

  constructor(
    private http: HttpClient

  ) { 
    
  }

  public squareTwice(x: number): number {
    return (x * x)*2;
  }
}
