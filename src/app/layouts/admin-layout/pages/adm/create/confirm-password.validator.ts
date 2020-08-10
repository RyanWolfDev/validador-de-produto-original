import { AbstractControl, FormGroup } from "@angular/forms";
export function ConfirmPasswordValidator(senha: string, confirmarSenha: string) {
    return (formGroup: FormGroup) => {

        let control = formGroup.controls[senha];
        let matchingControl = formGroup.controls[confirmarSenha]

        if (matchingControl.errors && !matchingControl.errors.confirmPasswordValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmPasswordValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}