import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { DataTableComponent } from "./dataTable.component";

@NgModule({
    imports: [CommonModule],
    declarations: [DataTableComponent],
    exports: [DataTableComponent],
})
export class DataTableModule { }
