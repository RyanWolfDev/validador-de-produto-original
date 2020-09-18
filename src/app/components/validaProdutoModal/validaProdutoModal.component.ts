import { Component, Input } from "@angular/core";
import { Autorizacao } from "../../layouts/cliente-layout/pages/autorizacoes/autorizacao.model";


@Component({
    selector: "valida-produto-modal",
    templateUrl: "./validaProdutoModal.component.html",
    styleUrls: ["./validaProdutoModal.component.scss"],
})
export class ValidaProdutoModalComponent {

    @Input() autorizacao: Autorizacao;

    constructor() { }

    ngOnInit() {
    }

    onCloseModal() {
        this.autorizacao = null;
    }
}
