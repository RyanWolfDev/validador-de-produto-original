//Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

//Models
import { Cliente } from '../cliente.model';
import { DataTable } from '../../../../../components/dataTable/dataTable.model';

//Services
import { ClienteService } from '../cliente.service';
import { AutorizacaoService } from '../../autorizacao/autorizacao.service';


@Component({
    selector: 'cliente-detailed',
    moduleId: module.id,
    templateUrl: 'cliente-detailed.component.html'
})

export class ClienteDetailedComponent implements OnInit, OnDestroy {

    cliente: Cliente;
    private dataSub: Subscription;
    pageTitle = "Cliente"

    //Pagination
    pageSizeOptions = [10, 25, 50, 100];

    //Autorizacao DataTable
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
            name: "Visualizar Imagem",
            type: "link",
            link: "produto_imagemUrl",
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
        private autorizacaoService: AutorizacaoService
    ) { }

    ngOnInit() {
        this.loadCliente();
    }

    loadCliente() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            const param = paramMap.get("id");
            this.clienteService.getById(param).subscribe(response => {
                this.cliente = response.result;
                this.getAutorizacoes();
            });
        })
    }

    getAutorizacoes() {

        this.autorizacaoService.getAll(this.dataTable.pageSize, this.dataTable.currentPage, this.cliente.id);

        this.dataSub = this.autorizacaoService
            .getDataUpdatedListener()
            .subscribe((response: DataTable) => {
                this.dataTable.count = response.count;
                this.dataTable.currentPage = response.currentPage;
                this.dataTable.message = response.message;
                this.dataTable.pageSize = response.pageSize;

                //Monto o objeto de result da forma correta para mostrar no dataTable
                response.result.forEach((value, index) => {
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
            });
    }

    onCancel() {
        this.router.navigate(["/admin/cliente"]);
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
}

