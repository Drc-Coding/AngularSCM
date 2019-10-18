import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { shopeditService } from './editShop.services';
import { providers } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
@Component({
  /**@Author Ajith Kumar**/
  selector: 'app-editShop',
  templateUrl: './editShop.component.html',
  styleUrls: ['./editShop.component.css'],
  providers: [shopeditService, NotificationsComponent]
})

export class shopeditComponent implements OnInit {
  myForm: FormGroup;
  submitted = false;
  shopid: number;
  private shValue: any;
  countries = [];
  states = [];
  cities = [];
  states1 = [];
  cities1 = [];
  companyrefid1 = [];
  branchrefid1 = [];
  textPattern = "[a-zA-Z][a-zA-Z ]+";
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private shopedit: shopeditService, private route: ActivatedRoute, private router: Router, private notificationsComponent: NotificationsComponent) {
    let id = new FormControl();
    let companyid = new FormControl('', Validators.required);
    let branchid = new FormControl('', Validators.required);
    let shopname = new FormControl();
    let ownername = new FormControl();
    let license = new FormControl();
    let dlNumber = new FormControl();
    let gst = new FormControl();
    let tin = new FormControl();
    let cstNumber = new FormControl();
    let pan = new FormControl();
    let registrationNumber = new FormControl();
    let address = new FormControl();
    let state = new FormControl();
    let country = new FormControl();
    let city = new FormControl();
    let pincode = new FormControl();
    let phonenumber = new FormControl('', [Validators.pattern(this.textnumbers)]);
    let email = new FormControl('', [Validators.pattern(this.emailPattern)]);
    let pharmaName = new FormControl();
    let pharmastate = new FormControl();
    let pharmacountry = new FormControl();
    let pharmapincode = new FormControl();
    let pharma_phonenumber = new FormControl('', [Validators.pattern(this.textnumbers)]);
    let pharma_email = new FormControl('', [Validators.pattern(this.emailPattern)]);
    let pharmacity = new FormControl();
    let registerflag = new FormControl();
    let companyrefid = new FormControl();
    let branchrefid = new FormControl();
    let clientcdate = new FormControl();
    let createdby = new FormControl();
    let modifiedby = new FormControl();
    let clientmdate = new FormControl();

    let locname = new FormControl();
    let locrefid = new FormControl();
    this.myForm = new FormGroup({
      id: id,
      companyid: companyid,
      branchid: branchid,
      shopname: shopname,
      ownername: ownername,
      license_holder: license,
      dlno: dlNumber,
      gstno: gst,
      tinno: tin,
      cstno: cstNumber,
      panno: pan,
      phar_registration_no: registrationNumber,
      address1: address,
      state: state,
      country: country,
      city: city,
      pincode: pincode,
      mobileno: phonenumber,
      emailid: email,
      pharmacistname: pharmaName,
      phar_state: pharmastate,
      phar_country: pharmacountry,
      phar_pincode: pharmapincode,
      phar_contactno1: pharma_phonenumber,
      phar_emailid: pharma_email,
      phar_city: pharmacity,
      registerflag: registerflag,
      companyrefid: companyrefid,
      branchrefid: branchrefid,
      clientcdate: clientcdate,
      createdby: createdby,
      clientmdate: clientmdate,
      modifiedby: modifiedby,
      locname: locname,
      locrefid: locrefid
    });
  }

  ngOnInit() {

    this.shValue = this.route.params.subscribe(params => {
      
      this.shopid = +params['shopid'];
    });

    this.shopedit.shopeditservice(this.shopid).subscribe(data => this.myForm.patchValue(data),
      err => {
        console.log('Error occured in shop edit ');
      });


    //get Country
    this.shopedit.getCountry().subscribe(data => this.countries = data,
      err => {
        console.log('Error Occured Get Country');
      });
    //Get Company
    this.shopedit.getAllCompany().subscribe(data => this.companyrefid1 = data,
      err => {
        console.log('Error Occured ');

      });
    //Get Edit State
    this.shopedit.geteditStates(this.shopid).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      });
    //Get edit City    
    this.shopedit.geteditCity(this.shopid).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get City');
      });
    //Get Edit PharmaState
    this.shopedit.geteditStates1(this.shopid).subscribe(data => this.states1 = data,
      err => {
        console.log('Error Occured Get States1');
      });
    //Get edit PharmaCity    
    this.shopedit.geteditCity1(this.shopid).subscribe(data => this.cities1 = data,
      err => {
        console.log('Error Occured Get City1');
      });
    //get company
    // this.shopedit.geteditCompany(this.shopid).subscribe(data => this.companyrefid1 = data,
    //   err => {
    //     console.log('Error Occured Get company');
    //   });
    //Get branch   
    this.shopedit.geteditBranch(this.shopid).subscribe(data => this.branchrefid1 = data,
      err => {
        console.log('Error Occured Get branch');
      });

  }
  public returnFlag: boolean = false;
  onSubmit() {
    this.submitted = true;
    this.updateShoprecord();
//this.router.navigate(['./ViewRegistration/ViewShopInformation'])
  }

  private updateShoprecord(): void {
    this.returnFlag = this.shopValidation();
    if (this.returnFlag == true) {
      this.myForm.get('clientcdate').setValue(AppComponent.date);
      this.myForm.get('createdby').setValue(AppComponent.userID);
      this.myForm.get('clientmdate').setValue(AppComponent.date);
      this.myForm.get('modifiedby').setValue(AppComponent.userID);
      this.myForm.get('companyrefid').setValue(AppComponent.companyID);
      this.myForm.get('branchrefid').setValue(AppComponent.branchID);
      this.myForm.get('locname').setValue(AppComponent.locRefName1);
      this.myForm.get('locrefid').setValue(AppComponent.locrefID1);
      this.shopedit.updateShoprecord(JSON.stringify(this.myForm.value));
      this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA UPDATED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
      setTimeout(() => {
        this.router.navigate(['Registration/ViewShopInformation']);
      }, 2000);
    }
  
  }
  getState() {
    //Get States 
    this.shopedit.getStates(this.myForm.get('country').value).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      });
  }
  getState1() {
    //Get States 
    this.shopedit.getStates(this.myForm.get('phar_country').value).subscribe(data => this.states1 = data,
      err => {
        console.log('Error Occured Get States');
      });
  }
  getCity() {
    //Get City 
    this.shopedit.getCity(this.myForm.get('state').value).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get City');
      });
  }
  getCity1() {
    //Get City 
    this.shopedit.getCity(this.myForm.get('phar_state').value).subscribe(data => this.cities1 = data,
      err => {
        console.log('Error Occured Get City');
      });
  }

  getBranch() {
    this.shopedit.getBranch(this.myForm.get('companyid').value).subscribe(data => this.branchrefid1 = data, err => {
      console.log('Error occured On getBranch()');
    })
  }

  shopValidation(): boolean {

    if (this.myForm.get('companyid').value == '' || this.myForm.get('companyid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Company Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    if (this.myForm.get('branchid').value == '' || this.myForm.get('branchid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Select Branch Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('shopname').value == '' || this.myForm.get('shopname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Shop name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('ownername').value == '' || this.myForm.get('ownername').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Owner name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('license_holder').value == '' || this.myForm.get('license_holder').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your License Holder name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('dlno').value == '' || this.myForm.get('dlno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Drug License Number', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    // if (this.myForm.get('gstno').value == '' || this.myForm.get('gstno').value == null) {
    //   this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Goods and ServiceTax', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //   return false;
    // }
    if (this.myForm.get('tinno').value == '' || this.myForm.get('tinno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Tax Identification Number', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('address1').value == '' || this.myForm.get('address1').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Shop Address', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('country').value == '0' || this.myForm.get('country').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Shop Country', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('state').value == '0' || this.myForm.get('state').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Shop State', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('city').value == '0' || this.myForm.get('city').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Shop City', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('mobileno').value == '' || this.myForm.get('mobileno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Shop Mobile Number', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('emailid').value == '' || this.myForm.get('emailid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Shop Email-Address', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('pharmacistname').value == '' || this.myForm.get('pharmacistname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Pharmacist Name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('phar_country').value == '0' || this.myForm.get('phar_country').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Pharma Coutry', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('phar_state').value == '0' || this.myForm.get('phar_state').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Pharma State', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('phar_city').value == '0' || this.myForm.get('phar_city').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Pharma State', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('phar_contactno1').value == '' || this.myForm.get('phar_contactno1').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Pharma Mobile Number', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.myForm.get('phar_emailid').value == '' || this.myForm.get('phar_emailid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Enter Your Pharma Email-Address', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

}
