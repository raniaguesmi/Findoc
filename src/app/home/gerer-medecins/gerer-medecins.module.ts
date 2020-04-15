import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GererMedecinsRoutingModule } from './gerer-medecins-routing.module';
import { ListeMedecinsComponent } from './liste-medecins/liste-medecins.component';
import { AjouterMedecinComponent } from './ajouter-medecin/ajouter-medecin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListeMedecinsComponent, AjouterMedecinComponent, ],
  imports: [
    CommonModule,
    GererMedecinsRoutingModule,
    FormsModule,    //added here too
    ReactiveFormsModule //added here too
  ]
})
export class GererMedecinsModule { }
