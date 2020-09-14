import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthAdminService } from "../../layouts/admin-layout/auth/auth-admin.service";

//Pego o token do locastorage e seto no header de toda requisição ao servidor
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authAdminService: AuthAdminService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authAdminService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken),
    });
    return next.handle(authRequest);
  }
}
