
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


import { accountsSaveService } from './accountsSave.service';


import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


import { NotificationsComponent } from '../../../notifications/notifications.component';



import { dateFormatPipe } from '../../../notifications/notifications.datepipe';



import { AppComponent } from '../../../app.component';



@Component({
  selector: 'app-accountsSave',
  templateUrl: './accountsSave.component.html',
  providers: [accountsSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]

})
export class accountsSaveComponent implements OnInit {

  registerForm: FormGroup;
  acctype = [];
  netprofit = 0;

  i;

  inc = 1;
  selobj;

  constructor(private userService: accountsSaveService, private notificationsComponent: NotificationsComponent, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig) {

    config.autoClose = false;
  }

  ngOnInit() {


    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };


    this.registerForm = this.formBuilder.group({

      accountno: [, []],
      accountname: [, []],
      accounttype: [, []],
      accbalance: [, []],
      accbalflag: [, []],
      balcalcflag: [, []],
      cashflag: [ false, []],


      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],

      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],

      nexto: [, []],


      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],

      date: [this.dateformat.transform05(Date.now()), []],


      accounts: this.formBuilder.array([

      ]),

      balance: this.formBuilder.array([

      ]),


    });




    $(document).ready(function () {


    });


    var frmdata = { frmint1: '', frmstr1: '', frmstr2: this.registerForm.get('date').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };


    this.userService.viewAccountType(JSON.stringify(frmdata)).subscribe(data => { this.acctype = data },
      errorCode => console.log(errorCode));


    this.userService.viewBalanceSheet(JSON.stringify(frmdata)).subscribe(data => { this.viewServBalanceSheet(data) },
      errorCode => console.log(errorCode));
  }



  setBalflag() {

    var id = this.registerForm.get('accounttype').value;


    this.registerForm.get('accounttype').setValue(this.acctype[id][1]);
    this.registerForm.get('balcalcflag').setValue(this.acctype[id][3]);
    this.registerForm.get('accbalflag').setValue(this.acctype[id][4]);


  }

  onSubmit() {

    var valflag = 0;
    var answer = confirm("Save data?");

    if (answer && valflag == 0) {

      this.userService.saveAccount(JSON.stringify(this.registerForm.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));


    }
  }

  savevalid(data: any) {
    if (data == 1) {

      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.clear();
    } else {

      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }
  }


  saveClosetempAccounts() {
    var valflag = 0;
    var answer = confirm("Confirm ?");
  if (answer && valflag == 0) {

      const ctrlbal = <FormArray>this.registerForm.controls['balance'];
      this.userService.saveAccBalance(JSON.stringify(ctrlbal.value)).subscribe(data => {  this.savevalid(data) },
        errorCode => console.log(errorCode));
    }

  }

  saveTempAccTrnsfer() {

    var frmdata = { frmint1: '', frmdbl1: this.netprofit, frmstr2: this.registerForm.get('date').value, frmstr3: this.registerForm.get('nexto').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };

    this.userService.saveTempAccTrnsfer(JSON.stringify(frmdata)).subscribe(data => { this.savevalid(data) },
      errorCode => console.log(errorCode));

  }


  viewServBalanceSheet(data: any) {


    var drbaltot = 0;
    var crbaltot = 0;

    var bal = 0;

    var netprofit = 0;
    var i = 0;

    var w = 0;


    const control = <FormArray>this.registerForm.controls['accounts'];

    const ctrlbal = <FormArray>this.registerForm.controls['balance'];


    for (this.i = 0; this.i < data.length; this.i++) {

      i = 0;

      w = 0;


      if (parseInt(data[this.i][3])) {
        bal = parseInt(data[this.i][3]);

      } else {
        bal = 0;
      }
      if (data[this.i][4] == 1) {

        drbaltot += bal;

      } else if (data[this.i][4] == 0) {


        crbaltot += bal;
      }

      control.push(this.formBuilder.group({
        accid: [data[this.i][i++], []],
        acctypename: [data[this.i][i++], []],
        accname: [data[this.i][i++], []],

        closingbal: [data[this.i][i++], []],
        accbalflag: [data[this.i][i++], []],
        openingbal: [data[this.i][i++], []],


        from: [, []],
        todate: [this.dateformat.transform05(Date.now()), []],

        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],

        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],


      }));


      ctrlbal.push(this.formBuilder.group({


        accid: [data[this.i][w++], []],
        acctypename: [data[this.i][w++], []],
        accname: [data[this.i][w++], []],

        closingbal: [data[this.i][w++], []],
        accbalflag: [data[this.i][w++], []],
        openingbal: [data[this.i][w++], []],


        from: [, []],
        todate: [this.dateformat.transform05(Date.now()), []],

        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],

        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],


      }));



    }


    netprofit = drbaltot - crbaltot;

  }



  clear(){
    
      this.ngOnInit() ;
    }



}