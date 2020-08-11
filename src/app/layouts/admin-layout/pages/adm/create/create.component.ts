//Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

//Models
import { Adm } from '../adm.model';

//Validators
import { ConfirmPasswordValidator } from './confirm-password.validator';

//Services
import { AdmService } from '../adm.service';

@Component({
    selector: 'adm-create',
    moduleId: module.id,
    templateUrl: 'create.component.html'
})

export class AdmCreateComponent implements OnInit {

    adm: Adm;
    admId: number;
    pageTitle: string = 'Novo Administrador';
    private mode = 'create';
    fieldRequiredMessage: string = "* Campo obrigatório";
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        public route: ActivatedRoute,
        private router: Router,
        private admService: AdmService
    ) { }

    ngOnInit() {
        this.buildForm();
        this.isEdit();
    }

    buildForm() {
        this.form = this.fb.group({
            id: ['', Validators.required],
            login: ['', Validators.required],
            ativo: [true, Validators.required],
            senha: ['', Validators.required],
            confirmarSenha: ['', Validators.required],
        },
            {
                validator: ConfirmPasswordValidator("senha", "confirmarSenha")
            })
    }

    isEdit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {

            const param = paramMap.get("id");

            if (param !== 'new') {
                this.mode = 'edit';
                this.senha.disable();
                this.confirmarSenha.disable();

                this.pageTitle = `ID: ${param}`;
                this.admService.getById(parseInt(param)).subscribe(response => {
                    this.adm = response.result;
                    this.form.setValue({
                        id: this.adm.id,
                        login: this.adm.login,
                        ativo: this.adm.ativo,
                        senha: "",
                        confirmarSenha: ""
                    });
                });
            } else {
                this.id.disable();
            }
        });
    }

    onSubmit() {

        if (this.form.invalid) {
            return;
        }

        if (this.mode === 'edit') {
            this.admService.update(this.form.value);
        } else {
            this.admService.save(this.form.value);
        }
    }

    onCancel() {
        this.router.navigate(["/admin/adm"]);
    }

    get id() { return this.form.get('id'); }
    get login() { return this.form.get('login'); }
    get ativo() { return this.form.get('ativo'); }
    get senha() { return this.form.get('senha'); }
    get confirmarSenha() { return this.form.get('confirmarSenha'); }

}

