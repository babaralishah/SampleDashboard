import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/Services/rest.service';
import { FileholderService } from 'src/app/Services/fileholder.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  general_search: any;
  data: any;

  fileToUpload: any;
  results: any;
  constructor(
    public restservice: RestService,
    // tslint:disable-next-line: no-shadowed-variable
    private FileholderService: FileholderService
  ) {}
  headers1 = [
    'Algorithm',
    'Test data Accuracy',
    'Train data Accuracy',
    'Training Time',
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

  // tslint:disable-next-line: typedef
  ngOnInit() {}
  // tslint:disable-next-line: typedef
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(
      'I am \'handleFileInput Function \': "File dragged but not uploaded yet"'
    );
  }

  // tslint:disable-next-line: typedef
  async uploadFile() {
    this.FileholderService.setfile(this.fileToUpload);
    this.restservice.parseTable(this.fileToUpload).subscribe((data) => {
      // this.results = data[0].data;
      this.data = data;
      console.log('Data: ', this.data);
      console.log('Results: ', this.results);

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
