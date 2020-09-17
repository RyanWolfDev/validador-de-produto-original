import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "validar-produto-cliente",
    moduleId: module.id,
    templateUrl: "validarProduto.component.html",
    styleUrls: [
        "../../cliente-layout.component.scss",
    ],
})
export class ValidarProdutoClienteComponent implements OnInit {

    placeholderTokenInput: string = "Digite o TOKEN do produto aqui...";
    validaProdutoForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.validaProdutoForm = this.fb.group({
            token: ['', Validators.required],
        })
    }

    onSubmit() {

        if (this.validaProdutoForm.invalid) {
            return;
        }

        // this.autorizacaoService.create(this.profileForm.value);
    }
}
