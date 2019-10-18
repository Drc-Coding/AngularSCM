

import { PatientEditService } from './patientEdit.service';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';



@Component({
  selector: 'app-patientedit',
  templateUrl: './patientEdit.component.html',
  providers: [PatientEditService]
})
export class PatientEditComponent implements OnInit {

  private sub: any;

  id: number;
  countries : any;

  states = [];

  patientEdit: FormGroup;


  constructor(private userService: PatientEditService, private formBuilder: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
    });




    this.patientEdit = this.formBuilder.group({

      id: ['', [Validators.required]],
      customerCode: ['', [Validators.required]],
      patientName: ['', [Validators.required]],
      familyName:['', []],
      gender: ['', []],
      age:['', []],
      address1: ['', [Validators.required]],

      city: ['', []],
      country: ['', []],
      state: ['', []],
      pincode: ['', []],
      phoneNumber: ['', []],
      mobileNumber:['', []],
      emailid: ['', []],
      alertType:['', []],
      customerType: ['', []],
    });


     this.userService.patientEdit(this.id).subscribe(data => this.patientEdit.patchValue(data),
      err => {
        console.log('Error occured');
      });


      this.userService.countryView().subscribe(data => this.countries = data,
      err => {
        console.log('Error occured');
      });


  }

  onSubmit() {
    alert(JSON.stringify(this.patientEdit.value));



    this.userService.patientSave(JSON.stringify(this.patientEdit.value));
    alert(JSON.stringify(this.countries));




  }


  chg() {


 this.userService.stateView(this.patientEdit.get('country').value).subscribe(data => this.states = data,
      errorCode => console.log(errorCode));

    //  alert(JSON.stringify(this.patientEdit.get('country').value));


  }

}
