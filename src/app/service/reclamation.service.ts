import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  reclamation(id){
    return this.http.get(this.baseUrl+'/message/reclamationParMedecin/'+id)
  }
  reclamationParId(idmsg){
    return this.http.get(this.baseUrl+'/message/reclamationParId/'+idmsg)
  }
}
