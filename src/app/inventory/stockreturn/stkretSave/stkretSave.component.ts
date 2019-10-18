
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


import { NotificationsComponent } from '../../../notifications/notifications.component';

import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { stkretSaveService } from './stkretSave.service';


import { DxDataGridComponent } from "devextreme-angular";

import { dateFormatPipe } from '../../../notifications/notifications.datepipe';


import { AppComponent } from '../../../app.component';



@Component({
  selector: 'app-stkretSave',
  templateUrl: './stkretSave.component.html',
  providers: [stkretSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]

})
export class stkretSaveComponent implements OnInit {

  registerForm: FormGroup;
  registerForm1: FormGroup;
  registerForm2: FormGroup;

  stktransno = [];

  i;
  selobj;

  tolocrefid;
  tolocname;














  fromlocname;
  fromlocrefid;

  namefromlocname;
  namefromlocrefid;
  nametolocname;
  nametolocrefid;


  indrefid;

  constructor(private userService: stkretSaveService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig, private notificationsComponent: NotificationsComponent) {

    config.autoClose = false;
  }

  ngOnInit() {

    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };

    this.registerForm = this.formBuilder.group({


      stktrans: [, []],


      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],

      date: [this.dateformat.transform05(Date.now()), []],

      fromlocname: [, []],
      fromlocrefid: [, []],


      tolocname: [, []],
      tolocrefid: [, []],

      tolocrefidname: [, []],

      namefromlocname: [, []],
      namefromlocrefid: [, []],
      nametolocname: [, []],
      nametolocrefid: [, []],
      vatdispflag: [this.selobj.vatdispflag, []],
      boxdispflag: [this.selobj.boxdispflag, []],
      stripdispflag: [this.selobj.stripdispflag, []],
      tabdispflag: [this.selobj.tabdispflag, []],

      
      stkretn: this.formBuilder.array([

      ]),

      dummy: this.formBuilder.array([

      ]),


    });


    this.registerForm1 = this.formBuilder.group({

  
      debitaccount: [ 20 , []]     ,    
      creditaccount: [ 30 , []]     ,  
       
      debitamount: [  , []]     ,     
      creditamount:[  , []]     ,             
      draccname: [ 'Sales  income' , []]     ,    
  
      craccname:[ 'Purchse Expense ' , []]     ,    
  
      invoiceno: [, []],

      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],

      cashflag: [, []],

      jrnltype: [1, []],
      jrnlname: ['GenaralJournal', []],
      bulkflag: [, []],



      personid: [, []],
      persontype: [, []],
      invoicetype: [7, []],


      paymenttype: [, []],
      ptrefno: [, []],

      createdby: [this.selobj.userid, []],
      locrefid: [, []],
      locname: [, []],

      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],

      salesflag: [0, []],
      calcflag: [0, []],

      debitcalcflag: [0, []],
      creditcalcflag: [1, []],

    });



    this.registerForm2 = this.formBuilder.group({

      debitaccount: [ 20 , []]     ,    
      creditaccount: [ 30 , []]     ,  
       
      debitamount: [  , []]     ,     
      creditamount:[  , []]     ,             
      draccname: [ 'Sales  income' , []]     ,    
  
      craccname:[ 'Purchse Expense ' , []]     ,   
      invoiceno: [, []],

      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],

      cashflag: [, []],

      jrnltype: [1, []],
      jrnlname: ['GenaralJournal', []],
      bulkflag: [, []],



      personid: [, []],
      persontype: [, []],
      invoicetype: [7, []],


      paymenttype: [, []],
      ptrefno: [, []],

      createdby: [this.selobj.userid, []],
      locrefid: [, []],
      locname: [, []],

      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],

      salesflag: [0, []],
      calcflag: [0, []],
      debitcalcflag: [1, []],
      creditcalcflag: [0, []],
    });



    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };



    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewStkTransfer(JSON.stringify(frmdata)).subscribe(data => { this.stktransno = data },
      errorCode => console.log(errorCode));




    $(document).ready(function () {



    });



    this.init();





  }



  onSubmit() {

    this.calcIndentProd();
    var valflag: Number = 0;
    valflag = this.validnew();
    const control = <FormArray>this.registerForm.controls['stkretn'];
let setData = control.value;


let selected =0;

let arr =[];

    var answer = confirm("Save data?");

    if (answer && valflag == 0) {

  for(let i =0;i<setData.length;i++){

if(setData[i].delflag && setData[i].drugname){


  selected = selected+1;

  arr.push(setData[i]);

}
}


if(selected==0){
  this.notificationsComponent.addToast({ title: 'Error', msg: 'please select data ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
return;
}

this.userService.saveStockRetProducts(JSON.stringify(arr)).subscribe(data => { this.saveReturnAcc(data), this.saveReceiveAcc(data) },
errorCode => console.log(errorCode));



   }



  }




  saveReturnAcc(data: any) {

    if (data == 1) {

      this.userService.saveGenJournal(JSON.stringify(this.registerForm1.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));
    }

  }

  saveReceiveAcc(data: any) {

    if (data == 1) {
      const control = <FormArray>this.registerForm.controls['stkrec'];
      this.userService.saveGenJournal(JSON.stringify(this.registerForm2.value)).subscribe(data => { this.savevalid(data) },
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





























  viewStkTransfProducts() {

    var id = this.registerForm.get('stktrans').value;

    this.fromlocrefid = this.stktransno[id][2];
    this.fromlocname = this.stktransno[id][3];

    this.tolocrefid = this.stktransno[id][4];
    this.tolocname = this.stktransno[id][5];

    this.indrefid = this.stktransno[id][6];

    this.namefromlocname = this.stktransno[id][7];
    this.namefromlocrefid = this.stktransno[id][8];
    this.nametolocname = this.stktransno[id][9];
    this.nametolocrefid = this.stktransno[id][10];

    this.registerForm.get('tolocname').setValue(this.stktransno[id][5]);


    this.registerForm1.get('locrefid').setValue(this.stktransno[id][2]);
    this.registerForm1.get('locname').setValue(this.stktransno[id][3]);
    this.registerForm2.get('locrefid').setValue(this.stktransno[id][4]);
    this.registerForm2.get('locname').setValue(this.stktransno[id][5]);


    this.viewLocationId(this.stktransno[id][5], this.stktransno[id][4]);

    var frmdata = { frmint1: this.stktransno[id][0], frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewStkTransfProducts(JSON.stringify(frmdata)).subscribe(data => { this.viewServStkTransfProducts(data) },
      errorCode => console.log(errorCode));


  }


  viewServStkTransfProducts(data: any) {

    const control = <FormArray>this.registerForm.controls['stkretn'];


    while (control.length !== 0) {
      control.removeAt(0);
    }

    this.init();

    var w = 0;

    for (this.i = 0; this.i < data.length; this.i++) {


      w = 1;
      control.insert(0, this.formBuilder.group({


        stkretnproid: [, []],
        stkretnid: [, []],
        stktrfrefid: [data[this.i][w++], []],
        drugproductrefid: [data[this.i][w++], []],
        batchrefid: [data[this.i][w++], []],
        transfertotalqty: [data[this.i][w++], []],

        retboxqty: [, []],
        retstripqty: [, []],
        remarks:[,[]],
        rettabqty: [, []],
        returntotalqty: [, []],
        boxconvstk: [data[this.i][w++], []],
        stripconvstk: [data[this.i][w++], []],


        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],

        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        indrefid: [this.indrefid, []],


        drugname: [data[this.i][0], []],



        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        calcflag: [0, []],


        fromlocname: [this.fromlocname, []],
        fromlocrefid: [this.fromlocrefid, []],


        tolocname: [this.tolocname, []],
        tolocrefid: [this.tolocrefid, []],

        namefromlocname: [this.namefromlocname, []],
        namefromlocrefid: [this.namefromlocrefid, []],


        nametolocname: [this.nametolocname, []],
        nametolocrefid: [this.nametolocrefid, []],




        delflag: [false, []],


        dummy1: [data[this.i][w++], []],
        dummy2: [data[this.i][w++], []],
        dummy3: [data[this.i][w++], []],
        dummy4: [data[this.i][w++], []],
        batchname: [data[this.i][w++], []],

        expirydate: [data[this.i][w++], []],

        stkmainrefid: [data[this.i][w++], []],
        stktransprodrefid: [data[this.i][w++], []],
        unitprice: [data[this.i][w++], []],


      }));


    }


  }






  calc(e) {

    if (e.keyCode == 9) {

      this.calcIndentProd();
    }
  }



  calcIndentProd() {


    const control = <FormArray>this.registerForm.controls['stkretn'];

    var ind = control.value;



    var boxqty: number = 0;
    var stripqty: number = 0;
    var tabqty: number = 0;
    var qty: number = 0;

    var boxconvstk: number = 0;
    var stripconvstk: number = 0;

    var unitprice: number = 0;
    var grandtotal: number = 0;



    for (this.i = 0; this.i < ind.length; this.i++) {


      if (parseInt(ind[this.i].calcflag) != 1) {

        if (parseInt(ind[this.i].retboxqty)) {
          boxqty = parseInt(ind[this.i].retboxqty);
        } else {
          boxqty = 0;
        }

        if (parseInt(ind[this.i].retstripqty)) {
          stripqty = parseInt(ind[this.i].retstripqty);
        } else {
          stripqty = 0;
        }


        if (parseInt(ind[this.i].rettabqty)) {
          tabqty = parseInt(ind[this.i].rettabqty);
        } else {
          tabqty = 0;
        }



        if (parseInt(ind[this.i].boxconvstk)) {
          boxconvstk = parseInt(ind[this.i].boxconvstk);

        } else {
          boxconvstk = 0;
        }


        if (parseInt(ind[this.i].stripconvstk)) {
          stripconvstk = parseInt(ind[this.i].stripconvstk);

        } else {

          stripconvstk = 0;
        }

        if (parseInt(ind[this.i].unitprice)) {
          unitprice = parseInt(ind[this.i].unitprice);

        } else {
          unitprice = 0;
        }


        ind[this.i].returntotalqty = boxqty * boxconvstk + stripqty * stripconvstk + tabqty;


        ind[this.i].subtotal = (boxqty * boxconvstk + stripqty * stripconvstk + tabqty) * unitprice;

        grandtotal += (boxqty * boxconvstk + stripqty * stripconvstk + tabqty) * unitprice;

      }


    }

    this.registerForm1.get('debitamount').setValue(grandtotal);
    this.registerForm1.get('creditamount').setValue(grandtotal);
    this.registerForm2.get('debitamount').setValue(grandtotal);
    this.registerForm2.get('creditamount').setValue(grandtotal);

    control.patchValue(ind);



  }






  remove() {
    const control = <FormArray>this.registerForm.controls['stkretn'];


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


    const control = <FormArray>this.registerForm.controls['stkretn'];
    var stockkretprod = control.value;

    for (this.i = 0; this.i < stockkretprod.length; this.i++) {
      if (parseInt(stockkretprod[this.i].returntotalqty) > parseInt(stockkretprod[this.i].transfertotalqty)) {
        valflag = 1;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'RetQty > TotrasferQty ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

      }

    }

    return valflag;

  }




  viewLocationId(id1: any, id2: any) {

    var frmdata1 = { frmint1: id1, frmint2: id2, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };


    this.userService.viewLocName(JSON.stringify(frmdata1)).subscribe(data => { this.registerForm.get('tolocrefidname').setValue(data[0][1]) },
      errorCode => console.log(errorCode));





  }





  init() {
    const control = <FormArray>this.registerForm.controls['stkretn'];
    var data = [ [],[] ];



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
        remarks:[,[]],
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

        delflag: [false, []],

        stkmainrefid: [, []],
        stktransprodrefid: [, []],
      }));


    }

  }


  











  clear() {

    this.ngOnInit();
  }




}