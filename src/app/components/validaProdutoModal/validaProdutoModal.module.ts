import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ValidaProdutoModalComponent } from "./validaProdutoModal.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ValidaProdutoModalComponent],
    exports: [ValidaProdutoModalComponent],
})
export class ValidaProdutoModalComponentModule { }
