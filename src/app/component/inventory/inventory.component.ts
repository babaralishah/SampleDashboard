import * as XLSX from "xlsx";
import { JSON2SheetOpts } from "xlsx";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
  //   const : XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(, , "All Data Export");
  //   XLSX.writeFile(, "Inventory.xlsx");
  // }
}
