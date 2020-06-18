import { Component, OnInit } from '@angular/core';
import { MedecinService } from 'src/app/service/medecin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-medecin',
  templateUrl: './profile-medecin.component.html',
  styleUrls: ['./profile-medecin.component.css']
})
export class ProfileMedecinComponent implements OnInit {
medecin;
id;
image;
  constructor(private medecinService:MedecinService, private activroute:ActivatedRoute) {
    this.id=this.activroute.params['value']['id']
    this.afficheParId(this.id);
   }

  ngOnInit() {
  }

  afficheParId(id){
    console.log(this.id)
  this.medecinService.afficheParId(id).subscribe(res=>{
    this.medecin=res;
    this.image=this.medecin.image;
  })
 
  }

}
