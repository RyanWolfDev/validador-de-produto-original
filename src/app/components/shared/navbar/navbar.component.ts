import {
  Component,
  OnInit,
  Renderer2,
  ViewChild,
  ElementRef,
  OnDestroy,
  Input,
} from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { LoginService } from "../../../layouts/admin-layout/login-admin/pages/login.service";
import { Subscription } from "rxjs";

@Component({
  moduleId: module.id,
  selector: "navbar-cmp",
  templateUrl: "navbar.component.html",
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() routes: [];
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  userLogin: string = '';

  public isCollapsed = true;
  @ViewChild("navbar-cmp", { static: false }) button;

  constructor(
    location: Location,
    private renderer: Renderer2,
    private element: ElementRef,
    private router: Router,
    private loginService: LoginService
  ) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.userIsAuthenticated = this.loginService.getIsAuth();
    this.authListenerSubs = this.loginService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.listTitles = this.routes.filter((listTitle) => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });

    this.userLogin = this.loginService.getAuthData().login;
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "";
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    html.classList.add("nav-open");
    if (window.innerWidth < 991) {
      mainPanel.style.position = "fixed";
    }
    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = "";
      }, 500);
    }
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    if (!this.isCollapsed) {
      navbar.classList.remove("navbar-transparent");
      navbar.classList.add("bg-white");
    } else {
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }

  onLogout() {
    this.loginService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
