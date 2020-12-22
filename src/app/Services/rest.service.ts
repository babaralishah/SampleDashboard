
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient) { }

  url = 'https://fyp-prediction-backend.herokuapp.com';
  getPerformPrediction = 'http://127.0.0.1:5000/getPerformPrediction/';
  getCsvColumns = 'http://127.0.0.1:5000/getCsvColumns/';
  getCsvData = 'http://127.0.0.1:5000/getCsvData/';

  // tslint:disable-next-line: typedef
  readResults() {
    return this.http.get(this.getCsvColumns);
    // return this.http.get(`${this.url}/output1`);
    console.log('hello');
  }

  // tslint:disable-next-line: typedef
  readResults2(credentials: object | any) {
    const formData: FormData = new FormData();
    formData.append('name1', credentials.name1);
    formData.append('name2', credentials.name2);
    return this.http.post(this.getCsvData, formData);
    return this.http.get(`${this.url}/output2`);
  }

  // tslint:disable-next-line: typedef
  parseTable(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload?.name);
    console.log('File Name: ', fileToUpload?.name); // and File and its name: \' ' + fileToUpload + fileToUpload.name);
    return this.http.post(this.getPerformPrediction, formData); // ,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
    return this.http.get(`${this.url}/output`);
  }

}
