import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcceuilComponent } from './home/acceuil/acceuil.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AjouterMedecinComponent } from './ajouter-medecin/ajouter-medecin.component';


const routes: Routes = [
 {path:'signin',component:SignInComponent},
 {path : 'signup', component : AjouterMedecinComponent},

{path:'',component:HomeComponent, children : [
      {path:'',component:AcceuilComponent},
      {path : 'gestionMedecins',
         loadChildren : './home/gerer-medecins/gerer-medecins.module#GererMedecinsModule'},
      {path : 'gestionRdv',
         loadChildren : './home/gerer-rdv/gerer-rdv.module#GererRdvModule'},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
