import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, EmailValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  errorMsg: string;
  form: FormGroup;
  personID: any;
  items: any;
  errMsg: string;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private personSV: PersonService,
    private activatedRouter: ActivatedRoute
  ) {
    this.initialCrateFormData(),
      this.activatedRouter.params.forEach(
        params => {
          this.personID = params.id;
        }
      ),
      this.initialUpdateFormData();
  }

  ngOnInit() {

  }

  private initialCrateFormData() {
    this.form = this.builder.group({
      personID: [''],
      citizenID: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  private initialUpdateFormData() {
    if (!this.personID) { return; }
    this.personSV.getOnePerson(this.personID)
      .subscribe((data => {
        this.items = data;
        const form = this.form;
        form.controls['personID'].setValue(this.items.rs[0].personID);
        form.controls['citizenID'].setValue(this.items.rs[0].citizenID);
        form.controls['name'].setValue(this.items.rs[0].name);
        form.controls['lastname'].setValue(this.items.rs[0].lastname);
        form.controls['email'].setValue(this.items.rs[0].email);

      }));

  }
  onSubmit() {
    const patt = /^(([^<>()\[\]\.,;:\s@\”]+(\.[^<>()\[\]\.,;:\s@\”]+)*)|(\”.+\”))@(([^<>()[\]\.,;:\s@\”]+\.)+[^<>()[\]\.,;:\s@\”]{2,})$/i;
    if (this.form.invalid) {
      console.log('ข้อมูลไม่ครบ');
    } else if (patt.test(this.form.get('email').value) === false) {
      console.log('email ผิดพลาด');
    } else if (this.form.get('personID').value === '') {
      this.personSV
        .CreatePerson(JSON.stringify(this.form.value))
        .then(res => {
          this.router.navigate(['/', 'home']);
        })
        .catch(err => this.errorMsg = err);
    } else if (this.form.get('personID').value !== '') {
      this.personSV
        .updatePerson(JSON.stringify(this.form.value))
        .then(res => {
          this.router.navigate(['/', 'home']);
        })
        .catch(err => this.errorMsg = err);
    }

  }
}
