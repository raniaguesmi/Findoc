import { Component, OnInit } from '@angular/core';
import { MedecinService } from 'src/app/service/medecin.service';
import { RdvService } from 'src/app/service/rdv.service';
import { PatientService } from 'src/app/service/patient.service';
import { SecretaireService } from 'src/app/service/secretaire.service';

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
  constructor(private medecinService:MedecinService,private rdvService:RdvService
    ,private patientService:PatientService,private secretaireService:SecretaireService) { }

  ngOnInit() {
        this.nombreMedecin();
        this.nombreRdvs();
        this.nombrePatients();
        this.nombreSecretaire();
        this.data=localStorage.getItem('user')
        this.utilisateur=JSON.parse(this.data)
       this.type=this.utilisateur.type
  }
  nombreMedecin(){
    this.medecinService.nbrMedecins().subscribe(res=>{
      this.nbrMed=res;
      console.log("nombre de medecins",this.nbrMed)

   })
  }

  nombreRdvs(){
    this.rdvService.nombreRdvs().subscribe(res=>{
      this.nbrRdvs=res;
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
}
