import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private baseUrl = 'http://localhost:3000'; 

  getApiUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
}
