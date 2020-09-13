import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { TableComponent } from "../../pages/table/table.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UpgradeComponent } from "../../pages/upgrade/upgrade.component";

import { AdmProfileComponent } from "./pages/adm/profile/adm-profile.component";
import { AdmListComponent } from "./pages/adm/list/list.component";
import { AdmCreateComponent } from "./pages/adm/create/create.component";

import { ClienteListComponent } from "./pages/cliente/list/list.component";
import { ClienteDetailedComponent } from "./pages/cliente/detailed/cliente-detailed.component"; 

import { ProdutoListComponent } from "./pages/produto/list/list.component";
import { ProdutoCreateComponent } from "./pages/produto/create/create.component";

export const AdminLayoutRoutes: Routes = [
   { path: "admin/dashboard", component: DashboardComponent },

  { path: "admin/profile", component: AdmProfileComponent },
  { path: "admin/adm", component: AdmListComponent },
  { path: "admin/adm/:id", component: AdmCreateComponent },

  { path: "admin/cliente", component: ClienteListComponent },
  { path: "admin/cliente/:id", component: ClienteDetailedComponent },

  { path: "admin/produto", component: ProdutoListComponent },
  { path: "admin/produto/:id", component: ProdutoCreateComponent },

  { path: "user", component: UserComponent },
  { path: "table", component: TableComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
];
