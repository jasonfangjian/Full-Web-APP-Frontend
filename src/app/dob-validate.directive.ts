import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidatorFn} from '@angular/forms';
@Directive({
  selector: '[appDobValidate]',
  providers: [{
    provide : NG_VALIDATORS,
    useExisting : DobValidateDirective,
    multi: true
  }]
})
export class DobValidateDirective implements Validator {
  @Input('appDobValidate') dob: any;
  constructor() { }
  validate(control: AbstractControl): {[key: string]: any} {
    // return this.date ? confirmDobValidator(this.date)(control) : null;
    if ( !control.value ) {
      return { required : true };
    }
    const d = new Date();
    const dyear = d.getFullYear();
    const dmonth = d.getMonth() + 1;
    const ddate = d.getDate();
    const birthday = control.value;
    // tslint:disable-next-line:radix
    const putyear = parseInt(birthday);
    const putmonth = parseInt(birthday.substring(5, 7), 10);
    const putdate = parseInt(birthday.substring(8, 10), 10);
    const age = dyear - putyear - ((dmonth < putmonth || (dmonth === putmonth && ddate < putdate)) ? 1 : 0);
    return (age >= 18) ? null : {dob: true};
  }
}

// tslint:disable-next-line:variable-name
/*export function confirmDobValidator(_dob: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    if ( !control.value ) {
      return { required : true };
    }
    return control.value !== _dob ? {confirmpsw : {value: true}} : null;
  };
}*/
