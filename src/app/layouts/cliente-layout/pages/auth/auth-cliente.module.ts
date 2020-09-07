import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AuthClienteRoutes } from "./auth-cliente.routing";
import { LoginClienteComponent } from "./login/login.component";

@NgModule({
    imports: [
        RouterModule.forChild(AuthClienteRoutes),
    ],
    declarations: [LoginClienteComponent],
})
export class AuthClienteModule { }
