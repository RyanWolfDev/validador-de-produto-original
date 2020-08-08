//Angular
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs"; 

//Services
import { ConfirmDialogService } from "../../../components/confirm-dialog/confirm-dialog.service";
import { ClienteService } from "../cliente.service";

//Models
import { ToolbarButton } from "../../../models/toolbarButton.model";
import { DataTable } from "../../../models/dataTable.model";
import { Cliente } from "../cliente.model";

@Component({
    selector: "cliente-list",
    moduleId: module.id,
    templateUrl: "list.component.html",
})
export class ClienteListComponent implements OnInit, OnDestroy {
    //Pagination
    pageSizeOptions = [10, 25, 50, 100];

    //DataTable
    dataTableHead: string[] = [
        "Id",
        "Nome",
        "E-mail",
        "Alterado em",
        "Atualizado em",
        "Ativo",
    ];

    dataTableProperties: Object[] = [
        {
            name: "id",
            type: "text",
        },
        {
            name: "nome",
            type: "text",
        },
        {
            name: "email",
            type: "text",
        },
        {
            name: "createdAt",
            type: "date",
        },
        {
            name: "updatedAt",
            type: "date",
        },
        {
            name: "ativo",
            type: "boolean",
        },
    ];

    dataTable: DataTable = {
        count: 0,
        currentPage: 1,
        pageSize: this.pageSizeOptions[0],
        message: "",
        result: [],
    };

    //Toolbar Buttons
    toolbarButtons: ToolbarButton[] = [
        {
            name: "Exportar CSV",
            colorClass: "warning",
            iconClass: "nc-icon nc-cloud-download-93",
            size: 4,
            function: () => {
                this.exportToCSV();
            },
        },
    ];

    filterText: string;
    rowsChecked: Cliente[];
    private dataSub: Subscription;

    constructor(
        public clienteService: ClienteService,
        private router: Router,
        private confirmDialogService: ConfirmDialogService
    ) { }

    ngOnInit() {
        this.getClientes(this.dataTable.pageSize, this.dataTable.currentPage);
    }

    getClientes(
        pageSize: number,
        currentPage: number,
        filterSearch = this.filterText
    ) {
        this.clienteService.getAll(pageSize, currentPage, filterSearch);
        this.dataSub = this.clienteService
            .getDataUpdatedListener()
            .subscribe((response: DataTable) => {
                this.dataTable = response;
            });
    }

    onChangedPage(page) {
        this.dataTable.currentPage = page;
        this.getClientes(this.dataTable.pageSize, page);
    }

    onChangedPageSize(pageSize) {
        this.dataTable.pageSize = pageSize;
        this.getClientes(pageSize, this.dataTable.currentPage);
    }

    filterSearch(filterSearch) {
        this.filterText = filterSearch;
        this.getClientes(
            this.dataTable.pageSize,
            this.dataTable.currentPage,
            filterSearch
        );
    }

    onChangeBooleanValue(data) {
        data.ativo = !data.ativo;
        this.showDialog(data, "Você tem certeza disso?");
    }

    getCheckedRows() {
        return this.dataTable.result.filter((value, index, array) => {
            return value.isChecked === true;
        });
    }

    showDialog(data, message) {
        this.confirmDialogService.confirmThis(
            message,
            () => {
                this.clienteService.update(data);
            },
            () => {
                data.ativo = !data.ativo;
                return;
            }
        );
    }

    exportToCSV() {
        this.clienteService.exportCSV()
            .subscribe(data => this.downloadFile(data)),//console.log(data),
            error => console.log('Error downloading the file.'),
            () => console.info('OK');
    }

    downloadFile(data) {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    ngOnDestroy() {
        this.dataSub.unsubscribe();
    }
}
