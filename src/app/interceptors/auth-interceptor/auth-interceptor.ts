import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppService } from "../../app.service";
import { AuthClienteService } from "../../layouts/cliente-layout/auth/auth-cliente.service";
import { AuthAdminService } from "../../layouts/admin-layout/auth/auth-admin.service";

//Pego o token do locastorage e seto no header de toda requisição ao servidor
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authAdminService: AuthAdminService,
    private authClienteService: AuthClienteService,
    private appService: AppService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let authToken: string = '';
    let layout = this.appService.getLayout();

    if (layout === 'Cliente') {
      authToken = this.authClienteService.getToken();
    } else if (layout === "Admin") {
      authToken = this.authAdminService.getToken();
    }

    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken),
    });
    return next.handle(authRequest);
  }
}
