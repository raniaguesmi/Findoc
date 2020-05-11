import { Component, OnInit } from '@angular/core';
import { SecretaireService } from 'src/app/service/secretaire.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Key } from 'protractor';

@Component({
  selector: 'app-gerer-secretaire',
  templateUrl: './gerer-secretaire.component.html',
  styleUrls: ['./gerer-secretaire.component.css']
})
export class GererSecretaireComponent implements OnInit {
secretaire;
sec;
data;
utilisateur;
secretaireParmed;
idmedec; 
editForm:FormGroup;
registerForm:FormGroup;
submitted = false;
_id;
user: string
emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;//paterne mte3 lemail 

  constructor(private secretaireService:SecretaireService ,private formBuilder:FormBuilder) { 
    this.data=localStorage.getItem('user')
    console.log('utli',JSON.parse(this.data))
    this.utilisateur=JSON.parse(this.data)
   this. idmedec=this.utilisateur._id;
   this.secretaireParMedecin(this.idmedec)

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nom: ['',[Validators.required,this.validateUsername()] ],
      prenom: ['', Validators.required],
      login: ['', Validators.required],
      password: ['',[Validators.required,Validators.minLength(6)]],
      dateNaissance: ['', Validators.required],
      adresse: ['', [Validators.required]],
      telephone: ['', [Validators.required,Validators.pattern(new RegExp("[0-9 ]{8}"))]],
      cin: ['', [Validators.required,Validators.pattern(new RegExp("[0-9 ]{8}"))]],
      email: ['',[ Validators.required ,Validators.pattern(this.emailRegex)]],
      idmed:[this.idmedec]

  });
this.editForm=this.formBuilder.group({
  nom: ['', [Validators.required]],
  prenom: ['', Validators.required],
  login: ['', [Validators.required]],
  password: ['',[Validators.required,Validators.minLength(6)]],
  dateNaissance: ['', Validators.required],
  adresse: ['', Validators.required],
  telephone: ['', [Validators.required,Validators.pattern(new RegExp("[0-9 ]{8}"))]],
  cin: ['', [Validators.required,Validators.pattern(new RegExp("[0-9 ]{8}"))]],
  email: ['',[ Validators.required ,Validators.pattern(this.emailRegex)]],
  idmed:[this.idmedec]
})
  
    console.log(this.idmedec)
  }
  get f() { return this.registerForm.controls; } // cette fonction me permet de faire le cocntrole de saisie via html code

  listeSecretaire()
  {
    this.secretaireService.listeSecretaire().subscribe(res=>
     { console.log(res)
    this.secretaire=res}
      )
     }
     secretaireParMedecin(idmedec){
       this.secretaireService.secretaireParMed(idmedec).subscribe(res=>{
         console.log('secretaire de medecin',res)
        this.secretaireParmed=res;

       })
     }

     ajouterSecretaire(){
      this.submitted = true;
       if(this.registerForm.valid){
       this.secretaireService.ajouterSecretaire(this.registerForm.value).subscribe(res=>{
        console.log(res);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'sécrétaire est ajouté avec succée',
          showConfirmButton: false,
          timer: 1500
        })  
         this.submitted = false ;
            this.registerForm.reset() 
           this.secretaireParMedecin(this.idmedec)
         }
         )
       }
       }


     supprimer(id){
      Swal.fire({
        title: 'vous êtes sûr  ?',
        text: "Vous ne pourrez pas revenir en arriére !",
      // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3DABB6',
        cancelButtonColor: '#909193',
        confirmButtonText: 'Oui, Supprimer!',
        cancelButtonText:'Annuler'
      })
        .then((result) => {
          if (result.value) {
        return this.secretaireService.supprimerSecretaire(id)
          .subscribe(res => {
            console.log(res);
            this.secretaireParMedecin(this.idmedec)
          })
      }
    })
     }

     recupere(_id,nom,prenom,login,password,dateNaissance,adresse,telephone,cin,email){ // hethi t5alini ne5ou les information lkol li7achti bihom  bech mn be3ed fl modification neste3mlhom 
      this._id=_id;
      this.editForm.get('nom').setValue(nom);
      this.editForm.get('prenom').setValue(prenom);
      this.editForm.get('login').setValue(login);
      this.editForm.get('password').setValue(password);
      this.editForm.get('dateNaissance').setValue(dateNaissance);
      this.editForm.get('adresse').setValue(adresse);
      this.editForm.get('telephone').setValue(telephone);
      this.editForm.get('cin').setValue(cin);
      this.editForm.get('email').setValue(email);

      }

      modifierSecretaire(){
       this.submitted = true
     if(       this.submitted = true && this.editForm.valid){
        this.secretaireService.modifierSecretaire(this._id,this.editForm.value).subscribe(res=>{
          console.log(res);
          Swal.fire(
            'Bien!',
            'la modification a été effectué avec succès',
            'success'
          )  
          this.editForm.reset() 
           this.submitted = false ;
           this.secretaireParMedecin(this.idmedec)

          })}
      }



      private  validateUsername(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | any => {
          this.secretaireService.checkUsername(control) .subscribe(
              res => {
                console.log(control.value)
               this.sec=res;
              //  console.log('this.sec',this.sec)
                if ( this.sec === control.value) 
                 { return {'alreadyExist': true};} 

                else {  return null}
              },
              (error) => {
                console.log(error);
              }
            )
        }
    }
    
}
