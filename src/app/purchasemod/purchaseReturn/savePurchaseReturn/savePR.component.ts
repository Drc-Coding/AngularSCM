import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { savePRService } from './savePR.service';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-patientedit',
  templateUrl: './savePR.component.html',
  providers: [savePRService, NotificationsComponent, NgbDropdownConfig, dateFormatPipe]
})
export class savePRComponent implements OnInit {
  registerForm: FormGroup;
  registerForm1: FormGroup;
  invoices = [];
  vendorname = [];
  coltax: any;
  i;
  selobj;
  constructor(private userService: savePRService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig, private notificationsComponent: NotificationsComponent) {
    config.autoClose = false;
  }
  ngOnInit() {
    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };
    this.registerForm = this.formBuilder.group({
      id: ['', []],
      prno: ['', []],
      invoiceno: ['', []],
      vendorid: ['', []],
      totalamount: [, []],
      totalitems: [, []],
      // totalproduct:[,[]],
      totaldiscount: [, []],
      taxableamt: [, []],
      totaltaxamt: [, []],
      totalinclamt: [, []],
      totalexclamt: [, []],
      grandtotal: [, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      subtotal: [, []],
      roundoff: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      prdate: [this.dateformat.transform05(Date.now()), []],
      vatdispflag: [this.selobj.vatdispflag, []],
      boxdispflag: [this.selobj.boxdispflag, []],
      stripdispflag: [this.selobj.stripdispflag, []],
      tabdispflag: [this.selobj.tabdispflag, []],
      totalstripqty:['',[]],
      totaltabqty:['',[]],
      totaldiscountamt:['',[]],
      totaltaxableamt:['',[]],
      totalsubtotal:['',[]],
      roundedoff:['',[]],
      invoice: this.formBuilder.array([
      ]),
      dummy: this.formBuilder.array([
      ]),
    });
    this.registerForm1 = this.formBuilder.group({
      debitaccount: [2, []],
      creditaccount: [33, []],
      debitamount: [, []],
      creditamount: [, []],
      draccname: ['Accounts  Receivable', []],
      craccname: ['Purchase Return', []],
      invoiceno: [, []],
      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [, []],
      jrnltype: [7, []],
      jrnlname: ['DebitNote', []],
      bulkflag: [, []],
      personid: [, []],
      persontype: [1, []],
      invoicetype: [4, []],
      paymenttype: [, []],
      ptrefno: [, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      salesflag: [1, []],
      calcflag: [0, []],
    });
    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewMedcInvoices(JSON.stringify(frmdata)).subscribe(data => { this.invoices = data },
      errorCode => console.log(errorCode));
    $(document).ready(function () {
    });
    this.init();
  }
  onSubmit() {
    var valflag: Number = 0;
    valflag = this.validnew();
    var answer = confirm("Save data?");
    if (answer && valflag == 0) {
      this.registerForm.get('vendorid').setValue(this.vendorname)
      this.userService.savePurchReturn(JSON.stringify(this.registerForm.value)).subscribe(data => { this.savePrProducts(data), this.saveDebitNote(data) },
        errorCode => console.log(errorCode));
    }
  }
  savePrProducts(data: any) {
    const control = this.registerForm.controls['invoice'];
    this.userService.savePrProducts(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
      errorCode => console.log(errorCode));
  }
  saveDebitNote(data: any) {
    this.registerForm1.patchValue({
      debitamount: this.registerForm.get('grandtotal').value,
      creditamount: this.registerForm.get('grandtotal').value,
      personid: this.registerForm.get('vendorid').value,
    });
    this.userService.saveDebitNote(JSON.stringify(this.registerForm1.value)).subscribe(data => { this.savevalid(data) },
      errorCode => console.log(errorCode));
  }
  savevalid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.clear();
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  calc(event) {
    // alert(event.keyCode)
    if (event.keyCode == 9) {

      this.calcGST();
    }
  }

  calcGST() {
    const control = <FormArray>this.registerForm.controls['invoice'];
    var sprod = control.value;
    var preqty: any = 0;
    var preprodprice: any = 0;
    var prefree: any = 0;
    var premrp: any = 0;
    var predisc: any = 0;
    var presgst: any = 0;
    var precgst: any = 0;
    var preigst: any = 0;
    var pretotprice: any = 0;
    var pretotfreeprice: any = 0;
    var pretotmrp: any = 0;
    var discount: any = 0;
    var sgstamt: any = 0;
    var cgstamt: any = 0;
    var igstamt: any = 0;
    var totdiscount: any = 0;
    var totsgstamt: any = 0;
    var totcgstamt: any = 0;
    var totigstamt: any = 0;
    var totutgstamt: any = 0;
    var totgstamt: any = 0;
    var totaltaxableamt: any = 0;
    var totaltaxamt: any = 0;
    var totalincamt: any = 0;
    var totalexclamt: any = 0;
    var grandtotal: any = 0;
    var totalproduct: any = 0;
    var totqty: any = 0;
    var subtotal: any = 0;
    var convfactor: any = 0;
    var gstflag: any = 0;
    var freeflag: any = 0;
    var frgstflag: any = 0;
    var prevat: any = 0;
    var totvatamt: any = 0;
    var vatamt: any = 0;
    var prodcount: any = 0;
    var boxconvstk: any = 0;
    var stripconvstk: any = 0;
    var boxquantity: any = 0;
    var stripquantity: any = 0;
    var tabletquantity: any = 0;
    var roundedamnt: any =0;
    var roundvalue: any =0;
    var inv;
    for (this.i = 0; this.i < sprod.length; this.i++) {
      if (sprod[this.i].calcflag != 1) {

        if (parseFloat(sprod[this.i].indvqty)) {
          preqty = parseFloat(sprod[this.i].indvqty);
      //    alert(preqty);
        } else {
          preqty = 0;
        }
        if (parseFloat(sprod[this.i].indvfreeqty)) {
          prefree = parseFloat(sprod[this.i].indvfreeqty);
        } else {
          prefree = 0;
        }
        if (parseFloat(sprod[this.i].unitprice)) {
          preprodprice = parseFloat(sprod[this.i].unitprice);
          //  alert(preprodprice)
        } else {
          preprodprice = 0;
        }
        if (parseFloat(sprod[this.i].mrp)) {
          premrp = parseFloat(sprod[this.i].mrp);
        } else {
          premrp = 0;
        }
        if (parseFloat(sprod[this.i].discount)) {
          predisc = parseFloat(sprod[this.i].discount);
        } else {
          predisc = 0;
        }
        if (parseFloat(sprod[this.i].unitsgst)) {
          presgst = parseFloat(sprod[this.i].unitsgst);
        } else {
          presgst = 0;
        }
        if (parseFloat(sprod[this.i].unitcgst)) {
          precgst = parseFloat(sprod[this.i].unitcgst);
        } else {
          precgst = 0;
        }
        if (parseFloat(sprod[this.i].unitigst)) {
          preigst = parseFloat(sprod[this.i].unitigst);
        } else {
          preigst = 0;
        }
        if (parseFloat(sprod[this.i].gstflag)) {
          gstflag = parseFloat(sprod[this.i].gstflag);
        } else {
          gstflag = 0;
        }
        if (parseFloat(sprod[this.i].frgstflag)) {
          frgstflag = parseFloat(sprod[this.i].frgstflag);
        } else {
          frgstflag = 0;
        }
        if (parseFloat(sprod[this.i].freeflag)) {
          freeflag = parseFloat(sprod[this.i].freeflag);
        } else {
          freeflag = 0;
        }
        if (parseFloat(sprod[this.i].unitvat)) {
          prevat = parseFloat(sprod[this.i].unitvat);
        } else {
          prevat = 0;
        }
        if (parseFloat(sprod[this.i].convfactor)) {
          convfactor = parseFloat(sprod[this.i].convfactor);
        //  alert(convfactor);
        } else {
          convfactor = 0;
        }
        if (parseFloat(sprod[this.i].boxconvstk)) {
          boxconvstk = parseFloat(sprod[this.i].boxconvstk);
        } else {
          boxconvstk = 0;
        }
        if (parseFloat(sprod[this.i].stripconvstk)) {
          stripconvstk = parseFloat(sprod[this.i].stripconvstk);
        } else {
          stripconvstk = 0;
        }
        if (parseFloat(sprod[this.i].boxquantity)) {
          boxquantity = parseFloat(sprod[this.i].boxquantity);
        } else {
          boxquantity = 0;
        }
        if (parseFloat(sprod[this.i].stripquantity)) {
          stripquantity = parseFloat(sprod[this.i].stripquantity);
        } else {
          stripquantity = 0;
        }
        if (parseFloat(sprod[this.i].tabletquantity)) {
          tabletquantity = parseFloat(sprod[this.i].tabletquantity);
        } else {
          tabletquantity = 0;
        }
        freeflag = 1;
        if (freeflag == 0) {
          discount = 0;
          prefree = 0;
        } else {
          prodcount += 1;
        }
       
        
        preqty = boxquantity * boxconvstk + stripquantity * stripconvstk + tabletquantity;
     
     
        sprod[this.i].totalquantity = preqty;
        sprod[this.i].totalfreeqty = convfactor * prefree;
        sprod[this.i].subtotal= (preqty * preprodprice).toFixed(2);

        pretotprice = preqty * preprodprice;
        discount = (pretotprice * predisc) / 100;
        if (gstflag == 0) {
          if (frgstflag == 0) {
            vatamt = ((pretotprice - discount) * prevat) / 100;
            sgstamt = ((pretotprice - discount) * presgst) / 100;
            cgstamt = ((pretotprice - discount) * precgst) / 100;
            igstamt = ((pretotprice - discount) * preigst) / 100;
          }
          else {
            vatamt = (((preqty + prefree) * preprodprice - discount) * prevat) / 100;
            sgstamt = (((preqty + prefree) * preprodprice - discount) * presgst) / 100;
            cgstamt = (((preqty + prefree) * preprodprice - discount) * precgst) / 100;
            igstamt = (((preqty + prefree) * preprodprice - discount) * preigst) / 100;
          }
        }
        else {
          vatamt = (preqty + prefree) * (premrp - (premrp / (1 + prevat / 100)));
          sgstamt = (preqty + prefree) * (premrp - (premrp / (1 + presgst / 100)));
          cgstamt = (preqty + prefree) * (premrp - (premrp / (1 + precgst / 100)));
          igstamt = (preqty + prefree) * (premrp - (premrp / (1 + preigst / 100)));
        }
        if (freeflag == 1 || freeflag == 0) {
          sprod[this.i].vatamt = vatamt;
          sprod[this.i].sgstamt = sgstamt;
          sprod[this.i].cgstamt = cgstamt;
          sprod[this.i].igstamt = igstamt;
          totvatamt += vatamt;
         // alert(totvatamt);
          totsgstamt += sgstamt;
          totcgstamt += cgstamt;
          totigstamt += igstamt;
        }
        if (freeflag == 1) {
          totalproduct = prodcount;
          totqty += preqty;
          subtotal += pretotprice;
          totdiscount += discount;
        }
      }
    }
    totgstamt = totsgstamt + totcgstamt + totigstamt + totvatamt;
    grandtotal = subtotal + totgstamt - totdiscount;
    if (gstflag == 0) {
      totalincamt = grandtotal;
    } else {
      totalexclamt = grandtotal;
    }
    totaltaxableamt = subtotal - totdiscount;
    totaltaxamt = totgstamt;
    roundedamnt = (Math.round(grandtotal * 10) / 10 );
    // alert("a2"+roundedamnt);
  roundvalue = roundedamnt.toFixed() - grandtotal.toFixed(2)
    control.patchValue(sprod);
    this.registerForm.patchValue({
      totalitems: prodcount,
      totaldiscountamt: totdiscount.toFixed(2),
      totaltaxableamt: totaltaxableamt.toFixed(2),
      totaltaxamt: totaltaxamt.toFixed(2),
      totalinclamt: totalincamt,
      totalexclamt: totalexclamt,
      grandtotal: roundedamnt.toFixed(2),
      createdby: this.selobj.userid,
      locrefid: this.selobj.locrefid,
      locname: this.selobj.locname,
      totalsubtotal: subtotal.toFixed(2),
      roundedoff: roundvalue.toFixed(2)
    });
  }
  viewPInvoiceProduct() {
    this.viewPurchInvoice();
    this.viewPiProduct();
  }
  viewPurchInvoice() {
   // var frmdata = { frmint1: this.registerForm.get('invoiceno').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
   var frmdata1 ={ piid:this.registerForm.get('invoiceno').value }
    // this.userService.viewMedcInvoice(JSON.stringify(frmdata)).subscribe(data => { this.viewServMedcInvoice(data) },
    //   errorCode => console.log(errorCode));
      this.userService.viewVendorName(JSON.stringify(frmdata1)).subscribe(data => { this.vendorname = data[0][0],this.registerForm.get('vendorid').setValue(data[0][1]) },
      errorCode => console.log(errorCode));
  }
  viewPiProduct() {
    var frmdata = { frmint1: this.registerForm.get('invoiceno').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname };
    this.userService.viewPiProduct(JSON.stringify(frmdata)).subscribe(data => { this.viewServPiProduct(data) },
      errorCode => console.log(errorCode));
  }
  viewServMedcInvoice(data: any) {
    this.registerForm.get('vendorid').setValue(data[0][1]);
  }
  viewServPiProduct(data: any) {
    const control = <FormArray>this.registerForm.controls['invoice'];
    var v = 0;
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init();
    for (this.i = 0; this.i < data.length; this.i++) {
      v = 1;
      control.insert(0, this.formBuilder.group({
        prproductid: [, []],
        prrefid: [, []],
        productname: [data[this.i][0], []],
        drugproductid: [data[this.i][v++], []],
      batchname: [data[this.i][v++], []],
        unitprice: [(data[this.i][v++]).toFixed(2), []],
        subtotal: [(data[this.i][v++]).toFixed(2), []],
        mrp: [data[this.i][v++], []],
        unitvat: [data[this.i][v++], []],
        unitsgst: [data[this.i][v++], []],
        unitcgst: [data[this.i][v++], []],
        unitigst: [data[this.i][v++], []],
        igstamt: [, []],
        pirefid: [data[this.i][v++], []],

        piqty: [data[this.i][v], []],
        crntpiqty: [data[this.i][v++], []],
        crntstkqty: [data[this.i][v++], []],
        boxconvstk: [data[this.i][v++], []],
        stripconvstk: [data[this.i][v++], []],
        piprodrefid: [data[this.i][v++], []],
        discount: [data[this.i][v++], []],
        batchrefid: [data[this.i][v++], []],
        boxquantity: [, []],
        stripquantity: [, []],
        tabletquantity: [, []],
        totalquantity: [0, []],
        vatamt: [, []],
        sgstamt: [, []],
        cgstamt: [, []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        //  subtotal: [, []],
        gstflag: [0, []],
        calcflag: [0, []],
        delflag: [false, []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
      }));
    }
  }
  init() {
    const control = <FormArray>this.registerForm.controls['invoice'];
    var data = [[],[]];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        prproductid: [, []],
        prrefid: [, []],
        productname: [, []],
        drugproductid: [, []],
        batchname: [, []],
        unitprice: [, []],
        subtotal: [, []],
        mrp: [, []],
        unitvat: [, []],
        unitsgst: [, []],
        unitcgst: [, []],
        unitigst: [, []],
        pirefid: [, []],
        piqty: [, []],
        crntpiqty: [, []],
        crntstkqty: [, []],
        boxconvstk: [, []],
        stripconvstk: [, []],
        piprodrefid: [, []],
        discount: [, []],
        batchrefid: [, []],
        boxquantity: [, []],
        stripquantity: [, []],
        tabletquantity: [, []],
        totalquantity: [, []],

        vatamt: [, []],
        sgstamt: [, []],
        cgstamt: [, []],
        igstamt: [, []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
       
        gstflag: [0, []],
        calcflag: [1, []],
        delflag: [false, []],


        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
 //  subtotal: [, []],

      }));
    }
  }
  remove() {
    const control = <FormArray>this.registerForm.controls['invoice'];
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
    const control = <FormArray>this.registerForm.controls['invoice'];
    var invoicedata = control.value;
    for (this.i = 0; this.i < invoicedata.length; this.i++) {
      if (parseInt(invoicedata[this.i].totalqty) > parseInt(invoicedata[this.i].crntsiqty)) {
        valflag = 1;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Qty > siqty  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
      if (parseInt(invoicedata[this.i].totalqty) > parseInt(invoicedata[this.i].crntstkqty)) {
        valflag = 1;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Qty > stkqty  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }
    return valflag;
  }
  clear() {
    this.ngOnInit();
  }
}