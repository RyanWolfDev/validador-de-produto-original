import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AppService {
  getApiUrl() {
    return 'http://localhost:3000/api';
  }
}
