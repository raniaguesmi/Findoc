import { Component, OnInit } from '@angular/core';
import { SpecialiteService } from 'src/app/service/specialite.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.css']
})
export class SpecialiteComponent implements OnInit {
listeSpecialite;
registerForm: FormGroup;
submitted = false;
_id;
data;
  constructor(private specialiteService:SpecialiteService,private formBuilder: FormBuilder) { 
    this.afficherSpecialite();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required]
  });
  }

  recupere(_id,nom){ // hethi t5alini ne5ou les information lkol li7achti bihom  bech mn be3ed fl modification neste3mlhom 
    this._id=_id;
    this.registerForm.get('nom').setValue(nom);
    }

  get f() { return this.registerForm.controls; } // cette fonction me permet de faire le cocntrole de saisie via html code
  
  afficherSpecialite(){
    this.specialiteService.listeSpecialite().subscribe(res=>{
      console.log(res);
      this.listeSpecialite=res; // resultat li tal3etli naffectehe l  listeSpecialité
    })
  }

  ajouterSpecialite(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.specialiteService.ajouterSpecialite(this.registerForm.value).subscribe(res => {
      this.data=res;
      console.log(this.data.state)
      if(this.data.state=="no"){
       return Swal.fire('Cette spécialité existe déjà')

      }

     Swal.fire(
       'Bien',
       'Specialité ajoutée avec succée!',
       'success'
     )  
     this.registerForm.reset()

      this.submitted = false ;
              this.afficherSpecialite();

      })
  }

  modifierSpecialite(){
    this.submitted = true
    if (this.registerForm.invalid) {
      return;
    }
    this.specialiteService.modifierSpecialite(this._id,this.registerForm.value).subscribe(res=>{
      this.data=res;
      console.log(this.data.state)
      if(this.data.state=="no"){
       return Swal.fire('Cette spécialité existe déjà')
       this.afficherSpecialite();

      }
      // this.afficherSpecialite();

      Swal.fire(
        'Bien!',
        'la modification a terminé avec succée',
        'success'
      )  
this.registerForm.reset();
       this.submitted = false ;
    })   
  
}
  

  supprimerSpecialite(id){
    
      Swal.fire({
            title: 'vous êtes sûr?',
            text: "Vous ne pourrez pas revenir en arriére !",
          // type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d6100f',
            cancelButtonColor: '#3dc405',
            confirmButtonText: 'Oui, Supprimer!',
            cancelButtonText:'Annule'
          })
            .then((result) => {
              if (result.value) {
            return this.specialiteService.supprimerSpecialite(id)
              .subscribe(res => {
                console.log(res);
                this.afficherSpecialite();
              })
          }
        })
    
  }

}
