import { Component, OnInit } from '@angular/core';
import { MedecinService } from 'src/app/service/medecin.service';
import { RdvService } from 'src/app/service/rdv.service';
import { PatientService } from 'src/app/service/patient.service';
import { SecretaireService } from 'src/app/service/secretaire.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {
  listeMedecins;
  data;
  utilisateur;
  type;
  nbrMed;
  nbrRdvs;
  nbrSec;
  nbrpatient;
  rdvPasse;rdvAvenir;Rdvtoday;
  idmed;
  rdvs;idmed2;rdvs2;
  constructor(private medecinService:MedecinService,private rdvService:RdvService
    ,private patientService:PatientService,private secretaireService:SecretaireService) { }

  ngOnInit() {

        this.nombreMedecin();
        this.nombreRdvs();
        this.nombrePatients();
        this.nombreSecretaire();
        this.data=localStorage.getItem('user')
        this.utilisateur=JSON.parse(this.data)
        this.idmed=this.utilisateur._id
      this.idmed2=this.utilisateur.idmed
       this.type=this.utilisateur.type
       console.log(this.idmed)
       this.nombreRdvsAvenirParMed(this.idmed)
       this.nombreRdvsPasserParMed(this.idmed)
       this.nombreRdvstodayParMed(this.idmed)
       this.nombreRdvstodayParMed(this.idmed)

this.listeRdvtoday(this.idmed)
this.listeRdvtoday2(this.idmed2)


  }
  nombreMedecin(){
    this.medecinService.nbrMedecins().subscribe(res=>{
      this.nbrMed=res;
      console.log("nombre de medecins",this.nbrMed)
      // location.reload();

   })
  }
  nombreRdvs(){
    this.rdvService.nombreRdvs().subscribe(res=>{
      this.nbrRdvs=res;
   })
  }
  nombreRdvsAvenirParMed(id){
    this.rdvService.nombreRdvsAvenir(id).subscribe(res=>{
      this.rdvAvenir=res;
      console.log(this.rdvAvenir)
   })
  }
  nombreRdvsPasserParMed(id){
    this.rdvService.nombreRdvsPasser(id).subscribe(res=>{
      this.rdvPasse=res;
   })
  }
  nombreRdvstodayParMed(id){
    this.rdvService.nombreRdvsAvenir(id).subscribe(res=>{
      this.Rdvtoday=res;
   })
  }

  nombrePatients(){
    this.patientService.nbrPatients().subscribe(res=>{
      this.nbrpatient=res;
   })
  }
  nombreSecretaire(){
    this.secretaireService.nbrSecretaire().subscribe(res=>{
      this.nbrSec=res;
   })
  }
  listRdvParJour(id){
    this.rdvService.RdvsAujourdhuit(id).subscribe(res=>{
this.rdvs=res
console.log(this.rdvs)
    })
  }
  listeRdvtoday(id){
    this.rdvService.RdvsAujourdhuit(id).subscribe(res=>{
     this.rdvs=res;
    })
  }
  listeRdvtoday2(id){
    this.rdvService.RdvsAujourdhuit(id).subscribe(res=>{
     this.rdvs2=res;
    })
  }
}
//    location.reload();
