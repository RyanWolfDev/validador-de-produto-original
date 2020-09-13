import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthClienteService } from "../auth-cliente.service";

@Component({
    selector: "login-form-cliente",
    moduleId: module.id,
    templateUrl: "login.component.html",
    styleUrls: [
        "../auth-cliente.component.scss",
    ],
})
export class LoginClienteComponent implements OnInit, OnDestroy {

    private authStatusSub: Subscription;

    constructor(private authClienteService: AuthClienteService, private fb: FormBuilder) { }

    loginForm = this.fb.group({
        email: ["", { validators: [Validators.required, Validators.email], updateOn: "blur" }],
        senha: ["", Validators.required],
    });

    ngOnInit() {
        this.authStatusSub = this.authClienteService
            .getAuthStatusListener()
            .subscribe((authStatus) => {
                console.log(authStatus);
            });
    }

    onLogin() {
        if (!this.loginForm.valid) {
            return;
        }
        this.authClienteService.login(this.loginForm.value);
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }

    get email() { return this.loginForm.get('email'); }

}
