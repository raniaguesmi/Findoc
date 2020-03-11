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
import { AjouterMedecinComponent } from './ajouter-medecin/ajouter-medecin.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


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
    AjouterMedecinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
