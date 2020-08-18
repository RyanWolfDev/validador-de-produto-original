import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Produto } from "./produto.model";
import { DataTable } from "../../../../components/dataTable/dataTable.model";

import { AppService } from "../../../../app.service";


@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    private data: Produto[] = [];
    private dataUpdated = new Subject<DataTable>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private appService: AppService
    ) { }

    getAll(pageSize: number, currentPage: number, filterSeach: string = "") {
        const queryParams = `?limit=${pageSize}&page=${currentPage}&filterSearch=${filterSeach}`;
        this.http
            .get<DataTable>(this.appService.getApiUrl() + "/produto" + queryParams)
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

    save(produto: Produto) {
        this.http
            .post<Produto>(`${this.appService.getApiUrl()}/produto`, produto)
            .subscribe((responseData) => {
                console.log(responseData);
                this.router.navigate(["/admin/produto"]);
            });
    }

    update(produto: Produto) {
        this.http
            .put(`${this.appService.getApiUrl()}/produto/${produto.id}`, produto)
            .subscribe((response) => {
                console.log(response);
                this.router.navigate(["/admin/produto"]);
            });
    }

    getById(id: number) {
        return this.http.get<{ message: string, result: Produto }>(`${this.appService.getApiUrl()}/produto/${id}`);
    }

    delete(id: number) {
        return this.http.delete(`${this.appService.getApiUrl()}/produto/${id}`);
    }

    getDataUpdatedListener() {
        return this.dataUpdated.asObservable();
    }
}