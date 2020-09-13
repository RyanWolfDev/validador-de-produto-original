import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../auth/auth-admin.service';


@Component({
    selector: 'pages-admin-layout',
    templateUrl: './pages.component.html',
    styleUrls: ['../admin-layout.component.scss']
})
export class PagesAdminComponent implements OnInit, OnDestroy {

    //Routes for SIDEMENU and NAVBAR
    routes = [
        { path: "/admin/dashboard", title: "Dashboard", icon: "nc-bank", class: "" },
        { path: "/admin/adm", title: "Administradores", icon: "nc-badge", class: "" },
        { path: "/admin/cliente", title: "Clientes", icon: "nc-circle-10", class: "" },
        { path: "/admin/produto", title: "Produtos", icon: "nc-cart-simple", class: "" },
    ];

    userLogin = this.authAdminService.getAuthData().login;
    profileRoute = "/admin/profile";
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;

    constructor(private authAdminService: LoginService) { }

    onLogout() {
        this.authAdminService.logout();
    }

    ngOnInit() {

        this.authAdminService.autoAuthUser();

        this.userIsAuthenticated = this.authAdminService.getIsAuth();
        this.authListenerSubs = this.authAdminService
            .getAuthStatusListener()
            .subscribe((isAuthenticated) => {
                this.userIsAuthenticated = isAuthenticated;
            });
    }

    ngOnDestroy() {
        this.authListenerSubs.unsubscribe();
    }
}
