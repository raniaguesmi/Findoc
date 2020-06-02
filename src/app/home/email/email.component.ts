import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
emailForm:FormGroup;
submitted = false;
data;
emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;//paterne mte3 lemail 

  constructor(private loginService:LoginService , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      to: ['', [Validators.required,Validators.pattern(this.emailRegex)]],
      subject: ['', Validators.required],
      text: ['', Validators.required]


  });
  }
  get f() { return this.emailForm.controls; } // cette fonction me permet de faire le cocntrole de saisie via html code

envoyerEmail(){
  this.submitted=true;
  if(this.emailForm.invalid){return;}
  this.loginService.sendEmail(this.emailForm.value).subscribe(res=>{
    this.data=res;
    if(this.data.state=="no"){
      return Swal.fire('veuillez Verifier vos champs')
     }
     Swal.fire(
      'Bien',
      'Email envoyée avec succée!',
      'success'
    )  
    this.emailForm.reset()

     this.submitted = false ;

     
  })
  
}
}
