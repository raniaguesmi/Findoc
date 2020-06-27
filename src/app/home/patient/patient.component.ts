import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';
import { ConsulataionService } from 'src/app/service/consulataion.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  id;
  patient;
  nb=new Array(8);
  idmed;
  utilisateur;
  data;
  consultations;
  consultationForm:FormGroup;
  patientForm:FormGroup
  submitted=false;
  _id;
  constructor( private patientService:PatientService,private activroute:ActivatedRoute, private consultationService:ConsulataionService,private formBuilder:FormBuilder) { 
    this.id=this.activroute.params['value']['id']
    this.afficheParId(this.id)
  }

  ngOnInit() {
    this.data=localStorage.getItem('user')
    this.utilisateur=JSON.parse(this.data)
    this.idmed=this.utilisateur._id;
    // console.log(this.idmed,this.id)
    this.afficheConsultation(this.idmed,this.id)

    this.consultationForm = this.formBuilder.group({
        medecin: [this.idmed],
      patient: [this.id],
      diagnostique: ['',Validators.required],
      traitement: ['',Validators.required],
});
this.patientForm = this.formBuilder.group({
  id: [this.id],
  taille: [''],
  poids: [''],
  groupeSanguin: [''],
  allergie: [''],
  tel1: [''],
  tel2: [''],
  traitementEncours: [''],
  maladie: [''],

});
  }
  get f() { return this.consultationForm.controls; }


  afficheParId(id){
    console.log(this.id)
  this.patientService.afficheParId(id).subscribe(res=>{
    this.patient=res;
    console.log(this.patient)
  })
 
  }


  print(): void {
    let printContents=null, popupWin;
  //   for (var iter = 0; iter < 10; iter++) {
  //     printContents  =printContents+ document.getElementById('print-section').innerHTML +"  ";
  //     ;
  // }
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title> Le QR code du patient ${this.patient.nom} ${this.patient.prenom}</title>
          
        </head>
    <body onload="window.print();window.close()" >${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
afficheConsultation(idmed,idpat){
  this.consultationService.affiche(idmed,idpat).subscribe(res=>{
    this.consultations=res
    console.log(this.consultations)

    // console.log('gf',this.consultation._id)
  })
}
ajouterConsultation(){
  this.submitted = true;
  if (this.consultationForm.invalid) {
    return;
  }
  this.consultationService.ajouter(this.consultationForm.value).subscribe(res=>{
console.log(res)
Swal.fire(
  'Bien',
  'rdv ajoutée avec succée!',
  'success'
)  
// this.rdvForm.hide();

 this.submitted = false ;
this.consultationForm.reset()
this.afficheConsultation(this.idmed,this.id);

 })

  }

supprimerConsultation(id){
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
    return this.consultationService.supprimer(id).subscribe(res=>{
      console.log("suppression",res)
    
        this.afficheConsultation(this.idmed,this.id)
      })
  }
})

}
recupere(_id,diagnostique,traitement,medecin,patient){ 
  // hethi t5alini ne5ou les information lkol li7achti bihom  bech mn be3ed fl modification neste3mlhom 
  this._id=_id;
  this.consultationForm.get('medecin').setValue(medecin);
  this.consultationForm.get('patient').setValue(patient);
  this.consultationForm.get('diagnostique').setValue(diagnostique);
  this.consultationForm.get('traitement').setValue(traitement);
  
}
modiferConsultation(){
  this.submitted = true;
  if (this.consultationForm.invalid) {
    return;
  }
  this.consultationService.modifer(this._id,this.consultationForm.value).subscribe(res=>{
    console.log("modofocation",res)
    Swal.fire(
      'Bien',
      'rdv ajoutée avec succée!',
      'success'
    )  
    this.consultationForm.reset()
    this.submitted = false ;
    this.afficheConsultation(this.idmed,this.id);
   })
}

ajoutInformationGeneral(){
 Swal.fire(
      'Bien',
      'les informations générals du patient a été mise a jour !',
      'success'
    )  
  this.patientService.modifierPatient(this.patientForm.value).subscribe(res=>{
   
    console.log("d5al ll fonction")

    console.log(res)
  })
}
recupereInfoPatient(_id,taille,poids,groupeSanguin,allergie,traitementEncours,maladie,tel1,tel2){ 
  // hethi t5alini ne5ou les information lkol li7achti bihom  bech mn be3ed fl modification neste3mlhom 
  // this._id=_id;
  this.patientForm.get('taille').setValue(taille);
  this.patientForm.get('poids').setValue(poids);
  this.patientForm.get('groupeSanguin').setValue(groupeSanguin);
  this.patientForm.get('allergie').setValue(allergie);
  this.patientForm.get('traitementEncours').setValue(traitementEncours);
  this.patientForm.get('maladie').setValue(maladie);
  this.patientForm.get('tel1').setValue(tel1);
  this.patientForm.get('tel2').setValue(tel2);

  
}
}

