
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Autorizacao } from "./autorizacao.model";

import { DataTable } from "../../../../components/dataTable/dataTable.model";

import { AppService } from "../../../../app.service";

@Injectable({
    providedIn: "root",
})
export class AutorizacaoService {
    private data: Autorizacao[] = [];
    private dataUpdated = new Subject<DataTable>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private appService: AppService
    ) { }

    getAll(pageSize: number, currentPage: number, cliente_id: number = 0) {
        const queryParams = `?limit=${pageSize}&page=${currentPage}&cliente_id=${cliente_id}`;
        this.http
            .get<DataTable>(this.appService.getApiUrl() + "/autorizacao/adm" + queryParams)
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

    getById(id: number) {
        return this.http.get<{ message: string, result: Autorizacao }>(`${this.appService.getApiUrl()}/adm/${id}`);
    }

    getDataUpdatedListener() {
        return this.dataUpdated.asObservable();
    }
}
