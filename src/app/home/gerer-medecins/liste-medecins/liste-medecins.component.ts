import { Component, OnInit } from '@angular/core';
import { MedecinService } from 'src/app/service/medecin.service';
import Swal from 'sweetalert2';

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
supprimerMedecin(id){
  Swal.fire({
    title: 'vous êtes sûr  ?',
    text: "Vous ne pourrez pas revenir en arriére !",
  // type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3DABB6',
    cancelButtonColor: '#909193',
    confirmButtonText: 'Oui, Supprimer!',
    cancelButtonText:'Annuler'
  })
  .then((result) => {
    if (result.value) {
    return  this.medecinService.supprimerMedecin(id)
      .subscribe(res => {
          this.listeMedecins();

      })
    }
  })

}


  

}
