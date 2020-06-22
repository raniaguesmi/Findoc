import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }
  afficheParId(id)
  {
  return this.http.get(this.baseUrl+'/patient/afficheParId/'+id) 
  }
  listPatient(id){
    return this.http.get(this.baseUrl+'/rdv/listpatient/'+id)
  }
}
