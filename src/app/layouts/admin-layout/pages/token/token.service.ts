import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, filter } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Token } from "./token.model";
import { DataTable } from "../../../../components/dataTable/dataTable.model";

import { AppService } from "../../../../app.service";


@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private data: Token[] = [];
    private dataUpdated = new Subject<DataTable>();

    constructor(
        private http: HttpClient,
        private router: Router,
        private appService: AppService
    ) { }

    getAll(pageSize: number, currentPage: number, filterSeach: string = "", produto_id: number = 0) {

        let queryParams = '';

        if (produto_id) {
            queryParams = `?limit=${pageSize}&page=${currentPage}&produto_id=${produto_id}`
        } else {
            queryParams = `?limit=${pageSize}&page=${currentPage}&filterSearch=${filterSeach}`;
        }

        this.http
            .get<DataTable>(this.appService.getApiUrl() + "/token" + queryParams)
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

    save(tokenForm: { quantidade: number, produto_id: number }) {
        return this.http
            .post<{ message: string, tokensCreated: number, result: Token[] }>(`${this.appService.getApiUrl()}/token`, tokenForm)
    }

    update(token: Token) {
        this.http
            .put(`${this.appService.getApiUrl()}/token/${token.id}`, token)
            .subscribe((response) => {
                console.log(response);
                this.router.navigate(["/admin/token"]);
            });
    }

    getById(id: number) {
        return this.http.get<{ message: string, result: Token }>(`${this.appService.getApiUrl()}/token/${id}`);
    }

    delete(id: number) {
        return this.http.delete(`${this.appService.getApiUrl()}/token/${id}`);
    }

    getDataUpdatedListener() {
        return this.dataUpdated.asObservable();
    }
}