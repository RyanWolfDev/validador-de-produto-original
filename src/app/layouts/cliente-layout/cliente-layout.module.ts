//Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Routes
import { ClienteLayoutRoutes } from "./cliente-layout.routing";

//Pages

//App Components


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthClienteComponent } from "./pages/auth/auth-cliente.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ClienteLayoutRoutes),
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AuthClienteComponent
    ],
})
export class ClienteLayoutModule { }
