import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {

  universities = [];

  private currentUserId: number;
  
  constructor() { }

  ngOnInit() {
    this.getUniversities();
    this.loadCurrentUserId();
  }

  private loadCurrentUserId() {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser'))['id'];
  }
  public getUniversities() {
    fetch(`${environment.apiUrl}/universities`)
    .then(res => res.json())
    .then(universities => this.universities = universities)
    .catch(error => console.error(error));
  }

  public onVote(index) {
    console.log(index);

    this.universities[index].votesCount++;

    fetch(`${environment.apiUrl}/universities/${this.universities[index].id}`, {
      method: 'DELETE'
    })
    .then(res => res.text())
    .then(res => {
      fetch(`${environment.apiUrl}/universities`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(this.universities[index]),
      });

      this.setVoted();
    })
    .catch(error => console.error(error));
  }

  private setVoted() {
    let usersThatVoted = [];

    if (localStorage.getItem('votedMotherFuckers')) {
      usersThatVoted = JSON.parse(localStorage.getItem('votedMotherFuckers'));
    }

    usersThatVoted.push(this.currentUserId);
    let str = JSON.stringify(usersThatVoted);

    localStorage.setItem('votedMotherFuckers', str);
  }

  private getVoted() {
    let voted = [];

    if (localStorage.getItem('votedMotherFuckers')) {
      voted = JSON.parse(localStorage.getItem('votedMotherFuckers'));
    }

    return voted;
  }

  hasMotherFuckerVoted(): boolean {
    const votedMotherFuckers = this.getVoted();
    return votedMotherFuckers.indexOf(this.currentUserId) > -1;
  }

}
