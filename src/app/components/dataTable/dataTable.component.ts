import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { AdmResponse } from "../../models/adm.model";
import { data } from "jquery";

@Component({
  selector: "data-table",
  moduleId: module.id,
  templateUrl: "dataTable.component.html",
})
export class DataTableComponent {
  @Input() dataTable: AdmResponse;
  @Input() dataTableHead: string[];
  @Input() dataTableProperties: Object[];
  @Input() pageSizeOptions: number[];
  @Output("onChangedPage") onChangedPage: EventEmitter<
    any
  > = new EventEmitter();
  @Output("onChangedPageSize") onChangedPageSize: EventEmitter<
    any
  > = new EventEmitter();
  @Output("onChangeBooleanValue") onChangeBooleanValue: EventEmitter<
    any
  > = new EventEmitter();
  @Output("onRowChange") onRowChange: EventEmitter<any> = new EventEmitter();

  onRowChecked(index) {
    this.dataTable.result[index].isChecked = !this.dataTable.result[index]
      .isChecked;
    this.onRowChange.emit(index);
  }

  onCheckAllRows() {
    this.dataTable.result.forEach((value, index) => {
      value.isChecked = !value.isChecked;
    });
  }
}
