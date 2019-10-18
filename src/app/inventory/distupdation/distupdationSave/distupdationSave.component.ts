import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { distupdationSaveService } from './distupdationSave.service';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { DxDataGridComponent } from "devextreme-angular";
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-distupdationSave',
  templateUrl: './distupdationSave.component.html',
  providers: [distupdationSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class distupdationSaveComponent implements OnInit {
  id: number;
  private sub: any;
  registerForm: FormGroup;
  selobj;
  i;
  constructor(private userService: distupdationSaveService, private route: ActivatedRoute, private formBuilder: FormBuilder, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent) { }
  ngOnInit() {
    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };
    //this.sub = this.route.params.subscribe(params => {
    //  this.id = +params['id']; 
    // });
    this.id = AppComponent.distributorid;
    this.registerForm = this.formBuilder.group({
      date: [this.dateformat.transform05(Date.now()), []],
      fromlocname: [, []],
      fromlocrefid: [, []],
      namefromlocrefid: [, []],
      stkexp: this.formBuilder.array([
      ]),
    });
    this.init();
    //    this.viewDUPriceEnquiry();
    this.viewLocationId(this.selobj.locname, this.selobj.locrefid);
    this.registerForm.get('fromlocname').setValue(this.selobj.locname)
    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewDUPriceEnquiry(JSON.stringify(frmdata)).subscribe(data => { this.viewServDUPriceEnquiry(data) },
      errorCode => console.log(errorCode));
  }
  onSubmit() {
    var valflag: Number = 0;
    const control = <FormArray>this.registerForm.controls['stkexp'];
    valflag = this.validnew();
    var answer = confirm("Save data?");
    if (answer && valflag == 0) {
      this.userService.savePriceEnquiry(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
    }
  }
  viewServDUPriceEnquiry(data: any) {
    const control = <FormArray>this.registerForm.controls['stkexp'];
    var w = 0;
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init();
    for (this.i = 0; this.i < data.length; this.i++) {
      w = 0;
      control.insert(0, this.formBuilder.group({
        id: [data[this.i][0], []],
        prcencid: [, []],
        purchsessionid: [, []],
        drugproductrefid: [data[this.i][1], []],
        prodwaitingqty: [, []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        vendorname: [, []],
        drugname: [data[this.i][6], []],
        calcflag: [0, []],
        delflag: [false, []],
        exppoqty: [data[this.i][4], []],
        exppoprice: [data[this.i][5], []],
        distfinalprice: [, []],
        prcencno: [data[this.i][7], []],
        pedate: [data[this.i][8], []],
        distremarks: [, []],
        clientmdate:[this.dateformat.transform04(),[]]
      }));
    }
  }
  viewDUPriceEnquiry() {
    var frmdata = { frmint1: 1, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewDUPriceEnquiry(JSON.stringify(frmdata)).subscribe(data => { this.viewServDUPriceEnquiry(data) },
      errorCode => console.log(errorCode));
  }
  validnew(): Number {
    var valflag = 0;
    return valflag;
  }
  savevalid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.clear();
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  init() {
    const control = <FormArray>this.registerForm.controls['stkexp'];
    var data = [[]];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        id: [, []],
        prcencid: [, []],
        purchsessionid: [, []],
        drugproductrefid: [, []],
        prodwaitingqty: [, []],
        vendorid: [, []],
        createdby: [, []],
        locrefid: [, []],
        locname: [, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        slctflag: [, []],
        vendorname: [, []],
        drugname: [, []],
        clientcdate: [, []],
        clientcdate1: [, []],
        calcflag: [1, []],
        delflag: [false, []],
        creditdays: [, []],
        leadtime: [, []],
        exppoqty: [, []],
        exppoprice: [, []],
        indreqqty: [, []],
        stktransapprqty: [, []],
        stktransrejqty: [, []],
        distfinalprice: [, []],
        prcencno: [, []],
        distremarks: [, []],
        clientmdate:[,[]]
      }));
    }
  }
  viewLocationId(id1: any, id2: any) {
    this.registerForm.get('namefromlocrefid').setValue('');
    var frmdata1 = { frmint1: id1, frmint2: id2, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewLocName(JSON.stringify(frmdata1)).subscribe(data => { this.registerForm.get('namefromlocrefid').setValue(data[0][1]) },
      errorCode => console.log(errorCode));
  }
  clear() {
    this.ngOnInit();
  }
}