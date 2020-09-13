import { Routes } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
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
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
      },
    ],
  },
  {
    path: "",
    component: ClienteLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/cliente-layout/cliente-layout.module#ClienteLayoutModule",
      },
    ],
  },
  {
    path: "**",
    redirectTo: "/",
  },
];
