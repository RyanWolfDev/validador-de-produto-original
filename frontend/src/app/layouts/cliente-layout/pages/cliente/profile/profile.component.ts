import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ClienteService } from "../cliente.service";
import { AuthClienteService } from "../../../auth/auth-cliente.service";
import { Cliente } from "../cliente.model";
import { ConfirmPasswordValidator } from "../../../../../validators/confirm-password.validator";

@Component({
    selector: "cliente-profile",
    moduleId: module.id,
    templateUrl: "profile.component.html",
    styleUrls: [
        "../../../cliente-layout.component.scss",
    ],
})
export class ClienteProfileComponent implements OnInit {

    cliente: Cliente;
    clienteId: number;
    fieldRequiredMessage: string = "* Campo obrigatório";
    profileForm: FormGroup;
    isDadosPessoaisCollapsed = false;
    isAlterarSenhaCollapsed = true;

    constructor(
        private fb: FormBuilder,
        public route: ActivatedRoute,
        private router: Router,
        private clienteService: ClienteService,
        private authClienteService: AuthClienteService
    ) { }

    ngOnInit() {
        this.buildForm();
        this.loadProfile();
    }

    buildForm() {
        this.profileForm = this.fb.group({
            id: ['', Validators.required],
            nome: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            novaSenha: [''],
            confirmarNovaSenha: [''],
            senhaAtual: [''],
        },
            {
                validator: ConfirmPasswordValidator("novaSenha", "confirmarNovaSenha")
            })
    }

    loadProfile() {
        this.clienteId = this.authClienteService.getUserId();

        this.clienteService.getById(this.clienteId).subscribe(response => {
            this.cliente = response.result;
            this.profileForm.setValue({
                id: this.cliente.id,
                nome: this.cliente.nome,
                email: this.cliente.email,
                novaSenha: "",
                confirmarNovaSenha: "",
                senhaAtual: ""
            });
        });
    }

    onSubmit() {

        if (this.profileForm.invalid) {
            return;
        }

        this.clienteService.update(this.profileForm.value);
    }

    onCancel() {
        this.router.navigate(["/cliente/validarProduto"]);
    }

    get nome() { return this.profileForm.get('nome'); }
    get email() { return this.profileForm.get('email'); }
    get novaSenha() { return this.profileForm.get('novaSenha'); }
    get confirmarNovaSenha() { return this.profileForm.get('confirmarNovaSenha'); }
    get senhaAtual() { return this.profileForm.get('senhaAtual'); }
}
