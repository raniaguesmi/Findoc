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
      password: ['', [Validators.required]]
    })
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }
  get f() { return this.LoginForm.controls; }

  login(){
    this.submitted = true;
    //JSON. stringify() converts a value to JSON notation
    //the JSON. parse() method parses a JSON string, constructing the JavaScript value or object described by the string
    //stringify() is used to convert JSON object to JSON String. It serializes a JavaScript object into a JSON string. parse() is used to convert JSON string/Array object to JSON Object.
    // console.log(this.LoginForm.value)//juste bech nchouf behe l contenu mte3 l form

    this.loginService.login(this.LoginForm.value).subscribe(res=>{

      // console.log(res)
      if (JSON.parse(JSON.stringify(res)).status === "sucess") {
        Swal.fire(
          'GOOD',
          'Authentification avec success',
          'success'
        ).then(()=>{        
           localStorage.setItem('user', JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(res)).data)).user));
           localStorage.setItem('token', JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(res)).data.token)));
           console.log('message',JSON.parse(localStorage.getItem('userConnecte')))
           this.router.navigate(['acceuil'])

      })

//  this.dataa=JSON.parse(JSON.stringify(res)).data
//   this.userr=JSON.parse(JSON.stringify(this.dataa)).user
//   localStorage.setItem('token',this.userr)
  
  
        //  console.log('message',JSON.parse(localStorage.getItem('userConnecte')))
  
  
       
      }
  
      else {
  
        Swal.fire(
          'OPPS',
          'Verifier votre Email et password',
          'error'
        )
  
      }
  


    })
  }

}
