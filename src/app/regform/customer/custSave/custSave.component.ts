import { custSaveService } from './custSave.service';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { CustomValidators } from 'ng2-validation';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';


 




@Component({
  selector: 'app-custSave',
  templateUrl: './custSave.component.html',
  providers: [custSaveService, NotificationsComponent, dateFormatPipe]
})





export class custSaveComponent implements OnInit {


   Email  =    "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  registerForm: FormGroup;
  countries = [];
  states = [];
  cities = [];
  i;
  selobj;
  constructor(private formBuilder: FormBuilder, private dateformat: dateFormatPipe,private router: Router, private userService: custSaveService, private notificationsComponent: NotificationsComponent) { }
  ngOnInit() {
    var date = this.dateformat.transformnew(Date.now());
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID, cdate: AppComponent.date };
    this.registerForm = this.formBuilder.group({
      ptid: ['', []],
      hospitalid: ['', []],
      patientcode: ['', []],
      patienttitle: ['', []],
      patientfirstname: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      patientlastname: ['', [Validators.pattern("[a-zA-Z ]*")]],
      gender: ['', []],
      age:['',[]],
      maritalstatus: ['', []],
      dob: ['', []],
      patienttype: ['', []],
      address1: ['', [Validators.required]],
      address2: ['', []],
      country: ['', []],
      state: ['', []],
      city: ['', []],
      pincode: ['', []],
      countrycode: ['', []],
      mobile: ['', [Validators.required]],
      phone: ['', []],
      email: [, [Validators.pattern(this.Email)]],
      aadhaarcardno: ['', []],
      language: ['', []],
      description: ['', []],
      ipaddress: ['', []],
      latitude: ['', []],
      longitude: ['', []],
      companyid: ['', []],
      createdby: [this.selobj.userid, []],
      clientcdate: [this.selobj.cdate, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      tinno: [, []],
      gstno: [, []],
      vatno: [, []],
      scitizenflag: [false, []],
      phycapflag: [false, []],
      scitizenno: [{ value: '', disabled: true }, []],
      phycapno: [{ value: '', disabled: true }, []],
    });
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCountry(JSON.stringify(frmdata)).subscribe(data => this.countries = data,
      errorCode => console.log(errorCode));
  }
  onSubmit() {
    //var answer = confirm("Save data?");
  
      this.userService.savePatient(JSON.stringify(this.registerForm.value)).subscribe(data => {
        this.savevalid(data)
      },
        errorCode => console.log(errorCode));
        setTimeout(() => {
          this.router.navigate(['Customer/ViewCustomer']);
        }, 2000);
  
  }
  savevalid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  viewState() {
    var frmdata = { frmint1: this.registerForm.get('country').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewState(JSON.stringify(frmdata)).subscribe(data => this.states = data,
      errorCode => console.log(errorCode));
  }
  viewCity() {
    this.cities = [];
    var frmdata = { frmint1: this.registerForm.get('state').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewCity(JSON.stringify(frmdata)).subscribe(data => this.cities = data,
      errorCode => console.log(errorCode));
  }
  clear() {
    this.ngOnInit();
  }

  enablecontrol1() {
    if (this.registerForm.get('scitizenflag').value == true) {
      this.registerForm.get('scitizenno').enable();
    } else if (this.registerForm.get('scitizenflag').value == false) {
      this.registerForm.get('scitizenno').disable();
    }
  }

  enablecontrol2() {
    if (this.registerForm.get('phycapflag').value == true) {
      this.registerForm.get('phycapno').enable();
    } else if (this.registerForm.get('phycapflag').value == false) {
      this.registerForm.get('phycapno').disable();
    }
  }
}