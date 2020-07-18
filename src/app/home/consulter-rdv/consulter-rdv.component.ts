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
  nom:String;
  private _searchTerm :string;
  filtredRdvs;
  constructor(private rdvService:RdvService) { }

  ngOnInit() {
    this.data=localStorage.getItem('user')
    this.utilisateur=JSON.parse(this.data)
   this.idmedec=this.utilisateur._id;
   this.listeRdvConfirmé(this.idmedec);  
      // console.log("infonom",this.rdvs._id)


  }
  listeRdvConfirmé(id){
    this.rdvService.afficheRdvConfirmer(id).subscribe(res=>{
     this.rdvs=res;
     this.filtredRdvs=this.rdvs
    })
  }
  get searchTerm():string{
    return this._searchTerm;
  }
  set searchTerm(value: string){
    this._searchTerm=value;
    this.filtredRdvs=this.filtreRdvs(value);
  }

  filtreRdvs(searchString :string){
    return this.rdvs.filter(res=>
    (res.info.nom+" "+res.info.prenom).toLowerCase().indexOf(searchString.toLowerCase())!==-1);
    }

}