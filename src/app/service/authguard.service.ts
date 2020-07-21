import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private  router:Router) { }
  canActivate(){
   // el methode hethi t5alini nchouf itha kan l token far8 manaha had mahou connecte manaha myet7elch el home mte3i 
    if (localStorage.getItem('token')==null){

      this.router.navigate([''])
      return false
    }
    return true

  }
//   What are Route Guards?
// Angular’s route guards are interfaces which can tell the router whether or not it should allow navigation to a 
// requested route. They make this decision by looking for a true or false return value from a class which implements
//  the given guard interface.
//  There are five different types of guards and each of them is called in a particular sequence. The router’s 
// behavior is modified differently depending on which guard is used. The guards are:
// CanActivate
// CanActivateChild
// CanDeactivate
// CanLoad
// Resolve
// for mor detail jamila read this articl https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
   
  
}
