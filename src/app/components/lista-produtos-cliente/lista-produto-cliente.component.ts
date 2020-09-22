import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Autorizacao } from "../../layouts/cliente-layout/pages/autorizacoes/autorizacao.model";

@Component({
    selector: "lista-produto-cliente",
    moduleId: module.id,
    templateUrl: "./lista-produto-cliente.component.html",
    styleUrls: ['./lista-produto-cliente.component.scss']
})

export class ListaProdutoClienteComponent implements OnInit {

    @Input() autorizacoes: Autorizacao[] = [];
    @Input() listData: any;
    @Output("onChangedPage") onChangedPage: EventEmitter<any> = new EventEmitter();
    @Output("onChangedPageSize") onChangedPageSize: EventEmitter<any> = new EventEmitter();
    @Output("onDeleteAutorizacao") onDeleteAutorizacao: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit() {

    }
}