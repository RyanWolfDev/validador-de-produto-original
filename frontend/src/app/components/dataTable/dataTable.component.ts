import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
} from "@angular/core";

@Component({
  selector: "data-table",
  moduleId: module.id,
  templateUrl: "dataTable.component.html",
})
export class DataTableComponent implements OnChanges {
  @Input() dataTable: any;
  @Input() dataTableHead: string[];
  @Input() dataTableProperties: Object[];
  @Input() pageSizeOptions: number[];
  @Input() isClickable: boolean;
  @Output("onChangedPage") onChangedPage: EventEmitter<any> = new EventEmitter();
  @Output("onChangedPageSize") onChangedPageSize: EventEmitter<any> = new EventEmitter();
  @Output("onChangeBooleanValue") onChangeBooleanValue: EventEmitter<any> = new EventEmitter();
  @Output("onRowChange") onRowChange: EventEmitter<any> = new EventEmitter();
  @Output("getDetail") getDetail: EventEmitter<any> = new EventEmitter();

  isCheckAllChecked: boolean = false;

  ngOnChanges() {
    this.isCheckAllChecked = false;
    if (this.isClickable == null) {
      this.isClickable = true;
    }
  }

  onRowChecked(index) {
    this.dataTable.result[index].isChecked = !this.dataTable.result[index].isChecked;
  }

  onCheckAllRows() {
    this.isCheckAllChecked = !this.isCheckAllChecked;
    this.dataTable.result.forEach((value, index) => {
      value.isChecked = !value.isChecked;
    });
  }
}
