import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeMedecinsComponent } from './liste-medecins/liste-medecins.component';
import { AjouterMedecinComponent } from './ajouter-medecin/ajouter-medecin.component';


const routes: Routes = [
  {path : 'listeMedecins', component : ListeMedecinsComponent},
 {path : 'ajouterMedecin', component : AjouterMedecinComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GererMedecinsRoutingModule { }
