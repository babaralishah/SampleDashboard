
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient) { }

  url = 'https://fyp-prediction-backend.herokuapp.com';
  backendAddress = 'http://127.0.0.1:5000/output/';
  backendAddress1 = 'http://127.0.0.1:5000/output1/';
  backendAddress2 = 'http://127.0.0.1:5000/output2/';

  // tslint:disable-next-line: typedef
  readResults() {
    return this.http.get(this.backendAddress1);
    // return this.http.get(`${this.url}/output1`);
    console.log('hello');
  }

  // tslint:disable-next-line: typedef
  readResults2(credentials: object | any) {
    const formData: FormData = new FormData();
    formData.append('name1', credentials.name1);
    formData.append('name2', credentials.name2);
    return this.http.post(this.backendAddress2, formData);
    return this.http.get(`${this.url}/output2`);
  }

  // tslint:disable-next-line: typedef
  parseTable(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    console.log('File Name: ', fileToUpload.name); // and File and its name: \' ' + fileToUpload + fileToUpload.name);
    return this.http.post(this.backendAddress, formData); // ,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
    return this.http.get(`${this.url}/output`);
  }

}
