import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }
  login(user){
    return this.http.post(this.baseUrl+'/utilisateur/authentification',user);
  }
  sendEmail(email){
    return this.http.post(this.baseUrl+'/sendEmail',email)
  }
}
