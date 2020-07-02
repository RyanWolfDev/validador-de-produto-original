import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginAdminLayoutComponent } from "./layouts/login-admin-layout/login-admin-layout.component";
import { AuthGuard } from "./app-auth.guard";

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
    component: LoginAdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/login-admin-layout/login-admin-layout.module#LoginAdminLayoutModule",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];
