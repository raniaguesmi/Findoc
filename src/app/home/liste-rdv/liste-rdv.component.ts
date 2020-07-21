import { Component, OnInit } from '@angular/core';
import { RdvService } from 'src/app/service/rdv.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-rdv',
  templateUrl: './liste-rdv.component.html',
  styleUrls: ['./liste-rdv.component.css']
})
export class ListeRdvComponent implements OnInit {
data;
idmedec;
submitted = false;
utilisateur;
rdvs;
idPatient;
patient;
rdvForm:FormGroup
reportForm:FormGroup
_id;
dataa
  constructor(private rdvService:RdvService,private formBuilder:FormBuilder) {
  

  }
  ngOnInit() {
    this.data=localStorage.getItem('user')
    this.utilisateur=JSON.parse(this.data)
   this.idmedec=this.utilisateur.idmed;
   this.listeRdvConfirmé(this.idmedec);
 
  this.reportForm=this.formBuilder.group({
    date:['',Validators.required],
    heure:['',Validators.required],
    medecin:[this.idmedec]
  })
  }
  get f() { return this.reportForm.controls; } // cette fonction me permet de faire le cocntrole de saisie via html code
 
 
  recupere(_id,date,heure,motif){ 
    // hethi t5alini ne5ou les information lkol li7achti bihom  bech mn be3ed fl modification neste3mlhom 
    this._id=_id;
    this.reportForm.get('date').setValue(date);
    this.reportForm.get('heure').setValue(heure);
    
  }
listeRdvConfirmé(id){
  this.rdvService.afficheRdvConfirmer(id).subscribe(res=>{
   this.rdvs=res;
   console.log('rdv confirmé',this.rdvs)
  })
}
ajouterRdv(){
  this.submitted = true;
  if (this.rdvForm.invalid) {
    return;
  }
  console.log(this.rdvForm.value);
  this.rdvService.ajouterRdv(this.rdvForm.value).subscribe(res=>{
    Swal.fire(
      'Bien',
      'rdv ajoutée avec succée!',
      'success'
    )  
    // this.rdvForm.hide();

     this.submitted = false ;
             this.listeRdvConfirmé(this.idmedec);

     })
  
}
supprimerRdv(id){
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
    return this.rdvService.supprimerRdv(id)
      .subscribe(res => {
        console.log(res);
        this.listeRdvConfirmé(this.idmedec)
      })
  }
})
 
}
reporterRdv(){
  this.submitted = true
  if (this.reportForm.invalid) {
    return;
  }
  console.log(this._id)
  this.rdvService.reporterRdv(this._id,this.reportForm.value).subscribe(res=>{
    this.dataa=res;
    console.log(this.dataa)
    if(this.dataa.state=="noo"){
      return Swal.fire('Date de rendez-vous est déjà prise !')
     }
      else{ Swal.fire(
      'Bien',
      'Rendez-vous reporté avec succée !',
      'success'
      
    ) 
     } location.reload();
   })
   this.listeRdvConfirmé(this.idmedec)
   
}


}
