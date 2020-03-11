import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjouterRdvComponent } from './ajouter-rdv/ajouter-rdv.component';
import { ListeRdvComponent } from './liste-rdv/liste-rdv.component';


const routes: Routes = [
  {path :"ajouterRdv", component : AjouterRdvComponent},
  {path :"listeRdv", component : ListeRdvComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GererRdvRoutingModule { }
