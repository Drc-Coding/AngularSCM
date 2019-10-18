import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AddbranchService } from './addBranch.services';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { all } from 'q';
import { AppComponent } from '../../app.component';

const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
const emailpattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
@Component({
  selector: 'app-addBranch',
  templateUrl: './addBranch.component.html',
  //  styleUrls: ['./addBranch.component.css'],
  providers: [AddbranchService, NotificationsComponent]
})

export class AddbranchComponent implements OnInit {
  branchForm: FormGroup;
  submitted = false;
  productinfo = [];
  countries = [];
  companies = [];
  domain = [];
  subdomain = [];
  edition = [];
  states = [];
  cities = [];
  ccode = [];
  flag: boolean = false;
  isExist: boolean = false;

  constructor(private branchinfo: AddbranchService, private router: Router, private notificationsComponent: NotificationsComponent, private appComponent: AppComponent) {
    let companyrefid = new FormControl('', Validators.required);
    let branchname = new FormControl('', Validators.required);
    let shortname = new FormControl('', Validators.required);
    let contactperson = new FormControl();
    let desgination = new FormControl();
    let gstno = new FormControl();
    let tinno = new FormControl();
    let cstno = new FormControl();
    let panno = new FormControl();
    let mobileno = new FormControl('', [Validators.pattern(textnumbers)]);
    let address1 = new FormControl();
    let address2 = new FormControl();
    let state = new FormControl();
    let country = new FormControl();
    let city = new FormControl();
    let pincode = new FormControl();
    let phoneno = new FormControl();
    let email = new FormControl('', [Validators.pattern(emailpattern)]);
    let countrycode = new FormControl();
    let createdby = new FormControl();
    let clientcdate = new FormControl();
    
    this.branchForm = new FormGroup({
      companyrefid: companyrefid,
      branchname: branchname,
      shortname: shortname,
      contactperson: contactperson,
      desgination: desgination,
      gstno: gstno,
      tinno: tinno,
      cstno: cstno,
      panno: panno,
      mobileno: mobileno,
      address1: address1,
      address2: address2,
      state: state,
      country: country,
      city: city,
      pincode: pincode,
      phoneno: phoneno,
      email: email,
      countrycode: countrycode,
      
      createdby: createdby,
      clientcdate: clientcdate
    });

  }


  ngOnInit() {
    this.branchForm.get('companyrefid').setValue('opt1');
    this.branchForm.get('country').setValue('opt1');
    this.branchForm.get('state').setValue('opt1');
    this.branchForm.get('city').setValue('opt1');
    this.branchForm.get('countrycode').setValue('opt1');

    //get Country
    this.branchinfo.getCountry().subscribe(data => this.countries = data,
      err => {
        console.log('Error Occured ');
      });

    //selva
    //alert(AppComponent.usertype);
    //alert(AppComponent.usertype =='\"SuperAdmin\" ');
    if (AppComponent.usertype == "\"SuperAdmin\" ") {

      this.branchinfo.getAllCompany().subscribe(data => this.companies = data,
        err => {
          console.log('Error Occured ');
        });
    }
    else {
      this.branchinfo.getCompany(AppComponent.companyID).subscribe(data => this.companies = data,

        err => {
          console.log('Error Occured ');
        });
    }
    this.branchForm.get('createdby').setValue(AppComponent.userID);

    this.branchForm.get('clientcdate').setValue(AppComponent.date);

  }


  getState() {
    //Get States 
    this.branchinfo.getStates(this.branchForm.get('country').value).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      });
    //Get Country Code
    this.branchinfo.getCountrycode(this.branchForm.get('country').value).subscribe(data => this.ccode = data,

      err => {
        console.log('Error Occured Country Code');
      });

  }
  getCity() {
    //Get States 
    this.branchinfo.getCities(this.branchForm.get('state').value).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get States');
      });


  }


  onSubmit() {
    this.submitted = true;
    this.flag = this.branchValidation();
    if (this.flag == true) {
      this.branchinfo.isExistBranch(this.branchForm.get('branchname').value, AppComponent.companyID).subscribe(data => {
        //alert(data);
        if (data == true) {
          //alert(data);      
          this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'EMPLOYEE NAME IS ALREADY EXIST', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
        } else {
          this.createRecord();
        }
      });
    }
  }

  private branchValidation(): boolean {
    if (this.branchForm.get('companyrefid').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'COMPANY IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    } if (this.branchForm.get('country').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'COUNTRY  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    } if (this.branchForm.get('state').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'STATE  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    } if (this.branchForm.get('city').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'CITY  IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }

    return true;
  }

  private createRecord(): void {
    // alert(JSON.stringify(this.branchForm.value));
    this.branchinfo.createBranch(JSON.stringify(this.branchForm.value));
    //window.location.href = '/Registration/ViewBranchRegistration';
    this.notificationsComponent.addToast({title:'SUCESS MESSAGE', msg:'DATA SAVED SUCESSFULLY.', timeout: 5000, theme:'default', position:'bottom-right', type:'success'});
      setTimeout(() => {
        this.router.navigate(['Registration/ViewBranchRegistration']);
      }, 2000);
  
  }
}
