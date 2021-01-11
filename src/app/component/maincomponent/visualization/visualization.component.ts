import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { RestService } from "src/app/Services/rest.service";
import { FileholderService } from "src/app/Services/fileholder.service";
@Component({
  selector: "app-visualization",
  templateUrl: "./visualization.component.html",
  styleUrls: ["./visualization.component.css"],
})
export class VisualizationComponent implements OnInit {
  name1: any;
  name2: any;
  yearsOfPrediction = [
    { year: "5" },
    { year: "10" },
    { year: "15" },
    { year: "20" },
  ];
  // chartForm: FormGroup;
  chartname: any;
  chart: any;
  chart2 = [];
  pie: any;
  doughnut: any;
  data1: any;
  data2: any;
  // data1 = [];
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  backendData: any;
  public doughnutChartLabels: any[] = [];
  public doughnutChartData: any[] = [];
  public doughnutChartType = "doughnut";

  public lineChartLabels: any[] = [2010, 2011, 2012, 2013];
  public lineChartData: any[] = [5, 12, 14, 72];
  public lineChartType = "line";
  public lineChartLegend = true;

  public polarChartLabels: any[] = [2010, 2011, 2012, 2013];
  public polarChartData: any[] = [5, 12, 14, 72];
  public polarChartType = "polar";
  public polarChartLegend = true;

  public bubbleChartLabels: any[] = [2010, 2011, 2012, 2013];
  public bubbleChartData: any[] = [5, 12, 14, 72];
  public bubbleChartType = "bubble";
  public bubbleChartLegend = true;

  public barChartLabels: any[] = [2010, 2011, 2012, 2013];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData: any[] = [5, 12, 14, 72];

  public pieChartLabels: any[] = [];
  public pieChartData: any[] = [];
  public pieChartType = "pie";

  public radarChartLabels: any[] = [2010, 2011, 2012, 2013];
  public radarChartData: any[] = [5, 12, 14, 72];
  public radarChartType = "radar";
  lastColumn: any;
  data: any;
  firstDataColumn: any = [];
  lastDataColumn: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private FileholderService: FileholderService,
    private restservice: RestService
  ) {}

  ngOnInit(): void {
    this.loadVisualzeData();
    this.getFirstColumn();
    this.predictedFiles();
  }
  predictedFiles() {
    this.restservice.predictedFiles().subscribe((data) => {
      console.log(data);
      this.lastDataColumn = data;
    });
  }
  loadVisualzeData() {
    this.restservice.columnsName().subscribe(
      (data: any) => {
        this.backendData = data;
        console.log(this.backendData);

        // var obj = JSON.parse(this.backendData);
        // console.log('Backend Data Json parse: ', this.backendData[0]);
      },
      (error: any) => {
        console.log("No Data Found of Visualization" + error);
      }
    );
  }
  getFirstColumn() {
    this.restservice.getFirstColumn().subscribe((data) => {
      console.log(data);
      this.firstDataColumn = data;
    });
  }
  setName1(name: any) {
    console.log(name);

    this.name1 = name;
  }
  setName2(name: any) {
    console.log(name);
    this.name2 = name;
  }
  checkChart(chart: any) {
    console.log(chart);
    this.chartname = chart;
  }
  sendData() {
    let firstDataColumn = [];
    let lastDataColumn: any = [];
    for (let i = 0; i < 50; i++) {
      this.lastDataColumn.forEach(function (data: any) {
        lastDataColumn[i] = data[0];
        // console.log(lastDataColumn[i]);
      });
    }
    for (let i = 0; i < 50; i++) {
      firstDataColumn[i] = this.firstDataColumn[i];
    }
    this.doughnutChartLabels = firstDataColumn;
    this.doughnutChartData = lastDataColumn;
    this.pieChartData = lastDataColumn;
    this.pieChartLabels = firstDataColumn;
    console.log(this.doughnutChartLabels);
    console.log(this.doughnutChartData);
    // this.restservice
    //   .dataFileDetail({ name1: this.name1, name2: this.name2 })
    //   .subscribe((data: any) => {
    //     console.log(data);

    //     const object1 = JSON.parse(data[1]);
    //     const object2 = JSON.parse(data[2]);
    //     const arr1: any[] = [];
    //     const arr2 = [];
    //     this.chartname = "bar";

    //     let count = 0;
    //     for (const property in Object.values(object1)) {
    //       const obj = { cat: null, length: 0, avg: 0 };
    //       if (!arr1.includes(object1[property])) {
    //         arr1.push(object1[property]);
    //         obj.cat = object1[property];
    //         obj.length++;
    //         obj.avg = object2[property];
    //         arr2.push(obj);
    //       } else {
    //         for (const arr of arr2) {
    //           if (arr.cat == object1[property]) {
    //             const sum = arr.avg * arr.length + object2[property];
    //             arr.length++;
    //             arr.avg = sum / arr.length;
    //           }
    //         }
    //       }
    //       count++;
    //     }

    //     const arr = data[0].split("\n");
    //     const catArr: any[] = [],
    //       lengthArr: any[] = [],
    //       avgArr: any[] = [];
    //     arr.forEach((element: string) => {
    //       const dataSplit = element.split(" ");

    //       catArr.push(dataSplit[0]);
    //       lengthArr.push(dataSplit[dataSplit.length - 1]);
    //     });
    //     arr2.forEach((element) => {
    //       if (avgArr.length >= 10) {
    //         return;
    //       }
    //       avgArr.push(element.avg);
    //     });
    //     console.log(catArr);
    //     console.log(lengthArr);
    //     console.log(avgArr);

    //     setTimeout(() => {
    //       const labels = [];
    //       const complexArr = [];
    //       for (let i = 0; i < lengthArr.length; i++) {
    //         if (i >= 10) {
    //           break;
    //         }
    //         const label = catArr[i] + " - " + lengthArr[i];
    //         labels.push(label);

    //         const innerData = { data: [], label: catArr[i] };
    //         for (let j = 0; j < lengthArr.length; j++) {
    //           // innerData.data.push(0);
    //         }
    //         // innerData.data.splice(i, 1, avgArr[i]);
    //         complexArr.push(innerData);
    //       }
    // console.log(complexArr);
    // console.log(avgArr);
    // console.log(labels);
    // console.log(complexArr);
    // this.doughnutChartData = avgArr;

    // this.lineChartLabels = labels;
    // this.lineChartData = avgArr;

    // this.polarChartLabels = labels;
    // this.polarChartData = avgArr;

    // this.bubbleChartLabels = labels;
    // this.bubbleChartData = complexArr;

    // this.pieChartLabels = labels;
    // this.pieChartData = avgArr;

    // this.barChartLabels = labels;
    // this.barChartData = complexArr;

    // this.radarChartLabels = labels;
    // this.radarChartData = complexArr;
    // this.barChartData = labels;
    //         console.log("\nDone\n");
    //       });
    //     });
  }
}
