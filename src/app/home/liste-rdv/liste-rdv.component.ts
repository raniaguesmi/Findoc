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
   this.idmedec=this.utilisateur.idmed;
    this.listeRdvParMed(this.idmedec)

  }
listeRdvParMed(id){
  this.rdvService.rdvParMedComplet(id).subscribe(res=>{
   this.rdvs=res;
  })
}


}
