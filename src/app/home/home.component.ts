import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  persons = [];
  errMsg: string;
  constructor(private personSV: PersonService,
    private route: Router) { }

  ngOnInit() {
    this.fetchPerson();
  }

  fetchPerson() {
    this.personSV.getPerson()
      .subscribe(
        data => this.persons = data,
        error => this.errMsg = error);
  }

  deletePerson(personID) {
    console.log(personID);
    const data = {
      personID: personID
    };
    this.personSV
      .deletePerson(data)
      .then(res => {
        this.fetchPerson();
      })
      .catch(err => this.errMsg = err);
  }

}
