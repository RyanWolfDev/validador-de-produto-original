//Angular
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

//Services
import { AdmService } from "../adm.service";
import { ConfirmDialogService } from "../../../../../components/confirm-dialog/confirm-dialog.service";
import { ToastrService } from "ngx-toastr";

//Models
import { ToolbarButton } from "../../../../../components/toolbarButton/toolbarButton.model";
import { Adm } from "../adm.model";
import { DataTable } from "../../../../../components/dataTable/dataTable.model";

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
      name: "Excluir",
      colorClass: "danger",
      iconClass: "nc-icon nc-simple-remove",
      size: 3,
      function: () => {
        this.showDialog(null, "Tem certeza que deseja remover o(s) administradores? Isso pode ser irreversível");
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
    private confirmDialogService: ConfirmDialogService,
    private toastr: ToastrService
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
    this.showDialog(data, "Você tem certeza disso?");
  }

  onDelete() {
    const checkedRows = this.getCheckedRows();
    if (checkedRows.length < 1) {
      this.showNotification('Nenhum Administrador foi selecionado', 'warning')
    }
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
        //If data is not empty it means the operation is an update, else is a deletion 
        if (data) {
          this.admService.update(data);
        } else {
          this.onDelete();
        }
      },
      () => {
        if (data) {
          data.ativo = !data.ativo;
        }
        return;
      }
    );
  }

  showNotification(message: string, type: string) {
    this.toastr.error(
      '<span data-notify="icon" class="nc-icon nc-alert-circle-i"></span><span data-notify="message">' +
      message +
      "</span>",
      "",
      {
        timeOut: 4000,
        enableHtml: true,
        closeButton: true,
        toastClass: `alert alert-${type} alert-with-icon`,
        positionClass: "toast-top-right",
      }
    );
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
