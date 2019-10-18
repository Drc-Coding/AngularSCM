import { DoctorService } from '../doctor.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
@Component({
  /**@Author Ajith Kumar**/
  selector: 'editDoctor',
  templateUrl: './editDoctor.component.html',
  styleUrls: ['./editDoctor.component.css'],
  providers: [NotificationsComponent]
})
export class editDoctorComponent implements OnInit {
  did: any;
  doctorForm: FormGroup;
  state = [];
  country = [];
  city = [];
  countrycode = [];
  public reFlag: boolean = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private doctorService: DoctorService, private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent) {
    this.doctorForm = this.formBuilder.group({
      id: [, []],
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
    });
  }
  ngOnInit() {
    this.did = this.route.snapshot.paramMap.get('id');

    this.doctorService.editDoctorinfo(this.did).subscribe(data => this.doctorForm.patchValue(data),
      err => {
        console.log('Error Occured on editDoctorinfo()');
      }
    );
    this.doctorService.getcountry().then(data => this.country = data);

    // Get Edit State 
    this.doctorService.getEditStates(this.did).subscribe(data => this.state = data,
      err => {
        console.log('Error Occured Get States');
      });

    //Get Country Code    
    this.doctorService.getCcode(this.did).subscribe(data => this.countrycode = data,
      err => {
        console.log('Error Occured Get Country Code');
      });

    //Get City    
    this.doctorService.geteditCity(this.did).subscribe(data => this.city = data,
      err => {
        console.log('Error Occured Get City');
      });
  }

  onSubmit() {
    this.reFlag = this.doctorValidation();
    if (this.reFlag == true) {
      this.doctorForm.get('clientcdate').setValue(AppComponent.date);
      this.doctorService.updateDoctor(this.doctorForm.value).subscribe(
        data => {
          if (data == true) {
            this.notificationsComponent.addToast({ title: 'SUCESS MESSAGE', msg: 'DATA UPDATED SUUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
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

