import { Component, OnInit } from '@angular/core';
import { MedecinService } from 'src/app/service/medecin.service';

@Component({
  selector: 'app-liste-medecins',
  templateUrl: './liste-medecins.component.html',
  styleUrls: ['./liste-medecins.component.css']
})
export class ListeMedecinsComponent implements OnInit {
listeMedecins;
  constructor(private medecinService:MedecinService) { }

  ngOnInit() {
    this.listeMedecin();
  }
listeMedecin(){
  this.medecinService.listeMedecins().subscribe(res=>{this.listeMedecins=res;})
}
}
