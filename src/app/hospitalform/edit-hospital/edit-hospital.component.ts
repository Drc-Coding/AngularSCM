import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { DataHospitalform } from '../data.service';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'edit-hospital',
  templateUrl: './edit-hospital.component.html',
  providers: [NotificationsComponent]
})
export class editHospitalComponent implements OnInit {
  hid: any;
  hospitalForm: any;
  country = [];
  state = [];
  city = [];
  countrycode = [];
  speciality = [];
  submitted = false;
  public reFlag: boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private hospitalService: DataHospitalform, private route: ActivatedRoute, private fb: FormBuilder,
    private notificationsComponent: NotificationsComponent, private router: Router) {
    this.hospitalForm = this.fb.group({
      id: ['', []],
      hospitalname: ['', []],
      registrationno: ['', []],
      specialityid: ['', []],
      hosheadquarters: ['', []],
      hosaddress1: ['', []],
      hosaddress2: ['', []],
      hospincode: ['', []],
      countryid: ['', []],
      stateid: ['', []],
      city: ['', []],
      countrycode: ['', []],
      phoneno: ['', []],
      helpline: ['', []],
      email: ['', [Validators.pattern(this.emailPattern)]],
      status: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      clientcdate: ['', []],
      createdby : ['', []],
      clientmdate : ['', []],
      modifiedby : ['', []],



      registerflag: ['', []],
    });

  }

  ngOnInit() {
    this.hid = this.route.snapshot.paramMap.get('id');

    this.hospitalService.getEdithospital(this.hid).subscribe(data => { this.hospitalForm.patchValue(data) },
      err => {
        console.log('Error occured on getEdithospital()');
      });

    this.hospitalService.getCountry().subscribe(data => this.country = data,
      err => {
        console.log('Error Occured Edit Hospital getCountry()');
      });

    this.hospitalService.getSpeciality().subscribe(data => this.speciality = data,
      err => {
        console.log('Error Occured Edit Hospital getSpeciality()');
      });

    // Get Edit State 
    this.hospitalService.getEditStates(this.hid).subscribe(data => this.state = data,
      err => {
        console.log('Error Occured Get States');
      });

    //Get Country Code    
    this.hospitalService.getCcode(this.hid).subscribe(data => this.countrycode = data,
      err => {
        console.log('Error Occured Get Country Code');
      });

    //Get City    
    this.hospitalService.geteditCity(this.hid).subscribe(data => this.city = data,
      err => {
        console.log('Error Occured Get City');
      });
  }

  getState() {
    this.hospitalService.getStates(this.hospitalForm.get('countryid').value).subscribe(data => this.state = data,
      err => {
        console.log('Error Occured Edit Hospital  GetStates()');
      });

    this.hospitalService.getCountrycode(this.hospitalForm.get('countryid').value).subscribe(data => {
      this.countrycode = data,
        this.hospitalForm.get('countrycode').setValue(data.toString());
    },
      err => {
        console.log('Error Occured Edit Hospital CountryCode()');
      });
  }

  getCity() {
    this.hospitalService.getCity(this.hospitalForm.get('stateid').value).subscribe(data => this.city = data,
      err => {
        console.log('Error Occured Edit Hospital GetCity()');
      });
  }

  hospitalValidation(): boolean {
    if (this.hospitalForm.get('hospitalname').value == '' || this.hospitalForm.get('hospitalname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Hospital Name must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.hospitalForm.get('registrationno').value == '' || this.hospitalForm.get('registrationno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Register Number must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.hospitalForm.get('specialityid').value == '' || this.hospitalForm.get('specialityid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Speciality must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.hospitalForm.get('hosaddress1').value == '' || this.hospitalForm.get('hosaddress1').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Address must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.hospitalForm.get('countryid').value == '0' || this.hospitalForm.get('countryid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Country must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.hospitalForm.get('stateid').value == '0' || this.hospitalForm.get('stateid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'State must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.hospitalForm.get('city').value == '0' || this.hospitalForm.get('city').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'City must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.hospitalForm.get('phoneno').value == '' || this.hospitalForm.get('phoneno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Phone Number must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.hospitalForm.get('email').value == '' || this.hospitalForm.get('email').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Email must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }
  onSubmit(): any {
    this.submitted = true;
    this.reFlag = this.hospitalValidation();
    if (this.reFlag == true) {
      this.hospitalForm.get('clientcdate').setValue(AppComponent.date);
      this.hospitalForm.get('clientmdate').setValue(AppComponent.date);
      this.hospitalForm.get('modifiedby').setValue(AppComponent.userID);

      this.hospitalService.updateHospital(JSON.stringify(this.hospitalForm.value)).subscribe(data => {
        if (data == true) {
          // this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Hospital Updated Sucessfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          // this.hospitalForm.reset();
          this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA UPDATED SUCESSFULLY.', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          setTimeout(() => {
            this.router.navigate(['Registration/ViewHospitalRegistration']);
          }, 2000);
        }
      },
        err => {
          console.log('Error Occured on updateHospital()');
        }
      );
    }
  }
}
