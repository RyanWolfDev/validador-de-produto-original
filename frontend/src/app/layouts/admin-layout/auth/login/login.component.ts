import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";

import { AuthAdminService } from "../auth-admin.service";
import { Router } from "@angular/router";

@Component({
  selector: "login",
  moduleId: module.id,
  templateUrl: "login.component.html",
  styleUrls: [
    "../auth-admin.component.scss",
  ],
})
export class LoginAdminComponent implements OnInit {


  constructor(
    private authAdminService: AuthAdminService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  loginForm = this.fb.group({
    login: ["", Validators.required],
    senha: ["", Validators.required],
  });

  ngOnInit() {
    if (this.authAdminService.getIsAuth()) {
      this.router.navigate(['admin/dashboard']);
    }
  }

  onLogin() {
    this.authAdminService.login(this.loginForm.value);
  }

}
