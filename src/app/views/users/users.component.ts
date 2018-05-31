import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"]
})
export class UsersComponent implements OnInit {
  public users = [];
  public user = {
    questions: []
  };
  public selectedUser: any = {};
  public userCreateModal;
  public userUpdateModal;

  constructor() {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    fetch(`${environment.apiUrl}/users`)
      .then(res => res.json())
      .then(users => (this.users = users))
      .catch(error => console.error(error));
  }

  onUserCreate() {
    fetch(`${environment.apiUrl}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.user)
    })
      .then(res => res.json())
      .then(user => {
        this.users.push(user);
        this.user = {
          questions: []
        }
      });
  }

  onUserEdit(event, user) {
    this.selectedUser = Object.assign({}, user);
  }

  onUserUpdate() {
    fetch(`${environment.apiUrl}/users/${this.selectedUser.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.selectedUser) 
    })
      .then(res => res.text())
      .then(res => {
        const index = this.users.findIndex(u => u.id === this.selectedUser.id);
        this.users[index] = Object.assign({}, this.selectedUser);
      })
      .catch(error => console.error(error)); 
  }

  onUserDelete(event, user) {
    fetch(`${environment.apiUrl}/users/${user.id}`, {
      method: "DELETE"
    })
      .then(res => res.text())
      .then(res => {
        const index = this.users.findIndex(u => u.id === user.id);
        this.users.splice(index, 1);
      })
      .catch(error => console.error(error));
  }
}
