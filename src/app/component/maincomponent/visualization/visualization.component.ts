import { Component, OnInit } from "@angular/core";
import { RestService } from "src/app/Services/rest.service";
@Component({
  selector: "app-visualization",
  templateUrl: "./visualization.component.html",
  styleUrls: ["./visualization.component.css"],
})
export class VisualizationComponent implements OnInit {
  name1: any;
  yearsOfPrediction = [
    { year: "5" },
    { year: "10" },
    { year: "15" },
    { year: "20" },
  ];
  // chartForm: FormGroup;
  chartname: any;
  chart: any;
  pie: any;
  doughnut: any;
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  backendData: any;
  public doughnutChartLabels: any[] = [2010, 2011, 2012, 2013];
  public doughnutChartData: any[] = [
    "James Burrows",
    "James Burrows",
    "James Burrows",
  ];
  public doughnutChartType = "doughnut";

  public lineChartLabels: any[] = [2010, 2011, 2012, 2013];
  public lineChartData: any[] = [
    "James Burrows",
    "James Burrows",
    "James Burrows",
  ];
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

  public pieChartLabels: any[] = [2010, 2011];
  public pieChartData: any[] = [5, 12, 14, "pie"];
  public pieChartType = "pie";

  public radarChartLabels: any[] = [2010, 2011, 2012, 2013];
  public radarChartData: any[] = [5, 12, 14, 72];
  public radarChartType = "radar";
  lastColumn: any;
  data: any;
  firstDataColumn: any = [];
  lastDataColumn: any = [];

  constructor(private restservice: RestService) {}

  ngOnInit(): void {
    this.loadVisualzeData();
    this.getFirstColumn();
    // this.predictedFiles();
  }
  // predictedFiles() {
  //   this.restservice.predictedFiles().subscribe((data) => {
  //     console.log(data);
  //   });
  // }
  loadVisualzeData() {
    this.restservice.columnsName().subscribe(
      (data: any) => {
        this.backendData = data;
        console.log(this.backendData);
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
    });
  }
  setName1(name: any) {
    console.log(name);

    this.name1 = name;
  }
  checkChart(chart: any) {
    console.log(chart);
    this.chartname = chart;
  }
  sendData() {
    let firstDataColumn: any = [];
    let lastDataColumn: any = [];
    this.restservice
      .dataFileDetail({ name1: this.name1 })
      .subscribe((data: any) => {
        console.log(data);
        this.lastDataColumn = data;
        for (let i = 0; i < 30; i++) {
          lastDataColumn[i] = this.lastDataColumn[i];
        }
        console.log(lastDataColumn);
        
        for (let i = 0; i < 30; i++) {
          firstDataColumn[i] = this.firstDataColumn[i];
        }
        console.log(firstDataColumn);
        
        this.doughnutChartLabels = firstDataColumn;
        this.doughnutChartData = lastDataColumn;
        this.pieChartData = lastDataColumn;
        this.pieChartLabels = firstDataColumn;
        this.lineChartData = lastDataColumn
        this.lineChartLabels = firstDataColumn
        // console.log(this.doughnutChartLabels);
        // console.log(this.doughnutChartData);
      });
  }
}
