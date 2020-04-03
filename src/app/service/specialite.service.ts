import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {
  baseUrl = environment.baseUrl
  
  constructor(private http: HttpClient ) { }

  listeSpecialite(){
    return this.http.get(this.baseUrl +'/specialite/afficher')
  }
  ajouterSpecialite(spc){
    return this.http.post(this.baseUrl +'/specialite/ajouter' ,spc)
  }
 
  modifierSpecialite(_id,specialite){
    return this.http.put(this.baseUrl+'/specialite/modifier/'+_id,specialite)
   }
supprimerSpecialite(_id){
  return this.http.delete(this.baseUrl+'/specialite/supprimer/'+_id)
}


}
