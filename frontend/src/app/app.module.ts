import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";


import { ErrorInterceptor } from "./interceptors/error/error-interceptor";
import { AuthInterceptor } from "./interceptors/auth-interceptor/auth-interceptor";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { ClienteLayoutComponent } from "./layouts/cliente-layout/cliente-layout.component";

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ClienteLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
    }),
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
