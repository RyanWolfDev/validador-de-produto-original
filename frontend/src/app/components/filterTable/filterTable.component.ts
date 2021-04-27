import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "filter-table",
  moduleId: module.id,
  templateUrl: "filterTable.component.html",
})
export class FilterTableComponent {
  @Output() onSearch: EventEmitter<any> = new EventEmitter();

  filterTableValue: string = "";

  onKeydown(event) {
    this.search();
  }

  search() {
    this.onSearch.emit(this.filterTableValue);
  }
}
