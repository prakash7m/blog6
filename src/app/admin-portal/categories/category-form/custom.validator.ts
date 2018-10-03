import { AbstractControl } from '@angular/forms';

export class CustomValidator {
  static match(matchTo: AbstractControl) {
    return (ac: AbstractControl) => {
      return ac.value === matchTo.value ? null : { match: true };
    };
  }
}
