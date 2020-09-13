import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { AdminAuthGuard } from "./admin-auth.guard";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SidebarModule } from "../../components/sidebar/sidebar.module";
import { NavbarModule } from "../../components/shared/navbar/navbar.module";
import { FooterModule } from "../../components/shared/footer/footer.module";
import { FixedPluginModule } from "../../components/shared/fixedplugin/fixedplugin.module";
import { LoginAdminComponent } from "./auth/login-admin.component";
import { PagesAdminComponent } from "./pages/pages.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule
  ],
  declarations: [
    PagesAdminComponent,
    LoginAdminComponent
  ],
  providers: [AdminAuthGuard]

})
export class AdminLayoutModule { }
