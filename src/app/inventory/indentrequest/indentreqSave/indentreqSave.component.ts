
import { Component, OnInit, enableProdMode, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { indentreqSaveService } from './indentreqSave.service';


import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  DxDataGridModule,
  DxSparklineModule,
  DxTemplateModule
} from 'devextreme-angular';



import { NotificationsComponent } from '../../../notifications/notifications.component';

import { dateFormatPipe } from '../../../notifications/notifications.datepipe';

import { AppComponent } from '../../../app.component';


import { DxDataGridComponent } from "devextreme-angular";





@Component({
  selector: 'app-patientedit',
  templateUrl: './indentreqSave.component.html',



  providers: [indentreqSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]

})
export class indentreqSaveComponent implements OnInit {



  registerForm: FormGroup;

  indentrequest = [];

  destination = [];

  i;
  selobj;

  inc = 1;


  autoincr;

  autoval = 0;

  autoinc = 0;

  autodata = [];

  stkminqty = [];


  val35 = [];

  constructor(private userService: indentreqSaveService, private notificationsComponent: NotificationsComponent, private formBuilder: FormBuilder, config: NgbDropdownConfig, private dateformat: dateFormatPipe) {

    config.autoClose = false;
  }

  ngOnInit() {

    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };



    this.registerForm = this.formBuilder.group({

      indentreqid: [, []],
      indentno: [, []],
      indentdate: [, []],


      totalqty: [, []],

      fromlocname: [this.selobj.locname, []],
      fromlocrefid: [this.selobj.locrefid, []],


      tolocname: [, []],
      tolocrefid: [, [Validators.required]],




      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],


      autonamenew: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],

      date: [this.dateformat.transform05(Date.now()), []],

      stkminid: [0, []],

      stkminrefid: [0, []],

      namefromlocname: [, []],
      namefromlocrefid: [, []],
      nametolocname: [, []],
      nametolocrefid: [, []],

      vatdispflag: [this.selobj.vatdispflag, []],
      boxdispflag: [this.selobj.boxdispflag, []],
      stripdispflag: [this.selobj.stripdispflag, []],
      tabdispflag: [this.selobj.tabdispflag, []],



      indreq: this.formBuilder.array([

      ]),

      dummy: this.formBuilder.array([

      ]),


    });


    //       this.registerForm.get('indentdate').setValue("2015-11-28") ;



    $(document).ready(function () {



      $('#autolist').hide();



    });


    let s: any = JSON.parse(localStorage.getItem("purchasesession"));

    this.init();


    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewStkMinQtyAll(JSON.stringify(frmdata)).subscribe(data => {
    this.stkminqty = data

    },
      errorCode => console.log(errorCode));


    this.viewLocationId(AppComponent.locRefName1, AppComponent.locrefID1);

  }//ngoninit end



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
          var frmdata = { frmint1: '', frmstr1: this.registerForm.get('autonamenew').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
          this.userService.viewIrqWhCustProduct(JSON.stringify(frmdata)).subscribe(data => { this.autodata = data },
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

      var frmdata = { frmint1: drg, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
      this.userService.viewServCustProducts(JSON.stringify(frmdata)).subscribe(data => { this.viewServCustProduct(data) },
        errorCode => console.log(errorCode));


      $("#autoname").focus();

      this.registerForm.get('autonamenew').setValue('');

      this.autodata = [];
    }

  }



  viewServCustProduct(data: any) {


    var i = 0;


    const control = <FormArray>this.registerForm.controls['indreq'];




    for (this.i = 0; this.i < data.length; this.i++) {



      control.insert(0, this.formBuilder.group({

        indentprdid: [, []],
        indentrefid: [, []],
        drugprdrefid: [data[0][1], []],
        batchno: [, []],
        boxqty: [, []],
        stripqty: [, []],
        tabqty: [, []],
        qty: [, []],

        drugname: [data[0][0], []],

        boxconvdrg: [data[0][2], []],
        stripconvdrg: [data[0][3], []],
        minqty: [data[0][4], []],
        maxqty: [data[0][5], []],


        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],

        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],

        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],

        calcflag: [0, []],

        remarks: [, []],

        delflag: [false, []],
      }));

    }


  }



  viewServStkMinQty(data: any) {

    var i = 0;
    const control = <FormArray>this.registerForm.controls['indreq'];

    while (control.length !== 0) {
      control.removeAt(0);
    }


    this.init();

    for (this.i = 0; this.i < data.length; this.i++) {

      i = 0;

      control.insert(0, this.formBuilder.group({

        indentprdid: [, []],
        indentrefid: [, []],
        drugprdrefid: [data[this.i][5], []],
        batchno: [data[this.i][6], []],
        boxqty: [, []],
        stripqty: [, []],
        tabqty: [data[this.i][8], []],
        qty: [data[this.i][8], []],

        drugname: [data[this.i][2], []],

        boxconvdrg: [data[this.i][10], []],
        stripconvdrg: [data[this.i][11], []],
        minqty: [data[this.i][12], []],
        maxqty: [data[this.i][13], []],

        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],

        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],


        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],

        calcflag: [0, []],

        remarks: [data[this.i][14], []],


        delflag: [false, []],


      }));

    }

    this.registerForm.get('stkminrefid').setValue(data[0][4]);


  }



  viewStkMinQty() {

    var frmdata = { frmint1: this.registerForm.get('stkminid').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewStkMinQty(JSON.stringify(frmdata)).subscribe(data => { this.viewServStkMinQty(data) },
      errorCode => console.log(errorCode));

  }



  onSubmit() {


    var valflag = 0;
    const control = <FormArray>this.registerForm.controls['indreq'];

    var answer = confirm("Save data?");


   

   

    if (answer && valflag == 0) {



      this.userService.saveIndentRequest(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveIndentProducts(data) },
        errorCode => console.log(errorCode));


    }


  }




  saveIndentProducts(data: any) {

    const control = <FormArray>this.registerForm.controls['indreq'];

    if (data == 1) {
      this.userService.saveIndentProducts(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
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




  viewDestination() {

    var destid = 0;

    destid = this.registerForm.get('tolocname').value;

    if (destid == 2) {

      this.registerForm.get('nametolocname').setValue('warehouse')

      var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid,branchrefid: this.selobj.branchrefid };
      this.userService.viewWareHouse(JSON.stringify(frmdata)).subscribe(data => { this.destination = data },
        errorCode => console.log(errorCode));

    } else if (destid == 1) {

      this.registerForm.get('nametolocname').setValue('Shop');

      var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid ,branchrefid: this.selobj.branchrefid};
      this.userService.viewshopinformation(JSON.stringify(frmdata)).subscribe(data => { this.destination = data },
        errorCode => console.log(errorCode));


    } else if (destid == 3) {

      this.registerForm.get('nametolocname').setValue('hospital')

      var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid,branchrefid: this.selobj.branchrefid };
      this.userService.viewHospital(JSON.stringify(frmdata)).subscribe(data => { this.destination = data },
        errorCode => console.log(errorCode));

    }


  }


  calc(e) {

    this.calcIndentProd();

  }



  calcIndentProd() {

    const control = <FormArray>this.registerForm.controls['indreq'];

    var ind = control.value;

    control.patchValue(ind);
    var boxqty: number = 0;
    var stripqty: number = 0;
    var tabqty: number = 0;
    var qty: number = 0;

    var boxconvdrg: number = 0;
    var stripconvdrg: number = 0;


    for (this.i = 0; this.i < ind.length; this.i++) {

      if (parseInt(ind[this.i].calcflag) != 1) {

        if (parseInt(ind[this.i].boxqty)) {
          boxqty = parseInt(ind[this.i].boxqty);
        } else {
          boxqty = 0;
        }

        if (parseInt(ind[this.i].stripqty)) {
          stripqty = parseInt(ind[this.i].stripqty);
        } else {
          stripqty = 0;
        }


        if (parseInt(ind[this.i].tabqty)) {
          tabqty = parseInt(ind[this.i].tabqty);
        } else {
          tabqty = 0;
        }


        if (parseInt(ind[this.i].boxconvdrg)) {
          boxconvdrg = parseInt(ind[this.i].boxconvdrg);

        } else {
          boxconvdrg = 0;
        }


        if (parseInt(ind[this.i].stripconvdrg)) {
          stripconvdrg = parseInt(ind[this.i].stripconvdrg);

        } else {

          stripconvdrg = 0;
        }


        ind[this.i].qty = boxqty * boxconvdrg + stripqty * stripconvdrg + tabqty;


        this.indentrequest = ind;

      }

    }



    control.patchValue(ind);


  }








  remove() {
    const control = <FormArray>this.registerForm.controls['indreq'];


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
    const control = <FormArray>this.registerForm.controls['indreq'];
    var data = [[],[]];



    for (this.i = 0; this.i < data.length; this.i++) {

      control.push(this.formBuilder.group({



        indentprdid: [, []],
        indentrefid: [, []],
        drugprdrefid: [, []],
        batchno: [, []],
        boxqty: [, []],
        stripqty: [, []],
        tabqty: [, []],
        qty: [, []],
        drugname: [, []],
        boxconvdrg: [, []],
        stripconvdrg: [, []],
        minqty: [, []],
        maxqty: [, []],
        createdby: [, []],
        locrefid: [, []],
        locname: [, []],

        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],


        clientcdate: [, []],
        clientcdate1: [, []],

        calcflag: [1, []],
        remarks: [, []],



        delflag: [false, []],
      }));


    }

  }















  viewLocationId(id1: any, id2: any) {

    if (id1 == 1) {
      this.registerForm.get('namefromlocname').setValue('Shop');

    } else if (id1 == 2) {
      this.registerForm.get('namefromlocname').setValue('warehouse');
    } else if (id1 == 3) {
      this.registerForm.get('namefromlocname').setValue('hospital');

    }

    this.registerForm.get('namefromlocrefid').setValue('');
    var frmdata1 = { frmint1: id1, frmint2: id2, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };

    this.userService.viewLocName(JSON.stringify(frmdata1)).subscribe(data => { this.registerForm.get('namefromlocrefid').setValue(data[0][1]) },
      errorCode => console.log(errorCode));


  }



  viewLocationId2() {



    var frmdata1 = { frmint1: this.registerForm.get('tolocname').value, frmint2: this.registerForm.get('tolocrefid').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };

    this.userService.viewLocName(JSON.stringify(frmdata1)).subscribe(data => { this.registerForm.get('nametolocrefid').setValue(data[0][1]) },
      errorCode => console.log(errorCode));


  }
















  clear() {

    this.ngOnInit();
  }










}