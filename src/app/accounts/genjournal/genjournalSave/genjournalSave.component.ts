
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;
import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 
import { AppComponent } from '../../../app.component';
import {genjournalSaveService} from './genjournalSave.service'  ;

@Component({
  selector: 'app-genjournalSave',
  templateUrl: './genjournalSave.component.html',
  providers: [genjournalSaveService   ,    NgbDropdownConfig  ,NotificationsComponent  , dateFormatPipe ]
})
export class genjournalSaveComponent implements OnInit {





  registerForm: FormGroup;
  
  
    i;
  
    autoincr;
  
    autoval = 0;
  
    autoinc = 0;
    autodata = [];
  
  
  
    selobj;
  
    acctypeflag = 0;
  
    accounts;
  
    tempdata = [[], [], [], [], [], [], [], []];
  
  
    constructor(private userService: genjournalSaveService, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent, private formBuilder: FormBuilder, config: NgbDropdownConfig) {
  
      config.autoClose = false;
    }
  
    ngOnInit() {
  
  
      this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
  
  
  
      this.registerForm = this.formBuilder.group({
  
        autonamenew: [, []],
        typeflag: [, []],
        paymenttype: [, []],
        ptrefno: [, []],

        journalno: [, []],
  
        dummy1: [, []],
        debitaccount: [, []],
        creditaccount: [, []],
  
        debitamount: [, []],
        creditamount: [, []],
        draccname: [, []],
        craccname: [, []],
        invoiceno: [, []],
  
        invoicebalamt: [, []],
  
  
        cashflag: [, []],
        jrnlname: [, []],
        bulkflag: [, []],
        calcflag: [0, []],
        debitaccountemp: [, []],
        creditaccountemp: [, []],
  
        accdispflag: [2, []],
  
        jrnltype: [1, []],
  
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
  
        invoicename: [, []],
  
        personname: [, []],
        invoicetype: [, []],
        adjbalflag: [ false, []],
        date: [this.dateformat.transform05(Date.now()), []]
  
  
  
      });

      var frmdata = { frmint1: '', frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
      this.userService.viewAccountsAll(JSON.stringify(frmdata)).subscribe(data => {  this.accounts = data },
        errorCode => console.log(errorCode));
  
      $(document).ready(function () {
  
        $(".autolistall1").hide();
      });
  
  
      this.registerForm.get('typeflag').setValue(1);
      

    }
  

    onSubmit() {

      var answer = confirm("Save data?");
  
      if (answer) {

        this.userService.saveGenJournal(JSON.stringify(this.registerForm.value)).subscribe(data => { this.savevalid(data) },
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


    validnew(): Number {
      var valflag = 0;
  
  
      return valflag;
  
    }
  
    clear() {
  
      this.ngOnInit();
    }

    viewDebitAcc() {
  
  
      this.registerForm.get('draccname').setValue(this.accounts[this.registerForm.get('debitaccountemp').value][1]);
      this.registerForm.get('debitaccount').setValue(this.accounts[this.registerForm.get('debitaccountemp').value][0]);
    }
  
    viewCreditAcc() {
  
  
      this.registerForm.get('craccname').setValue(this.accounts[this.registerForm.get('creditaccountemp').value][1]);
      this.registerForm.get('creditaccount').setValue(this.accounts[this.registerForm.get('creditaccountemp').value][0]);
    }
  


}