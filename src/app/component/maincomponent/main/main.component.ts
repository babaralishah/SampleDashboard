import { Component, OnInit } from "@angular/core";
import { RestService } from "src/app/Services/rest.service";
import { FileholderService } from "src/app/Services/fileholder.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ToastrService } from "ngx-toastr";
import { UploadfirebaseService } from "./../../../Services/uploadfirebase.service";
import { AuthenticationService } from "src/app/Services/Authentication/authentication.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  p: number = 1;
  general_search: any;
  data: any;
  fileToUpload: any;
  results: any;
  preProcessTech: any;
  isPreProcess: boolean = false;
  isAlgoSelected: boolean = false;
  isPrediction: boolean = false;
  isFileSelected: boolean = true;
  isSinglePrediction: boolean = false;
  backendData: any;

  selectedCar: any;

  cars = [
    { id: 1, name: "Volvo" },
    { id: 2, name: "Saab" },
    { id: 3, name: "Opel" },
    { id: 4, name: "Audi" },
  ];
  isTraining: boolean = false;
  selectedAlgorithm: any;
  y_pred: any = [];
  results2: any = [];
  y_test: any = [];
  token: any;
  tokendata: any;
  userFiles: any;
  predictedData: any = [];
  isFileReceived: any;

  constructor(
    public restservice: RestService,
    private FileholderService: FileholderService,
    private toastr: ToastrService,
    private uploadService: UploadfirebaseService,
    private authService: AuthenticationService
  ) {}
  headers1 = [
    "Algorithm",
    "Test data Accuracy",
    "Train data Accuracy",
    "TrainingTime",
  ];

  headers2 = ["Technique", "Time Taken"];
  flag = false;
  stringifiedData: any;
  parsedJson: any;
  val: any;
  firstName: any;
  newImage: any;
  FormValue: any;
  receivedFile: any; //  = null;
  todaydate: any;

  ngOnInit() {
    // this.preprocessingDataFile();
    this.tokenization();
    this.getUserFiles();
  }

  tokenization() {
    this.token = this.authService.getToken();
    // console.log(this.token);

    const decodedToken = this.authService.getDecodedToken(this.token);
    this.tokendata = decodedToken;
    console.log(this.tokendata);
    // console.log(this.userName);
  }
  getUserFiles() {
    console.log(this.tokendata?._id);

    this.authService.getFiles(this.tokendata._id).subscribe((data) => {
      console.log(data);
      this.backendData = data;
      this.userFiles = this.backendData.data.files;
      console.log(this.userFiles);
    });
  }
  async uploadFile() {
    console.log("upload func");

    if (this.fileToUpload) {
      this.FileholderService.setfile(this.fileToUpload);
      const uploadImgObs = await this.uploadService.uploadProfileImg({
        file: this.fileToUpload,
      });
      uploadImgObs.subscribe(async (imgUrl: any) => {
        console.log(imgUrl);
        const obs = this.authService.createFileUrl({
          fileName: this.fileToUpload.name,
          fileUrl: imgUrl,
        });
        obs.subscribe(
          (data: any) => {
            console.log(data);
          },
          (error: any) => {
            console.log(error);
          }
        );
      });
      this.restservice.getTheDataFiles(this.fileToUpload).subscribe((data) => {
        // this.data = data;
        // this.results = this.data[0].data;
        this.isFileReceived = data;
        console.log("Data: ", data);
        if (data === "true") {
          console.log(this.fileToUpload.name);

          this.toastr.success(
            "File Received \n" + this.fileToUpload.name,
            "Success",
            {
              timeOut: 3000,
            }
          );
        }
      });
    }

    // Calling service for firebase

    // const obs = await this.UploadfirebaseService.uploadProfileImg(
    //   {
    //     file: this.fileToUpload
    //   }
    // );
    // obs.subscribe(
    //   url => {
    //     console.log(url);
    //     localStorage.setItem('fileUrl', JSON.stringify(url));
    //   }
    // );

    // Calling the service to pass the data file between other components such as visualization component
  }

  preprocessingDataFile() {
    this.restservice.preprocessingDataFiles().subscribe(
      (data) => {
        this.data = data;
        setTimeout(() => {
          console.log(this.data[0].data);

          this.preProcessTech = this.data[0].data;

          console.log(this.preProcessTech);
        }, 1000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  backToFileInput() {
    this.isFileSelected = true;
    this.isPreProcess = false;
  }

  performTraining() {
    this.isTraining = true;
    this.isAlgoSelected = false;
    this.isSinglePrediction = false;
    this.getPrediction();
  }

  performPreprocessing() {
    this.preprocessingDataFile();
    this.isPreProcess = true;
    this.isFileSelected = false;
    this.isAlgoSelected = false;
    this.isPrediction = false;
  }
  performAlgoSelection() {
    // this.getPrediction();
    this.isPreProcess = false;
    this.isPrediction = false;
    this.isAlgoSelected = true;
    this.isTraining = false;
    // this.restservice.gettrainingTime().subscribe((data) => {
    //   console.log(data);
    // });
  }

  performSinglePrediction() {
    console.log("prediction");

    this.isPreProcess = false;
    this.isAlgoSelected = false;
    this.isPrediction = false;
    this.isSinglePrediction = true;
    this.isTraining = false;
  }
  performPrediction() {
    this.getPrediction();
    console.log("prediction");

    this.isPreProcess = false;
    this.isAlgoSelected = false;
    this.isPrediction = true;
    this.isTraining = false;
  }
  backToPrediction() {
    this.isPreProcess = false;
    // this.isAlgoSelected = true;
    this.isPrediction = false;
    this.isTraining = true;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(
      "I am 'handleFileInput Function ': \"File dragged but not uploaded yet\""
    );
    this.uploadFile();
  }

  singlePrediction(algorithm: any, name: any) {
    this.results2 = [];
    console.log(algorithm);

    this.selectedAlgorithm = name;
    this.results.forEach((element: any) => {
      if (element.Algorithm === this.selectedAlgorithm) {
        this.results2.push(element);
      }
    });
    // this.results2 = this.results;
    console.log(this.selectedAlgorithm);

    this.restservice
      .singlePredictions({ algorithm: algorithm })
      .subscribe((data) => {
        console.log(data);
        this.predictedData = data;
        this.y_pred = this.predictedData[0];
        this.y_test = this.predictedData[1];
        console.log(this.y_pred);

        console.log(this.y_test);
      });
  }

  getPrediction() {
    this.restservice.getPrediction().subscribe((data) => {
      this.data = data;
      this.results = this.data[0].data;
      console.log("Data: ", data);
      console.log("Results: ", this.results);
    });
  }
}
