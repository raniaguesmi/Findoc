import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedecinService } from '../service/medecin.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// import randomString from 'randomstring';

@Component({
  selector: 'app-forge-password',
  templateUrl: './forge-password.component.html',
  styleUrls: ['./forge-password.component.css']
})
export class ForgePasswordComponent implements OnInit {
  passwordForm:FormGroup;
  emailForm:FormGroup;
  submitted = false;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;//paterne mte3 lemail 
  result;
  constructor(private formBuilder:FormBuilder, private medecinService:MedecinService ,private  router:Router) {   
    //  const result = randomString.generate(6);
 }

  ngOnInit() {
   this. result = this.makeString();
console.log('tbcrgf',this.result)
    this.passwordForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: [this. result],
      email: ['', [Validators.required,Validators.pattern(this.emailRegex)] ],

    })
  }
  get f() { return this.passwordForm.controls; }

  makeString(): string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 6; i++) {

      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));

    }

    return outString;
  }

  modifierPassword(){
    console.log(this.passwordForm.get('login').value)

    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    }
    this.medecinService.trouverParLogin(this.passwordForm.get('login').value).subscribe(res=>{
      console.log(res)
      console.log(this.passwordForm.value)
      var idmed=res
      this.medecinService.modifierPassword(idmed,this.passwordForm.value).subscribe(res=>{
        console.log(res)
        this.emailForm=this.formBuilder.group({
          to:[this.passwordForm.get('email').value],
          subject:['Nouveau mot de passe pour acceder a votre compte findoc'],
          text:['vous pouvez ouvrir votre compte par ses deux informations confidentiels . votre login est ***'+this.passwordForm.get('login').value+'*** et votre mot de passe est ***'+this.passwordForm.get('password').value+'***'],
        
        })
        this.medecinService.envoieEmail(this.emailForm.value).subscribe((res)=>{
          console.log(res)
          Swal.fire(
            'Good job!',
            'un nouveau mot de passe vous a été envoyé sur email!',
            'success')
          this.router.navigate([''])

        })

      })
    })

  }
}
