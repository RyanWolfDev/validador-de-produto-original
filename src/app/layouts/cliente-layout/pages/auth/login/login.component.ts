import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";

import { AuthClienteService } from "../auth-cliente.service";

@Component({
    selector: "auth-cliente",
    moduleId: module.id,
    templateUrl: "login.component.html",
    styleUrls: [
        "../auth-cliente.component.scss",
    ],
})
export class LoginClienteComponent implements OnInit, OnDestroy {
    isLoading = false;
    private authStatusSub: Subscription;

    constructor(private authClienteService: AuthClienteService, private fb: FormBuilder) { }

    loginForm = this.fb.group({
        email: ["", Validators.required],
        senha: ["", Validators.required],
    });

    ngOnInit() {
        this.authStatusSub = this.authClienteService
            .getAuthStatusListener()
            .subscribe((authStatus) => {
                this.isLoading = false;
            });

        console.log(this.authStatusSub);

    }

    onLogin() {
        this.isLoading = true;
        this.authClienteService.login(this.loginForm.value);
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }
}
