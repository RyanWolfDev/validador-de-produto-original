import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { PagesClienteRoutes } from "./pages.routing";
import { ValidarProdutoClienteComponent } from "./validarProduto/validarProduto.component";
import { ClienteProfileComponent } from "./cliente/profile/profile.component";

@NgModule({
    imports: [
        RouterModule.forChild(PagesClienteRoutes),
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
    ],
    declarations: [ValidarProdutoClienteComponent, ClienteProfileComponent],
})
export class PagesClienteModule { }
