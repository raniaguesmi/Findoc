import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcceuilComponent } from './home/acceuil/acceuil.component';
import { SignInComponent } from './sign-in/sign-in.component';


const routes: Routes = [
 {path:'signin',component:SignInComponent},
  {path:'',component:HomeComponent, children : [
 {path:'',component:AcceuilComponent},


    {path : 'gestionMedecins',
    loadChildren : './home/gerer-medecins/gerer-medecins.module#GererMedecinsModule'
    },

    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
