import { Component, OnInit } from "@angular/core";
import { RestService } from "src/app/Services/rest.service";
import { FileholderService } from "src/app/Services/fileholder.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  general_search: any;
  data: any;
  fileToUpload: any;
  results: any;
  preProcessTech: any;
  isPreProcess: boolean = false;
  isAlgoSelected: boolean = false;
  isPrediction: boolean = false;
  isFileSelected: boolean = true;
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

  constructor(
    public restservice: RestService,
    private FileholderService: FileholderService
  ) {}
  headers1 = [
    "Algorithm",
    "Test data Accuracy",
    "Train data Accuracy",
    // "TrainingTime",
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
  }

  backToFileInput() {
    this.isFileSelected = true;
    this.isPreProcess = false;
  }

  performTraining() {
    this.isTraining = true;
    this.isAlgoSelected = false;
  }

  performPreprocessing() {
    this.preprocessingDataFile();
    // this.getPrediction();
    // this.preprocessingDataFile();
    this.isPreProcess = true;
    this.isFileSelected = false;
    this.isAlgoSelected = false;
    this.isPrediction = false;
  }
  performAlgoSelection() {
    
    this.getPrediction();
    this.isPreProcess = false;
    this.isPrediction = false;
    this.isAlgoSelected = true;
    this.isTraining = false;
    this.restservice.gettrainingTime().subscribe((data) => {
      console.log(data);
    });
  }
  performPrediction() {
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

  preprocessingDataFile() {
    this.restservice.preprocessingDataFiles().subscribe(
      (data) => {
        this.data = data;

      //   if(data)
      //   {
      //   this.getPrediction();
      // }
        setTimeout(() => {
          console.log(this.data[0].data);
          
          this.preProcessTech = this.data[0].data;

          console.log(this.preProcessTech);
        }, 4000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  singlePrediction(algorithm: any) {
    console.log(algorithm);

    this.selectedAlgorithm = algorithm;
    this.restservice
      .singlePredictions({ algorithm: algorithm })
      .subscribe((data) => {
        console.log(data);
      });
    // console.log(algorithm);
  }

  getPrediction() {
    this.restservice.parseTable().subscribe((data) => {
      this.data = data;
      this.results = this.data[0].data;
      console.log("Data: ", data);
      console.log("Results: ", this.results);
      // if (this.results) this.preprocessingDataFile();

      // this.router.navigateByUrl('/Visualization');
    });
  }

  uploadFile() {
    console.log("upload func");

    if (this.fileToUpload) {
      this.FileholderService.setfile(this.fileToUpload);
      this.restservice.getTheDataFiles(this.fileToUpload).subscribe((data) => {
        // this.data = data;
        // this.results = this.data[0].data;
        console.log("Data: ", data);
        // console.log("Results: ", this.results);

        // this.router.navigateByUrl('/Visualization');
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
}
