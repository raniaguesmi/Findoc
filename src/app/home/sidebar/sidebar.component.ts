import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  data;
  utilisateur;
  type;
  medecin:boolean
  constructor() { }

  ngOnInit() {
    this.data=localStorage.getItem('user')
    console.log('utli',JSON.parse(this.data))
    this.utilisateur=JSON.parse(this.data)
   this.type=this.utilisateur.type
  
  }

}
