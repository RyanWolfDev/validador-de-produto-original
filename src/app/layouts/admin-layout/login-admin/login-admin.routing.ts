import { Routes } from "@angular/router";

import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";

export const LoginAdminRoutes: Routes = [
  {
    path: "admin",
    redirectTo: "admin/login",
    pathMatch: "full",
  },
  { path: "admin/login", component: LoginComponent },
  { path: "admin/signup", component: SignupComponent },
];
