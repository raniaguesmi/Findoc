import { Component, OnInit } from '@angular/core';
import { MedecinService } from 'src/app/service/medecin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

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

  });
  }

  ngOnInit() {
  
    this.afficheParId(this.id)

// this.remplissage(this.medecin)
  }
  afficheParId(id){
  this.medecinService.afficheParId(id).subscribe(res=>{

    this.medecin=res;
  }
    )
 
  }

  remplissage(medecin){
    this.EditForm.get('nom').setValue(medecin.nom);
    this.EditForm.get('prenom').setValue(medecin.prenom);
    this.EditForm.get('login').setValue(medecin.login);
    this.EditForm.get('password').setValue(medecin.password);
    this.EditForm.get('dateNaissance').setValue(medecin.dateNaissance);
    this.EditForm.get('adresse').setValue(medecin.adresse);
    this.EditForm.get('telephone').setValue(medecin.telephone);
    this.EditForm.get('cin').setValue(medecin.cin); 
    this.EditForm.get('email').setValue(medecin.email); 
    this.EditForm.get('adresseCabinet').setValue(medecin.adresseCabinet);
    this.EditForm.get('specialite').setValue(medecin.specialite);

  }


 /* recupere(_id,nom,prenom,login,password,dateNaissance,adresse,telephone,cin,email,adresseCabinet,specialite){
    this.EditForm.get('nom').setValue(nom);
    this.EditForm.get('prenom').setValue(prenom);
    this.EditForm.get('login').setValue(login);
    this.EditForm.get('password').setValue(password);
    this.EditForm.get('dateNaissance').setValue(dateNaissance);
    this.EditForm.get('adresse').setValue(adresse);
    this.EditForm.get('telephone').setValue(telephone);
    this.EditForm.get('cin').setValue(cin); 
    this.EditForm.get('email').setValue(email); 
    this.EditForm.get('adresseCabinet').setValue(adresseCabinet);
    this.EditForm.get('specialite').setValue(specialite);
  }*/
  get f() { return this.EditForm.controls; }
modifier(){
  this.submitted = true

  this.medecinService.modifierMedecin(this.id,this.EditForm.value,this.fileToApload[0]).subscribe(res=>{
    console.log(res);
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success')
    this.submitted = false;
    this.EditForm.reset()
  })

}
recupereFile(file) {
  this.fileToApload = file.target.files as Array<File> // je recupere le photo télécharger
  this.image = file.target.files[0].name; // ici je stocke le nom de la phpto  dans la variable image
}
}
