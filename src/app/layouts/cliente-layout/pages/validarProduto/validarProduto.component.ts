import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Autorizacao } from "../autorizacoes/autorizacao.model";
import { AutorizacaoService } from "../autorizacoes/autorizacao.service";

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
    autorizacao: Autorizacao;

    constructor(
        private fb: FormBuilder,
        public route: ActivatedRoute,
        private router: Router,
        private autorizacaoService: AutorizacaoService
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

        this.autorizacaoService.checkAndSave(this.validaProdutoForm.value).subscribe(response => {
            this.autorizacao = response;
            console.log(this.autorizacao)
        });
    }
    onPaste(event) {
        console.log(event);
        this.validaProdutoForm.value.token.trim()
    }
}
