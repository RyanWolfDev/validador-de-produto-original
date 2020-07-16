//Angular
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

//Services
import { AdmService } from "../../../../app/services/adm/adm.service";
import { LoginService } from "../../../../app/services/login/login.service";
import { ConfirmDialogService } from "../../../components/confirm-dialog/confirm-dialog.service";

//Models
import { ToolbarButton } from "../../../models/toolbarButton.model";
import { Adm } from "../../../models/adm.model";
import { DataTable } from "../../../models/dataTable.model";

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
    "checkbox",
    "Id",
    "Login",
    "Criado em",
    "Alterado em",
    "Ativo",
  ];

  dataTableProperties: Object[] = [
    {
      name: "",
      type: "checkbox",
    },
    {
      name: "id",
      type: "text",
    },
    {
      name: "login",
      type: "text",
    },
    {
      name: "createdAt",
      type: "date",
    },
    {
      name: "updatedAt",
      type: "date",
    },
    {
      name: "ativo",
      type: "boolean",
    },
  ];
  
  dataTable: DataTable = {
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
      size: 3,
      function: () => {
        this.createNew();
      },
    },
  ];

  filterText: string;
  rowsChecked: Adm[];

  //Authentication Listener
  userIsAuthenticated = false;
  userId: string;
  private authStatusSub: Subscription;
  private dataSub: Subscription;

  constructor(
    public admService: AdmService,
    private loginService: LoginService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
    this.getAdms(this.dataTable.pageSize, this.dataTable.currentPage);
    this.getLoginAuthorization();
  }

  getAdms(
    pageSize: number,
    currentPage: number,
    filterSearch = this.filterText
  ) {
    this.admService.getAdms(pageSize, currentPage, filterSearch);
    this.dataSub = this.admService
      .getDataUpdatedListener()
      .subscribe((response: DataTable) => {
        this.dataTable = response;
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
    this.dataTable.currentPage = page;
    this.getAdms(this.dataTable.pageSize, page);
  }

  onChangedPageSize(pageSize) {
    this.dataTable.pageSize = pageSize;
    this.getAdms(pageSize, this.dataTable.currentPage);
  }

  filterSearch(filterSearch) {
    this.filterText = filterSearch;
    this.getAdms(
      this.dataTable.pageSize,
      this.dataTable.currentPage,
      filterSearch
    );
  }

  createNew() {
    this.router.navigate(["/admin/adm/new"]);
  }

  onChangeBooleanValue(data) {
    data.ativo = !data.ativo;
    this.showDialog(data, "Tem certeza que quer desativar o Administrador?");
  }

  getCheckedRows() {
    this.dataTable.result.filter((value, index, array) => {
      return value.isChecked === true;
    });
  }

  showDialog(data, message) {
    this.confirmDialogService.confirmThis(
      message,
      () => {
        this.admService.updateAdm(data);
      },
      () => {
        data.ativo = !data.ativo;
        return;
      }
    );
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
