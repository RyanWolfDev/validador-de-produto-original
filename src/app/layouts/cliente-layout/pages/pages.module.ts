import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { PagesClienteRoutes } from "./pages.routing";
import { ValidarProdutoClienteComponent } from "./validarProduto/validarProduto.component";
import { ClienteProfileComponent } from "./cliente/profile/profile.component";
import { ValidaProdutoModalComponentModule } from "../../../components/validaProdutoModal/validaProdutoModal.module";
import { AutorizacaoListClienteComponent } from "./autorizacoes/list/list.component";
import { ListaProdutoClienteModule } from "../../../components/lista-produtos-cliente/lista-produto-cliente.module";
import { ConfirmDialogModule } from "../../../components/confirm-dialog/confirm-dialog.module";

@NgModule({
    imports: [
        RouterModule.forChild(PagesClienteRoutes),
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        ValidaProdutoModalComponentModule,
        ListaProdutoClienteModule,
        ConfirmDialogModule
    ],
    declarations: [ValidarProdutoClienteComponent, ClienteProfileComponent, AutorizacaoListClienteComponent],
})
export class PagesClienteModule { }
