import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { LayoutComponent } from './home/layout/layout.component';
import { AcceuilComponent } from './home/acceuil/acceuil.component';
import { SignInComponent } from './sign-in/sign-in.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SpecialiteComponent } from './home/specialite/specialite.component';
import { GererSecretaireComponent } from './home/gerer-secretaire/gerer-secretaire.component';
import { ProfileMedecinComponent } from './home/profile-medecin/profile-medecin.component';
import { ModifierMedecinComponent } from './home/modifier-medecin/modifier-medecin.component';
import { ListeRdvComponent } from './home/liste-rdv/liste-rdv.component';
import { CalendarComponent } from './home/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EmailComponent } from './home/email/email.component';
import { ConsulterRdvComponent } from './home/consulter-rdv/consulter-rdv.component'; // for FullCalendar!



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LayoutComponent,
    AcceuilComponent,
    SignInComponent,
    SpecialiteComponent,
    GererSecretaireComponent,
    ProfileMedecinComponent,
    ModifierMedecinComponent,
    ListeRdvComponent,
    CalendarComponent,
    EmailComponent,
    ConsulterRdvComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // pour les requetes http vest obligatoir
    ReactiveFormsModule, // importitha ater jai utilisé formbuilder wel form groupe eli houma des fonctionalité mawjoudine fl module hethe
    FormsModule,
    FullCalendarModule // for FullCalendar!

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
