import { Component, OnInit } from '@angular/core';
import { MedecinService } from 'src/app/service/medecin.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpecialiteService } from 'src/app/service/specialite.service';

@Component({
  selector: 'app-liste-medecins',
  templateUrl: './liste-medecins.component.html',
  styleUrls: ['./liste-medecins.component.css']
})
export class ListeMedecinsComponent implements OnInit {
listeMedecins; 
editForm:FormGroup;
listeSpecialite;
submitted=false;
_id;
emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;//paterne mte3 lemail 
nbMedcins=0;
data;
  constructor(private medecinService:MedecinService,private formBuilder:FormBuilder,private specialiteService : SpecialiteService) {
    this.afficherSpecialite();
    this.listeMedecin();
  }

  ngOnInit() {
    this.editForm=this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required,Validators.pattern(new RegExp("[0-9 ]{8}"))]],
      cin: ['', [Validators.required,Validators.pattern(new RegExp("[0-9 ]{8}"))] ],
      email: ['', [Validators.required,Validators.pattern(this.emailRegex)] ],
      adresseCabinet: ['', Validators.required],
      specialite: ['', Validators.required]
    })
    this.nbMedcins=this.listeMedecin.length
    console.log('nb de medecins',this.nbMedcins)

  }
  get f() { return this.editForm.controls; } 
  // cette fonction me permet de faire le cocntrole de saisie via html code

listeMedecin(){
  this.medecinService.listeMedecins().subscribe(res=>{
    // console.log(res)
    this.listeMedecins=res;
    
  })
}
supprimerMedecin(id){
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
    return  this.medecinService.supprimerMedecin(id)
      .subscribe(res => {

      })
    }
  })
  this.listeMedecins();

}
recupere(_id,nom,prenom,login,password,dateNaissance,adresse,telephone,cin,email,adresseCabinet,specialite){ 
  // hethi t5alini ne5ou les information lkol li7achti bihom  bech mn be3ed fl modification neste3mlhom 
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
  this.editForm.get('adresseCabinet').setValue(adresseCabinet);
  this.editForm.get('specialite').setValue(specialite);
}
  afficherSpecialite(){
    this.specialiteService.listeSpecialite().subscribe(res=>{
      this.listeSpecialite=res; // resultat li tal3etli naffectehe l  listeSpecialité bech nbouclie aliha fl component
    })
  }
  modiferMedecin(){
    this.submitted = true
    if (this.editForm.invalid) {
      return;
    }
       this.medecinService.modifierMedecin(this._id,this.editForm.value).subscribe(res=>{
         console.log(res);
         this.data=res
         if(this.data.state=="no"){
           return Swal.fire('Ce nom dutilisateur  existe déjà')   
          }
         Swal.fire(
           'Bien!',
           'la modification a été effectué avec succès',
           'success'
         )  
         this.editForm.reset() 
          this.submitted = false ;
          this.listeMedecin();
         })
        }
// }
}
