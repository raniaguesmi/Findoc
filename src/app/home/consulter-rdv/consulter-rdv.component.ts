import { Component, OnInit } from '@angular/core';
import { RdvService } from 'src/app/service/rdv.service';

@Component({
  selector: 'app-consulter-rdv',
  templateUrl: './consulter-rdv.component.html',
  styleUrls: ['./consulter-rdv.component.css']
})
export class ConsulterRdvComponent implements OnInit {
  rdvs;
  data;
  utilisateur;
  idmedec;
  Date:String;
  constructor(private rdvService:RdvService) { }

  ngOnInit() {
    this.data=localStorage.getItem('user')
    this.utilisateur=JSON.parse(this.data)
   this.idmedec=this.utilisateur._id;
   this.listeRdvConfirmé(this.idmedec);
  }
  listeRdvConfirmé(id){
    this.rdvService.afficheRdvConfirmer(id).subscribe(res=>{
     this.rdvs=res;
    })
  }
  search(){
if(this.Date!=""){
  this.rdvs=this.rdvs.filter(res=>{
  return res.Date.match(this.Date)
})
}
else if(this.Date=""){ this.ngOnInit()}

  }
}
