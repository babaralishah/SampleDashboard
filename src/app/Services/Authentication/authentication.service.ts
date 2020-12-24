import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  // private readonly url = 'https://fyp-auth-backend.herokuapp.com/api'; // environment.url;
  private readonly url = 'http://localhost:4000/api';

  constructor(private httpClient: HttpClient, public router: Router) {}
  ///////// Function to Register the new user /////////////
  register(user: any): Observable<any> {
    return this.httpClient
      .post(`${this.url}/users/signup`, user);
  }

  // create service to get and set the token to local storage

  setToken(token: any) {
    localStorage.setItem('token', token);
    console.log(token);
  }
  getDecodedToken(token: string): any {
    try {
      // console.log(jwt_decode(token));
      
      return jwt_decode(token);
    } catch (Error) {
      console.log(Error);
      return null;
    }
  }
  getToken() {
    return localStorage.getItem('token');
  }

  /////////// Function to Login the already existed user /////////////
  public login(user: any): Observable<any> {
    console.log('Hello', user);
    return this.httpClient.post(`${this.url}/users/login`, user);
  }
  ///////// Error Handling /////////////////
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
