
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


import { prodmapEditService } from './prodmapEdit.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


import { NotificationsComponent } from '../../../notifications/notifications.component';


import { DxDataGridComponent } from "devextreme-angular";



import { dateFormatPipe } from '../../../notifications/notifications.datepipe';


import { AppComponent } from '../../../app.component';







@Component({
  selector: 'app-prodmapEdit',
  templateUrl: './prodmapEdit.component.html',
  providers: [prodmapEditService, NgbDropdownConfig, dateFormatPipe, NotificationsComponent]


})
export class prodmapEditComponent implements OnInit {




  registerForm: FormGroup;

  private sub: any;
  i;

  id;

  autoincr;

  autoval = 0;

  autoinc = 0;
  autodata = [];

  autodata1 = [];

  selobj;

  autofocus;
  autofocustable;

  autotabfocusflag = 0;
  autotabfocusflagnew = 0;

  editdata = [];


  constructor(private userService: prodmapEditService, private notificationsComponent: NotificationsComponent, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig, private route: ActivatedRoute) {

    config.autoClose = false;
  }

  ngOnInit() {





    this.registerForm = this.formBuilder.group({

      formno: [, []],

      autonamenew: [, []],
      autonamenew1: [, []],


      date: [, []],

      id: [, []],
      invdispflag: [, []],


      prodmap: this.formBuilder.array([

      ]),

    });


    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };


    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });


    $(document).ready(function () {

      $(".autolistall1").hide();
    });


    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };

    this.userService.viewProdMap(JSON.stringify(frmdata)).subscribe(data => { this.viewServProdMap(data) },
      errorCode => console.log(errorCode));

    this.userService.viewProdMapAll(JSON.stringify(frmdata)).subscribe(data => { this.editdata = data },
      errorCode => console.log(errorCode));

    this.init();



    if (this.id) {
      this.registerForm.get('invdispflag').setValue(1);
    } else {
      this.registerForm.get('invdispflag').setValue(0);

    }



  }




  autofocusin1() {



    this.autoincr = setInterval(() => {

      if (this.registerForm.get('autonamenew1').value) {

        $('.autolistall1').show();


        if (this.autoval == this.registerForm.get('autonamenew1').value) {


          this.autoinc += 1;


        } else {

          this.autoinc = 0;
        }


        this.autoval = this.registerForm.get('autonamenew1').value;

        if (this.autoinc < 1) {


          var frmdata = { frmint1: '', frmstr1: this.registerForm.get('autonamenew1').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };

          this.userService.viewPMCustProducts1(JSON.stringify(frmdata)).subscribe(data => { this.autodata1 = data },
            errorCode => console.log(errorCode));

        }


      }

    }, 610);

    this.autocleartable1();

  }



  autofocusout1() {


    if (this.registerForm.get('autonamenew1').value) {


    } else {

      //    $('#autolist').hide() ;
    }
    clearInterval(this.autoincr);

  }




  autokeyselect1(event: KeyboardEvent, articleId: number) {


    var nr: number;

    clearInterval(this.autofocus);
    if (event.keyCode == 13) {

      var drg = this.autodata1[articleId][0];

      var frmdata = { frmint1: drg, frmint2: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };

      this.userService.viewPMCustProduct1(JSON.stringify(frmdata)).subscribe(data => { this.viewServCustProduct1(data) },
        errorCode => console.log(errorCode));





      $(".autolistall1").hide();









      this.autofocustable = setInterval(() => {
        $(".tablenew   tr:nth-of-type(" + this.autotabfocusflag + ")  td:nth-of-type(4)   input ").focus();
      }, 219);

      this.registerForm.get('autonamenew1').setValue('');

      this.autodata1 = [];
    }



  }

  autoOpenselect1(event: KeyboardEvent, id: number) {
    this.autotabfocusflag = id + 2;
    this.autotabfocusflagnew = id;

    if (event.keyCode == 9) {
      $('.autolistall1').show();

      this.autofocus = setInterval(() => {
        $("#autoname1").focus();
      }, 219);

    }



  }

  autocleartable1() {

    clearInterval(this.autofocustable);
  }






  onSubmit() {

    const control = <FormArray>this.registerForm.controls['prodmap'];
    var answer = confirm("Save data?");

    if (answer) {


      this.userService.saveProdMap(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));


    }


  }




  savevalid(data: any) {
    if (data == 1) {

      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
    } else {

      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }
  }












































  viewServCustProduct1(data: any) {

    const control = <FormArray>this.registerForm.controls['prodmap'];


    var mapprod = control.value;



    for (this.i = 0; this.i < mapprod.length; this.i++) {




      mapprod[this.autotabfocusflagnew].brandname1 = data[0][1];

      mapprod[this.autotabfocusflagnew].productdrugid1 = data[0][0];

    }

    control.patchValue(mapprod);

  }




  viewServProdMap(data: any) {



    const control = <FormArray>this.registerForm.controls['prodmap'];
    var v = 0;

    for (this.i = 0; this.i < data.length; this.i++) {
      v = 2;

      control.push(this.formBuilder.group({
        id: [data[this.i][v++], []],
        prodmapid: [data[this.i][v++], []],

        productdrugid: [data[this.i][v++], []],
        brandname: [data[this.i][v++], []],
        productdrugid1: [data[this.i][v++], []],
        brandname1: [data[this.i][v++], []],


        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        prodmapno: [data[this.i][v++], []],
        createdby: [data[this.i][v++], []],
        clientcdate: [data[this.i][v], []],
        clientcdate1: [data[this.i][v++], []],


        delflag: [false, []],

        calcflag: [0, []],

      }));


    }

    this.registerForm.get('id').setValue(data[0][3]);
    this.registerForm.get('formno').setValue(data[0][0]);

    this.registerForm.get('date').setValue(this.dateformat.transform05(data[0][1]));




  }







  validnew(): Number {
    var valflag = 0;


    return valflag;

  }





  init() {
    const control = <FormArray>this.registerForm.controls['invoice'];
    var data = [[], [], [], [], [], [], [], []];



    for (this.i = 0; this.i < data.length; this.i++) {

      control.push(this.formBuilder.group({



        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],

        createdby: [, []],
        locrefid: [, []],
        locname: [, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        calcflag: [1, []],

      }));


    }

  }



}