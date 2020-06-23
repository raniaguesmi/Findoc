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
  nb=new Array(8);
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


  print(): void {
    let printContents=null, popupWin;
  //   for (var iter = 0; iter < 10; iter++) {
  //     printContents  =printContents+ document.getElementById('print-section').innerHTML +"  ";
  //     ;
  // }
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title> Le QR code du patient ${this.patient.nom} ${this.patient.prenom}</title>
          
        </head>
    <body onload="window.print();window.close()" >${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}


}
