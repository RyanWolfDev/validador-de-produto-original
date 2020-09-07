import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ToolbarButtonComponent } from "./toolbarButton.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [ToolbarButtonComponent],
    exports: [ToolbarButtonComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToolbarButtonModule { }
