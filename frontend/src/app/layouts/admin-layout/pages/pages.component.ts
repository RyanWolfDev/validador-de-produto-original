import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthAdminService } from '../auth/auth-admin.service';


@Component({
    selector: 'pages-admin-layout',
    templateUrl: './pages.component.html',
    styleUrls: ['../admin-layout.component.scss']
})
export class PagesAdminComponent implements OnInit {

    //Routes for SIDEMENU and NAVBAR
    routes = [
        { path: "/admin/dashboard", title: "Dashboard", icon: "nc-bank", class: "", isSideMenuItem: true },
        { path: "/admin/adm", title: "Administradores", icon: "nc-badge", class: "", isSideMenuItem: true },
        { path: "/admin/cliente", title: "Clientes", icon: "nc-circle-10", class: "", isSideMenuItem: true },
        { path: "/admin/produto", title: "Produtos", icon: "nc-cart-simple", class: "", isSideMenuItem: true },
    ];

    userLogin = this.authAdminService.getAuthData().login;
    profileRoute = "/admin/profile";

    constructor(private authAdminService: AuthAdminService) { }

    onLogout() {
        this.authAdminService.logout();
    }

    ngOnInit() {

    }
}
