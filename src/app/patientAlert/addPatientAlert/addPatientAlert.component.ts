import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { patientAlertService } from '../patientAlert.service';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import data_grid from 'devextreme/ui/data_grid';
import { AppComponent } from '../../app.component';




@Component({
  selector: 'app-addPatientAlert',
  templateUrl: './addPatientAlert.component.html',
  providers: [patientAlertService, NotificationsComponent]

})
export class addPatientAlertComponent implements OnInit {
  textPattern = "[a-zA-Z][a-zA-Z ]+";
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  emailpattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  patientForm: FormGroup;
  submitted = false;
  companies = [];
  branches = [];
  shops = [];
  warehouse = [];
  hospital = [];
  patient = [];
  patinesinfo = [];
  flag: boolean = false;
  emailflag: boolean = false;
  mobileflag: boolean = false;
  

  constructor(private addPatientAlert: patientAlertService, private router: Router, formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent) {
    let companyrefid = new FormControl();
    let branchrefid = new FormControl();
    let storerefid = new FormControl();
    let locname = new FormControl();
    let locrefid = new FormControl();
    let mobile = new FormControl('', [Validators.required]);
    let email = new FormControl('', [Validators.pattern(this.emailpattern)]  );
    let patientid = new FormControl('',[Validators.required]);
    let message = new FormControl();
    let clientcdate = new FormControl();
    let createdby = new FormControl();




    this.patientForm = new FormGroup({
      companyrefid: companyrefid,
      branchrefid: branchrefid,
      storerefid: storerefid,
      locname: locname,
      locrefid: locrefid,
      patientid: patientid,
      mobile: mobile,
      email: email,
      clientcdate: clientcdate,
      createdby:createdby,

      message: message
    });


  }

  ngOnInit() {
    this.patientForm.get('companyrefid').setValue('opt1');
    this.patientForm.get('branchrefid').setValue('opt1');
    this.patientForm.get('storerefid').setValue('opt1');
    this.patientForm.get('patientid').setValue('opt1');
    this.emailflag = false;
    this.emailflag = false;
      this.addPatientAlert.getCompany().subscribe(data => this.companies = data,
        err => {
          console.log('Error Occured ');
        });
    
  }



  //Get Branches by Company ID
  getBranche() {
    this.patientForm.get('branchrefid').setValue('opt1');
    this.patientForm.get('patientid').setValue('opt1');
    this.addPatientAlert.getBranche(this.patientForm.get('companyrefid').value).subscribe(data => { this.branches = data },
      err => {
        console.log('Error Occured Get Company');
      });
  }

  //Get Shop & Warehouse & Hospital by Branch ID

  getFirm() {
    this.patientForm.get('storerefid').setValue('opt1');
    this.patientForm.get('patientid').setValue('opt1');
    this.addPatientAlert.getShop(this.patientForm.get('branchrefid').value).subscribe(data => { this.shops = data },
      err => {
        console.log('Error Occured Get Shop');
      });

    this.addPatientAlert.getWareHouse(this.patientForm.get('branchrefid').value).subscribe(data => { this.warehouse = data },
      err => {
        console.log('Error Occured Get Warehouse');
      });

    this.addPatientAlert.getHospital(this.patientForm.get('branchrefid').value).subscribe(data => { this.hospital = data },
      err => {
        console.log('Error Occured Get Hospital');
      });

  }

  //Get Patient By Company ID

  getCompanyPatient() {
    this.patientForm.get('patientid').setValue('opt1');
    this.addPatientAlert.getCompanyPatient(this.patientForm.get('companyrefid').value).subscribe(data => { this.patient = data },
      err => {
        console.log('Error Occured Get Company');
      });
  }


  //Get Patient By Branch ID

  getBranchPatient() {
    this.patientForm.get('patientid').setValue('opt1');
    this.addPatientAlert.getBranchPatient(this.patientForm.get('companyrefid').value, this.patientForm.get('branchrefid').value).subscribe(data => { this.patient = data },
      err => {
        console.log('Error Occured Get Company');
      });
  }

  //Get Patient By Shop ID or Warehouse ID or Hospital ID

  getFirmPatient() {
    let val = this.patientForm.get('storerefid').value;
    if ("SHOP" == val.substring(0, 4)) {
      this.patientForm.get('locname').setValue('1');
      this.patientForm.get('locrefid').setValue(val.substring(4));
      this.addPatientAlert.getFirmPatient(this.patientForm.get('companyrefid').value, this.patientForm.get('branchrefid').value, this.patientForm.get('locname').value, ).subscribe(data => { this.patient = data },
        err => {
          console.log('Error Occured Get Company');
        });
    }
    if ("WARE" == val.substring(0, 4)) {
      this.patientForm.get('locname').setValue('2');
      this.patientForm.get('locrefid').setValue(val.substring(4));
      this.addPatientAlert.getFirmPatient(this.patientForm.get('companyrefid').value, this.patientForm.get('branchrefid').value, this.patientForm.get('locname').value, ).subscribe(data => { this.patient = data },
        err => {
          console.log('Error Occured Get Company');
        });

    }
    if ("HOSP" == val.substring(0, 4)) {
      this.patientForm.get('locname').setValue('3');
      this.patientForm.get('locrefid').setValue(val.substring(4));
      this.addPatientAlert.getFirmPatient(this.patientForm.get('companyrefid').value, this.patientForm.get('branchrefid').value, this.patientForm.get('locname').value, ).subscribe(data => { this.patient = data },
        err => {
          console.log('Error Occured Get Company');
        });
    }
  }



  getPatientInfo() {
    this.addPatientAlert.getPatientInfo(this.patientForm.get('patientid').value).subscribe(data => {
      this.patinesinfo = data,
        this.patientForm.get('mobile').setValue(data[0][0]),
        this.patientForm.get('email').setValue(data[0][1])
    },

      err => {
        console.log('Error Occured Get Company');
      });
  }




  private validation(): boolean {
    if (this.emailflag == false && this.mobileflag == false) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'SELECT REQUIRED OPTIONS TO SEND MESSAGE', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }
    if (this.emailflag == true) {
      this.addPatientAlert.sendMessageByMail(this.patientForm.get('email').value, this.patientForm.get('message').value).subscribe(data => {
        if (data == true) {
          this.notificationsComponent.addToast({ title: 'SUCCESS MESSAGE', msg: 'MESSAGE SENT SUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
          return true;
        } else {
          this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'MESSAGE NOT SENT', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
          return false;
        }
      });
    }

    if (this.mobileflag == true) {
      //  this.addPatientAlert.sendMessageByMail(this.patientForm.get('email').value,this.patientForm.get('message').value).subscribe(data=>{
      //    if(data==true){
      //      return true;
      //    }
      //  });
    }

    return true;
  }



  checkemail(e) {
    if (e.target.checked) {
      this.emailflag = true;
    } else {
      alert("falsecalling");
      this.emailflag = false;
      console.log("unchecked");
    }
  }



  checkmobile(e) {
    if (e.target.checked) {
      console.log("This is checked")
    } else {
      console.log("unchecked");
    }
  }


  onSubmit() {
    this.flag = this.validation();
    if (this.flag == true) {

      

 this.patientForm.get('clientcdate: ').setValue(AppComponent.date);
 this.patientForm.get(' createdby').setValue(AppComponent.userID);
      alert(JSON.stringify(this.patientForm.value));
      this.addPatientAlert.createMessage(JSON.stringify(this.patientForm.value));

    }
  }






}
