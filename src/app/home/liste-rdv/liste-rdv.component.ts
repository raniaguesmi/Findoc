import { Component, OnInit } from '@angular/core';
import { RdvService } from 'src/app/service/rdv.service';

@Component({
  selector: 'app-liste-rdv',
  templateUrl: './liste-rdv.component.html',
  styleUrls: ['./liste-rdv.component.css']
})
export class ListeRdvComponent implements OnInit {
data;
idmedec;
utilisateur;
rdvs;
idPatient;
patient;
  constructor(private rdvService:RdvService) {
   
  }
  ngOnInit() {
    this.data=localStorage.getItem('user')
    this.utilisateur=JSON.parse(this.data)
   this.idmedec=this.utilisateur._id;
    this.listeRdvParMed(this.idmedec)

  }
listeRdvParMed(id){
  this.rdvService.rdvParMed(id).subscribe(res=>{
   this.rdvs=res;
   console.log('les rendez vous',this.rdvs)
this.idPatient=this.rdvs.patient;
// this.trouverPatient(this.idPatient)

console.log(this.idPatient)
  })
}
trouverPatient(id){
this.rdvService.patientParid(id).subscribe(res=>{
  this.patient=res;
  console.log(this.patient)
})
}

}
