import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.scss']
})
export class UniversitiesComponent implements OnInit {
  universities: any = [];

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
  
  onUniversityEdit(event, university) {

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
