import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";

import { ToastrService } from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "Ocorreu um erro inesperado! Por favor contate o admnistrador do sistema";

        console.log(error);

        if (error.error.message) {
          errorMessage = error.error.message;
        }

        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-alert-circle-i"></span><span data-notify="message">' +
            errorMessage +
            "</span>",
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-top-right",
          }
        );
        return throwError(error);
      })
    );
  }
}
