//Angular
import { Component, OnInit } from '@angular/core';

//Models
import { Cliente } from '../cliente.model';
import { DataTable } from '../../../../../components/dataTable/dataTable.model';

//Services
import { ClienteService } from '../cliente.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'cliente-detailed',
    moduleId: module.id,
    templateUrl: 'cliente-detailed.component.html'
})

export class ClienteDetailedComponent implements OnInit {

    cliente: Cliente;
    pageTitle: string = '';

    //Pagination
    pageSizeOptions = [10, 25, 50, 100];

    //DataTable
    dataTableHead: string[] = [
        "Id",
        "Criado em",
        "Token",
        "Produto",
        "Produto SKU",
        "Produto Imagem",
    ];

    isClickable = false;

    dataTableProperties: Object[] = [
        {
            name: "id",
            type: "text",
        },
        {
            name: "createdAt",
            type: "date",
        },
        {
            name: "autorizacao_token",
            type: "text",
        },
        {
            name: "produto_descricao",
            type: "text",
        },
        {
            name: "produto_sku",
            type: "text",
        },
        {
            name: "produto_imagemUrl",
            type: "text",
        },
    ];

    dataTable: DataTable = {
        count: 0,
        currentPage: 1,
        pageSize: this.pageSizeOptions[0],
        message: "",
        result: [],
    };

    constructor(
        private clienteService: ClienteService,
        public route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.loadCliente();
    }

    loadCliente() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            const param = paramMap.get("id");
            this.clienteService.getById(param).subscribe(response => {
                this.cliente = response.result;
                this.pageTitle = `${this.cliente.nome}`;
                this.loadAutorizacoes();
            });
        })
    }

    loadAutorizacoes() {
        this.cliente.autorizacoes.forEach((value, index) => {
            const autorizacaoToShowInTable = {
                id: value.id,
                createdAt: value.createdAt,
                autorizacao_token: value.token.token,
                produto_descricao: value.token.produto.descricao,
                produto_sku: value.token.produto.sku,
                produto_imagemUrl: value.token.produto.imagemUrl
            }

            this.dataTable.result.push(autorizacaoToShowInTable);
        })
    }
}

