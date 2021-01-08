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
        this.backendData = data;
        console.log(this.backendData);

        // var obj = JSON.parse(this.backendData);
        // console.log('Backend Data Json parse: ', this.backendData[0]);
      },
      (error) => {
        console.log("No Data Found of Visualization" + error);
      }
    );
  }
}
