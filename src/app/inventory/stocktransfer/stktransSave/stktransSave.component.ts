import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { stktransSaveService } from './stktransSave.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-patientedit',
  templateUrl: './stktransSave.component.html',
  providers: [stktransSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class stktransSaveComponent implements OnInit {
  registerForm: FormGroup;
  id: number;
  id2: number;
  id3: number;
  private sub: any;
  indtapprno = [];
  destination = [];
  i;
  autoincr;
  autoval = 0;
  autoinc = 0;
  autodata = [];
  selobj;
  constructor(private userService: stktransSaveService, private route: ActivatedRoute, private dateformat: dateFormatPipe, private notificationsComponent: NotificationsComponent, private formBuilder: FormBuilder, config: NgbDropdownConfig) {
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
      stktrfno: [, []],
      transferdate: [, []],
      totalproduct: [, []],
      totalqty: [, []],
      totalboxqty: [, []],
      totalstripqty: [, []],
      totaltabqty: [, []],
      transportcharge: [, []],
      transportno: [, []],
      transportdetails: [, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      valdrgapprqty: [, []],
      valbatchapprqty: [, []],
      indselid: [, []],
      indrefid: [, []],
      indentselect: [, []],
      indapprflag: [, []],
      autonamenew: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      date: [this.dateformat.transform05(Date.now()), []],
      fromlocname: [, []],
      fromlocrefid: [, []],
      tolocname: [, []],
      tolocrefid: [, []],
      fromlocrefidname: [, []],
      namefromlocname: [, []],
      namefromlocrefid: [, []],
      nametolocname: [, []],
      nametolocrefid: [, []],
      vatdispflag: [this.selobj.vatdispflag, []],
      boxdispflag: [this.selobj.boxdispflag, []],
      stripdispflag: [this.selobj.stripdispflag, []],
      tabdispflag: [this.selobj.tabdispflag, []],
      indentappr: this.formBuilder.array([
      ]),
      stk: this.formBuilder.array([
      ]),
      stktransfer: this.formBuilder.array([
      ]),
      dummy: this.formBuilder.array([
      ]),
    });
    var frmdata = { frmint1: this.id, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewSTIndentRequests(JSON.stringify(frmdata)).subscribe(data => { this.indtapprno = data },
      errorCode => console.log(errorCode));
    this.userService.viewIndentProduct(JSON.stringify(frmdata)).subscribe(data => { this.viewServIndentproduct(data) },
      errorCode => console.log(errorCode));
    $('.drugname').hide();
    $(document).ready(function () {
    });
    this.registerForm.get('indentselect').setValue(1);
    let s: any = JSON.parse(localStorage.getItem("purchasesession"));
    this.viewLocationId(this.id2, this.id3);
    this.init1();
    this.init2();
    this.init3();
  }
  autofocusin() {
    $('#autolist').show();
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
          this.userService.viewSTWareHouseStocks(JSON.stringify(frmdata)).subscribe(data => { this.autodata = data },
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
    var nr: number;
    var drg = this.autodata[articleId][3];
    var bth = this.autodata[articleId][1];
    var frmdata = { frmint1: drg, frmint2: bth, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewSTWareHouseStock(JSON.stringify(frmdata)).subscribe(data => { this.viewServWareHouseStock(data) },
      errorCode => console.log(errorCode));
    $("#autoname").focus();
    this.registerForm.get('autonamenew').setValue('');
    this.autodata = [];
  }
  viewServWareHouseStock(data: any) {
    const control = <FormArray>this.registerForm.controls['stk'];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.insert(0, this.formBuilder.group({
        stktrfproid: [, []],
        stktrfrefid: [, []],
        indentrefid: [, []],
        drugproductrefid: [data[this.i][1], []],                //   data[3 ] 
        batchrefid: [data[this.i][2], []],     //   data[  1 ] 
        prodreqqty: [, []],
        prodavailqty: [, []],
        apprboxqty: [, []],
        apprstripqty: [, []],
        apprtabqty: [, []],
        apprtotalqty: [, []],
        waitingboxqty: [, []],
        waitingstripqty: [, []],
        waitingtabqty: [, []],
        waitingtotalqty: [, []],
        rejectqty: [, []],
        batchavailqty: [data[this.i][3], []],          //   data[  2   ] 
        transferboxqty: [, []],
        transferstripqty: [, []],
        transfertabqty: [, []],
        transfertotalqty: [, []],
        productstatusid: [, []],
        rejectreason: [, []],
        createdby: [this.selobj.userid, []],
        createddate: [, []],
        modifiedby: [, []],
        modifieddate: [, []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        clientmdate: [, []],
        status: [, []],
        boxconvdrg: [, []],
        stripconvdrg: [, []],
        boxconvstk: [data[this.i][4], []],
        stripconvstk: [data[this.i][5], []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        uniqueflag: [, []],
        drugname: [data[this.i][0], []],          //  data[0]
        calcflag: [0, []],
        delflag: [false, []],
        batchselectFlag: [false, []],
        expirydate: [data[this.i][6], []],
        batchname: [data[this.i][7], []],
        man: [, []],
        stkmainrefid: [data[this.i][8], []],
        indentprodrefid: [, []],
        unitprice: [data[this.i][9], []],
      }));
    }
  }
  onSubmit() {
    const control = <FormArray>this.registerForm.controls['stktransfer'];
    if (this.registerForm.get('indentselect').value == 1) {
      var answer = confirm("Save data?");
      if (answer) {
        this.saveIndentTransfer();
      }
    } else if (this.registerForm.get('indentselect').value == 2) {
      var answer = confirm("Save data?");
      if (answer) {
        this.saveGeneralTransfer()
      }
    }
    this.registerForm.get('indapprflag').setValue(0);
  }
  saveIndentTransfer() {
    this.userService.saveStockTransfer(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveIndStkTrnfrProducts(data) },
      errorCode => console.log(errorCode));
  }
  saveIndStkTrnfrProducts(data: any) {
    const control = <FormArray>this.registerForm.controls['stktransfer'];
    if (data == 1) {
      this.userService.saveStkTrnfrProducts(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
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
  saveGeneralTransfer() {
    const stkcontrol = <FormArray>this.registerForm.controls['stk'];
    var stk = stkcontrol.value;
    for (this.i = 0; this.i < stk.length; this.i++) {
      if (parseInt(stk[this.i].transfertotalqty) > parseInt(stk[this.i].batchavailqty)) {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'transfertotalqty> batchavailqty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }
    this.userService.saveStockTransfer(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveGenStkTrnfrProducts() },
      errorCode => console.log(errorCode));
  }
  saveGenStkTrnfrProducts() {
    const control = <FormArray>this.registerForm.controls['stk'];
    this.userService.saveStkTrnfrProducts(JSON.stringify(control.value));
  }
  viewIndent() {
    const control = <FormArray>this.registerForm.controls['stk'];
    const controlind = <FormArray>this.registerForm.controls['indentappr'];
    const controlstktrans = <FormArray>this.registerForm.controls['stktransfer'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
    while (controlind.length !== 0) {
      controlind.removeAt(0);
    }
    while (controlstktrans.length !== 0) {
      controlstktrans.removeAt(0);
    }
  }
  viewSelIndentproduct() {
    var indid = this.registerForm.get('indselid').value;
    this.registerForm.get('indrefid').setValue(this.indtapprno[indid][0]);
    this.registerForm.get('fromlocrefid').setValue(this.indtapprno[indid][2]);
    this.registerForm.get('fromlocname').setValue(this.indtapprno[indid][3]);
    this.registerForm.get('tolocrefid').setValue(this.indtapprno[indid][4]);
    this.registerForm.get('tolocname').setValue(this.indtapprno[indid][5]);
    this.registerForm.get('namefromlocname').setValue(this.indtapprno[indid][7]);
    this.registerForm.get('namefromlocrefid').setValue(this.indtapprno[indid][8]);
    this.registerForm.get('nametolocname').setValue(this.indtapprno[indid][9]);
    this.registerForm.get('nametolocrefid').setValue(this.indtapprno[indid][10]);
    this.viewLocationId(this.indtapprno[indid][3], this.indtapprno[indid][2]);
    var frmdata = { frmint1: this.indtapprno[indid][0], frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewIndentProduct(JSON.stringify(frmdata)).subscribe(data => { this.viewServIndentproduct(data) },
      errorCode => console.log(errorCode));
  }
  viewServIndentproduct(data: any) {
    const control = <FormArray>this.registerForm.controls['indentappr'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init1();
    for (this.i = 0; this.i < data.length; this.i++) {
      if (data[this.i][2] > 0) {
        control.insert(0, this.formBuilder.group({
          stktrfproid: [, []],
          stktrfrefid: [, []],
          indentrefid: [data[this.i][4], []],
          drugproductrefid: [data[this.i][0], []],
          batchrefid: [, []],
          prodreqqty: [data[this.i][2], []],
          prodavailqty: [data[this.i][3], []],
          apprboxqty: [, []],
          apprstripqty: [, []],
          apprtabqty: [, []],
          apprtotalqty: [0, []],
          waitingboxqty: [, []],
          waitingstripqty: [, []],
          waitingtabqty: [, []],
          waitingtotalqty: [0, []],
          rejectqty: [, []],
          batchavailqty: [, []],
          transferboxqty: [, []],
          transferstripqty: [, []],
          transfertabqty: [, []],
          transfertotalqty: [0, []],
          productstatusid: ['', []],
          rejectreason: ['', []],
          clientcdate: [this.dateformat.transform04(), []],
          clientcdate1: [this.dateformat.transform04(), []],
          createdby: [this.selobj.userid, []],
          createddate: ['', []],
          modifiedby: ['', []],
          modifieddate: ['', []],
          clientmdate: ['', []],
          status: ['', []],
          boxconvdrg: [data[this.i][5], []],
          stripconvdrg: [data[this.i][6], []],
          boxconvstk: [, []],
          stripconvstk: [, []],
          locrefid: [this.selobj.locrefid, []],
          locname: [this.selobj.locname, []],
          uniqueflag: [, []],
          drugname: [data[this.i][1], []],
          calcflag: [0, []],
          delflag: [false, []],
          batchselectFlag: [false, []],
          expirydate: [, []],
          man: [, []],
          batchname: [, []],
          stkmainrefid: [data[this.i][8], []],
          indentprodrefid: [data[this.i][9], []],
          unitprice: [, []],
        }));
      }
    }
  }
  viewStock(i: number) {
    const control = <FormArray>this.registerForm.controls['indentappr'];
    var valfglag: number = 0;
    var stk = control.value;
    for (this.i = 0; this.i < stk.length; this.i++) {
      if ((parseInt(stk[this.i].apprtotalqty) < 0) || (parseInt(stk[this.i].waitingtotalqty) < 0) || (parseInt(stk[this.i].rejectqty) < 0)) {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Negative Values in  Table', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        valfglag = 1;
      }
      if (parseInt(stk[this.i].apprtotalqty) > parseInt(stk[this.i].prodreqqty)) {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Appr Total Qty  > RequiredQty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        valfglag = 1;
      }
      if (parseInt(stk[this.i].apprtotalqty) > parseInt(stk[this.i].prodavailqty)) {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Apprtotal Qty > Available Qty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        valfglag = 1;
      }
      if ((parseInt(stk[this.i].waitingtotalqty) + parseInt(stk[this.i].apprtotalqty) + parseInt(stk[this.i].rejectqty)) > parseInt(stk[this.i].prodreqqty)) {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'TotQty > RequiredQty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        valfglag = 1;
      }
    }
    if (valfglag == 0) {
      var frmdata = { frmint1: stk[i].drugproductrefid, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
      this.userService.viewwarehousestock(JSON.stringify(frmdata)).subscribe(data => { this.viewServWarehousestk(data, i) },
        errorCode => console.log(errorCode));
    }
  }
  viewServWarehousestk(data: any, ik: number) {
    const control = <FormArray>this.registerForm.controls['stk'];
    const controlind = <FormArray>this.registerForm.controls['indentappr'];
    var stk = controlind.value;
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init2();
    for (this.i = 0; this.i < data.length; this.i++) {
      if (stk[ik].calcflag != 1) {
        control.insert(0, this.formBuilder.group({
          stktrfproid: [, []],
          stktrfrefid: [, []],
          indentrefid: [stk[ik].indentrefid, []],
          drugproductrefid: [data[this.i][1], []],
          batchrefid: [data[this.i][2], []],
          prodreqqty: [stk[ik].prodreqqty, []],
          prodavailqty: [stk[ik].prodavailqty, []],
          apprboxqty: [stk[ik].apprboxqty, []],
          apprstripqty: [stk[ik].apprstripqty, []],
          apprtabqty: [stk[ik].apprtabqty, []],
          apprtotalqty: [stk[ik].apprtotalqty, []],
          waitingboxqty: [stk[ik].waitingboxqty, []],
          waitingstripqty: [stk[ik].waitingstripqty, []],
          waitingtabqty: [stk[ik].waitingtabqty, []],
          waitingtotalqty: [stk[ik].waitingtotalqty, []],
          rejectqty: [stk[ik].rejectqty, []],
          batchavailqty: [data[this.i][3], []],
          transferboxqty: [stk[ik].transferboxqty, []],
          transferstripqty: [stk[ik].transferstripqty, []],
          transfertabqty: [stk[ik].transfertabqty, []],
          transfertotalqty: [stk[ik].transfertotalqty, []],
          productstatusid: [, []],
          rejectreason: [, []],
          clientcdate: [this.dateformat.transform04(), []],
          clientcdate1: [this.dateformat.transform04(), []],
          createdby: [stk[ik].userid, []],
          createddate: [, []],
          modifiedby: [, []],
          modifieddate: [, []],
          clientmdate: [, []],
          status: [, []],
          boxconvdrg: [stk[ik].boxconvdrg, []],
          stripconvdrg: [stk[ik].stripconvdrg, []],
          boxconvstk: [data[this.i][4], []],
          stripconvstk: [data[this.i][5], []],
          locrefid: [stk[ik].locrefid, []],
          locname: [stk[ik].locname, []],
          countryrefid: [this.selobj.countryrefid, []],
          companyrefid: [this.selobj.companyid, []],
          branchrefid: [this.selobj.branchrefid, []],
          uniqueflag: [, []],
          drugname: [data[this.i][0], []],
          calcflag: [0, []],
          delflag: [false, []],
          batchname: [data[this.i][6], []],
          batchselectFlag: [false, []],
          expirydate: [data[this.i][7], []],
          man: [, []],
          stkmainrefid: [data[this.i][8], []],
          indentprodrefid: [stk[ik].indentprodrefid, []],
          unitprice: [data[this.i][9], []],
        }));
      }
    }
    this.registerForm.get('valdrgapprqty').setValue(stk[ik].apprtotalqty);
    this.registerForm.get('indapprflag').setValue(1);
  }
  viewTransferStock() {
    const stkcontrol = <FormArray>this.registerForm.controls['stk'];
    const stktransfercontrol = <FormArray>this.registerForm.controls['stktransfer'];
    var stk = stkcontrol.value;
    var stktransfer = stktransfercontrol.value;
    var drgflag = 0;
    var valflag = 0;
    var uniqueflag = 1;
    var drugproductrefid = 0;
    for (this.i = 0; this.i < stk.length; this.i++) {
      if ((parseInt(stk[this.i].transfertotalqty) > parseInt(stk[this.i].batchavailqty)) && (stk[this.i].calcflag != 1)) {
        valflag = 1;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Qty > StkAvalQty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }
    if (parseInt(this.registerForm.get('valbatchapprqty').value) > parseInt(this.registerForm.get('valdrgapprqty').value)) {
      valflag = 1;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Transferqty > ApprDrugQty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
    if (parseInt(this.registerForm.get('valbatchapprqty').value) < parseInt(this.registerForm.get('valdrgapprqty').value)) {
      valflag = 1;
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Transferqty < ApprDrugQty', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
    for (this.i = 0; this.i < stktransfer.length; this.i++) {
      if ((stktransfer[this.i].drugproductrefid == stk[0].drugproductrefid) && (stktransfer[this.i].calcflag != 1)) {
        drgflag = 1;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Drug   Already Exist', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }
    if (drgflag == 0 && valflag == 0) {
      for (this.i = 0; this.i < stk.length; this.i++) {
        if (parseInt(stk[this.i].transfertotalqty) > 0 && stk[this.i].calcflag != 1 && stk[this.i].batchselectFlag == true) {
          if (stk[this.i].drugproductrefid == drugproductrefid) {
            uniqueflag = 0;
          }
          drugproductrefid = stk[this.i].drugproductrefid;
          stktransfercontrol.insert(0, this.formBuilder.group({
            stktrfproid: [, []],
            stktrfrefid: [, []],
            indentrefid: [stk[this.i].indentrefid, []],
            drugproductrefid: [stk[this.i].drugproductrefid, []],
            batchrefid: [stk[this.i].batchrefid, []],
            prodreqqty: [stk[this.i].prodreqqty, []],
            prodavailqty: [stk[this.i].prodavailqty, []],
            apprboxqty: [stk[this.i].apprboxqty, []],
            apprstripqty: [stk[this.i].apprstripqty, []],
            apprtabqty: [stk[this.i].apprtabqty, []],
            apprtotalqty: [stk[this.i].apprtotalqty, []],
            waitingboxqty: [stk[this.i].waitingboxqty, []],
            waitingstripqty: [stk[this.i].waitingstripqty, []],
            waitingtabqty: [stk[this.i].waitingtabqty, []],
            waitingtotalqty: [stk[this.i].waitingtotalqty, []],
            rejectqty: [stk[this.i].rejectqty, []],
            batchavailqty: [stk[this.i].batchavailqty, []],
            transferboxqty: [stk[this.i].transferboxqty, []],
            transferstripqty: [stk[this.i].transferstripqty, []],
            transfertabqty: [stk[this.i].transfertabqty, []],
            transfertotalqty: [stk[this.i].transfertotalqty, []],
            productstatusid: [, []],
            rejectreason: [, []],
            clientcdate: [this.dateformat.transform04(), []],
            clientcdate1: [this.dateformat.transform04(), []],
            createdby: [stk[this.i].userid, []],
            createddate: [, []],
            modifiedby: [, []],
            modifieddate: [, []],
            clientmdate: [, []],
            status: [, []],
            boxconvdrg: [stk[this.i].boxconvdrg, , []],
            stripconvdrg: [stk[this.i].stripconvdrg, , []],
            boxconvstk: [stk[this.i].boxconvstk, , []],
            stripconvstk: [stk[this.i].stripconvstk, , []],
            locrefid: [stk[this.i].locrefid, []],
            locname: [stk[this.i].locname, []],
            countryrefid: [this.selobj.countryrefid, []],
            companyrefid: [this.selobj.companyid, []],
            branchrefid: [this.selobj.branchrefid, []],
            uniqueflag: [uniqueflag, []],
            drugname: [stk[this.i].drugname, []],
            calcflag: [0, []],
            delflag: [false, []],
            batchname: [stk[this.i].batchname, []],
            batchselectFlag: [stk[this.i].batchselectFlag, []],
            expirydate: [stk[this.i].expirydate, []],
            man: [stk[this.i].man, []],
            stkmainrefid: [stk[this.i].stkmainrefid, []],
            indentprodrefid: [stk[this.i].indentprodrefid, []],
            unitprice: [stk[this.i].unitprice, []],
          }));
        }
      }
      this.registerForm.get('indapprflag').setValue(0);
    }
  }
  calcIndtAppr() {
    var apprboxqty: number = 0;
    var apprstripqty: number = 0;
    var apprtabqty: number = 0;
    var waitingboxqty: number = 0;
    var waitingstripqty: number = 0;
    var waitingtabqty: number = 0;
    var apprtotalqty: number = 0;
    var waitingtotalqty: number = 0;
    var rejectqty: number = 0;
    var boxconvdrg: number = 0;
    var stripconvdrg: number = 0;
    const controlind = <FormArray>this.registerForm.controls['indentappr'];
    var indval = controlind.value;
    for (this.i = 0; this.i < indval.length; this.i++) {
      if (indval[this.i].calcflag != 1) {
        if (parseInt(indval[this.i].apprboxqty)) {
          apprboxqty = parseInt(indval[this.i].apprboxqty);
        } else {
          apprboxqty = 0;
        }
        if (parseInt(indval[this.i].apprstripqty)) {
          apprstripqty = parseInt(indval[this.i].apprstripqty);
        } else {
          apprstripqty = 0;
        }
        if (parseInt(indval[this.i].apprtabqty)) {
          apprtabqty = parseInt(indval[this.i].apprtabqty);
        } else {
          apprtabqty = 0;
        }
        if (parseInt(indval[this.i].waitingboxqty)) {
          waitingboxqty = parseInt(indval[this.i].waitingboxqty);
        } else {
          waitingboxqty = 0;
        }
        if (parseInt(indval[this.i].waitingstripqty)) {
          waitingstripqty = parseInt(indval[this.i].waitingstripqty);
        } else {
          waitingstripqty = 0;
        }
        if (parseInt(indval[this.i].waitingtabqty)) {
          waitingtabqty = parseInt(indval[this.i].waitingtabqty);
        } else {
          waitingtabqty = 0;
        }
        if (parseInt(indval[this.i].boxconvdrg)) {
          boxconvdrg = parseInt(indval[this.i].boxconvdrg);
        } else {
          boxconvdrg = 0;
        }
        if (parseInt(indval[this.i].stripconvdrg)) {
          stripconvdrg = parseInt(indval[this.i].stripconvdrg);
        } else {
          stripconvdrg = 0;
        }
        indval[this.i].apprtotalqty = apprboxqty * boxconvdrg + apprstripqty * stripconvdrg + apprtabqty;
        indval[this.i].waitingtotalqty = indval[this.i].prodreqqty - indval[this.i].apprtotalqty - indval[this.i].rejectqty;
        //     indval[this.i ].rejectqty =    indval[this.i ]. prodreqqty  -    indval[this.i ].apprtotalqty  -    indval[this.i ].waitingtotalqty      ; 
      }
    }
    controlind.patchValue(indval);
  }
  calcformstock(e) {
    if (e.keyCode == 9) {
      this.calcStock();
    }
  }
  calcStock() {
    var transferboxqty: number = 0;
    var transferstripqty: number = 0;
    var transfertabqty: number = 0;
    var transfertotalqty: number = 0;
    var batchtransfertotalqty: number = 0;
    var boxconvstk: number = 0;
    var stripconvstk: number = 0;
    const stkcontrol = <FormArray>this.registerForm.controls['stk'];
    var stkval = stkcontrol.value;
    for (this.i = 0; this.i < stkval.length; this.i++) {
      if (stkval[this.i].calcflag != 1 && stkval[this.i].batchselectFlag == true) {
        if (parseInt(stkval[this.i].transferboxqty)) {
          transferboxqty = parseInt(stkval[this.i].transferboxqty);
        } else {
          transferboxqty = 0;
        }
        if (parseInt(stkval[this.i].transferstripqty)) {
          transferstripqty = parseInt(stkval[this.i].transferstripqty);
        } else {
          transferstripqty = 0;
        }
        if (parseInt(stkval[this.i].transfertabqty)) {
          transfertabqty = parseInt(stkval[this.i].transfertabqty);
        } else {
          transfertabqty = 0;
        }
        if (parseInt(stkval[this.i].boxconvstk)) {
          boxconvstk = parseInt(stkval[this.i].boxconvstk);
        } else {
          boxconvstk = 0;
        }
        if (parseInt(stkval[this.i].stripconvstk)) {
          stripconvstk = parseInt(stkval[this.i].stripconvstk);
        } else {
          stripconvstk = 0;
        }
        stkval[this.i].transfertotalqty = transferboxqty * boxconvstk + transferstripqty * stripconvstk + transfertabqty;
        batchtransfertotalqty += stkval[this.i].transfertotalqty;
      }
    }
    stkcontrol.patchValue(stkval);
    this.registerForm.get('valbatchapprqty').setValue(batchtransfertotalqty);
  //  alert(this.registerForm.get('valbatchapprqty').value); 
  }
  
  calc(e) {
    this.calcStockValue();
  }
  calcStockValue() {
    const control = <FormArray>this.registerForm.controls['stktransfer'];
    var ind = control.value;
    var qty: number = 0;
    var unitprice: number = 0;
    var grandtotal: number = 0;
    for (this.i = 0; this.i < ind.length; this.i++) {
      if (parseInt(ind[this.i].transfertotalqty)) {
        qty = parseInt(ind[this.i].transfertotalqty);
      } else {
        qty = 0;
      }
      if (parseInt(ind[this.i].unitprice)) {
        unitprice = parseInt(ind[this.i].unitprice);
      } else {
        unitprice = 0;
      }
      ind[this.i].subtotal = qty * unitprice;
      grandtotal += qty * unitprice;
    }
    this.registerForm.get('grandtotal').setValue(grandtotal);
  }
  remove() {
    const control = <FormArray>this.registerForm.controls['stktransfer'];
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
  validnew(): Number {
    var valflag = 0;
    return valflag;
  }
  viewLocationId(id1: any, id2: any) {
    var frmdata1 = { frmint1: id1, frmint2: id2, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewLocName(JSON.stringify(frmdata1)).subscribe(data => { this.registerForm.get('fromlocrefidname').setValue(data[0][1]) },
      errorCode => console.log(errorCode));
  }
  init1() {
    const control = <FormArray>this.registerForm.controls['indentappr'];
    var data = [[],[]];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        stktrfproid: [, []],
        stktrfrefid: [, []],
        indentrefid: [, []],
        drugproductrefid: [, []],
        batchrefid: [, []],
        prodreqqty: [, []],
        prodavailqty: [, []],
        apprboxqty: [, []],
        apprstripqty: [, []],
        apprtabqty: [, []],
        apprtotalqty: [, []],
        waitingboxqty: [, []],
        waitingstripqty: [, []],
        waitingtabqty: [, []],
        waitingtotalqty: [, []],
        rejectqty: [, []],
        batchavailqty: [, []],
        transferboxqty: [, []],
        transferstripqty: [, []],
        transfertabqty: [, []],
        transfertotalqty: [, []],
        productstatusid: [, []],
        rejectreason: [, []],
        clientcdate: [, []],
        clientcdate1: [, []],
        createdby: [, []],
        createddate: [, []],
        modifiedby: [, []],
        modifieddate: [, []],
        clientmdate: [, []],
        status: [, []],
        boxconvdrg: [, []],
        stripconvdrg: [, []],
        boxconvstk: [, []],
        stripconvstk: [, []],
        locrefid: [, []],
        locname: [, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        uniqueflag: [, []],
        drugname: [, []],
        calcflag: [1, []],
        delflag: [false, []],
        expirydate: [, []],
        man: [, []],
        stkmainrefid: [, []],
        indentprodrefid: [, []],
      }));
    }
  }
  init2() {
    const control = <FormArray>this.registerForm.controls['stk'];
    var data = [[], []];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        stktrfproid: [, []],
        stktrfrefid: [, []],
        indentrefid: [, []],
        drugproductrefid: [, []],
        batchrefid: [, []],
        prodreqqty: [, []],
        prodavailqty: [, []],
        apprboxqty: [, []],
        apprstripqty: [, []],
        apprtabqty: [, []],
        apprtotalqty: [, []],
        waitingboxqty: [, []],
        waitingstripqty: [, []],
        waitingtabqty: [, []],
        waitingtotalqty: [, []],
        rejectqty: [, []],
        batchavailqty: [, []],
        transferboxqty: [, []],
        transferstripqty: [, []],
        transfertabqty: [, []],
        transfertotalqty: [, []],
        productstatusid: [, []],
        rejectreason: [, []],
        clientcdate: [, []],
        clientcdate1: [, []],
        createdby: [, []],
        createddate: [, []],
        modifiedby: [, []],
        modifieddate: [, []],
        clientmdate: [, []],
        status: [, []],
        boxconvdrg: [, []],
        stripconvdrg: [, []],
        boxconvstk: [, []],
        stripconvstk: [, []],
        locrefid: [, []],
        locname: [, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        uniqueflag: [, []],
        drugname: [, []],
        calcflag: [1, []],
        delflag: [false, []],
        expirydate: [, []],
        man: [, []],
        stkmainrefid: [, []],
        indentprodrefid: [, []],
      }));
    }
  }
  init3() {
    const control = <FormArray>this.registerForm.controls['stktransfer'];
    var data = [[], []];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        stktrfproid: [, []],
        stktrfrefid: [, []],
        indentrefid: [, []],
        drugproductrefid: [, []],
        batchrefid: [, []],
        prodreqqty: [, []],
        prodavailqty: [, []],
        apprboxqty: [, []],
        apprstripqty: [, []],
        apprtabqty: [, []],
        apprtotalqty: [, []],
        waitingboxqty: [, []],
        waitingstripqty: [, []],
        waitingtabqty: [, []],
        waitingtotalqty: [, []],
        rejectqty: [, []],
        batchavailqty: [, []],
        transferboxqty: [, []],
        transferstripqty: [, []],
        transfertabqty: [, []],
        transfertotalqty: [, []],
        productstatusid: [, []],
        rejectreason: [, []],
        clientcdate: [, []],
        clientcdate1: [, []],
        createdby: [, []],
        createddate: [, []],
        modifiedby: [, []],
        modifieddate: [, []],
        clientmdate: [, []],
        status: [, []],
        boxconvdrg: [, []],
        stripconvdrg: [, []],
        boxconvstk: [, []],
        stripconvstk: [, []],
        locrefid: [, []],
        locname: [, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        uniqueflag: [, []],
        drugname: [, []],
        calcflag: [1, []],
        delflag: [false, []],
        expirydate: [, []],
        man: [, []],
        stkmainrefid: [, []],
        indentprodrefid: [, []],
      }));
    }
  }
  CloseTransfer() {
    this.registerForm.get('indapprflag').setValue(0);
  }
  clear() {
    this.ngOnInit();
  }
}
