import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModifierMedecinComponent } from './modifier-medecin/modifier-medecin.component';
import { ListeMedecinsComponent } from './liste-medecins/liste-medecins.component';
import { ProfileMedecinComponent } from './profile-medecin/profile-medecin.component';


const routes: Routes = [
  {path : 'listeMedecins', component : ListeMedecinsComponent},
  {path : 'modifierMedecin', component : ModifierMedecinComponent},
  {path : 'profile', component : ProfileMedecinComponent},
 // {path : 'ajouterMedecin', component : AjouterMedecinComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GererMedecinsRoutingModule { }
