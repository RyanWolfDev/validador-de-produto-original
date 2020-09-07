import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { CommonModule } from "@angular/common";
import { DataTableComponent } from "./dataTable.component";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [CommonModule, FormsModule, NgbModule],
    declarations: [DataTableComponent],
    exports: [DataTableComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DataTableModule { }
