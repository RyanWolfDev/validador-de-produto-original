import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { Cliente } from "./cliente.model";

import { AppService } from "../../../../app.service";
import { AuthClienteService } from "../../auth/auth-cliente.service";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: "root",
})
export class ClienteService {
    private data: Cliente[] = [];

    constructor(
        private http: HttpClient,
        private router: Router,
        private appService: AppService,
        private authClienteService: AuthClienteService,
        private toastr: ToastrService
    ) { }


    save(cliente: Cliente) {
        this.http
            .post<Cliente>(`${this.appService.getApiUrl()}/cliente/cadastrar`, cliente)
            .subscribe((responseData) => {
                this.authClienteService.login(cliente);
            });
    }

    update(cliente: Cliente) {
        this.http
            .put<{ message: string, result: Cliente }>(`${this.appService.getApiUrl()}/cliente/${cliente.id}`, cliente)
            .subscribe((response) => {
                this.toastr.success(
                    '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message">' +
                    response.message +
                    "</span>",
                    "",
                    {
                        timeOut: 4000,
                        enableHtml: true,
                        closeButton: true,
                        toastClass: "alert alert-success alert-with-icon",
                        positionClass: "toast-top-right",
                    }
                );
            });
    }

    getById(id: number) {
        return this.http.get<{ message: string, result: Cliente }>(`${this.appService.getApiUrl()}/cliente/${id}`);
    }

}
