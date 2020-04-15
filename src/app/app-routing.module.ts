import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcceuilComponent } from './home/acceuil/acceuil.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SpecialiteComponent } from './home/specialite/specialite.component';
import { GererSecretaireComponent } from './home/gerer-secretaire/gerer-secretaire.component';
import { AuthgradService } from './service/authgrad.service';
import { ProfileMedecinComponent } from './home/profile-medecin/profile-medecin.component';
import { ModifierMedecinComponent } from './home/modifier-medecin/modifier-medecin.component';


const routes: Routes = [
 {path:'',component:SignInComponent},

{path:'acceuil',component:HomeComponent, canActivate:[AuthgradService],children : [
      {path:'',component:AcceuilComponent},
      {path : 'gestionMedecins',
         loadChildren : './home/gerer-medecins/gerer-medecins.module#GererMedecinsModule'},
      {path : 'gestionRdv',
         loadChildren : './home/gerer-rdv/gerer-rdv.module#GererRdvModule'},
         {path:'specialite',component:SpecialiteComponent ,canActivate:[AuthgradService]},
         {path:'secretaire',component:GererSecretaireComponent, canActivate:[AuthgradService]},
         {path : 'profile/:id', component :ProfileMedecinComponent},
         {path : 'modifierProfile/:id', component : ModifierMedecinComponent},

    ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
