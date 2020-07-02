import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginService } from "../../services/login/login.service";

//Pego o token do locastorage e seto no header de toda requisição ao servidor
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.loginService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken),
    });
    return next.handle(authRequest);
  }
}
