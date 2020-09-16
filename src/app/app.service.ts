import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AppService {

  layout: string = '';

  getApiUrl() {
    return 'http://localhost:3000/api';
  }

  setLayout(layout) {
    this.layout = layout;
  }

  getLayout() {
    return this.layout;
  }
}
