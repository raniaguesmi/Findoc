import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/service/reclamation.service';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.css']
})
export class ReclamationsComponent implements OnInit {
  
  id;
  idmesg;
  message;
  // messageform:FormGroup
  formBuilder: any;
  constructor(private reclamationService:ReclamationService,private actroute:ActivatedRoute) { }

  ngOnInit() {
    //hethi pour recupere l id li jeni fl lien 
    this.idmesg=this.actroute.params['value']['id']

this.afficheMsgParId(this.idmesg)

  } 
    afficheMsgParId(idmsg){
      this.reclamationService.reclamationParId(idmsg).subscribe(res=>{
        this.message=res;
        console.log("bvfbvf",this.message)

       })
    }
}
