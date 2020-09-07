import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { SidebarModule } from "./components/sidebar/sidebar.module";
import { FooterModule } from "./components/shared/footer/footer.module";
import { NavbarModule } from "./components/shared/navbar/navbar.module";
import { FixedPluginModule } from "./components/shared/fixedplugin/fixedplugin.module";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";


import { ErrorInterceptor } from "./interceptors/error/error-interceptor";
import { AuthInterceptor } from "./interceptors/auth-interceptor/auth-interceptor";
import { AuthGuard } from "./app-auth.guard";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginAdminComponent } from "./layouts/admin-layout/login-admin/login-admin.component";
import { ClienteLayoutComponent } from "./layouts/cliente-layout/cliente-layout.component";

@NgModule({
  declarations: [
    AppComponent, 
    AdminLayoutComponent,
    LoginAdminComponent,
    ClienteLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
