import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthClienteService } from "../auth-cliente.service";
import { Router } from "@angular/router";

@Component({
    selector: "login-form-cliente",
    moduleId: module.id,
    templateUrl: "login.component.html",
    styleUrls: [
        "../auth-cliente.component.scss",
    ],
})
export class LoginClienteComponent implements OnInit {


    constructor(
        private authClienteService: AuthClienteService,
        private fb: FormBuilder,
        private router: Router
    ) { }

    loginForm = this.fb.group({
        email: ["", { validators: [Validators.required, Validators.email], updateOn: "blur" }],
        senha: ["", Validators.required],
    });

    ngOnInit() {
        if (this.authClienteService.getIsAuth()) {
            this.router.navigate(['cliente/home'])
        }
    }

    onLogin() {
        if (!this.loginForm.valid) {
            return;
        }
        this.authClienteService.login(this.loginForm.value);
    }

    get email() { return this.loginForm.get('email'); }

}
