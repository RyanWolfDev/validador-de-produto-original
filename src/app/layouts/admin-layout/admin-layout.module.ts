import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";

import { AdmCreateComponent } from "../../pages/adm/create/create.component";
import { AdmListComponent } from "../../pages/adm/list/list.component";
import { AdmProfileComponent } from "../../pages/adm/profile/adm-profile.component";

import { ClienteListComponent } from "../../pages/cliente/list/list.component";

import { UserComponent } from "../../pages/user/user.component";
import { TableComponent } from "../../pages/table/table.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UpgradeComponent } from "../../pages/upgrade/upgrade.component";

import { DataTableComponent } from "../../components/dataTable/dataTable.component";
import { ToolbarButtonComponent } from "../../components/toolbarButton/toolbarButton.component";
import { FilterTableComponent } from "../../components/filterTable/filterTable.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ConfirmDialogModule } from "../../components/confirm-dialog/confirm-dialog.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
  ],
  declarations: [
    DashboardComponent,
    AdmCreateComponent,
    AdmListComponent,
    AdmProfileComponent,
    ClienteListComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    DataTableComponent,
    ToolbarButtonComponent,
    FilterTableComponent,
  ],
})
export class AdminLayoutModule { }
