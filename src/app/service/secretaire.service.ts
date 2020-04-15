import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SecretaireService {
  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  listeSecretaire(){
    return this.http.get(this.baseUrl+'/secretaire/afficher')
  }
  secretaireParMed(id){
    return this.http.get(this.baseUrl+'/secretaire/afficherParMedecin/'+id)
  }
  ajouterSecretaire(sec){
    return this.http.post(this.baseUrl+'/secretaire/ajouter',sec)
  }
  supprimerSecretaire(id){
    return this.http.delete(this.baseUrl+'/secretaire/supprimer/'+id)
  }
  modifierSecretaire(id,sec){
    return this.http.put(this.baseUrl+'/secretaire/modifier/'+id,sec)
  }
}
