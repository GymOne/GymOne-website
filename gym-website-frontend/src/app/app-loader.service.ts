import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AppLoaderService {
  constructor(private http: HttpClient) {}

  async initialize() {
    let url = '/config/api-url.txt';
    await this.http.get(url, { responseType: 'text' }).toPromise().then(data => {
      environment.api = data
      console.log(data)
    });
  }
}
