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
  // patientParid(id){
  //   return this.http.get(this.baseUrl+'/patient/afficheParId/'+id)
  // }
  rdvParMedComplet(id){
    return this.http.get(this.baseUrl+'/rdv/afficheCompletParMed/'+id)
  }
}
