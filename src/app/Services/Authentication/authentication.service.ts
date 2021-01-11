import jwt_decode from "jwt-decode";
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {

  token: any;
  headers = new HttpHeaders().set("Content-Type", "application/json");
  // private readonly url = 'https://fyp-auth-backend.herokuapp.com/api'; // environment.url;
  private readonly url = "http://localhost:4000/api";

  constructor(private httpClient: HttpClient, public router: Router) {}
  ///////// Function to Register the new user /////////////
  register(user: any): Observable<any> {
    return this.httpClient.post(`${this.url}/users/signup`, user);
  }

  // create service to get and set the token to local storage

  setToken(token: any) {
    localStorage.setItem("token", token);
    console.log(token);
  }
  getDecodedToken(token: any): any {
    try {
      // console.log(jwt_decode(token));

      return jwt_decode(token);
    } catch (Error) {
      console.log(Error);
      return null;
    }
  }
  getToken() {
    return localStorage.getItem("token");
  }

  createFileUrl(data: any) {
    this.token = this.getToken();
    const user = this.getDecodedToken(this.token);
    // console.log(user);
    return this.httpClient.post(`${this.url}/users/${user._id}/createFileUrl`, data);
  }
  getFilesUrl(data: any) {
    return this.httpClient.get(`${this.url}/:id/getFilesUrl`, data);
  }
  deleteFileUrl(userId: any) {
    return this.httpClient.delete(
      `${this.url}/:id/deleteFileUrl/:fileId`,
      userId
    );
  }

  /////////// Function to Login the already existed user /////////////
  public login(user: any): Observable<any> {
    console.log("Hello", user);
    return this.httpClient.post(`${this.url}/users/login`, user);
  }
  ///////// Error Handling /////////////////
  handleError(error: HttpErrorResponse) {
    let msg = "";
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
