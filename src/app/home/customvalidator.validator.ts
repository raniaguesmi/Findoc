import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { SecretaireService } from 'src/app/service/secretaire.service';

export function ValidateFirstName(control: AbstractControl) {
    if (!control.value.startsWith("@")) {
      return { validFname: true };
    }
    return null;
    // this.checkUsername(control) .subscribe(
    //               res => {
    //                 console.log(res)
                   
                   
    //                 if ( res!==null) 
    //                  { return {alreadyExist: true}} 
    
    //                 else {  return null}
    //               },
    //               (error) => {
    //                 console.log(error)
    //               }
    //             )
  }
  export function espace(): ValidatorFn {
    return (control: AbstractControl) => {
               if ((control.value as string).indexOf(' ') >= 0)
       return {espace: true}
      else
        return null;


        
    }
  }
   export function validateLogin(secretaireService:SecretaireService): ValidatorFn {
    return (control: AbstractControl) => {
      console.log('la valeur',control.value)
        secretaireService.checkUsername(control.value).subscribe( res => {
          // const resultat=res;
          console.log('ggggg',res)   })
               if (true)
       return {alreadyExist: true}
      else
        return null;


        
    }
  }
 export function passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value
       ? null : {'mismatch': true};
 }