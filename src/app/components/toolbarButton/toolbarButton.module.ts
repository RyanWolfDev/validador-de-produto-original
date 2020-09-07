import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { ToolbarButtonComponent } from "./toolbarButton.component";

@NgModule({
    imports: [CommonModule],
    declarations: [ToolbarButtonComponent],
    exports: [ToolbarButtonComponent],
})
export class ToolbarButtonModule { }
