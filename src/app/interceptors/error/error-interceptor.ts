import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";

import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

          // this.toastr.success(
          //   '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message">' +
          //     event.body.message +
          //     "</span>",
          //   "",
          //   {
          //     timeOut: 4000,
          //     enableHtml: true,
          //     closeButton: true,
          //     toastClass: "alert alert-success alert-with-icon",
          //     positionClass: "toast-top-right",
          //   }
          // );
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage =
          "Ocorreu um erro inesperado! Por favor contate o admnistrador do sistema";

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

        // if (error.status === 401) {
        //   this.router.navigate(["/"]);
        // }
        return throwError(error);
      })
    );
  }
}
