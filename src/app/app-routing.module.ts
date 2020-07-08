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
import { ListeRdvComponent } from './home/liste-rdv/liste-rdv.component';
import { EmailComponent } from './home/email/email.component';
import { ConsulterRdvComponent } from './home/consulter-rdv/consulter-rdv.component';
import { PatientComponent } from './home/patient/patient.component';
import { ListePatientsComponent } from './home/liste-patients/liste-patients.component';
import { ReclamationsComponent } from './home/reclamations/reclamations.component';
import { ForgePasswordComponent } from './forge-password/forge-password.component';
import { ChangerMotdpasseComponent } from './home/changer-motdpasse/changer-motdpasse.component';


const routes: Routes = [
 {path:'',component:SignInComponent},
 {path:'motDePasse',component:ForgePasswordComponent},
{path:'acceuil',component:HomeComponent, canActivate:[AuthgradService],children : [
           {path:'',component:AcceuilComponent},
           {path : '',loadChildren : './home/gerer-medecins/gerer-medecins.module#GererMedecinsModule'},
           {path:'specialite',component:SpecialiteComponent ,canActivate:[AuthgradService]},
           {path:'secretaire',component:GererSecretaireComponent, canActivate:[AuthgradService]},
           {path : 'profile/:id', component :ProfileMedecinComponent},
           {path : 'modifierProfile/:id', component : ModifierMedecinComponent},
           {path:'rendez-vous',component:ListeRdvComponent},
           {path:'email',component: EmailComponent},
           {path:'consulterRdv',component: ConsulterRdvComponent },
           {path:'consulterRdv/patient/:id',component: PatientComponent},
           {path:'listePatient',component: ListePatientsComponent},
           {path:'messages/:id',component: ReclamationsComponent},
           {path:'changerMotdpasse/:id',component: ChangerMotdpasseComponent},
           {path:'patient/:id',component: PatientComponent},


    ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
