//Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

//Models
import { Adm } from '../adm.model';

//Validators
import { ConfirmPasswordValidator } from '../../../../../validators/confirm-password.validator';

//Services
import { AdmService } from '../adm.service';
import { LoginService } from '../../../login-admin/pages/login.service';

@Component({
  selector: "adm-profile",
  moduleId: module.id,
  templateUrl: "adm-profile.component.html",
})
export class AdmProfileComponent implements OnInit {

  adm: Adm;
  admId: number;
  pageTitle: string = 'Editar Perfil';
  fieldRequiredMessage: string = "* Campo obrigatório";
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private router: Router,
    private admService: AdmService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loadProfile();
  }

  buildForm() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      login: ['', Validators.required],
      novaSenha: [''],
      confirmarNovaSenha: [''],
      senhaAtual: [''],
    },
      {
        validator: ConfirmPasswordValidator("novaSenha", "confirmarNovaSenha")
      })
  }

  loadProfile() {
    this.admId = this.loginService.getUserId();

    this.admService.getById(this.admId).subscribe(response => {
      this.adm = response.result;
      this.form.setValue({
        id: this.adm.id,
        login: this.adm.login,
        novaSenha: "",
        confirmarNovaSenha: "",
        senhaAtual: ""
      });
    });
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.admService.update(this.form.value);
  }

  onCancel() {
    this.router.navigate(["/admin/adm"]);
  }

  get id() { return this.form.get('id'); }
  get login() { return this.form.get('login'); }
  get novaSenha() { return this.form.get('novaSenha'); }
  get confirmarNovaSenha() { return this.form.get('confirmarNovaSenha'); }
  get senhaAtual() { return this.form.get('senhaAtual'); }

}
