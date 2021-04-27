import { Component, OnInit } from "@angular/core";
import { ConfirmDialogService } from "../../../../../components/confirm-dialog/confirm-dialog.service";
import { Autorizacao, AutorizacaoResponse } from "../autorizacao.model";
import { AutorizacaoService } from "../autorizacao.service";

@Component({
    selector: "autorizacao-list",
    moduleId: module.id,
    templateUrl: './list.component.html'
})
export class AutorizacaoListClienteComponent implements OnInit {

    listData: AutorizacaoResponse = {
        count: 0,
        currentPage: 1,
        pageSize: 10,
        message: "",
        result: [],
    };

    constructor(
        private autorizacaoService: AutorizacaoService,
        private confirmDialogService: ConfirmDialogService
    ) { }

    ngOnInit() {
        this.getAll(this.listData.pageSize, this.listData.currentPage);
    }

    getAll(pageSize: number,
        currentPage: number,) {
        this.autorizacaoService.getAll(pageSize, currentPage).subscribe((response) => {
            this.listData = response;
        })
    }

    onChangedPage(page) {
        this.listData.currentPage = page;
        this.getAll(this.listData.pageSize, page);
    }

    onChangedPageSize(pageSize) {
        this.listData.pageSize = pageSize;
        this.getAll(pageSize, this.listData.currentPage);
    }

    onDeleteAutorizacao(autorizacaoId: number) {
        this.autorizacaoService.delete(autorizacaoId).subscribe(response => {
            this.getAll(this.listData.pageSize, this.listData.currentPage);
        })
    }

    showDialog(data, message) {

        this.confirmDialogService.confirmThis(
            message,
            () => {
                this.onDeleteAutorizacao(data);

            },
            () => {
                return;
            }
        );
    }
}