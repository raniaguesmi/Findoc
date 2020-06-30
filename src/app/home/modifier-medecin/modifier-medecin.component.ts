import { Component, OnInit } from '@angular/core';
import { MedecinService } from 'src/app/service/medecin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { passwordMatchValidator } from '../customvalidator.validator';

@Component({
  selector: 'app-modifier-medecin',
  templateUrl: './modifier-medecin.component.html',
  styleUrls: ['./modifier-medecin.component.css']
})
export class ModifierMedecinComponent implements OnInit {
  EditForm:FormGroup;
  submitted = false;
  id;
  medecin;
  fileToApload;
  image;
  data;
editPassForm;
  constructor(private medecinService:MedecinService ,private formBuilder :FormBuilder ,private actroute:ActivatedRoute) {
    this.id=this.actroute.params['value']['id']
   // this.remplissage(this.medecin);
   this.EditForm = this.formBuilder.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
    dateNaissance: ['', [Validators.required]],
    adresse: ['', [Validators.required]],
    telephone: ['', [Validators.required ]],
    cin: ['', [Validators.required ]],
    email: ['', [Validators.required]],
    adresseCabinet: ['', [Validators.required]],
    specialite: ['', [Validators.required]],
    passwordConfirm:['',[Validators.required]],
    oldpassword:['',[Validators.required]]
  },passwordMatchValidator);
  }

  ngOnInit() {
  
    this.afficheParId(this.id)

  }
  afficheParId(id){
  this.medecinService.afficheParId(id).subscribe(res=>{

    this.medecin=res;
  this.image=this.medecin.image
  console.log(this.medecin)
  console.log('tbfbtbt',this.medecin.nom)
  this.remplissage(this.medecin.nom,this.medecin.prenom,this.medecin.login,this.medecin.dateNaissance,this.medecin.adresse,this.medecin.cin,this.medecin.telephone,this.medecin.email,this.medecin.adresseCabinet,this.medecin.specialite)
}
  
    )
 
  }

  remplissage(nom,prenom,login,dateNaissance,adresse,cin,telephone,email,adresseCabinet,specialite){
    this.EditForm.get('nom').setValue(nom);
    this.EditForm.get('prenom').setValue(prenom);
    this.EditForm.get('login').setValue(login);
    this.EditForm.get('password').setValue("");
    this.EditForm.get('dateNaissance').setValue(dateNaissance);
    this.EditForm.get('adresse').setValue(adresse);
    this.EditForm.get('telephone').setValue(telephone);
    this.EditForm.get('email').setValue(email); 
    this.EditForm.get('adresseCabinet').setValue(adresseCabinet);
    this.EditForm.get('specialite').setValue(specialite);
        this.EditForm.get('cin').setValue(cin);


  }


 
   
  get f() { return this.EditForm.controls; }
modifier(){
  this.submitted = true
  console.log(this.EditForm.get('oldpassword'))
//   console.log(this.medecin._id)

this.medecinService.comparerPassword(this.medecin._id,this.EditForm.get('oldpassword').value).subscribe(res=>{
  this.data=res;
      console.log(this.data.state)
      if(this.data.state=="no"){
       return Swal.fire('le mot de passe est incorrect')

      }
})


  this.medecinService.modifierMedecin(this.id,this.EditForm.value).subscribe(res=>{
    console.log(res);
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success')
    this.submitted = false;
    // this.EditForm.reset()
  })

}
recupereFile(file) {
  this.fileToApload = file.target.files as Array<File> // je recupere le photo télécharger
  this.image = file.target.files[0].name; // ici je stocke le nom de la phpto  dans la variable image
}
}
