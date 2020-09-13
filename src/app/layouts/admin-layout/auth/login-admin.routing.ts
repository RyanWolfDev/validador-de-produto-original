import { Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";

export const LoginAdminRoutes: Routes = [
  {
    path: "admin",
    redirectTo: "admin/login",
    pathMatch: "full",
  },
  { path: "admin/login", component: LoginComponent },
];
