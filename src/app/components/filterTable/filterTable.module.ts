import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FilterTableComponent } from "./filterTable.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [FilterTableComponent],
    exports: [FilterTableComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilterTableModule { }
