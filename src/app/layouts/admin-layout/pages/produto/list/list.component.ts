//Angular
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

//Services
import { ProdutoService } from "../produto.service";

//Models
import { ToolbarButton } from "../../../../../components/toolbarButton/toolbarButton.model";
import { Produto } from "../produto.model";
import { DataTable } from "../../../../../components/dataTable/dataTable.model";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "produto-list",
  moduleId: module.id,
  templateUrl: "list.component.html",
})
export class ProdutoListComponent implements OnInit, OnDestroy {
 
  constructor(
    public produtoService: ProdutoService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
