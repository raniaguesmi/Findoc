import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }
  listeMedecins() {
    return this.http.get(this.baseUrl + '/medecin/listeMedecins')
  }
}
