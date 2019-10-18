
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NotificationsComponent } from '../../../notifications/notifications.component';


import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


import { stkretEditService } from './stkretEdit.service';


import { dateFormatPipe } from '../../../notifications/notifications.datepipe';



import { AppComponent } from '../../../app.component';



@Component({
  selector: 'app-stkretEdit',
  templateUrl: './stkretEdit.component.html',
  providers: [stkretEditService, NotificationsComponent, dateFormatPipe]

})
export class stkretEditComponent implements OnInit {



  registerForm: FormGroup;
  id: number;
  private sub: any;

  i;
  selobj;


  editdata = [];


  constructor(private userService: stkretEditService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig, private route: ActivatedRoute, private router1: Router) {

    config.autoClose = false;
  }

  ngOnInit() {

    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.registerForm = this.formBuilder.group({


      formno: [, []],



      date: [, []],

      id: [, []],

      invdispflag: [, []],
      vatdispflag: [this.selobj.vatdispflag, []],
      boxdispflag: [this.selobj.boxdispflag, []],
      stripdispflag: [this.selobj.stripdispflag, []],
      tabdispflag: [this.selobj.tabdispflag, []],

      stkretn: this.formBuilder.array([

      ]),
      dummy: this.formBuilder.array([

      ]),


    });





    $(document).ready(function () {



    });




    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };



    this.userService.viewStkReturnProds(JSON.stringify(frmdata)).subscribe(data => { this.viewServFormProd(data) },
      errorCode => console.log(errorCode));

      alert("kishr" + JSON.stringify(frmdata));



    this.userService.viewStkReturnAll(JSON.stringify(frmdata)).subscribe(data => { this.editdata = data },
      errorCode => console.log(errorCode));


    this.init();



    if (this.id) {
      this.registerForm.get('invdispflag').setValue(1);
    } else {
      this.registerForm.get('invdispflag').setValue(0);

    }




  }





  onSubmit() {

    this.viewEdit();

  }




  viewEdit() {

    var frmdata = { frmint1: this.registerForm.get('id').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };


    this.userService.viewStkReturnProds(JSON.stringify(frmdata)).subscribe(data => { this.viewServFormProd(data); this.router1.navigate(['StockReturn/ViewStockReturn'])   },
      errorCode => console.log(errorCode));

  }

  deleteStockExpiry(){


    var frmdata = {  frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };

    var answer = confirm("Delete data?");

    if (answer) {
      this.userService.deleteStockExpiry(JSON.stringify(frmdata)).subscribe(data => { this.router1.navigate(['/StockReturn/ViewStockReturn'])  },
        errorCode => console.log(errorCode));
    }

  }


  

  deleteStockExpiry1(){


    var frmdata = {  frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };

    var answer = confirm("Delete data?");

    if (answer) {
      this.userService.deleteStockExpiry1(JSON.stringify(frmdata)).subscribe(data => { this.router1.navigate(['/StockReturn/ViewStockReturn'])  },
        errorCode => console.log(errorCode));
    }

  }












  viewServFormProd(data: any) {

    const control = <FormArray>this.registerForm.controls['stkretn'];

    var w = 0;


    while (control.length !== 0) {
      control.removeAt(0);
    }

    this.init();


    for (this.i = 0; this.i < data.length; this.i++) {

      w = 3;


      control.insert(0, this.formBuilder.group({


        stkretnid: [data[this.i][w++], []],
        drugproductrefid: [data[this.i][w++], []],
        batchrefid: [data[this.i][w++], []],
        transfertotalqty: [data[this.i][w++], []],
        returntotalqty: [data[this.i][w++], []],

        clientcdate: [, []],
        clientcdate1: [, []],

        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],

        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],


        drugname: [data[this.i][2], []],

        calcflag: [0, []],

        fromlocname: [, []],
        fromlocrefid: [, []],


        tolocname: [, []],
        tolocrefid: [, []],

        dummy1: [data[this.i][w++], []],
        dummy2: [data[this.i][w++], []],
        dummy3: [data[this.i][w++], []],


        retboxqty: [data[this.i][w++], []],
        retstripqty: [data[this.i][w++], []],
        rettabqty: [data[this.i][w++], []],
        batchname: [data[this.i][w++], []],
        remarks: [data[this.i][w++], []],

        stkmainrefid: [, []],

        stktransprodrefid: [, []],


      }));


    }


    this.registerForm.get('formno').setValue(data[0][0]);

    this.registerForm.get('date').setValue(this.dateformat.transform05(data[0][1]));
  }




  init() {
    const control = <FormArray>this.registerForm.controls['stkretn'];
    var data = [ [], []];



    for (this.i = 0; this.i < data.length; this.i++) {

      control.push(this.formBuilder.group({


        stkretnproid: [, []],
        stkretnid: [, []],
        stktrfrefid: [, []],
        drugproductrefid: [, []],
        batchrefid: [, []],
        transfertotalqty: [, []],
        retboxqty: [, []],
        retstripqty: [, []],
        rettabqty: [, []],
        returntotalqty: [, []],
        boxconvstk: [, []],
        stripconvstk: [, []],

        createdby: [, []],
        locrefid: [, []],
        locname: [, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        indrefid: [, []],

        drugname: [, []],


        clientcdate: [, []],
        clientcdate1: [, []],
        calcflag: [1, []],



        fromlocname: [, []],
        fromlocrefid: [, []],


        tolocname: [, []],
        tolocrefid: [, []],

        stkmainrefid: [, []],
        stktransprodrefid: [, []],

      }));


    }

  }





}