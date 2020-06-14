import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RdvService {
  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  rdvParMed(id){
    return this.http.get(this.baseUrl+'/rdv/rdvParMed/'+id)
  }
 
  rdvParMedComplet(id){
    return this.http.get(this.baseUrl+'/rdv/afficheCompletParMed/'+id)
  }
  ajouterRdv(rdv){
    return this.http.post(this.baseUrl+'/rdv/ajouter',rdv)
  }
  afficheRdvAttente(id){
    return this.http.get(this.baseUrl+'/rdv/afficheRdvAttente/'+id)
  }
  supprimerRdv(id){
    return this.http.delete(this.baseUrl+'/rdv/supprimer/'+id)

  }
  afficheRdvConfirmer(id){
    return this.http.get(this.baseUrl+'/rdv/afficheRDVconfirme/'+id)
  }
  reporterRdv(id,rdv){
    return this.http.put(this.baseUrl+'/rdv/reporterRdv/'+id,rdv)
  }
  accepterRdv(id){
    return this.http.get(this.baseUrl+'/rdv/accepterRdv/'+id)
  }
}
