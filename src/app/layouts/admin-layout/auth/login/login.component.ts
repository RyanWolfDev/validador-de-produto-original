import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";

import { LoginService } from "../auth-admin.service";

@Component({
  selector: "login",
  moduleId: module.id,
  templateUrl: "login.component.html",
  styleUrls: [
    "../auth-admin.component.scss",
  ],
})
export class LoginAdminComponent implements OnInit, OnDestroy {

  private authStatusSub: Subscription;

  constructor(private loginService: LoginService, private fb: FormBuilder) { }

  loginForm = this.fb.group({
    login: ["", Validators.required],
    senha: ["", Validators.required],
  });

  ngOnInit() {
    this.authStatusSub = this.loginService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        console.log(authStatus);

      });
  }

  onLogin() {
    this.loginService.login(this.loginForm.value);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
