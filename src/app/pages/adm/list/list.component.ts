//Angular
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

//Services
import { AdmService } from "../../../../app/services/adm/adm.service";
import { LoginService } from "../../../../app/services/login/login.service";

//Models
import { ToolbarButton } from "../../../models/toolbarButton.model";
import { AdmResponse } from "../../../models/adm.model";

@Component({
  selector: "adm-list",
  moduleId: module.id,
  templateUrl: "list.component.html",
  styleUrls: ["../../../layouts/admin-layout/admin-layout.component.scss"],
})
export class AdmListComponent implements OnInit, OnDestroy {
  //Pagination
  pageSizeOptions = [10, 25, 50, 100];

  //DataTable
  dataTableHead: string[] = [
    "Id",
    "Login",
    "Criado em",
    "Alterado em",
    "Ativo",
  ];
  dataTableProperties: string[] = [
    "id",
    "login",
    "createdAt",
    "updatedAt",
    "ativo",
  ];
  dataTable: AdmResponse = {
    count: 0,
    currentPage: 1,
    pageSize: this.pageSizeOptions[0],
    message: "",
    result: [],
  };

  //Toolbar Buttons
  toolbarButtons: ToolbarButton[] = [
    {
      name: "Novo",
      colorClass: "success",
      iconClass: "nc-icon nc-simple-add",
      function: () => {
        this.createNew();
      },
    },
  ];

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
    this.getAdms(this.dataTable.pageSize, this.dataTable.currentPage);
    this.getLoginAuthorization();
  }

  getAdms(pageSize, currentPage) {
    this.admService.getAdms(pageSize, currentPage);
    this.dataSub = this.admService
      .getDataUpdatedListener()
      .subscribe((admResponse: AdmResponse) => {
        this.dataTable = admResponse;
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
    this.getAdms(this.dataTable.pageSize, page);
  }

  onChangedPageSize(pageSize) {
    console.log(pageSize);
    this.getAdms(pageSize, this.dataTable.currentPage);
  }

  search(event) {
    if (event.keyCode === 13) {
      console.log(event);
      //call getAdms with filter
    }
  }

  createNew() {
    this.router.navigate(["/admin/adm/new"]);
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
