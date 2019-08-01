import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';

  jwtHelper = new JwtHelperService();
  decodeToken: any;

  constructor(private http: HttpClient) { }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token); // If token is not expired and it is jwt token, return true
  }

  logout() {
    localStorage.removeItem('token');
  }

  /** model is UserForLoginDto */
  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response: any) => {
        const responseObject = response;
        if (responseObject) {
          localStorage.setItem('token', responseObject.token);
          this.decodeToken = this.jwtHelper.decodeToken(responseObject.token);
          console.log(this.decodeToken);
        }
      })
    );
  }

  /** model is UserForRegisterDto */
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

}
