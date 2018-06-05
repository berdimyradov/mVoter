import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.scss']
})
export class UniversitiesComponent implements OnInit {
  universities: any = [];
  university: any = {};
  public selectedUniversity: any = {};
  public universityCreateModal;
  public universityUpdateModal;

  constructor() { }

  ngOnInit() {
    this.getUniversities();
  }

  getUniversities() {
    fetch(`${environment.apiUrl}/universities`)
    .then(res => res.json())
    .then(universities => this.universities = universities)
    .catch(error => console.error(error));
  }

  onUniversityCreate() {
	this.university.votesCount = 0;
    fetch(`${environment.apiUrl}/universities`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.university)
    })
      .then(res => res.json())
      .then(u=> {
        this.universities.push(u);
        this.university = {};
      });
  }
  
  onUniversityEdit(event, university) {
    this.selectedUniversity = Object.assign({}, university);
  }

  onUniversityUpdate() {
    fetch(`${environment.apiUrl}/universities/${this.selectedUniversity.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.university) 
    })
      .then(res => res.text())
      .then(res => {
        const index = this.universities.findIndex(u => u.id === this.selectedUniversity.id);
        this.universities[index] = Object.assign({}, this.selectedUniversity);
      })
      .catch(error => console.error(error)); 
  }

  onUniversityDelete(event, university) {
    fetch(`${environment.apiUrl}/universities/${university.id}`, {
      method: 'DELETE'
    })
    .then(res => res.text())
    .then(res => {
      const index = this.universities.findIndex(u => u.id === university.id);
      this.universities.splice(index, 1);
    })
    .catch(error => console.error(error));
  }
}
