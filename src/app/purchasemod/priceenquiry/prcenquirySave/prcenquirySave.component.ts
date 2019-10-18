import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { prcenquirySaveService } from './prcenquirySave.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-prcenquirySave',
  templateUrl: './prcenquirySave.component.html',
  providers: [prcenquirySaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class prcenquirySaveComponent implements OnInit {
  registerForm: FormGroup;
  indtapprno = [];
  i;
  selobj;
  constructor(private userService: prcenquirySaveService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig, private notificationsComponent: NotificationsComponent) {
    config.autoClose = false;
  }
  ngOnInit() {
    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };
    this.registerForm = this.formBuilder.group({
      purcsession: [, []],
      distdisplayflag: [, []],
      date: [this.dateformat.transform05(Date.now()), []],
      vatdispflag: [this.selobj.vatdispflag, []],
      boxdispflag: [this.selobj.boxdispflag, []],
      stripdispflag: [this.selobj.stripdispflag, []],
      tabdispflag: [this.selobj.tabdispflag, []],
      purc: this.formBuilder.array([
      ]),
      prepriceenq: this.formBuilder.array([
      ]),
      priceenq: this.formBuilder.array([
      ]),
      dummy: this.formBuilder.array([
      ]),
    });
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewPurchSession(JSON.stringify(frmdata)).subscribe(data => { this.indtapprno = data },
      errorCode => console.log(errorCode));
    $(document).ready(function () {
    });
    this.init1();
    this.init2();
    this.init3();
    this.registerForm.get('distdisplayflag').setValue(0);
  }
  onSubmit() {
    const control = <FormArray>this.registerForm.controls['priceenq'];
    var answer = confirm("Save data?");
    if (answer) {
      this.userService.savePriceEnqiry(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));;
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
  viewPurchSessionProd() {
    var frmdata = { frmint1: this.registerForm.get('purcsession').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewPurchSessionProd(JSON.stringify(frmdata)).subscribe(data => { this.viewServPurchSessionProd(data) },
      errorCode => console.log(errorCode));
  }
  viewServPurchSessionProd(data: any) {
    const control = <FormArray>this.registerForm.controls['purc'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init1();
    for (this.i = 0; this.i < data.length; this.i++) {
      control.insert(0, this.formBuilder.group({
        prcencproid: [, []],
        prcencid: [, []],
        purchsessionid: [data[this.i][1], []],
        drugproductrefid: [data[this.i][2], []],
        prodwaitingqty: [data[this.i][3], []],
        vendorid: [, []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        slctflag: [, []],
        vendorname: [, []],
        drugname: [data[this.i][0], []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        calcflag: [0, []],
        delflag: [false, []],
        creditdays: [, []],
        leadtime: [, []],
        exppoqty: [, []],
        exppoprice: [, []],
        indreqqty: [data[this.i][4], []],
        stktransapprqty: [data[this.i][5], []],
        stktransrejqty: [data[this.i][6], []],
        remarks: [, []],
        abc: [, []],
        distprodrank: [, []],
      }));
    }
  }
  viewProdWiseDist(i: number) {
    
    const control = <FormArray>this.registerForm.controls['purc'];
    var stk = control.value;
    var frmdata = { frmint1: stk[i].drugproductrefid, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewProdWiseDist(JSON.stringify(frmdata)).subscribe(data => { this.viewServProdWiseDist(data, i) },
      errorCode => console.log(errorCode));
  }
  viewServProdWiseDist(data: any, ik: number) {
    const control = <FormArray>this.registerForm.controls['prepriceenq'];
    const controlind = <FormArray>this.registerForm.controls['purc'];
    var stk = controlind.value;
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init2();
    for (this.i = 0; this.i < data.length; this.i++) {
      if (stk[ik].calcflag != 1) {
        control.insert(0, this.formBuilder.group({
          prcencproid: [, []],
          prcencid: [, []],
          purchsessionid: [stk[ik].purchsessionid, []],
          drugproductrefid: [stk[ik].drugproductrefid, []],
          prodwaitingqty: [stk[ik].prodwaitingqty, []],
          vendorid: [data[this.i][0], []],
          createdby: [stk[ik].createdby, []],
          locrefid: [stk[ik].locrefid, []],
          locname: [stk[ik].locname, []],
          countryrefid: [this.selobj.countryrefid, []],
          companyrefid: [this.selobj.companyid, []],
          branchrefid: [this.selobj.branchrefid, []],
          slctflag: [, []],
          vendorname: [data[this.i][1], []],
          drugname: [stk[ik].drugname, []],
          clientcdate: [this.dateformat.transform04(), []],
          clientcdate1: [this.dateformat.transform04(), []],
          calcflag: [0, []],
          delflag: [false, []],
          creditdays: [data[this.i][4], []],
          leadtime: [data[this.i][5], []],
          exppoqty: [stk[ik].prodwaitingqty, []],
          exppoprice: [, []],
          indreqqty: [stk[ik].indreqqty, []],
          stktransapprqty: [stk[ik].stktransapprqty, []],
          stktransrejqty: [stk[ik].stktransrejqty, []],
          remarks: [, []],
          previouspoprice: [data[this.i][6], []],
          abc: [data[this.i][7], []],
          distprodrank: [, []],
        }));
      }
    }
    this.registerForm.get('distdisplayflag').setValue(1);
  }
  viewConsolPriceEnquiry() {
    const stkcontrol = <FormArray>this.registerForm.controls['prepriceenq'];
    const stktransfercontrol = <FormArray>this.registerForm.controls['priceenq'];
    var stk = stkcontrol.value;
    var stktransfer = stktransfercontrol.value;
    var drgflag = 0;
    for (this.i = 0; this.i < stktransfer.length; this.i++) {
      if ((stktransfer[this.i].drugproductrefid == stk[0].drugproductrefid) && (stktransfer[this.i].calcflag != 1)) {
        drgflag = 1;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Drug   Already Exist', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }
    for (this.i = 0; this.i < stk.length; this.i++) {
      if ((stk[this.i].slctflag == 1 && drgflag == 0) && (stk[this.i].calcflag != 1)) {
        stktransfercontrol.insert(0, this.formBuilder.group({
          prcencproid: [, []],
          prcencid: [, []],
          purchsessionid: [stk[this.i].purchsessionid, []],
          drugproductrefid: [stk[this.i].drugproductrefid, []],
          prodwaitingqty: [stk[this.i].prodwaitingqty, []],
          vendorid: [stk[this.i].vendorid, []],
          createdby: [stk[this.i].createdby, []],
          locrefid: [stk[this.i].locrefid, []],
          locname: [stk[this.i].locname, []],
          countryrefid: [this.selobj.countryrefid, []],
          companyrefid: [this.selobj.companyid, []],
          branchrefid: [this.selobj.branchrefid, []],
          slctflag: [, []],
          vendorname: [stk[this.i].vendorname, []],
          drugname: [stk[this.i].drugname, []],
          clientcdate: [this.dateformat.transform04(), []],
          clientcdate1: [this.dateformat.transform04(), []],
          calcflag: [0, []],
          delflag: [false, []],
          creditdays: [stk[this.i].creditdays, []],
          leadtime: [stk[this.i].leadtime, []],
          exppoqty: [stk[this.i].exppoqty, []],
          exppoprice: [stk[this.i].exppoprice, []],
          indreqqty: [stk[this.i].indreqqty, []],
          stktransapprqty: [stk[this.i].stktransapprqty, []],
          stktransrejqty: [stk[this.i].stktransrejqty, []],
          remarks: [stk[this.i].remarks, []],
          previouspoprice: [stk[this.i].previouspoprice, []],
          abc: [, []],
          distprodrank: [, []],
          /*  */
        }));
      }
    }
    this.registerForm.get('distdisplayflag').setValue(0);
  }
  remove() {
    const control = <FormArray>this.registerForm.controls['priceenq'];
    const controlrem = <FormArray>this.registerForm.controls['dummy'];
    var valorg = control.value;
    for (this.i = 0; this.i < valorg.length; this.i++) {
      if ((parseInt(valorg[this.i].calcflag) != 1) && (valorg[this.i].delflag != true)) {
        controlrem.insert(0, control.at(this.i));
      }
    }
    while (control.length !== 0) {
      control.removeAt(0);
    }
    for (this.i = 0; this.i < controlrem.value.length; this.i++) {
      control.insert(0, controlrem.at(this.i));
    }
    while (controlrem.length !== 0) {
      controlrem.removeAt(0);
    }
    this.init3();
  }
  init1() {
    const control = <FormArray>this.registerForm.controls['purc'];
    var data = [[], []];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        prcencproid: [, []],
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
        remarks: [, []],
        previouspoprice: [, []],
        abc: [, []],
        distprodrank: [, []],
      }));
    }
  }
  init2() {
    const control = <FormArray>this.registerForm.controls['prepriceenq'];
    var data = [[], []];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        prcencproid: [, []],
        prcencid: [, []],
        purchsessionid: [, []],
        drugproductrefid: [, []],
        prodwaitingqty: [, []],
        vendorid: [, []],
        createdby: [, []],
        locrefid: [, []],
        locname: [, []],
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
        remarks: [, []],
        previouspoprice: [, []],
        abc: [, []],
        distprodrank: [, []],
      }));
    }
  }
  init3() {
    const control = <FormArray>this.registerForm.controls['priceenq'];
    var data = [[], []];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        prcencproid: [, []],
        prcencid: [, []],
        purchsessionid: [, []],
        drugproductrefid: [, []],
        prodwaitingqty: [, []],
        vendorid: [, []],
        createdby: [, []],
        locrefid: [, []],
        locname: [, []],
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
        remarks: [, []],
        previouspoprice: [, []],
        abc: [, []],
        distprodrank: [, []],
      }));
    }
  }
  clear() {
    this.ngOnInit();
  }
  closedist() {
    this.registerForm.get('distdisplayflag').setValue(0);
  }
}