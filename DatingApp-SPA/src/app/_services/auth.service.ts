import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';

  constructor(private http: HttpClient) { }

  /** model is UserForLoginDto */
  login(model: any) {
    /**Angular default is using Content-Type:applcation/json by default so we don't need thrid parameter of post() method*/
    /**(if you need to autorize with token you need to specific third parameter)  */
    /**use rxgs operator(map) to do with observable(data response from server) */
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response: any) => {
        const responseObject = response;
        if (responseObject) {
          localStorage.setItem('token', responseObject.token);
        }
      })
    );
  }

  /** model is UserForRegisterDto */
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

}
