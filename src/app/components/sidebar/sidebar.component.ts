import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { LoginService } from "../../layouts/admin-layout/login-admin/pages/login.service";
import { Subscription } from "rxjs";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit, OnDestroy {

  @Input() routes: RouteInfo[];
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  public menuItems: any[];

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.loginService.getIsAuth();
    this.authListenerSubs = this.loginService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.menuItems = this.routes.filter((menuItem) => menuItem);
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
