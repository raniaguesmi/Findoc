import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-liste-patients',
  templateUrl: './liste-patients.component.html',
  styleUrls: ['./liste-patients.component.css']
})
export class ListePatientsComponent implements OnInit {
  patients;
  data;
  utilisateur;
  idmedec;
  constructor(private patientService:PatientService) { }

  ngOnInit() {
    this.data=localStorage.getItem('user')
    this.utilisateur=JSON.parse(this.data)
   this.idmedec=this.utilisateur.idmed;
    this.listpatient(this.idmedec)
  }
  listpatient(id){
    this.patientService.listPatient(id).subscribe(res=>{
this.patients=res
console.log(this.patients)
    })
  }

}
