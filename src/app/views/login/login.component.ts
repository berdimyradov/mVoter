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
      const admins = await res[0].json();
      const users = await res[1].json();

      const admin = admins.find(
        admin =>
          admin.username === this.username && admin.password === this.password
      );

      const user = users.find(
        user =>
          user.username === this.username && user.password === this.password
      );

      if (user || admin) {
        if (user) {
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              ...user,
              type: "user"
            })
          );
          this.router.navigate(["/user/ratings"]);
        }

        if (admin) {
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              ...admin,
              type: "admin"
            })
          );
          this.router.navigate(["/admin/users"]);
        }
      } else {
        alert("No such a user exist! Try again!");
      }
    });
  }

  onRegister(event) {
    this.router.navigate(["/register"]);
  }
}
