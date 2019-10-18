import { DoctorService } from '../doctor.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
@Component({
  /**@Author Ajith Kumar**/
  selector: 'app-addDoctor',
  templateUrl: './addDoctor.component.html',
  styleUrls: ['./addDoctor.component.css'],
  providers: [NotificationsComponent]
})
export class DoctorregistrationComponent implements OnInit {
  doctorForm: FormGroup;
  state = [];
  country = [];
  city = [];
  countrycode = [];
  public reFlag: boolean = false;
  textnumbers = '^[0-9]+([0-9]{1,2})?$';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private doctorService: DoctorService, private router: Router, private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent) {
    this.doctorForm = this.formBuilder.group({
      title: [, []],
      doctorname: ['', [Validators.required,Validators.pattern("[a-zA-Z ]*")]],
      registrationno: [, []],
      gender: [, []],
      docdob: [, []],
      docaddress1: ['', [Validators.required]],
      docaddress2: [, []],
      country: [, []],
      state: [, []],
      city: [, []],
      pincode: [, []],
      countrycode: [, []],
      mobile: ['', [Validators.required]],
      phone: [, []],
      email: [, [Validators.pattern(this.emailPattern)]],
      website: [, []],
      aadhaarcardno: [, []],
      language: [, []],
      experience: [, []],
      workhour: [, []],
      clientcdate: [, []],
      companyrefid: [, []],
      branchrefid: [, []],
      locrefid: [, []],
      locname: [, []],
    });
  }


  ngOnInit() {
    //To set All the PlaceHolder Name in DropDown//
    this.doctorForm.get('title').setValue('Dr');
    this.doctorForm.get('country').setValue('0');
    this.doctorForm.get('state').setValue('0');
    this.doctorForm.get('countrycode').setValue('0');
    this.doctorForm.get('city').setValue('0');

    this.doctorForm.get('companyrefid').setValue(AppComponent.companyID);
    this.doctorForm.get('branchrefid').setValue(AppComponent.branchID);
    this.doctorForm.get('locname').setValue(AppComponent.locrefID);
    this.doctorForm.get('locrefid').setValue(AppComponent.locrefID1);
    this.doctorService.getcountry().then(data => this.country = data);
  }

  onSubmit() {
    this.reFlag = this.doctorValidation();
    if (this.reFlag == true) {
      this.doctorForm.get('clientcdate').setValue(AppComponent.date);
      this.doctorService.createDoctor(this.doctorForm.value).subscribe(
        data => {
          if (data == true) {
            this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA SAVED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
            setTimeout(() => {
              this.router.navigate(['Doctor/ViewDoctor']);
            }, 2000);

          }
          else {
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Data Not saved..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          }
        }
      );;
    }
  }

  view(): void {
    this.router.navigate(['Doctor/ViewDoctor']);
  }

  doctorValidation(): boolean {
    if (this.doctorForm.get('doctorname').value == '' || this.doctorForm.get('doctorname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Doctor Name must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.doctorForm.get('registrationno').value == '' || this.doctorForm.get('registrationno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Register Number must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.doctorForm.get('gender').value == '' || this.doctorForm.get('gender').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Gender must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.doctorForm.get('docaddress1').value == '' || this.doctorForm.get('docaddress1').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Address must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.doctorForm.get('country').value == '0' || this.doctorForm.get('country').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Country must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.doctorForm.get('state').value == '0' || this.doctorForm.get('state').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'State must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.doctorForm.get('city').value == '0' || this.doctorForm.get('city').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'City must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.doctorForm.get('mobile').value == '' || this.doctorForm.get('mobile').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Phone Number must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.doctorForm.get('email').value == '' || this.doctorForm.get('email').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Email must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.doctorForm.get('experience').value == '' || this.doctorForm.get('experience').value == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Experience must not be empty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  getState() {
    this.doctorService.getStates(this.doctorForm.get('country').value).subscribe(data => this.state = data,
      err => {
        console.log('Error Occured Get States');
      });

    this.doctorService.getCountrycode(this.doctorForm.get('country').value).subscribe(data => {
      this.countrycode = data,
        this.doctorForm.get('countrycode').setValue(data.toString());
    },
      err => {
        console.log('Error Occured Country Code');
      });

  }
  getCity() {
    this.doctorService.getCity(this.doctorForm.get('state').value).subscribe(data => this.city = data,
      err => {
        console.log('Error Occured Get City');
      });
  }

}
