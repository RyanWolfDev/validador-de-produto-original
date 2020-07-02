import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginAdminLayoutRoutes } from "./login-admin-layout.routing";

import { LoginComponent } from "../../pages/login/login.component";
import { SignupComponent } from "../../pages/signup/signup.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginAdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginComponent, SignupComponent],
})
export class LoginAdminLayoutModule {}
