import { Component, OnInit, OnDestroy } from "@angular/core";
import { LoginService } from "../../layouts/admin-layout/login-admin/pages/login.service";
import { Subscription } from "rxjs";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: "/admin/dashboard", title: "Dashboard", icon: "nc-bank", class: "" },
  { path: "/admin/adm", title: "Administradores", icon: "nc-badge", class: "" },
  { path: "/admin/cliente", title: "Clientes", icon: "nc-circle-10", class: "" },
  { path: "/admin/produtos", title: "Produtos", icon: "nc-cart-simple", class: "" },
  { path: "/admin/token", title: "Gerar Tokens", icon: "nc-tag-content", class: "" },

  { path: "/icons", title: "Icons", icon: "nc-diamond", class: "" },
  {
    path: "/notifications",
    title: "Notifications",
    icon: "nc-bell-55",
    class: "",
  },
  { path: "/user", title: "User Profile", icon: "nc-single-02", class: "" },
  { path: "/table", title: "Table List", icon: "nc-tile-56", class: "" },
  {
    path: "/typography",
    title: "Typography",
    icon: "nc-caps-small",
    class: "",
  },
];

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  public menuItems: any[];

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.userIsAuthenticated = this.loginService.getIsAuth();
    this.authListenerSubs = this.loginService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
