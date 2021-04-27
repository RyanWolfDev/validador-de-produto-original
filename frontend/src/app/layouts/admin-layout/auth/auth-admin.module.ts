import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginAdminRoutes } from "./auth-admin.routing";

import { LoginAdminComponent } from "./login/login.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginAdminRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginAdminComponent],
})
export class LoginAdminModule {}
