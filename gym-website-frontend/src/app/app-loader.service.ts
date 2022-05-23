import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import * as Console from "console";

@Injectable({
  providedIn: 'root',
})
export class AppLoaderService {
  constructor(private http: HttpClient) {}

  initialize() {
    let url = '/config/api-url.txt';
    this.http.get(url, { responseType: 'text' }).subscribe((response) => {
      environment.api = response;
      Console.log("THIS IS API URL:")
      Console.log(response)
    });
  }
}
