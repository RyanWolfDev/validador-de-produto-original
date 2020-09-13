//Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Routes
import { PagesAdminRoutes } from "./pages.routing";

//Pages
import { DashboardComponent } from "../../../pages/dashboard/dashboard.component";

import { AdmCreateComponent } from "./adm/create/create.component";
import { AdmListComponent } from "./adm/list/list.component";
import { AdmProfileComponent } from "./adm/profile/adm-profile.component";

import { ClienteListComponent } from "./cliente/list/list.component";
import { ClienteDetailedComponent } from "./cliente/detailed/cliente-detailed.component";

import { ProdutoListComponent } from "./produto/list/list.component";
import { ProdutoCreateComponent } from "./produto/create/create.component";

//App Components
import { ConfirmDialogModule } from "../../../components/confirm-dialog/confirm-dialog.module";
import { PrintPageComponent } from "../../../components/print-page/print-page.component";
import { DataTableModule } from "../../../components/dataTable/dataTable.module";
import { FilterTableModule } from "../../../components/filterTable/filterTable.module";
import { ToolbarButtonModule } from "../../../components/toolbarButton/toolbarButton.module";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesAdminRoutes),
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        ConfirmDialogModule,
        DataTableModule,
        FilterTableModule,
        ToolbarButtonModule
    ],
    declarations: [
        DashboardComponent,
        AdmCreateComponent,
        AdmListComponent,
        AdmProfileComponent,
        ClienteListComponent,
        ClienteDetailedComponent,
        ProdutoListComponent,
        ProdutoCreateComponent,
        PrintPageComponent
    ],
})
export class PagesAdminModule { }
