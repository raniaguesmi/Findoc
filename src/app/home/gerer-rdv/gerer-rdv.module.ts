import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GererRdvRoutingModule } from './gerer-rdv-routing.module';
import { AjouterRdvComponent } from './ajouter-rdv/ajouter-rdv.component';
import { ListeRdvComponent } from './liste-rdv/liste-rdv.component';


@NgModule({
  declarations: [AjouterRdvComponent, ListeRdvComponent],
  imports: [
    CommonModule,
    GererRdvRoutingModule
  ]
})
export class GererRdvModule { }
