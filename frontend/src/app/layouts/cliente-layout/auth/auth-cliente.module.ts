import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AuthClienteRoutes } from "./auth-cliente.routing";
import { LoginClienteComponent } from "./login/login.component";
import { SignupClienteComponent } from "./signup/signup.component";

@NgModule({
    imports: [
        RouterModule.forChild(AuthClienteRoutes),
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
    ],
    declarations: [LoginClienteComponent, SignupClienteComponent],
})
export class AuthClienteModule { }
