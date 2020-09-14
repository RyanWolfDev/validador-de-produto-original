import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthClienteService } from "../auth-cliente.service";
import { ConfirmPasswordValidator } from "../../../../validators/confirm-password.validator";

@Component({
    selector: "signup-form-cliente",
    moduleId: module.id,
    templateUrl: "signup.component.html",
    styleUrls: [
        "../auth-cliente.component.scss",
    ],
})
export class SignupClienteComponent implements OnInit, OnDestroy {

    private authStatusSub: Subscription;
    fieldRequiredMessage = 'Campo Obrigatório!';

    constructor(private authClienteService: AuthClienteService, private fb: FormBuilder) { }

    signupForm = this.fb.group({
        nome: ["", Validators.required],
        email: ["", { validators: [Validators.required, Validators.email], updateOn: "blur" }],
        senha: ["", Validators.required],
        confirmarSenha: ["", { validators: [Validators.required], updateOn: "blur" }],
        ativo: [true, Validators.required]
    },
        {
            validator: ConfirmPasswordValidator("senha", "confirmarSenha")
        });

    ngOnInit() {
        this.authStatusSub = this.authClienteService
            .getAuthStatusListener()
            .subscribe((authStatus) => {
                console.log(authStatus);
            });
    }

    onSignup() {
        if (!this.signupForm.valid) {
            return;
        }
        this.authClienteService.save(this.signupForm.value);
    }

    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
    }

    get email() { return this.signupForm.get('email'); }
    get nome() { return this.signupForm.get('nome'); }
    get senha() { return this.signupForm.get('senha'); }
    get confirmarSenha() { return this.signupForm.get('confirmarSenha'); }
}
