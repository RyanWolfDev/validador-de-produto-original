import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";

import { LoginService } from "../login.service";

@Component({
  selector: "login",
  moduleId: module.id,
  templateUrl: "login.component.html",
  styleUrls: [
    "../../login-admin.component.scss",
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(private loginService: LoginService, private fb: FormBuilder) {}

  loginForm = this.fb.group({
    login: ["", Validators.required],
    senha: ["", Validators.required],
  });

  ngOnInit() {
    this.authStatusSub = this.loginService
      .getAuthStatusListener()
      .subscribe((authStatus) => {
        this.isLoading = false;
      });

      console.log(this.authStatusSub);

  }

  onLogin() {
    this.isLoading = true;
    this.loginService.login(this.loginForm.value);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
