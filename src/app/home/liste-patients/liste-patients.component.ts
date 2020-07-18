import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-liste-patients',
  templateUrl: './liste-patients.component.html',
  styleUrls: ['./liste-patients.component.css']
})
export class ListePatientsComponent implements OnInit {
  patients;
  filtredPatients;
  data;
  utilisateur;
  idmedec;
  private _searchTerm :string;
  p;
  constructor(private patientService:PatientService) { }

  ngOnInit() {
    this.data=localStorage.getItem('user')
    this.utilisateur=JSON.parse(this.data)
   this.idmedec=this.utilisateur._id;
    this.listpatient(this.idmedec)
    // console.log(this.patients)
  }
  listpatient(id){
    this.patientService.listPatient(id).subscribe(res=>{
this.patients=res
    this.filtredPatients=this.patients

//JSON.stringify(JSON.parse(JSON.stringify(JSON.parse(JSON.stringify(res)).info)).nom)
// console.log(this.patients)
    })
  }
  get searchTerm():string{
    return this._searchTerm;
  }
  set searchTerm(value: string){
    this._searchTerm=value;
    this.filtredPatients=this.filtrePatients(value);
  }

  filtrePatients(searchString :string){
    return this.patients.filter(res=>
    (res.info.nom+" "+res.info.prenom).toLowerCase().indexOf(searchString.toLowerCase())!==-1);
    }

      // this.p=JSON.stringify(JSON.parse(JSON.stringify(res)).info),




}
