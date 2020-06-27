import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsulataionService {
  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

affiche(idmed,idpat)
{
  return this.http.get(this.baseUrl+'/consultation/afficheParMed/'+idmed+'/'+idpat);
}

ajouter(consultation){
  return this.http.post(this.baseUrl+'/consultation/ajouter',consultation)
}

supprimer(id){
  return this.http.delete(this.baseUrl+'/consultation/supprimer/'+id)

}
modifer(id,consulatation){
  return this.http.put(this.baseUrl+'/consultation/modifier/'+id,consulatation)
}



}
