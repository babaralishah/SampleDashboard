import { Component, OnInit } from "@angular/core";
import { RestService } from "src/app/Services/rest.service";
@Component({
  selector: "app-visualization",
  templateUrl: "./visualization.component.html",
  styleUrls: ["./visualization.component.css"],
})
export class VisualizationComponent implements OnInit {
  yearsOfPrediction = [{ year: "5" }, { year: "10" }];
  // chartForm: FormGroup;
  chartname: any;
  chart: any;
  pie: any;
  doughnut: any;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public doughnutChartLabels: any[] = [];
  public doughnutChartData: any[] = [];
  public doughnutChartType = "doughnut";

  public lineChartLabels: any[] = [];
  public lineChartData: any[] = [];
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
  allColumnNames: any;
  PredictedColumnName: any;
  totalRows: any;
  totalNoOfSets: any;
  minValue: any;
  maxValue: any;

  constructor(private restservice: RestService) {}

  ngOnInit(): void {
    this.loadVisualzeData();
    this.getFirstColumn();
  }
  loadVisualzeData() {
    console.log("column names");
    
    this.restservice.columnsName().subscribe(
      (data: any) => {
        this.data = data;
        this.allColumnNames = this.data[0];
        console.log(this.allColumnNames);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getFirstColumn() {
    this.restservice.getFirstColumn().subscribe((data) => {
      console.log(data);
      this.firstDataColumn = data;
      this.totalRows = this.firstDataColumn.length;
      this.totalNoOfSets = this.firstDataColumn.length / 25;
      // this.totalNoOfSets = this.totalNoOfSets.toArray();
      console.log(this.totalNoOfSets);
    });
  }
  setPredictedColumnName(name: any) {
    this.PredictedColumnName = name;
  }
  checkChart(chart: any) {
    this.chartname = chart;
  }
  sendData() {
    this.restservice
      .particular_column({ PredictedColumnName: this.PredictedColumnName })
      .subscribe((data: any) => {
        console.log(data);
        this.lastDataColumn = data;
        this.assignChartData();
      });
  }
  setNumberOfSet(name: any) {
    let firstDataColumn: any = [];
    let lastDataColumn: any = [];
    console.log(name.year);
    if (name.year === 5) {
      this.minValue = this.totalRows - 15;
      this.maxValue = this.totalRows - 10;
    } else if (name.year === 10) {
      this.minValue = this.totalRows - 10;
      this.maxValue = this.totalRows - 1;
    }
    console.log("MIN AND MAX", this.minValue, this.maxValue, this.totalRows);
    // for (let i = this.minValue; i < this.maxValue; i++) {
    //   lastDataColumn[i] = this.lastDataColumn[i];
    // }

    // for (let i = this.minValue; i < this.maxValue; i++) {
    //   firstDataColumn[i] = this.firstDataColumn[i];
    // }

    console.log("MIN AND MAX", this.minValue, this.maxValue, this.totalRows);
    for (let i = 70; i < 120; i++) {
      lastDataColumn[i] = this.lastDataColumn[i];
    }

    for (let i = 70; i < 120; i++) {
      firstDataColumn[i] = this.firstDataColumn[i];
    }
    // setTimeout{}
    this.doughnutChartLabels = firstDataColumn;
    this.doughnutChartData = lastDataColumn;
    this.pieChartData = lastDataColumn;
    this.pieChartLabels = firstDataColumn;
    this.lineChartData = lastDataColumn;
    this.lineChartLabels = firstDataColumn;
    console.log(this.doughnutChartLabels);
    console.log(this.doughnutChartData);

    // let firstDataColumn: any = [];
    // let lastDataColumn: any = [];
    // if (name === "previous") {
    // } else if (name === "next") {
    //   console.log("MIN AND MAX", this.minValue,this.maxValue);
    //   if (this.minValue >= 0 && this.maxValue < 50) {
    //     console.log("1");

    //     this.minValue = 25;
    //     this.maxValue = 50;
    //   }
    // else if (this.maxValue > 49) {
    //   console.log("2");
    //   this.minValue = 50;
    //   this.maxValue = 100;
    // } else if (this.maxValue > 99) {
    //   this.minValue = 100;
    //   this.maxValue = 150;
    // } else if (this.maxValue > 149) {
    //   this.minValue = 150;
    //   this.maxValue = 199;
    // }
    // console.log("MIN AND MAX", this.minValue,this.maxValue);
    // for (let i = this.minValue; i < this.maxValue; i++) {
    //   lastDataColumn[i] = this.lastDataColumn[i];
    // }

    // for (let i = this.minValue; i < this.maxValue; i++) {
    //   firstDataColumn[i] = this.firstDataColumn[i];
    // }
    // this.doughnutChartLabels = firstDataColumn;
    // this.doughnutChartData = lastDataColumn;
    // this.pieChartData = lastDataColumn;
    // this.pieChartLabels = firstDataColumn;
    // this.lineChartData = lastDataColumn;
    // this.lineChartLabels = firstDataColumn;
    // console.log(this.doughnutChartLabels);
    // console.log(this.doughnutChartData);
    // }
  }
  assignChartData() {
    let firstDataColumn: any = [];
    let lastDataColumn: any = [];
    if (this.totalRows >= 25) {
      console.log("here 1");

      this.minValue = 0;
      this.maxValue = 25;
    } else {
      this.minValue = 0;
      this.maxValue = this.totalRows - 1;
    }

    console.log("MIN AND MAX", this.minValue, this.maxValue, this.totalRows);
    for (let i = 0; i < 50; i++) {
      lastDataColumn[i] = this.lastDataColumn[i];
    }

    for (let i = 0; i < 50; i++) {
      firstDataColumn[i] = this.firstDataColumn[i];
    }

    // for (let i = this.minValue; i < this.maxValue; i++) {
    //   lastDataColumn[i] = this.lastDataColumn[i];
    // }

    // for (let i = this.minValue; i < this.maxValue; i++) {
    //   firstDataColumn[i] = this.firstDataColumn[i];
    // }
    this.doughnutChartLabels = firstDataColumn;
    this.doughnutChartData = lastDataColumn;
    this.pieChartData = lastDataColumn;
    this.pieChartLabels = firstDataColumn;
    this.lineChartData = lastDataColumn;
    this.lineChartLabels = firstDataColumn;
    console.log(this.doughnutChartLabels);
    console.log(this.doughnutChartData);
    console.log(this.maxValue, this.minValue, this.totalRows);
  }
}
