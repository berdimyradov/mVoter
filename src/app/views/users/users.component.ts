import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users = [];
  
  constructor() { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    fetch(`${environment.apiUrl}/users`)
    .then(res => res.json())
    .then(users => this.users = users)
    .catch(error => console.error(error));
  }

  onUserEdit(event, user) {

  }

  onUserDelete(event, user) {
    fetch(`${environment.apiUrl}/users/${user.id}`, {
      method: 'DELETE'
    })
    .then(res => res.text())
    .then(res => {
      const index = this.users.findIndex(u => u.id === user.id);
      this.users.splice(index, 1);
    })
    .catch(error => console.error(error));
  }

}
