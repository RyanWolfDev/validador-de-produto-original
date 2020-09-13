import { Routes } from "@angular/router";
import { DashboardComponent } from "../../../pages/dashboard/dashboard.component";
import { AdmProfileComponent } from "./adm/profile/adm-profile.component";
import { AdmListComponent } from "./adm/list/list.component";
import { AdmCreateComponent } from "./adm/create/create.component";
import { ClienteListComponent } from "./cliente/list/list.component";
import { ClienteDetailedComponent } from "./cliente/detailed/cliente-detailed.component";
import { ProdutoListComponent } from "./produto/list/list.component";
import { ProdutoCreateComponent } from "./produto/create/create.component";


export const PagesAdminRoutes: Routes = [
    {
        path: "admin",
        redirectTo: "admin/login",
        pathMatch: "prefix",
    },
    { path: "admin/dashboard", component: DashboardComponent },

    { path: "admin/profile", component: AdmProfileComponent },
    { path: "admin/adm", component: AdmListComponent },
    { path: "admin/adm/:id", component: AdmCreateComponent },

    { path: "admin/cliente", component: ClienteListComponent },
    { path: "admin/cliente/:id", component: ClienteDetailedComponent },

    { path: "admin/produto", component: ProdutoListComponent },
    { path: "admin/produto/:id", component: ProdutoCreateComponent },
];
