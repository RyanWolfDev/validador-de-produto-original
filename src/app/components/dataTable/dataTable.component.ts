import { Component, Input, Output, EventEmitter } from "@angular/core";
import { AdmResponse } from "../../models/adm.model";

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

}
