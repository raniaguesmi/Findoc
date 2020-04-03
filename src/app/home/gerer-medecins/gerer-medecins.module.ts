import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GererMedecinsRoutingModule } from './gerer-medecins-routing.module';
import { ListeMedecinsComponent } from './liste-medecins/liste-medecins.component';
import { ModifierMedecinComponent } from './modifier-medecin/modifier-medecin.component';
import { ProfileMedecinComponent } from './profile-medecin/profile-medecin.component';


@NgModule({
  declarations: [ListeMedecinsComponent, ModifierMedecinComponent, ProfileMedecinComponent, ],
  imports: [
    CommonModule,
    GererMedecinsRoutingModule
  ]
})
export class GererMedecinsModule { }
