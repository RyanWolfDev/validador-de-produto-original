import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { ClienteLogin, ClienteLoginResponse } from "./auth-cliente.model";
import { AppService } from "../../../app.service";
import { Cliente } from "./auth-cliente.model";

@Injectable({
    providedIn: "root",
})
export class AuthClienteService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();
    private userId: number;

    constructor(
        private http: HttpClient,
        private router: Router,
        private appService: AppService
    ) { }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    login(clienteLogin: ClienteLogin) {
        this.http
            .post<ClienteLoginResponse>(
                this.appService.getApiUrl() + "/cliente/login",
                clienteLogin
            )
            .subscribe(
                (response) => {
                    const token = response.token;
                    this.token = token;
                    if (token) {
                        console.log(response.expiresIn);
                        const expiresInDuration = response.expiresIn;
                        this.setAuthTimer(expiresInDuration);
                        this.isAuthenticated = true;
                        this.userId = response.cliente_id;
                        this.authStatusListener.next(true);
                        const now = new Date();
                        const expirationDate = new Date(now.getTime() + expiresInDuration);
                        this.saveAuthData(response, expirationDate);
                        this.router.navigate(["cliente/home"]);
                    }
                },
                (error) => {
                    this.authStatusListener.next(false);
                }
            );
    }

    save(cliente: Cliente) {
        this.http
            .post<Cliente>(`${this.appService.getApiUrl()}/cliente/cadastrar`, cliente)
            .subscribe((responseData) => {
                console.log(responseData);
                // this.router.navigate(["/"]);
            });
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expiresIn.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.userId = null;
        this.router.navigate(["/"]);
    }

    private setAuthTimer(duration: number) {
        console.log("Setting timer " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration);
    }

    private saveAuthData(userData: ClienteLoginResponse, expirationDate: Date) {
        localStorage.setItem("cliente_token", userData.token);
        localStorage.setItem("cliente_id", userData.cliente_id.toString());
        localStorage.setItem("cliente_nome", userData.cliente_nome);
        localStorage.setItem("cliente_token_expiresIn", expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem("cliente_token");
        localStorage.removeItem("cliente_id");
        localStorage.removeItem("cliente_nome");
        localStorage.removeItem("cliente_token_expiresIn");
    }

    getAuthData() {
        const token = localStorage.getItem("cliente_token");
        const userId = localStorage.getItem("cliente_id");
        const nome = localStorage.getItem("cliente_nome");
        const expiresIn = localStorage.getItem("cliente_token_expiresIn");
        if (!token && !expiresIn) {
            return;
        }
        return {
            token: token,
            userId: parseInt(userId),
            nome: nome,
            expiresIn: new Date(expiresIn),
        };
    }
}
