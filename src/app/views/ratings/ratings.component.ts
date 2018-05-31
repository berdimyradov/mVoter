import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

  topUnivers = [];
  
  constructor() { }

  ngOnInit() {
    this.getTop100Universities();
  }

  public getTop100Universities() {
    fetch(`${environment.apiUrl}/universities`)
    .then(res => res.json())
    .then(universities => {
      universities.sort((one, other) => {
        if (one.votesCount < other.votesCount)
          return 1;
        return -1;
      });

      this.topUnivers = universities.slice(0, 100);
      console.log(this.topUnivers);
    })
    .catch(error => console.error(error));
  }
}
