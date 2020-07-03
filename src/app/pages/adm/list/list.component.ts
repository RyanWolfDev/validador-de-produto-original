import { Component, OnInit, OnDestroy } from "@angular/core";

import { Adm, AdmResponse } from "../../../models/adm.model";
import { Subscription } from "rxjs";
import { AdmService } from "../../../../app/services/adm/adm.service";
import { LoginService } from "../../../../app/services/login/login.service";

import { Router } from "@angular/router";

@Component({
  selector: "adm-list",
  moduleId: module.id,
  templateUrl: "list.component.html",
  styleUrls: ["../../../layouts/admin-layout/admin-layout.component.scss"],
})
export class AdmListComponent implements OnInit, OnDestroy {
  dataTableHead = ["Id", "Login", "Criado em", "Alterado em", "Ativo"];

  //Pagination
  pageSizeOptions = [10, 25, 50, 100];

  dataList: AdmResponse = {
    count: 0,
    currentPage: 1,
    pageSize: this.pageSizeOptions[0],
    message: "",
    result: [],
  };

  //Authentication Listener
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;
  private dataSub: Subscription;

  constructor(
    public admService: AdmService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAdms(this.dataList.pageSize, this.dataList.currentPage);
    this.getLoginAuthorization();
  }

  getAdms(pageSize, currentPage) {
    this.admService.getAdms(pageSize, currentPage);
    this.dataSub = this.admService
      .getDataUpdatedListener()
      .subscribe((admResponse: AdmResponse) => {
        this.dataList = admResponse;
      });
  }

  getLoginAuthorization() {
    this.userId = this.loginService.getUserId();
    this.userIsAuthenticated = this.loginService.getIsAuth();
    this.authStatusSub = this.loginService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.loginService.getUserId();
      });
  }

  onChangedPage(page) {
    this.getAdms(this.dataList.pageSize, page);
  }

  onChangedPageSize(pageSize) {
    this.getAdms(pageSize, this.dataList.currentPage);
  }

  search(event) {
    if (event.keyCode === 13) {
      console.log(event);
      //call getAdms with filter
    }
  }

  createNew(){
    this.router.navigate(["/admin/adm/new"]);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
