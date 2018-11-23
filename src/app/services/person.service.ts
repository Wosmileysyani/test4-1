import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  Url = 'http://chapayom.codehansa.com/crud_person.php?';
  constructor(private http: HttpClient) { }

  getPerson() {
    return this.http.get<Person[]>(this.Url + 'cmd=select');
  }

  getOnePerson(personID) {
    return this.http.get<Person[]>(this.Url + 'cmd=select&personID=' + personID);
  }

  deletePerson(data) {
    const promise = new Promise((resolve, reject) => {
      this.http.post(this.Url + 'cmd=delete', data)
        .toPromise()
        .then(
          res => {
            resolve(data);
          }
        );
    });
    return promise;
  }

  CreatePerson(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = this.Url + 'cmd=insert';
      this.http.post(apiURL, data)
        .toPromise()
        .then(
          res => {
            resolve(data);
          }
        );
    });
    return promise;
  }

  updatePerson(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = this.Url + 'cmd=update';
      this.http.post(apiURL, data)
        .toPromise()
        .then(
          res => {
            resolve(data);
          }
        );
    });
    return promise;
  }

}
