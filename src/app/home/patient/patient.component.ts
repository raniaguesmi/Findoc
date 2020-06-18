import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  id;
  patient;
  constructor( private patientService:PatientService,private activroute:ActivatedRoute) { 
    this.id=this.activroute.params['value']['id']
    this.afficheParId(this.id)
  }

  ngOnInit() {
    
  }
  afficheParId(id){
    console.log(this.id)
  this.patientService.afficheParId(id).subscribe(res=>{
    this.patient=res;
  })
 
  }

}
