import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ListaProdutoClienteComponent } from "./lista-produto-cliente.component";

@NgModule({
    imports: [CommonModule, NgbModule],
    declarations: [ListaProdutoClienteComponent],
    exports: [ListaProdutoClienteComponent],
})
export class ListaProdutoClienteModule { }