
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { stkexpSaveService } from './stkexpSave.service';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { DxDataGridComponent } from "devextreme-angular";
import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-stkexpSave',
  templateUrl: './stkexpSave.component.html',
  providers: [stkexpSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})


export class stkexpSaveComponent implements OnInit {

  registerForm: FormGroup;
  selobj;
  i;
  tolocname1 = [];
  tolocrefid1 = [];
  returnValid: any;
  constructor(private userService: stkexpSaveService, private formBuilder: FormBuilder, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent, private router: Router) {
    this.registerForm = this.formBuilder.group({
      tolocname: ['0', []],
      tolocrefid: ['0', []],
      date: [this.dateformat.transform05(Date.now()), []],
      stkexp: this.formBuilder.array([]),

    });


  }

  ngOnInit() {

    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    
    this.viewMainstockExpiry();
    this.userService.getLoctype().subscribe(data => this.tolocname1 = data,
      err => {
        console.log('Error on getLoctype')
      });
  }

  getlocrefname() {
    
    this.userService.getlocrefid(this.registerForm.get('tolocname').value).subscribe(data => this.tolocrefid1 = data,
      err => {
        console.log('Error on tolocrefid')
      });
  }

k;
  onSubmit() {
  
    this.returnValid = this.expiryvalidation();
    if (this.returnValid == true) {
   
    var valflag: Number = 0;
    const control = <FormArray>this.registerForm.controls['stkexp'];
    let setData = control.value;
    for (this.k = 0; this.k < setData.length; this.k++) {
      setData[this.k].tolocname =this.registerForm.get('tolocname').value;
      setData[this.k].tolocrefid =this.registerForm.get('tolocrefid').value;
     
    }
    valflag = this.validnew();
    var answer = confirm("Save data?"); if (answer && valflag == 0) {
    
      this.userService.saveStockExpiry(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
    }
  }
  else{
    this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
  }

  }

  expiryvalidation(): Boolean {
   
    const control = <FormArray>this.registerForm.controls['stkexp'];
    let setData = control.value;
  
    for (this.k = 0; this.k < setData.length; this.k++) {
    
     if(setData[this.k].actualstockqty<setData[this.k].expstockqty){
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Entered Qty Is Higher Than Available Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
       return false
     }
   
    }
   
   
   

    return true;
  }

  init() {
    const control = <FormArray>this.registerForm.controls['stkexp'];
    var data = [[]];

    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({

        stkexpproid: [, []],
        stkexprefid: [, []],
        drugproductid: [, []],
        batchrefid: [, []],

        actualstockqty: [, []],
        expboxqty: [, []],
        expstripqty: [, []],
        exptabqty: [, []],
        expstockqty: [, []],
        boxconvstk: [, []],
        stripconvstk: [, []],
        clientcdate: [, []],
        clientcdate1: [, []],
        createdby: [, []],
        locrefid: [, []],
        locname: [, []],
        drugname: [, []],
        calcflag: [1, []],
        delflag: [false, []],
      }));
    }
  }

  viewServMainstockExpiry(data: any) {
    const control = <FormArray>this.registerForm.controls['stkexp'];
   
    var i = 0; while (control.length !== 0) {
      control.removeAt(0);
    }
    
   
    this.init();

    for (this.i = 0; this.i < data.length; this.i++) {
      i = 0;
      control.insert(0, this.formBuilder.group({
        stkexpproid: [, []],
        stkexprefid: [, []],
        drugproductid: [data[this.i][1], []],
        batchrefid: [data[this.i][8], []],
        actualstockqty: [data[this.i][3], []],
        expboxqty: [, []],
        expstripqty: [, []],
        exptabqty: [, []],
        expstockqty: [, []],
        boxconvstk: [data[this.i][5], []],
        stripconvstk: [data[this.i][6], []],
        stkexpirydate: [data[this.i][7], []],
        batchnumber: [data[this.i][2], []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        tolocname:['0',[]],
        tolocrefid:['0',[]],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        drugname: [data[this.i][0], []],
        calcflag: [0, []],
        delflag: [false, []],
      }));
    }
  }
  viewMainstockExpiry() {
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewMainstockExpiry(JSON.stringify(frmdata)).subscribe(data => { this.viewServMainstockExpiry(data) }, errorCode => console.log(errorCode));
  }
  calc(e) {
    this.calcStocKExp();
  }
  calcStocKExp() {
    const control = <FormArray>this.registerForm.controls['stkexp']; var ind = control.value; var boxqty: number = 0;
    var stripqty: number = 0;
    var tabqty: number = 0;
    var qty: number = 0; var boxconvstk: number = 0;
    var stripconvstk: number = 0;
    for (this.i = 0; this.i < ind.length; this.i++) {
      if (parseInt(ind[this.i].calcflag) != 1) {
        if (parseInt(ind[this.i].expboxqty)) {
          boxqty = parseInt(ind[this.i].expboxqty);
        } else {
          boxqty = 0;
        } if (parseInt(ind[this.i].expstripqty)) {
          stripqty = parseInt(ind[this.i].expstripqty);
        } else {
          stripqty = 0;
        }
        if (parseInt(ind[this.i].exptabqty)) {
          tabqty = parseInt(ind[this.i].exptabqty);
        } else {
          tabqty = 0;
        } if (parseInt(ind[this.i].boxconvstk)) {
          boxconvstk = parseInt(ind[this.i].boxconvstk);
        } else {
          boxconvstk = 0;
        }
        if (parseInt(ind[this.i].stripconvstk)) {
          stripconvstk = parseInt(ind[this.i].stripconvstk);
        } else {
          stripconvstk = 0;
        }
        ind[this.i].expstockqty = boxqty * boxconvstk + stripqty * stripconvstk + tabqty;
      }
    } control.patchValue(ind);
  } validnew(): Number {
    var valflag = 0; return valflag;
  }
  savevalid(data: any) {
  
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.router.navigate(['/ExpiredStock/ViewExpiredStock']);
    } 
    else { this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' }); }
  }

  
}