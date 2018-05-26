import { Component } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "login.component.html"
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  constructor(private router: Router) {}

  onLogin(event) {
    Promise.all([
      fetch(`${environment.apiUrl}/admins`),
      fetch(`${environment.apiUrl}/users`)
    ]).then(async res => {
      const allUsers = Array.prototype.concat(
        await res[0].json(),
        await res[1].json()
      );

      const user = allUsers.find(user => (user.username === this.username && user.password === this.password))

      if(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      } else {
        alert('No such a user exist! Try again!')
      }
    });
  }
}
