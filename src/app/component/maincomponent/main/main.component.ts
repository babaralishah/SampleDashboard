import { Component, OnInit } from "@angular/core";
import { RestService } from "src/app/Services/rest.service";
import { FileholderService } from "src/app/Services/fileholder.service";
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
  isPreProcess: boolean = false;
  isAlgoSelected: boolean = false;
  isPrediction: boolean = false;
  isFileSelected: boolean = true;
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
  flag = false;
  stringifiedData: any;
  parsedJson: any;
  val: any;
  firstName: any;
  newImage: any;
  FormValue: any;
  receivedFile: any; //  = null;
  todaydate: any;

  ngOnInit() {}

  backToFileInput(){
    this.isFileSelected = true;
    this.isPreProcess = false;
  }

  performPreprocessing() {
    this.isPreProcess = true;
    this.isFileSelected = false;
    this.isAlgoSelected = false;
    this.isPrediction = false;
    this.uploadFile();
  }
  performAlgoSelection() {
    this.isPreProcess = false;
    this.isPrediction = false;
    this.isAlgoSelected = true;
  }
  performPrediction(){
    this.isPreProcess = false;
    this.isAlgoSelected = false;
    this.isPrediction = true;
  }
  backToPrediction(){
    this.isPreProcess = false;
    this.isAlgoSelected = true;
    this.isPrediction = false;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(
      "I am 'handleFileInput Function ': \"File dragged but not uploaded yet\""
    );
  }

  async uploadFile() {
    this.FileholderService.setfile(this.fileToUpload);
    this.restservice.parseTable(this.fileToUpload).subscribe((data) => {
     
      this.data = data;
      this.results = this.data[0].data;
      console.log("Data: ", this.data);
      console.log("Results: ", this.results);

      // this.router.navigateByUrl('/Visualization');
    });

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
