//Angular
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Routes
import { ClienteLayoutRoutes } from "./cliente-layout.routing";

//Pages
import { PagesClienteComponent } from "./pages/pages.component";
import { AuthClienteComponent } from "./auth/auth-cliente.component";

//App Components
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { NavbarModule } from "../../components/shared/navbar/navbar.module";
import { FooterModule } from "../../components/shared/footer/footer.module";
import { ClienteAuthGuard } from "./cliente-auth.guard";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ClienteLayoutRoutes),
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
    ],
    declarations: [
        AuthClienteComponent,
        PagesClienteComponent
    ],
    providers: [ClienteAuthGuard]
})
export class ClienteLayoutModule { }
