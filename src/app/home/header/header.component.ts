import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  utilisateur;
  data;
  type;
  constructor() { }

  ngOnInit() {
   this.data=localStorage.getItem('user')
// console.log('utli',JSON.parse(this.data))
this.utilisateur=JSON.parse(this.data)
this.type=this.utilisateur.type

  }
  logOut(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');

  }

}
