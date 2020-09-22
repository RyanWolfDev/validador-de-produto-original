import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Cliente } from "../cliente/cliente.model";
import { DataTable } from "../../../../components/dataTable/dataTable.model";

import { AppService } from "../../../../app.service";

@Injectable({
    providedIn: "root",
})
export class ClienteService {
    private data: Cliente[] = [];
    private dataUpdated = new Subject<DataTable>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private appService: AppService
    ) { }

    getAll(pageSize: number, currentPage: number, filterSeach: string = "") {
        const queryParams = `?limit=${pageSize}&page=${currentPage}&filterSearch=${filterSeach}`;
        this.http
            .get<DataTable>(this.appService.getApiUrl() + "/cliente" + queryParams)
            .pipe(
                map((response) => {
                    return response;
                })
            )
            .subscribe((transformedData) => {
                this.data = transformedData.result;
                this.dataUpdated.next({
                    result: [...this.data],
                    message: transformedData.message,
                    count: transformedData.count,
                    currentPage: transformedData.currentPage,
                    pageSize: transformedData.pageSize,
                });
            });
    }

    update(cliente: Cliente) {
        this.http
            .put(`${this.appService.getApiUrl()}/cliente/${cliente.id}/admUpdate`, cliente)
            .subscribe((response) => {
                this.router.navigate(["/admin/cliente"]);
            });
    }

    getById(id: string) {
        return this.http.get<{ message: string, result: Cliente }>(`${this.appService.getApiUrl()}/cliente/detail/${id}`);
    }

    delete(id: number) {
        return this.http.delete(`${this.appService.getApiUrl()}/cliente/${id}`);
    }

    exportCSV() {
        return this.http.get(`${this.appService.getApiUrl()}/cliente/csv`);
    }

    getDataUpdatedListener() {
        return this.dataUpdated.asObservable();
    }
}
