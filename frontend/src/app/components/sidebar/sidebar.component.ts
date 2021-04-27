import { Component, OnInit, OnDestroy, Input } from "@angular/core";
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
export class SidebarComponent implements OnInit {

  @Input() routes: RouteInfo[];

  public menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = this.routes.filter((menuItem) => menuItem);
  }
}
