import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RestService {
  constructor(private http: HttpClient) {}

  url = "https://fyp-prediction-backend.herokuapp.com";
  predictionPerform = "http://127.0.0.1:5000/predictionPerform/";
  columnsNames = "http://127.0.0.1:5000/columnsNames/";
  dataFileDetails = "http://127.0.0.1:5000/dataFileDetails/";
  preprocessingDataFile = "http://127.0.0.1:5000/preprocessingDataFile/";
  trainingTime = "http://127.0.0.1:5000/trainingTime/";
  singlePrediction = "http://127.0.0.1:5000/singlePrediction/";

  preprocessingDataFiles() {
    console.log("second preprocessigncall");

    return this.http.get(this.preprocessingDataFile); //,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
    // return this.http.get(`${this.url}/output1`);
    console.log("hello");
  }

  singlePredictions(algorithm: object | any) {
    console.log(algorithm);
    console.log(algorithm.algorithm);

    const formData: FormData = new FormData();
    formData.append("algorithm", algorithm.algorithm);
    console.log(formData);

    return this.http.post(this.singlePrediction, formData); // ,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
  }

  gettrainingTime() {
    // console.log("second preprocessigncall");

    return this.http.get(this.trainingTime, { responseType: "text" }); //,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
    // return this.http.get(`${this.url}/output1`);
    console.log("hello");
  }

  readResults() {
    return this.http.get(this.columnsNames);
    // return this.http.get(`${this.url}/output1`);
    console.log("hello");
  }

  dataFileDetail(credentials: object | any) {
    const formData: FormData = new FormData();
    formData.append("name1", credentials.name1);
    
    formData.append("name2", credentials.name2);  
    console.log(formData);
  
    return this.http.post(this.dataFileDetails, formData);
    return this.http.get(`${this.url}/output2`);
  }

  parseTable(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    console.log("File Name: ", fileToUpload.name); // and File and its name: \' ' + fileToUpload + fileToUpload.name);
    return this.http.post(this.predictionPerform, formData); // ,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
    return this.http.get(`${this.url}/output`);
  }
}
