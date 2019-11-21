
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { saveIndapprService } from './saveIndappr.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
import { DxDataGridComponent } from "devextreme-angular";


@Component({
  selector: 'app-patientedit',
  templateUrl: './saveIndappr.component.html',
  providers: [saveIndapprService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class saveIndapprComponent implements OnInit {



  registerForm: FormGroup;
  id: number;
  id2: number;
  id3: number;

  private sub: any;

  indentrequests = [];

  selobj;

  i;
  deviceObj: any;


  constructor(private userService: saveIndapprService, private route: ActivatedRoute, private dateformat: dateFormatPipe,
    private formBuilder: FormBuilder, config: NgbDropdownConfig, private notificationsComponent: NotificationsComponent,
    private router:Router, private appComponent: AppComponent) {

    config.autoClose = false;
  }

  ngOnInit() {



    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'], this.id2 = +params['id2'], this.id3 = +params['id3']
    });



    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };

    this.registerForm = this.formBuilder.group({

      indapprid: [, []],
      indapprno: [, []],
      indrefid: [, []],
      apprdate: [, []],
      apprby: [, []],


      fromlocname: [, []],
      fromlocrefid: [, []],


      tolocname: [, []],
      tolocrefid: [, []],

      fromlocrefidname: [, []],

      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],

      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],



      indselrefid: [, []],

      namefromlocname: [, []],
      namefromlocrefid: [, []],
      nametolocname: [, []],
      nametolocrefid: [, []],



      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],

      date: [this.dateformat.transform05(Date.now()), []],
      vatdispflag: [this.selobj.vatdispflag, []],
      boxdispflag: [this.selobj.boxdispflag, []],
      stripdispflag: [this.selobj.stripdispflag, []],
      tabdispflag: [this.selobj.tabdispflag, []],

      remarksappr:[, []],

      indappr: this.formBuilder.array([

      ]),

    });




    $(document).ready(function () {

    });


    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewIndentRequests(JSON.stringify(frmdata)).subscribe(data => { this.indentrequests = data },
      errorCode => console.log(errorCode));

    this.userService.viewIndentProduct(JSON.stringify(frmdata)).subscribe(data => { this.viewServIndentProduct(data) },
      errorCode => console.log(errorCode));


    this.viewLocationId(this.id2, this.id3);
    let s: any = JSON.parse(localStorage.getItem("purchasesession"));

    this.init();


  }

       
  devicedetails(){

    this.deviceObj = {

        userid: AppComponent.userID,
        companyrefid: AppComponent.companyID,
        branchrefid: AppComponent.branchID,
        locname: AppComponent.locRefName1,
        locrefid: AppComponent.locrefID1,
        clientcdate:this.dateformat.transform04(),
        ipaddress: this.appComponent.ipAddress, 
        browsertype: this.appComponent.browser,
        ostype: this.appComponent.os,
        osversion: this.appComponent.osversion,
        devicetype: this.appComponent.devicetype,
        description:'',
        apiname:''

      };
  
}


  onSubmit() {

    const control = <FormArray>this.registerForm.controls['indappr'];

    var valflag = 0;

    var apprprod = control.value;
    for (this.i = 0; this.i < apprprod.length; this.i++) {
      if (parseInt(apprprod[this.i].approvedqty) > parseInt(apprprod[this.i].qty)) {
        valflag = 1;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'ApprQty > ReqQty ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

      }

    }


    var answer = confirm("Save data?");

    if (answer && valflag == 0) {


      this.userService.saveIndentConfirm(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveIndentConfirmProd(data) },
        errorCode => console.log(errorCode));

    }
  }



  saveIndentConfirmProd(data: any) {

    const control = <FormArray>this.registerForm.controls['indappr'];

    if (data == 1) {
      this.userService.saveIndentConfirmProd(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));

        this.router.navigate(['RequisitionReceiving/ViewRequisitionReceiving']);
    }

  }

  savevalid(data: any) {
    if (data == 1) {

      this.devicedetails();
      this.deviceObj.apiname="api/indappr/saveIndentConfirm";
      this.deviceObj.description="Save Intent Requisition";

      this.userService.adddevicedetails(JSON.stringify(this.deviceObj)).subscribe(data => {});

      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved SuccessFully ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.clear();

    } else {

      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }
  }

  viewIndreqProd() {

    
    var indid = this.registerForm.get('indselrefid').value;



    this.registerForm.get('fromlocrefid').setValue(this.indentrequests[indid][2]);
    this.registerForm.get('fromlocname').setValue(this.indentrequests[indid][3]);
    this.registerForm.get('tolocrefid').setValue(this.indentrequests[indid][4]);
    this.registerForm.get('tolocname').setValue(this.indentrequests[indid][5]);

    this.registerForm.get('namefromlocname').setValue(this.indentrequests[indid][6]);
    this.registerForm.get('namefromlocrefid').setValue(this.indentrequests[indid][7]);
    this.registerForm.get('nametolocname').setValue(this.indentrequests[indid][8]);
    this.registerForm.get('nametolocrefid').setValue(this.indentrequests[indid][9]);



    this.registerForm.get('indrefid').setValue(this.indentrequests[indid][0]);

    this.viewLocationId(this.indentrequests[indid][3], this.indentrequests[indid][2]);



    var frmdata = { frmint1: this.indentrequests[indid][0], frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewIndentProduct(JSON.stringify(frmdata)).subscribe(data => { this.viewServIndentProduct(data) },
      errorCode => console.log(errorCode));





  }





  viewServIndentProduct(data: any) {


    const control = <FormArray>this.registerForm.controls['indappr'];




    while (control.length !== 0) {
      control.removeAt(0);
    }


    this.init();


    var i = 0;


    for (this.i = 0; this.i < data.length; this.i++) {

      i = 0;

      control.insert(0, this.formBuilder.group({

        id: [data[0][i++], []],
        indentrefid: [data[0][i++], []],
        drugprdrefid: [data[this.i][i++], []],
        boxqty: [data[this.i][i++], []],
        stripqty: [data[this.i][i++], []],






        tabqty: [data[this.i][i++], []],
        qty: [data[this.i][i++], []],
        boxconvdrg: [data[this.i][i++], []],
        stripconvdrg: [data[this.i][i++], []],
        minqty: [data[this.i][i++], []],


        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],

        maxqty: [data[this.i][i++], []],
        drugname: [data[this.i][i++], []],

        remarks: [data[this.i][i++], []],
        calcflag: [0, []],

        apprboxqty: [, []],
        apprstripqty: [, []],
        apprtabqty: [data[this.i][6], []],
        approvedqty: [data[this.i][6], []]

       


      }));


    }




  }

  calc(e) {



    this.calcIndentProd();

  }
































  calcIndentProd() {
    const control = <FormArray>this.registerForm.controls['indappr'];

    var indappr = control.value;

    var boxqty: number = 0;
    var stripqty: number = 0;
    var tabqty: number = 0;
    var qty: number = 0;

    var boxconvdrg: number = 0;
    var stripconvdrg: number = 0;


    for (this.i = 0; this.i < indappr.length; this.i++) {

      if (parseInt(indappr[this.i].calcflag) != 1) {

        if (parseInt(indappr[this.i].apprboxqty)) {
          boxqty = parseInt(indappr[this.i].apprboxqty);
        } else {
          boxqty = 0;
        }

        if (parseInt(indappr[this.i].apprstripqty)) {
          stripqty = parseInt(indappr[this.i].apprstripqty);
        } else {
          stripqty = 0;
        }


        if (parseInt(indappr[this.i].apprtabqty)) {
          tabqty = parseInt(indappr[this.i].apprtabqty);
        } else {
          tabqty = 0;
        }


        if (parseInt(indappr[this.i].boxconvdrg)) {
          boxconvdrg = parseInt(indappr[this.i].boxconvdrg);

        } else {
          boxconvdrg = 0;
        }

        if (parseInt(indappr[this.i].stripconvdrg)) {
          stripconvdrg = parseInt(indappr[this.i].stripconvdrg);

        } else {

          stripconvdrg = 0;
        }

        indappr[this.i].approvedqty = boxqty * boxconvdrg + stripqty * stripconvdrg + tabqty;





      }
    }



    control.patchValue(indappr);

  }




  viewLocationId(id1: any, id2: any) {
    this.registerForm.get('fromlocrefidname').setValue('');

    var frmdata1 = { frmint1: id1, frmint2: id2, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };


    this.userService.viewLocName(JSON.stringify(frmdata1)).subscribe(data => { this.registerForm.get('fromlocrefidname').setValue(data[0][1]) },
      errorCode => console.log(errorCode));


  }






  init() {
    const control = <FormArray>this.registerForm.controls['indappr'];
    var data = [ [], [] ];



    for (this.i = 0; this.i < data.length; this.i++) {

      control.push(this.formBuilder.group({

        id: [, []],
        indentrefid: [, []],

        drugprdrefid: [, []],
        boxqty: [, []],
        stripqty: [, []],
        tabqty: [, []],
        qty: [, []],

        apprboxqty: [, []],
        apprstripqty: [, []],
        apprtabqty: [, []],
        approvedqty: [, []],

        boxconvdrg: [, []],
        stripconvdrg: [, []],

        createdby: [, []],
        locrefid: [, []],
        locname: [, []],

        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],


        minqty: [, []],
        maxqty: [, []],

        drugname: [, []],

        calcflag: [1, []],
        remarks:[,[]]


      }));


    }

  }




  clear() {

    this.ngOnInit();
  }



}
