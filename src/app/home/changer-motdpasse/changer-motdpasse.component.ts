import { Component, OnInit } from '@angular/core';
import { MedecinService } from 'src/app/service/medecin.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../customvalidator.validator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changer-motdpasse',
  templateUrl: './changer-motdpasse.component.html',
  styleUrls: ['./changer-motdpasse.component.css']
})
export class ChangerMotdpasseComponent implements OnInit {
  id;
  EditForm:FormGroup;
  submitted = false;
  data;
  medecin;
  constructor(private medecinService:MedecinService, private activroute:ActivatedRoute,private formBuilder :FormBuilder ) {
    this.id=this.activroute.params['value']['id']
   }

  ngOnInit() {
    this.EditForm = this.formBuilder.group({
     oldpassword:['',[Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      passwordConfirm:['',[Validators.required]],
     
    },passwordMatchValidator);
  }
  get f() { return this.EditForm.controls; }
  modifier(){
    this.submitted = true
    if (this.EditForm.invalid) {
      return;
    }
    console.log(this.EditForm.get('oldpassword'))
    // console.log(this.medecin._id)
  

  this.medecinService.comparerPassword(this.id,this.EditForm.get('oldpassword').value).subscribe(res=>{
    this.data=res;
        console.log(this.data.state)
        if(this.data.state=="no"){
         return Swal.fire('le mot de passe actuel est incorrect')}
  if(this.data.state=="ok"&&(this.EditForm.get('password').value==this.EditForm.get('passwordConfirm').value)){
     this.medecinService.modifierMedecin(this.id,this.EditForm.value).subscribe(res=>{
          console.log(res);
          Swal.fire(
            'Good job!',
            'Votre mot de passe a été bien modifier!',
            'success')
          this.submitted = false;
          // this.EditForm.reset()
        })
  }
  else{ return Swal.fire('Les mots de passe ne sont pas identiques')}


        }
       
  )
  
  
    
  
  }
}
