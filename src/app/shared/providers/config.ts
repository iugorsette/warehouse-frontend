import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private baseUrl = environment.baseUrl;

  getApiUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

}
