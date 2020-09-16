import { Component, OnInit } from '@angular/core';
import { AuthClienteService } from '../auth/auth-cliente.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'pages-cliente-layout',
    templateUrl: './pages.component.html',
    styleUrls: ['../cliente-layout.component.scss']
})
export class PagesClienteComponent implements OnInit {

    //Routes for SIDEMENU and NAVBAR
    routes = [
        { path: "/cliente/validarProduto", title: "Validar Produto", icon: "nc-check-2", class: "", isSideMenuItem: true },
        { path: "/cliente/autorizacoes", title: "Meus Produtos", icon: "nc-badge", class: "", isSideMenuItem: true },
        { path: "/cliente/profile", title: "Meu Perfil", isSideMenuItem: false },
    ];

    userLogin = this.authClienteService.getAuthData().nome;
    profileRoute = "/cliente/profile";

    constructor(private authClienteService: AuthClienteService) { }

    onLogout() {
        this.authClienteService.logout();
    }

    ngOnInit() { }
}
