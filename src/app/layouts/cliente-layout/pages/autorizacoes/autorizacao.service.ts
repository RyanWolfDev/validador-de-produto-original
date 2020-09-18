import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { AppService } from "../../../../app.service";
import { Autorizacao } from "./autorizacao.model";


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
}
