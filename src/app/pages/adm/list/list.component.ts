//Angular
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

//Services
import { AdmService } from "../adm.service";
import { ConfirmDialogService } from "../../../components/confirm-dialog/confirm-dialog.service";

//Models
import { ToolbarButton } from "../../../models/toolbarButton.model";
import { Adm } from "../adm.model";
import { DataTable } from "../../../models/dataTable.model";

@Component({
  selector: "adm-list",
  moduleId: module.id,
  templateUrl: "list.component.html",
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
      name: "",
      colorClass: "danger",
      iconClass: "nc-icon nc-simple-remove",
      size: 1,
      function: () => {
        this.onDelete();
      },
    },
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
  private dataSub: Subscription;

  constructor(
    public admService: AdmService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit() {
    this.getAdms(this.dataTable.pageSize, this.dataTable.currentPage);
  }

  getAdms(
    pageSize: number,
    currentPage: number,
    filterSearch = this.filterText
  ) {
    this.admService.getAll(pageSize, currentPage, filterSearch);
    this.dataSub = this.admService
      .getDataUpdatedListener()
      .subscribe((response: DataTable) => {
        this.dataTable = response;
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
    this.showDialog(data, "Você tem certeza?");
  }

  onDelete() {
    const checkedRows = this.getCheckedRows();
    checkedRows.forEach((value, index, array) => {
      this.admService.delete(value.id).subscribe(() => {
        if (index == array.length - 1) {
          console.log(index);
          this.getAdms(this.dataTable.pageSize, this.dataTable.currentPage, this.filterText);
        }
      });
    })
  }

  getCheckedRows() {
    return this.dataTable.result.filter((value, index, array) => {
      return value.isChecked === true;
    });
  }

  getDetail(id: number) {
    this.router.navigate([`/admin/adm/${id}`]);
  }

  showDialog(data, message) {
    this.confirmDialogService.confirmThis(
      message,
      () => {
        this.admService.update(data);
      },
      () => {
        data.ativo = !data.ativo;
        return;
      }
    );
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
