//Angular
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

//Services
import { ProdutoService } from "../produto.service";
import { ToastrService } from "ngx-toastr";
import { ConfirmDialogService } from "../../../../../components/confirm-dialog/confirm-dialog.service";

//Models
import { ToolbarButton } from "../../../../../components/toolbarButton/toolbarButton.model";
import { Produto } from "../produto.model";
import { DataTable } from "../../../../../components/dataTable/dataTable.model";


@Component({
  selector: "produto-list",
  moduleId: module.id,
  templateUrl: "list.component.html",
})
export class ProdutoListComponent implements OnInit, OnDestroy {

  //Pagination
  pageSizeOptions = [10, 25, 50, 100];

  //DataTable
  dataTableHead: string[] = [
    "checkbox",
    "Id",
    "Imagem",
    "Descrição",
    "SKU",
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
      name: "Visualizar Imagem",
      link: "imagemUrl",
      type: "image",
    },
  
    {
      name: "descricao",
      type: "text",
    },
    {
      name: "sku",
      type: "text",
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
    // {
    //   name: "Importar",
    //   colorClass: "info",
    //   iconClass: "nc-icon nc-cloud-upload-94",
    //   size: 3,
    //   function: () => {
    //     this.importProdutos();
    //   },
    // },
    {
      name: "Excluir",
      colorClass: "danger",
      iconClass: "nc-icon nc-simple-remove",
      size: 3,
      function: () => {
        this.showDialog(null, "Tem certeza que deseja remover o(s) produto(s)? Isso pode ser irreversível!");
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
  rowsChecked: Produto[];
  private dataSub: Subscription;

  constructor(
    public produtoService: ProdutoService,
    private router: Router,
    private confirmDialogService: ConfirmDialogService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getProdutos(this.dataTable.pageSize, this.dataTable.currentPage);
  }

  getProdutos(
    pageSize: number,
    currentPage: number,
    filterSearch = this.filterText
  ) {
    this.produtoService.getAll(pageSize, currentPage, filterSearch);
    this.dataSub = this.produtoService
      .getDataUpdatedListener()
      .subscribe((response: DataTable) => {
        this.dataTable = response;
      });
  }

  onChangedPage(page) {
    this.dataTable.currentPage = page;
    this.getProdutos(this.dataTable.pageSize, page);
  }

  onChangedPageSize(pageSize) {
    this.dataTable.pageSize = pageSize;
    this.getProdutos(pageSize, this.dataTable.currentPage);
  }

  filterSearch(filterSearch) {
    this.filterText = filterSearch;
    this.getProdutos(
      this.dataTable.pageSize,
      this.dataTable.currentPage,
      filterSearch
    );
  }

  createNew() {
    this.router.navigate(["/admin/produto/new"]);
  }

  getDetail(id: number) {
    this.router.navigate([`/admin/produto/${id}`]);
  }

  //TODO
  importProdutos() {
    // this.router.navigate([`/admin/produto/${id}`]);
  }

  onChangeBooleanValue(data) {
    data.ativo = !data.ativo;
    this.showDialog(data, "Você tem certeza disso?");
  }

  onDelete() {
    const checkedRows = this.getCheckedRows();
    if (checkedRows.length < 1) {
      this.showNotification('Nenhum Produto foi selecionado', 'warning')
    }
    checkedRows.forEach((value, index, array) => {
      this.produtoService.delete(value.id).subscribe(() => {
        if (index == array.length - 1) {
          console.log(index);
          this.getProdutos(this.dataTable.pageSize, this.dataTable.currentPage, this.filterText);
        }
      });
    })
  }

  getCheckedRows() {
    return this.dataTable.result.filter((value, index, array) => {
      return value.isChecked === true;
    });
  }

  showDialog(data, message) {

    this.confirmDialogService.confirmThis(
      message,
      () => {
        //If data is not empty it means the operation is an update, else is a deletion 
        if (data) {
          this.produtoService.update(data);
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
