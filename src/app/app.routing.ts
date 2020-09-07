import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthGuard } from "./app-auth.guard";
import { LoginAdminComponent } from "./layouts/admin-layout/login-admin/login-admin.component";
import { ClienteLayoutComponent } from "./layouts/cliente-layout/cliente-layout.component";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
        canActivate: [AuthGuard]
      },
    ],
  },
  {
    path: "",
    component: LoginAdminComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/login-admin/login-admin.module#LoginAdminModule",
      },
    ],
  },
  {
    path: "",
    component: ClienteLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/cliente-layout/cliente-layout.module#ClienteLayoutModule",
        // canActivate: [AuthGuard]
      },
    ],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];
