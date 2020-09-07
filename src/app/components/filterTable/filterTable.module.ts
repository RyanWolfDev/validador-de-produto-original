import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FilterTableComponent } from "./filterTable.component";

@NgModule({
    imports: [CommonModule],
    declarations: [FilterTableComponent],
    exports: [FilterTableComponent]
})
export class FilterTableModule { }
