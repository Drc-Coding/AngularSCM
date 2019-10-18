
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';




import { NotificationsComponent } from '../../../notifications/notifications.component';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { distslctSaveService } from './distslctSave.service';


import { dateFormatPipe } from '../../../notifications/notifications.datepipe';

import { AppComponent } from '../../../app.component';




@Component({
  selector: 'app-distslctSave',
  templateUrl: './distslctSave.component.html',

  providers: [distslctSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]

})
export class distslctSaveComponent implements OnInit {




  registerForm: FormGroup;


  prcenqno = [];

  distslctno = [];

  i;

  selobj;

  poflag: string = '0';

  constructor(private userService: distslctSaveService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig
    , private notificationsComponent: NotificationsComponent) {

    config.autoClose = false;
  }

  ngOnInit() {





    this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1  , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID  
      , branchrefid  :AppComponent.branchID     , vatdispflag  :AppComponent.vatDispFlag   , boxdispflag  :AppComponent.BoxDispFlag  
      , stripdispflag  :AppComponent.StripDispFlag    , tabdispflag  :AppComponent.TabDispFlag }  ;


    this.registerForm = this.formBuilder.group({

      prcenq: [, []],
      slctype: [, []],




      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],

      date: [this.dateformat.transform05(Date.now()), []],
      vatdispflag: [ this.selobj.vatdispflag , []], 
      boxdispflag: [  this.selobj.boxdispflag  , []],        
      stripdispflag: [  this.selobj.stripdispflag , []],                    
      tabdispflag: [this.selobj.tabdispflag , []], 
      
      dstslct: this.formBuilder.array([

      ]),




    });










    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewPriceEnquiryNo(JSON.stringify(frmdata)).subscribe(data => { this.prcenqno = data },
      errorCode => console.log(errorCode));



    $(document).ready(function () {



    });




    this.init1();




  }



  onSubmit() {

    var valflag = 0;
    const control = <FormArray>this.registerForm.controls['dstslct'];

    var answer = confirm("Save data?");

    if (answer && valflag == 0) {

      this.userService.savePriceEnqury(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
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



  viewPriceEnquiry() {
    var frmdata = { frmint1: this.registerForm.get('prcenq').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewPriceEnquiry(JSON.stringify(frmdata)).subscribe(data => { this.viewServPriceEnquiry(data)  },
      errorCode => console.log(errorCode));


  }


  viewServPriceEnquiry(data: any) {



    var prcupdateflag = 0;


    for (this.i = 0; this.i < data.length; this.i++) {

      if (parseInt(data[this.i][9]) != 1) {
        prcupdateflag = 1;

      }
    }



    if (prcupdateflag == 1) {

      var answer = confirm("Price Not fully updated.Do You want to  load?");

    }



    if ((answer == true) || (prcupdateflag == 0)) {

      const control = <FormArray>this.registerForm.controls['dstslct'];


      while (control.length !== 0) {

        control.removeAt(0);

      }

      this.init1();

      for (this.i = 0; this.i < data.length; this.i++) {


        control.insert(0, this.formBuilder.group({

          distslctproid: [, []],
          distslctid: [, []],
          prcenqrefid: [data[this.i][2], []],
          drugproductrefid: [data[this.i][0], []],
          prodwaitingqty: [data[this.i][8], []],
          distfinalprice: [data[this.i][12], []],
          vendorid: [data[this.i][1], []],
          vendorslctflag: [false, []],

          clientcdate: [this.dateformat.transform04(), []],
          clientcdate1: [this.dateformat.transform04(), []],

          createdby: [this.selobj.userid, []],
          locrefid: [this.selobj.locrefid, []],
          locname: [this.selobj.locname, []],
          countryrefid: [this.selobj.countryrefid, []],
          companyrefid: [this.selobj.companyid, []],
          branchrefid: [this.selobj.branchrefid, []],
          vendorname: [data[this.i][3], []],
          drugcode: [data[this.i][0], []],
          drugname: [data[this.i][4], []],
          poflag: [0, []],
          calcflag: [0, []],

          masterprice: [data[this.i][5], []],
          creditdays: [data[this.i][6], []],
          leadtime: [data[this.i][7], []],

          exppoqty: [data[this.i][10], []],
          exppoprice: [data[this.i][11], []],
          distremarks: [data[this.i][13], []],
          purcsessionrefid: [data[this.i][14], []],
          pudate:[data[this.i][15], []]
        }));


      }


    }




  }









  calc() {



  }





  valid(): Number {
    var valflag = 0;



    return valflag;

  }




  init1() {
    const control = <FormArray>this.registerForm.controls['dstslct'];
    var data = [[], []];



    for (this.i = 0; this.i < data.length; this.i++) {

      control.push(this.formBuilder.group({



        distslctproid: [, []],
        distslctid: [, []],
        prcenqrefid: [, []],
        drugproductrefid: [, []],
        prodwaitingqty: [, []],
        distfinalprice: [, []],
        vendorid: [, []],
        vendorslctflag: [false, []],
        clientcdate: [, []],
        clientcdate1: [, []],

        createdby: [, []],
        locrefid: [, []],
        locname: [, []],

        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],


        vendorname: [, []],

        drugcode: [, []],

        drugname: [, []],
        poflag: [, []],
        calcflag: [1, []],
        exppoqty: [, []],
        exppoprice: [, []],
        distremarks: [, []],
        purcsessionrefid: [, []],
        pudate:[,[]]
      }));


    }

  }






  clear() {

    this.ngOnInit();
  }




}