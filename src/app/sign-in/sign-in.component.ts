import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  LoginForm:FormGroup;
  submitted = false;
  dataa
  userr
  constructor(private loginService:LoginService, private formBuilder:FormBuilder , private router:Router) { }

  ngOnInit() {
    this.LoginForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      
    })

    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
  get f() { return this.LoginForm.controls; }

  login(){
    this.submitted = true;
 
    this.loginService.login(this.LoginForm.value).subscribe(res=>{

      // console.log(res)
      if (JSON.parse(JSON.stringify(res)).status === "sucess") {
        Swal.fire(
          'GOOD',
          'Authentification avec succès',
          'success'
        ).then(()=>{        
           localStorage.setItem('user', JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(res)).data)).user));
           localStorage.setItem('token', JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(res)).data.token)));
           console.log('message',JSON.parse(localStorage.getItem('userConnecte')))
           this.router.navigate(['acceuil'])
      })
      }
     else if(JSON.parse(JSON.stringify(res)).status === "admin"){
        localStorage.setItem('user', '{"type": "admin"}');
        localStorage.setItem('token', '{type: "admin"}');
        this.router.navigate(['acceuil'])

      }
      else {
   Swal.fire(
          'OPPS',
          'Vérifier votre nom utilisateur et votre mot de passe',
          'error'
        )
      }
    })
  }

}
