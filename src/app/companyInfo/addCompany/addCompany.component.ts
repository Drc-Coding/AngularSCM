import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AddcompanyService } from './addCompany.services';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
@Component({
  /**@Author Ajith Kumar**/
  selector: 'app-addCompany',
  templateUrl: './addCompany.component.html',
  styleUrls: ['./addCompany.component.css'],
  providers: [AddcompanyService, NotificationsComponent]
})

export class AddcompanyComponent implements OnInit {
  companyForm: FormGroup;
  submitted = false;
  productinfo = [];
  countries = [];
  domain = [];
  subdomain = [];
  edition = [];
  states = [];
  cities = [];
  ccode = [];
  lstore = [];
  textPattern = "[a-zA-Z][a-zA-Z ]+";
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private cmpinfo: AddcompanyService, private router: Router, private notificationsComponent: NotificationsComponent) {
    let selectedState;
    let companyname = new FormControl('', Validators.required);
    let shortname = new FormControl('', Validators.required);
    let contactperson = new FormControl();
    let desgination = new FormControl();
    let gst = new FormControl();
    let tin = new FormControl();
    let cstNumber = new FormControl();
    let pan = new FormControl();
    let mobileno = new FormControl('', Validators.pattern(this.textnumbers));
    let addressone = new FormControl();
    let addresstwo = new FormControl();
    let state = new FormControl();
    let country = new FormControl();
    let city = new FormControl();
    let pincode = new FormControl();
    let phonenumber = new FormControl('', Validators.pattern(this.textnumbers));
    let email = new FormControl('', Validators.pattern(this.emailPattern));
    let productname = new FormControl();
    let domain = new FormControl();
    let subdomain = new FormControl();
    let editiontype = new FormControl();
    let username = new FormControl();
    let password = new FormControl();
    let countrycode = new FormControl();
    let cmprefid = new FormControl();
    let branchrefid = new FormControl();
    let warerefid = new FormControl();
    let shoprefid = new FormControl();
    let clientcdate = new FormControl();
    let createdby = new FormControl();
    let registerflag = new FormControl();
    this.companyForm = new FormGroup({
      companyname: companyname,
      shortname: shortname,
      contactperson: contactperson,
      desgination: desgination,
      gstno: gst,
      tinno: tin,
      cstno: cstNumber,
      panno: pan,
      mobileno: mobileno,
      address1: addressone,
      address2: addresstwo,
      state: state,
      country: country,
      city: city,
      pincode: pincode,
      phoneno: phonenumber,
      email: email,
      productrefid: productname,
      domainrefid: domain,
      subdomainrefid: subdomain,
      editionrefid: editiontype,
      username: username,
      password: password,
      countrycode: countrycode,
      clientcdate: clientcdate,
      createdby:createdby,
      registerflag: registerflag
    });

  }

  ngOnInit() {

    
    this.cmpinfo.getCountry().subscribe(data => this.countries = data,
      err => {
        console.log('Error Occured ');
      });

    this.companyForm.get('country').setValue("0");
    this.companyForm.get('state').setValue("0");
    this.companyForm.get('city').setValue("0");
    this.companyForm.get('countrycode').setValue("0");
    this.companyForm.get('productrefid').setValue("0");
    this.companyForm.get('domainrefid').setValue("0");
    this.companyForm.get('subdomainrefid').setValue("0");
    this.companyForm.get('editionrefid').setValue("0");

    
    this.companyForm.get('registerflag').setValue('0');
  }


  getValues() {
    //get Product Information
    this.cmpinfo.getProductinfo(this.companyForm.get('country').value).subscribe(data => this.productinfo = data,
      err => {
        console.log('Error Occured ProductInfo');
      });
  }

  getDomain() {
    //Get Domain Information 
    this.cmpinfo.getDomainInfo(this.companyForm.get('country').value, this.companyForm.get('productrefid').value).subscribe(data => this.domain = data,
      err => {
        console.log('Error Occured getDomain');
      });
  }
  getsubDomain() {
    //Get Sub Domain Information 
    this.cmpinfo.getsubDomainInfo(this.companyForm.get('country').value, this.companyForm.get('productrefid').value, this.companyForm.get('domainrefid').value).subscribe(data => this.subdomain = data,
      err => {
        console.log('Error Occured getsubDomain');
      });
  }

  getEdition() {
    //Get Edition from Product and Doamin
    this.cmpinfo.getEdition(this.companyForm.get('country').value, this.companyForm.get('productrefid').value, this.companyForm.get('domainrefid').value, this.companyForm.get('subdomainrefid').value).subscribe(data => this.edition = data,
      err => {
        console.log('Error Occured getsubDomain');
      });
  }

  getState() {
    //Get States 
    this.cmpinfo.getStates(this.companyForm.get('country').value).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      });

    //Get Country Code
    this.cmpinfo.getCountrycode(this.companyForm.get('country').value).subscribe(data => {
      this.ccode = data,
        this.companyForm.get('countrycode').setValue(data.toString());
    },
      err => {
        console.log('Error Occured Country Code');
      });


  }
  getCity() {
    //Get City 
    this.cmpinfo.getCity(this.companyForm.get('state').value).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get City');
      });
  }

  onSubmit() {
    this.submitted = true;
    this.createRecord();
  }
  public retrunFlag: boolean = false;
  
  private createRecord(): void {
    this.retrunFlag = this.basicValidation();
    if (this.retrunFlag == true) {
      this.companyForm.get('clientcdate').setValue(AppComponent.date);
      this.companyForm.get('createdby').setValue(AppComponent.userID);
      this.cmpinfo.createCompany(JSON.stringify(this.companyForm.value));
      this.notificationsComponent.addToast({title:'SUCESS MESSAGE', msg:'DATA SAVED SUCESSFULLY.', timeout: 5000, theme:'default', position:'bottom-right', type:'success'});
      setTimeout(() => {
        this.router.navigate(['Registration/ViewCompanyRegistration']);
      }, 2000);
    }
  }

  basicValidation(): boolean {
    if (this.companyForm.get('email').value == '' || this.companyForm.get('email').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required E-mail Address..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.companyForm.get('mobileno').value == '' || this.companyForm.get('mobileno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Mobile Number..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.companyForm.get('address1').value == '' || this.companyForm.get('address1').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Address..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.companyForm.get('country').value == '0' || this.companyForm.get('country').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Country Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.companyForm.get('state').value == '0' || this.companyForm.get('state').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required State Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.companyForm.get('city').value == '0' || this.companyForm.get('city').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required City Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    if (this.companyForm.get('productrefid').value == '0' || this.companyForm.get('productrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Product Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.companyForm.get('domainrefid').value == '0' || this.companyForm.get('domainrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Domain Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.companyForm.get('subdomainrefid').value == '0' || this.companyForm.get('subdomainrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Sub-Domain Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.companyForm.get('editionrefid').value == '0' || this.companyForm.get('editionrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Edition Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.companyForm.get('username').value == '' || this.companyForm.get('username').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required User Name..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.companyForm.get('password').value == '' || this.companyForm.get('password').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Required Password..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

}