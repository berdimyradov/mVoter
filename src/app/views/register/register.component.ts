import { Component } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  username: string;
  password: string;
  confirmPassword: string;

  constructor(private router: Router) { }

  onCreateAccount(event) {
    if(this.username && this.password && this.confirmPassword) {
      if(this.password === this.confirmPassword) {
         fetch(`${environment.apiUrl}/users`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.username,
            username: this.username,
            password: this.password,
            questions: []
          }) 
         }) 
         .then(res => res.json())
         .then(user => {
           localStorage.setItem('currentUser', JSON.stringify(user));
           this.router.navigate(['/dashboard']);
         });

      } else {
        alert("ERROR! Passwords dont match");
      }
    } else {
      alert('ERROR! Fill the form inputs');
    }
  }

}
