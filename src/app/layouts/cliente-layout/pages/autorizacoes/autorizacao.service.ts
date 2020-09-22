import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { AppService } from "../../../../app.service";
import { Autorizacao, AutorizacaoResponse } from "./autorizacao.model";


@Injectable({
    providedIn: "root",
})
export class AutorizacaoService {

    constructor(
        private http: HttpClient,
        private router: Router,
        private appService: AppService,
    ) { }

    checkAndSave(token: string) {
        return this.http.post<Autorizacao>(`${this.appService.getApiUrl()}/autorizacao`, token);
    }

    getAll(pageSize: number, currentPage: number, filterSeach: string = "") {
        const queryParams = `?limit=${pageSize}&page=${currentPage}&filterSearch=${filterSeach}`;

        return this.http.get<AutorizacaoResponse>(`${this.appService.getApiUrl()}/autorizacao${queryParams}`);
    }

    delete(id: number) {
        return this.http.delete(`${this.appService.getApiUrl()}/autorizacao/${id}`);
    }
}
