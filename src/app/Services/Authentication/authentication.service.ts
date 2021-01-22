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
  private readonly url = 'https://node-backend-fyp.herokuapp.com/api'; // environment.url;
  // private readonly url = "http://localhost:4000/api";
  

  constructor(private httpClient: HttpClient, private router: Router) {}
  ///////// Function to Register the new user /////////////

  getFiles(id: any) {
    return this.httpClient.get(`${this.url}/users/${id}/getFilesUrl/`);
  }

  register(user: any): Observable<any> {
    return this.httpClient.post(`${this.url}/users/signup`, user);
  }
  setToken(token: any) {
    localStorage.setItem("token", token);
    console.log(token);
  }
  getDecodedToken(token: any): any {
    try {
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
    return this.httpClient.post(
      `${this.url}/users/${user._id}/createFileUrl`,
      data
    );
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
  login(user: any): Observable<any> {
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
