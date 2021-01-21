import * as XLSX from "xlsx";
import { JSON2SheetOpts } from "xlsx";
import { Component, OnInit } from "@angular/core";
import { RestService } from "src/app/Services/rest.service";
import { FileholderService } from "src/app/Services/fileholder.service";

@Component({
  selector: "app-agent",
  templateUrl: "./agent.component.html",
  styleUrls: ["./agent.component.css"],
})
export class AgentComponent implements OnInit {
  backendData: any;
  data: any;
  backendData2: any;

  constructor(
    private FileholderService: FileholderService,
    private restservice: RestService
  ) {}

  ngOnInit(): void {
    this.loadVisualzeData();
  }
  loadVisualzeData() {
    this.restservice.columnsName().subscribe(
      (data) => {
        this.data = data;
        this.backendData = this.data[0];
        this.backendData2 = this.data[1];
        console.log(this.backendData);
        console.log(this.backendData2);
        // var obj = JSON.parse(this.backendData);
        // console.log('Backend Data Json parse: ', this.backendData[0]);
      },
      (error) => {
        console.log("No Data Found of Visualization" + error);
      }
    );
  
  }
  // exportTOExcel() {
  //   let : JSON2SheetOpts = { header: [] };
  //   const : XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.user, );

  //   var  = [
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //     { wch: 30 },
  //   ];

  //   ["!cols"] = ;
  //   ["!cols"][0] = { hidden: true };
  //   ["!cols"][1] = { hidden: true };
  //   ["!cols"][2] = { hidden: true };
  //   ["!cols"][3] = { hidden: true };
  //   ["!cols"][4] = { hidden: true };

  //   ["!cols"][7] = { hidden: true };
  //   ["!cols"][21] = { hidden: true };
  //   ["!cols"][22] = { hidden: true };
  //   const : XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(, , "All Data Export");
  //   XLSX.writeFile(, "Inventory.xlsx");
  // }
}
