import {AbstractControl, ValidationErrors} from "@angular/forms";

export class DateControlValidator {

  public static isGreaterThanNow(control: AbstractControl): ValidationErrors | null {

    return (control.value?.getTime() > new Date().getTime()) ? null : {lessThanNow: true};
  }

}
