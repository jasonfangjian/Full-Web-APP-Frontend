import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appPwdValidate]',
  providers: [{
    provide : NG_VALIDATORS,
    useExisting : PwdValidateDirective,
    multi: true
  }]
})
export class PwdValidateDirective implements Validator {
  @Input('appPwdValidate') confirmpsw: string;
  constructor() { }
  validate(control: AbstractControl): {[key: string]: any} {
    return this.confirmpsw ? confirmPswValidator(this.confirmpsw)(control) : null;
  }
}

// tslint:disable-next-line:variable-name
export function confirmPswValidator(_confirmpsw: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    /*if ( !control.value ) {
      return { required : false };
    }*/
    return control.value !== _confirmpsw ? {confirmpsw : {value: true}} : null;
  };
}
