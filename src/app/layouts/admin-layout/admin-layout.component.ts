import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  ngOnInit() { }

  //Routes for SIDEMENU and NAVBAR
  routes = [
    { path: "/admin/dashboard", title: "Dashboard", icon: "nc-bank", class: "" },
    { path: "/admin/adm", title: "Administradores", icon: "nc-badge", class: "" },
    { path: "/admin/cliente", title: "Clientes", icon: "nc-circle-10", class: "" },
    { path: "/admin/produto", title: "Produtos", icon: "nc-cart-simple", class: "" },

    // { path: "/admin/token", title: "Tokens", icon: "nc-tag-content", class: "" },

    // { path: "/icons", title: "Icons", icon: "nc-diamond", class: "" },
    // {
    //   path: "/notifications",
    //   title: "Notifications",
    //   icon: "nc-bell-55",
    //   class: "",
    // },
    // { path: "/user", title: "User Profile", icon: "nc-single-02", class: "" },
    // { path: "/table", title: "Table List", icon: "nc-tile-56", class: "" },
    // {
    //   path: "/typography",
    //   title: "Typography",
    //   icon: "nc-caps-small",
    //   class: "",
    // },
  ];
}
