import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RestService {
  constructor(private http: HttpClient) {}

  url = "https://fyp-prediction-backend.herokuapp.com";
  predictionPerform_url = "http://127.0.0.1:5000/predictionPerform/";
  columnsNames_url = "http://127.0.0.1:5000/columnsNames/";
  particular_column_url = "http://127.0.0.1:5000/particular_column/";
  preprocessingDataFile_url = "http://127.0.0.1:5000/preprocessingDataFile/";
  trainingTime_url = "http://127.0.0.1:5000/trainingTime/";
  singlePrediction_url = "http://127.0.0.1:5000/singlePrediction/";
  getTheDataFile_url = "http://127.0.0.1:5000/getTheDataFile/";
  // predictedFile = "http://127.0.0.1:5000/predictedFile/";
  firstColumn_url = "http://127.0.0.1:5000/firstColumn/";

  getFirstColumn() {
    return this.http.get(this.firstColumn_url); //,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
  }

  // predictedFiles() {
  //   return this.http.get(this.predictedFile); //,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
  // }

  preprocessingDataFiles() {
    return this.http.get(this.preprocessingDataFile_url); //,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
  }

  getTheDataFiles(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    console.log("File Name: ", fileToUpload.name); // and File and its name: \' ' + fileToUpload + fileToUpload.name);
    return this.http.post(this.getTheDataFile_url, formData, {
      responseType: "text",
    });
  }

  singlePredictions(algorithm: object | any) {
    console.log(algorithm);
    console.log(algorithm.algorithm);
    const formData: FormData = new FormData();
    formData.append("algorithm", algorithm.algorithm);
    formData.append("username", "Chris");
    console.log(formData);

    return this.http.post(this.singlePrediction_url, formData); // ,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
  }

  gettrainingTime() {
    return this.http.get(this.trainingTime_url, { responseType: "text" });
  }

  columnsName() {
    return this.http.get(this.columnsNames_url);
  }

  particular_column(credentials: object | any) {
    const formData: FormData = new FormData();
    formData.append("PredictedColumnName", credentials.PredictedColumnName);
    // formData.append("name2", credentials.name2);
    console.log(formData);
    return this.http.post(this.particular_column_url, formData);
  }

  getPrediction() {
    return this.http.get(this.predictionPerform_url); // ,{  responseType: 'arraybuffer' | 'blob' | 'json' | 'text' });
  }
}
