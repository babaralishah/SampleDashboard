import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestService } from 'src/app/Services/rest.service';
import { FileholderService } from 'src/app/Services/fileholder.service';
@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {
  name1:any;
  name2:any;
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
  public doughnutChartData : any[] = [];
  public doughnutChartType = 'doughnut';

  public lineChartLabels : any[] = [];
  public lineChartData : any[] = [];
  public lineChartType = 'line';
  public lineChartLegend = true;

  public polarChartLabels : any[] = [];
  public polarChartData : any[] = [];
  public polarChartType = 'polar';
  public polarChartLegend = true;

  public bubbleChartLabels : any[] = [];
  public bubbleChartData : any[] = [];
  public bubbleChartType = 'bubble';
  public bubbleChartLegend = true;

  public barChartLabels : any[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData : any[] = [];

  public pieChartLabels : any[] = [];
  public pieChartData : any[] = [];
  public pieChartType = 'pie';

  public radarChartLabels : any[] = [];
  public radarChartData : any[] = [];
  public radarChartType = 'radar';
  lastColumn: any;
  data: any;

  constructor(private formBuilder: FormBuilder,
    // private FileholderService: FileholderService,
              private restservice: RestService) { }

  ngOnInit(): void {
    this.loadVisualzeData();
  }
  // tslint:disable-next-line: typedef
  loadVisualzeData() {
    this.restservice.readResults()
      .subscribe
      (data => {
        this.backendData = data;
        // var obj = JSON.parse(this.backendData);
        // console.log('Backend Data Json parse: ', this.backendData[0]);
      },
        (error) => {
          console.log('No Data Found of Visualization' + error);
        }
      );

  }

  // tslint:disable-next-line: typedef
  setName1(name:any){
    this.name1 = name;
  }
  // tslint:disable-next-line: typedef
  setName2(name:any){
    this.name2 = name;
  }
  // tslint:disable-next-line: typedef
  checkChart(chart:any) {
    console.log(chart);
    this.chartname = chart;
  }
  // tslint:disable-next-line: typedef
  sendData() {
    console.log('Calling send data');
    // console.log(this.name1, this.name2);
    this.restservice.readResults2({name1: this.name1, name2: this.name2}).subscribe((data: any) => {
      // console.log('data 0: ', data[0]);
      // console.log('data 1: ', data[1]);
      // console.log('data 2: ', data[2]);
      const object1 = JSON.parse(data[1]);
      const object2 = JSON.parse(data[2]);
      const arr1: any[] = [];
      const arr2 = [];
      this.chartname = 'bar';

      let count = 0;
      // tslint:disable-next-line: forin
      for (const property in Object.values(object1)) {
        const obj = { cat: null, length: 0, avg: 0 };
        if (!arr1.includes(object1[property])) {
          arr1.push(object1[property]);
          obj.cat = object1[property];
          obj.length++;
          obj.avg = object2[property];
          arr2.push(obj);
        } else {
          // tslint:disable-next-line: no-shadowed-variable
          for (const arr of arr2) {
            // tslint:disable-next-line: triple-equals
            if (arr.cat == object1[property]) {
              const sum = arr.avg * arr.length + object2[property];
              arr.length++;
              arr.avg = sum / arr.length;
            }
          }
        }
        count++;
      }

      const arr = data[0].split('\n');
      // tslint:disable-next-line: one-variable-per-declaration
      const catArr: any[] = [], lengthArr: any[] = [], avgArr: any[] = [];
      arr.forEach((element: string) => {
        const dataSplit = element.split(' ');

        catArr.push(dataSplit[0]);
        lengthArr.push(dataSplit[dataSplit.length - 1]);
      });
      arr2.forEach(element => {
        if (avgArr.length >= 10) {
          return;
        }
        avgArr.push(element.avg);
      });
      console.log(catArr);
      console.log(lengthArr);
      console.log(avgArr);

      setTimeout(() => {
        const labels = [];
        const complexArr = [];
        for (let i = 0; i < lengthArr.length; i++) {
          if (i >= 10) {
            break;
          }
          const label = catArr[i] + ' - ' + lengthArr[i];
          labels.push(label);

          const innerData = { data: [], label: catArr[i] };
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < lengthArr.length; j++) {
            // innerData.data.push(0);
          }
          // innerData.data.splice(i, 1, avgArr[i]);
          complexArr.push(innerData);
        }
        // console.log(complexArr);
        console.log('\nlets assign the values\n');
        // console.log(avgArr);
        // console.log(labels);
        // console.log(complexArr);
        this.doughnutChartLabels = labels;
        this.doughnutChartData = avgArr;

        this.lineChartLabels = labels;
        this.lineChartData = avgArr;

        this.polarChartLabels = labels;
        this.polarChartData = avgArr;

        this.bubbleChartLabels = labels;
        this.bubbleChartData = complexArr;

        this.pieChartLabels = labels;
        this.pieChartData = avgArr;

        this.barChartLabels = labels;
        this.barChartData = complexArr;

        this.radarChartLabels = labels;
        this.radarChartData = complexArr;
        // this.barChartData = labels;
        console.log('\nDone\n');
      });
    });

  }
}