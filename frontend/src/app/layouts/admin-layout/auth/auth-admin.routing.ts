import { Routes } from "@angular/router";

import { LoginAdminComponent } from "./login/login.component";

export const LoginAdminRoutes: Routes = [
  {
    path: "admin",
    redirectTo: "admin/login",
    pathMatch: "full",
  },
  { path: "admin/login", component: LoginAdminComponent },
];
