

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


import { saveDistProdService } from './saveDistProd.service';
import { NgbDropdownConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


import { NotificationsComponent } from '../../../notifications/notifications.component';


import { DxDataGridComponent } from "devextreme-angular";


import { dateFormatPipe } from '../../../notifications/notifications.datepipe';


import { AppComponent } from '../../../app.component';


declare var $: any;

@Component({
  selector: 'app-patientedit',
  templateUrl: './saveDistProd.component.html',
  providers: [saveDistProdService, NgbDropdownConfig, dateFormatPipe, NotificationsComponent]
})

export class saveDistProdComponent implements OnInit {

  closeResult: string;


  fn;
  $: any;

  registerForm: FormGroup;

  distributors = [];

  phcompany = [];


  i;

  autoincr;

  autoval = 0;

  autoinc = 0;
  autodata = [];

  selobj;


  constructor(private userService: saveDistProdService, private notificationsComponent: NotificationsComponent, private dateformat: dateFormatPipe,
    private formBuilder: FormBuilder, config: NgbDropdownConfig, private modalService: NgbModal) {

    config.autoClose = false;
  }


  ngOnInit() {


    this.registerForm = this.formBuilder.group({

      distrefid: [, [Validators.required]],
      autonamenew: [, []],

      clientcdate: [this.dateformat.transform04(), []],

      date: [this.dateformat.transform05(Date.now()), []],

      phcompanyid: [, []],

      distprod: this.formBuilder.array([

      ]),

      dummy: this.formBuilder.array([

      ]),

    });


    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyrefid: AppComponent.companyID, branchrefid: AppComponent.branchID };


    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyrefid: this.selobj.companyrefid };
    this.userService.viewProdDistributors(JSON.stringify(frmdata)).subscribe(data => this.distributors = data,
      errorCode => console.log(errorCode));


    this.userService.viewDPPhCompanies(JSON.stringify(frmdata)).subscribe(data => this.phcompany = data,
      err => {
        console.log('Error occured');
      });


    $(document).ready(function () {


    });

    this.init();

   
  }  //NgOninit Complete


  autofocusin() {



    this.autoincr = setInterval(() => {

      if (this.registerForm.get('autonamenew').value) {

        $('#autolist').show();


        if (this.autoval == this.registerForm.get('autonamenew').value) {


          this.autoinc += 1;




        } else {

          this.autoinc = 0;
        }


        this.autoval = this.registerForm.get('autonamenew').value;

        if (this.autoinc < 1) {


          var frmdata = { frmint1: '', frmstr1: this.registerForm.get('autonamenew').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyrefid };

          this.userService.viewDPCustProducts(JSON.stringify(frmdata)).subscribe(data => { this.autodata = data },
            errorCode => console.log(errorCode));

        }


      }

    }, 610);


  }



  autofocusout() {


    if (this.registerForm.get('autonamenew').value) {


    } else {

      $('#autolist').hide();
    }
    clearInterval(this.autoincr);

  }



  autokeyselect(event: KeyboardEvent, articleId: number) {


    var autoincrflag: number;


    if (event.keyCode == 38) {

      var autoincrflag = articleId - 1;

      if (autoincrflag == 0) {
        $("#autoname").focus();
      } else {
        $("#autolist li:nth-child(" + autoincrflag + ") input").focus();
      }
    }

    if (event.keyCode == 40) {


      var autoincrflag = articleId + 1;

      $("#autolist li:nth-child(" + autoincrflag + ") input").focus();
    }


    if (event.keyCode == 13) {

      var drg = this.autodata[articleId - 1][0];

      var frmdata = { frmint1: drg, frmint2: this.registerForm.get('distrefid').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyrefid };

      this.userService.viewDPCustProduct(JSON.stringify(frmdata)).subscribe(data => { this.viewServCustProduct(data) },
        errorCode => console.log(errorCode));


      $("#autoname").focus();

      this.registerForm.get('autonamenew').setValue('');

      this.autodata = [];
    }



  }






  onSubmit() {


    const control = <FormArray>this.registerForm.controls['distprod'];


    var valflag = 0;



    if (valflag == 0) {

      this.userService.saveDistProd(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
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



  viewServCustProduct(data: any) {

    const control = <FormArray>this.registerForm.controls['distprod'];

    if (data[0][4] != null) {

      this.notificationsComponent.addToast({ title: '', msg: 'Product  Alredy exists    ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }
    if (data[0][4] == null) {

      control.insert(0, this.formBuilder.group({

        distprdid: [, []],
        distrefid: [this.registerForm.get('distrefid').value, []],
        drugprdid: [data[0][0], []],
        masterprice: [data[0][3], []],
        distprice: [0, []],
        qty: [data[0][2], []],


        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],

        createdby: [this.selobj.userid, []],

        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],


        productname: [data[0][1], []],

        calcflag: [0, []],

        selectflag: [true, []],
        creditdays: [, []],
        leadtime: [, []],
        delflag: [false, []],

      }));

    }



  }



  viewServProductPhComp(data: any) {

    const control = <FormArray>this.registerForm.controls['distprod'];


    while (control.length !== 0) {

      control.removeAt(0);

    }

    this.init();

    for (this.i = 0; this.i < data.length; this.i++) {

      control.insert(0, this.formBuilder.group({

        distprdid: [, []],
        distrefid: [this.registerForm.get('distrefid').value, []],
        drugprdid: [data[this.i][0], []],
        masterprice: [data[this.i][3], []],
        distprice: [0, []],
        qty: [data[this.i][2], []],


        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],

        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],


        productname: [data[this.i][1], []],

        calcflag: [0, []],

        selectflag: [false, []],
        creditdays: [, []],
        leadtime: [, []],
        delflag: [false, []],

      }));


    }


  }



  viewProductPhComp() {


    var frmdata = { frmint1: this.registerForm.get('phcompanyid').value, frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };

    this.userService.viewProductPhComp(JSON.stringify(frmdata)).subscribe(data => { this.viewServProductPhComp(data) },
      errorCode => console.log(errorCode));

  }









  remove() {
    const control = <FormArray>this.registerForm.controls['distprod'];


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


    this.init();




  }







  validnew(): Number {
    var valflag = 0;


    return valflag;

  }





  init() {
    const control = <FormArray>this.registerForm.controls['distprod'];
    var data = [[]];



    for (this.i = 0; this.i < data.length; this.i++) {

      control.push(this.formBuilder.group({


        distprdid: [, []],
        distrefid: [, []],
        drugprdid: [, []],
        masterprice: [, []],
        distprice: [, []],
        qty: [, []],

        clientcdate: [, []],
        clientcdate1: [, []],
        createdby: [, []],
        locrefid: [, []],
        locname: [, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        productname: [, []],

        creditdays: [, []],
        leadtime: [, []],

        calcflag: [1, []],

        selectflag: [false, []],
        delflag: [false, []],

      }));


    }

  }


  clear() {

    this.ngOnInit();
  }


  clearProd() {

    const control = <FormArray>this.registerForm.controls['distprod'];


    while (control.length !== 0) {

      control.removeAt(0);

    }

    this.init();


  }



}
