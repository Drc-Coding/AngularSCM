import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { slsInvSaveService } from './slsInvSave.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsComponent } from '../../../notifications/notifications.component';
import { dateFormatPipe } from '../../../notifications/notifications.datepipe';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DxDataGridComponent } from "devextreme-angular";
import { DomSanitizer, SafeUrl, SafeResourceUrl } from "@angular/platform-browser";
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-slsInvSave',
  templateUrl: './slsInvSave.component.html',
  providers: [slsInvSaveService, NgbDropdownConfig, NotificationsComponent, dateFormatPipe]
})
export class slsInvSaveComponent implements OnInit {
  closeResult: string;
  model: number[];
  registerForm: FormGroup;
  registerForm1: FormGroup;
  registerForm2: FormGroup;
  customers = [];
  doctors = [];
  prcsettings = [];
  sorders = [];
  errors = [];
  scheme = [];
  images = [];
  i;
  inc = 1;
  autoincr;
  autoval = 0;
  autoinc = 0;
  autodata = [];
  autodatacopy = [];
  drgid;
  autoincr1;
  autoval1 = 0;
  autoinc1 = 0;
  autodata1 = [];
  autodatacopy1 = [];
  drgid1;
  custprevamt;
  selobj;
  ignoreflag;
  priceselflag;
  barcodeflag;
  points: number = 0;
  priceflag = 3;
  truncatepos;
  soid: any;
  url;
  @Input() fileExt: string = "JPG, GIF, PNG";
  refill=false;
  opnrefill=true;
  clsrefill=false;

  constructor(private userService: slsInvSaveService, private dateformat: dateFormatPipe, private formBuilder: FormBuilder, config: NgbDropdownConfig, private notificationsComponent: NotificationsComponent, private modalService: NgbModal, private domSanitizer: DomSanitizer) {
    config.autoClose = false;
  }
  ngOnInit() {
    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };
    this.registerForm = this.formBuilder.group({
      salesorderrefid: [, []],
      salesbillid: [, []],
      salesbilltype: [, []],
      salesbillno: [, []],
      billdate: [, []],
      customerrefid: [, [Validators.required]],
      doctorrefid: [, []],
      totalamount: [, []],
      totalitems: [, []],
      totaldiscount: [, []],
      taxableamt: [, []],
      totaltaxamt: [, []],
      totalinclamt: [, []],
      totalexclamt: [, []],
      grandtotal: [, [Validators.required, Validators.min(1)]],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      customername: [, []],
      invoiceno: [, []],
      autonamenew: [, []],
      autonamenew1: [, []],
      subtotal: [, []],
      roundoff: [, []],
      tempstock: [, []],
      freeflag: [, []],
      gstflag: [1, []],
      frgstflag: [1, []],
      discautoflag: [, []],
      custdiscamt: [, []],
      barcode: [, []],
      prescpath: [, []],
      paymenttype: [, []],
      ptrefno: [, []],
      cashamt: [, []],
      cardamt: [, []],
      creditcardamt: [, []],
      debitcardamt: [, []],
      cashamtflag: [, []],
      paidamt: [, []],
      outstandingamt: [, []],
      paidamount: [, []],
      balanceamount: [, []],
      custinvoiceno: [, []],
      sotempflag: [0, []],
      sorefid: [, []],
      sorderflag: [0, []],
      taxflag: [, []],
      userflag: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      date: [this.dateformat.transform05(Date.now()), []],
      scitizenflag: [false, []],
      phycapflag: [false, []],
      scitizenno: [, []],
      phycapno: [, []],
      phydiscountflag: [false, []],
      disctaxflag: [false, []],
      custdummyid: [, []],
      presc35: [, []],
      email: [, []],
      cashcheck: [, []],
      creditcheck: [, []],
      debitcheck: [, []],
      refilldays:[,[]],
      vatdispflag: [this.selobj.vatdispflag, []],
      boxdispflag: [this.selobj.boxdispflag, []],
      stripdispflag: [this.selobj.stripdispflag, []],
      tabdispflag: [this.selobj.tabdispflag, []],
      employeeid: [this.selobj.userid, []],
      invoice: this.formBuilder.array([
      ]),
      dummy: this.formBuilder.array([
      ]),
      newproduct: this.formBuilder.array([

      ]),
    });
    this.registerForm1 = this.formBuilder.group({
      debitaccount: [2, []],
      creditaccount: [20, []],
      debitamount: [, []],
      creditamount: [, []],
      draccname: ['Accounts Receivable', []],
      craccname: ['Sales  income', []],
      invoiceno: [, []],
      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [, []],
      jrnltype: [3, []],
      jrnlname: ['Sales', []],
      bulkflag: [, []],
      personid: [, []],
      persontype: [1, []],
      invoicetype: [1, []],
      paymenttype: [, []],
      ptrefno: [, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      salesflag: [0, []],
      calcflag: [0, []],
    });
    this.registerForm2 = this.formBuilder.group({
      debitaccount: [3, []],
      creditaccount: [2, []],
      debitamount: [, []],
      creditamount: [, []],
      draccname: ['Cash', []],
      craccname: ['Acc Receivable', []],
      invoiceno: [, []],
      invoicebalamt: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientcdate1: [this.dateformat.transform04(), []],
      cashflag: [, []],
      jrnltype: [5, []],
      jrnlname: ['Receipt', []],
      bulkflag: [, []],
      personid: [, []],
      persontype: [1, []],
      invoicetype: [1, []],
      paymenttype: [, []],
      ptrefno: [, []],
      createdby: [this.selobj.userid, []],
      locrefid: [this.selobj.locrefid, []],
      locname: [this.selobj.locname, []],
      countryrefid: [this.selobj.countryrefid, []],
      companyrefid: [this.selobj.companyid, []],
      branchrefid: [this.selobj.branchrefid, []],
      calcflag: [0, []],
    });
    var frmdata = { frmint1: '', frmstr1: this.dateformat.transform05(Date.now()), createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewCustomers(JSON.stringify(frmdata)).subscribe(data => { this.customers = data },
      errorCode => console.log(errorCode));
    this.userService.viewDoctors(JSON.stringify(frmdata)).subscribe(data => { this.doctors = data },
      errorCode => console.log(errorCode));
    this.userService.viewPriceSettings(JSON.stringify(frmdata)).subscribe(data => { this.prcsettings = data },
      errorCode => console.log(errorCode));
    this.userService.viewSITaxSettings(JSON.stringify(frmdata)).subscribe(data => {
      this.registerForm.get('gstflag').setValue(data[0][0])
        , this.registerForm.get('frgstflag').setValue(data[0][1])
    },
      errorCode => console.log(errorCode));
    /*  this.userService.viewScheme( JSON.stringify(frmdata)).subscribe(data => {  this.scheme= data      },
         errorCode => console.log(errorCode));   */
    this.userService.viewCustInvoiceNo(JSON.stringify(frmdata)).subscribe(data => { this.registerForm.get('custinvoiceno').setValue(data) },
      errorCode => console.log(errorCode));
    this.userService.viewSalesOrderAll(JSON.stringify(frmdata)).subscribe(data => { this.sorders = data },
      errorCode => console.log(errorCode));
    this.registerForm.get('freeflag').setValue(1);

    $(document).ready(function () {
      $('.image').hide();
    });
    $('.boxname ').hide();
    this.images = [];
    this.init();
    $('#autolist').hide();
    $('#autolist1').hide();
  }
  ClosePresc() {
    $('.image ').hide();
  }

  viewsPresc() {
    this.images = [['api/slsinv/viewPresImage?search=' + this.registerForm.get('prescpath').value]];
    $('.image ').show();
  }
  
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
          var frmdata = { frmint1: '', frmstr1: this.registerForm.get('autonamenew').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid, branchrefid: this.selobj.branchrefid };
          this.userService.viewSIProductNames(JSON.stringify(frmdata)).subscribe(data => { this.autodata = data },
            errorCode => console.log(errorCode));
        }
        this.viewvalue(this.autodata);
      }
    }, 1010);
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
      if (autoincrflag == 1) {
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
      this.drgid = articleId - 2;
      this.autodatacopy = this.autodata;
      this.autodata = [];
      $('.boxname ').show();
      $('#autolistnew  ul   li:nth-child(1)   input:nth-child(1) ').focus();
      $(document).unbind('scroll');
    }
    this.barcodeflag = 0;
  }
  autofocusin1() {
    this.autoincr1 = setInterval(() => {
      if (this.registerForm.get('autonamenew1').value) {
        $('#autolist1').show();
        if (this.autoval1 == this.registerForm.get('autonamenew1').value) {
          this.autoinc1 += 1;
        } else {
          this.autoinc1 = 0;
        }
        this.autoval1 = this.registerForm.get('autonamenew1').value;
        if (this.autoinc1 < 1) {
          var frmdata = { frmint1: '', frmstr1: this.registerForm.get('autonamenew1').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
          this.userService.viewSIPdtNamesGeneric(JSON.stringify(frmdata)).subscribe(data => { this.autodata1 = data },
            errorCode => console.log(errorCode));
        }
        this.viewvalue(this.autodata1);
      }
    }, 610);
  }
  autofocusout1() {
    if (this.registerForm.get('autonamenew1').value) {
    } else {
      $('#autolist1').hide();
    }
    clearInterval(this.autoincr1);
  }
  autokeyselect1(event: KeyboardEvent, articleId: number) {
    var autoincrflag: number;
    if (event.keyCode == 38) {
      autoincrflag = articleId - 1;
      if (autoincrflag == 0) {
        $("#autoname1").focus();
      } else {
        $("#autolist1 li:nth-child(" + autoincrflag + ") input").focus();
      }
    }
    if (event.keyCode == 40) {
      autoincrflag = articleId + 1;
      $("#autolist1 li:nth-child(" + autoincrflag + ") input").focus();
    }
    if (event.keyCode == 13) {
      this.drgid1 = articleId - 2;
      this.autodatacopy1 = this.autodata1;
      this.autodata1 = [];
      $('.boxname').show();
      $('#autolistnew  ul   li:nth-child(1)   input:nth-child(1) ').focus();
    }
    this.barcodeflag = 2;
  }
  viewStock(event: KeyboardEvent, stktype: number) {
    var autoincrflag: number;
    if (event.keyCode == 38) {
      autoincrflag = stktype - 1;
      $("#autolistnew li:nth-child(" + autoincrflag + ") input").focus();
    }
    if (event.keyCode == 40) {
      autoincrflag = stktype + 1;
      $("#autolistnew li:nth-child(" + autoincrflag + ") input").focus();
    }
    if (event.keyCode == 13) {
      if (this.barcodeflag == 0) {
        var drg = this.autodatacopy[this.drgid][1];
        var bth = this.autodatacopy[this.drgid][2];
        var frmdata = { frmint1: drg, frmint2: bth, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
        this.userService.viewSIProductName(JSON.stringify(frmdata)).subscribe(data => { this.viewServWareHouseStock(data, stktype) },
          errorCode => console.log(errorCode));
        $("#autoname").focus();
        $('.boxname ').hide();
        this.registerForm.get('autonamenew').setValue('');
        this.autodatacopy = [];
      } else if (this.barcodeflag == 1) {
        var frmdata1 = { frmint1: '', frmstr1: this.registerForm.get('barcode').value, createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
        this.userService.viewBarCodeProd(JSON.stringify(frmdata1)).subscribe(data => { this.viewServWareHouseStock(data, stktype) },
          errorCode => console.log(errorCode));
        $('.boxname ').hide();
        $(".barcode").focus();
        this.registerForm.get('barcode').setValue('');
      } else if (this.barcodeflag == 2) {
        var drg1 = this.autodatacopy1[this.drgid1][1];
        var bth1 = this.autodatacopy1[this.drgid1][2];
        var frmdata2 = { frmint1: drg1, frmint2: bth1, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
        this.userService.viewSIProductName(JSON.stringify(frmdata2)).subscribe(data => { this.viewServWareHouseStock(data, stktype) },
          errorCode => console.log(errorCode));
        $("#autoname1").focus();
        $('.boxname').hide();
        this.registerForm.get('autonamenew1').setValue('');
        this.autodatacopy1 = [];
      }
    }
  }
  viewvalue(data: any) {
    var r = 0;
    for (this.i = 0; this.i < data.length; this.i++) {
      r = this.i + 1;
      if (data[this.i][3] > 0) {
        //        $("#autolist li:nth-child("+r+") input").css("background-color", "#FF00FF");
      } else if (data[this.i][3] < data[this.i][4]) {
        //              $("#autolist li:nth-child("+r+") input").css("background-color", "#87CEEB");
      } else if (data[this.i][5] > 0) {
        //             $("#autolist li:nth-child("+r+") input").css("background-color", "#8B008B");
      }
    }
  }
  viewBarcodeProd(event: KeyboardEvent) {
    if (event.keyCode == 13) {
      this.barcodeflag = 1;
      $('.boxname ').show();
      $('#autolistnew  ul   li:nth-child(1)   input:nth-child(1) ').focus();
    }
  }
  initformarray() {
    return this.formBuilder.group({
      newproductname: ['', []],
      reqqty: ['', []],
      remarks: ['', []],
      companyrefid: [AppComponent.companyID],
      branchrefid: [AppComponent.branchID],
      locname: [AppComponent.locRefName1],
      locrefid: [AppComponent.locrefID1],
      clientcdate: [AppComponent.date],
      createddate: [this.registerForm.get('date').value]
      //productid:['1',[]]
    });
  }

  addnewprod(event) {

    if (event.keyCode == 9) {
      this.initformarray();
      const control = <FormArray>this.registerForm.controls['newproduct'];
      control.push(this.initformarray());

    }
  }

  getNewProduct() {

    this.initformarray();
    const control = <FormArray>this.registerForm.controls['newproduct'];
    control.controls = [];
    control.push(this.initformarray());



  }
  j;



  saveNewProduct(c) {


    const saveData = this.registerForm.controls['newproduct'];

    this.userService.saveNewProduct(JSON.stringify(saveData.value)).
      subscribe(data => { c('Close click') },

        err => console.log(err));

  }

  viewSalesOrderProd() {
    this.registerForm.get('salesorderrefid').setValue(this.sorders[this.registerForm.get('sotempflag').value][0]);
    this.registerForm.get('customerrefid').setValue(this.sorders[this.registerForm.get('sotempflag').value][2]);
    this.registerForm.get('scitizenflag').setValue(this.sorders[this.registerForm.get('sotempflag').value][4]);
    this.registerForm.get('phycapflag').setValue(this.sorders[this.registerForm.get('sotempflag').value][5]);
    this.registerForm.get('scitizenno').setValue(this.sorders[this.registerForm.get('sotempflag').value][6]);
    this.registerForm.get('phycapno').setValue(this.sorders[this.registerForm.get('sotempflag').value][7]);
    this.getcustemail();
    if (this.sorders[this.registerForm.get('sotempflag').value][4] == 1 || this.sorders[this.registerForm.get('sotempflag').value][5] == 1) {
      this.registerForm.get('phydiscountflag').setValue(true);
    } else {
      this.registerForm.get('phydiscountflag').setValue(false);
    }
    this.registerForm.get('sorderflag').setValue(1);
    var frmdata = { frmint1: this.sorders[this.registerForm.get('sotempflag').value][0], frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewSalesOrderProd(JSON.stringify(frmdata)).subscribe(data => { this.viewServSalesOrderProd(data) },
      errorCode => console.log(errorCode));
  }
  viewServSalesOrderProd(data: any) {
    var conversionfactor;
    var unitprice;
    var indtabprice;
    var disc;
    if (this.priceflag == 1) {  //sellingprice
      indtabprice = data[0][4];
    } else if (this.priceflag == 2) {  //RetailerSellingPrice
      indtabprice = data[0][25];
    } else if (this.priceflag == 3) {   //wholesaleSellingPrice
      indtabprice = data[0][26];
    }
    var stktype = 3;
    const control = <FormArray>this.registerForm.controls['invoice'];
    while (control.length !== 0) {
      control.removeAt(0);
    }
    this.init();
    if (stktype == 1) {
      conversionfactor = data[0][11];
      unitprice = indtabprice * data[0][11];
    } else if (stktype == 2) {
      conversionfactor = data[0][12];
      unitprice = indtabprice * data[0][12];
    } else if (stktype == 3) {
      conversionfactor = 1;
      unitprice = indtabprice;
    }
    if ((this.registerForm.get('phycapflag').value == true || this.registerForm.get('scitizenflag').value == true)
      && (this.registerForm.get('phydiscountflag').value == true)) {
      disc = 20;
    } else {
      disc = 0;
    }
    /*      if(control.value[0].apprflag==1){
    
        while (control.length !== 0) {
          control.removeAt(0) ;
           }
      
    
      }  */
    for (this.i = 0; this.i < data.length; this.i++) {
      /*         if(this.prcsettings[0][1]==1){
              
                  unitprice=   data[this.i][5  ]  ;
                  }else if(this.prcsettings[0][1]==2){
                    unitprice=    data[this.i][15   ]   ;
              
                  }else if(this.prcsettings[0][1]==3){
              
                    unitprice=   data[this.i][16   ]   ;
                 }else if(this.prcsettings[0][1] ==4){
                  
                  unitprice=   data[this.i][17   ]   ;
                 }else if(this.prcsettings[0][1]==5){
                  
                  unitprice=  data[this.i][18   ]   ;
                  }   */
      //   unitprice = 20;
      control.insert(0, this.formBuilder.group({
        salesprdtid: [, []],
        salesrefid: [, []],
        drugproductid: [data[this.i][1], []],
        batchrefid: [data[this.i][2], []],
        totalqty: [0, []],
        totalfreeqty: [, []],
        unitprice: [data[this.i][5], []],
        mrp: [, []],
        expirydate: [data[this.i][22], []],
        unitdiscount: [disc, []],
        unitvat: [data[this.i][10], []],
        unitsgst: [data[this.i][6], []],
        unitcgst: [data[this.i][7], []],
        unitigst: [data[this.i][8], []],
        discountamt: [, []],
        vatamt: [, []],
        sgstamt: [, []],
        cgstamt: [, []],
        igstamt: [, []],
        subtotal: [, []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        drgtyp: stktype,
        gstflag: [this.registerForm.get('gstflag').value, []],
        frgstflag: [this.registerForm.get('frgstflag').value, []],
        freeflag: [this.registerForm.get('freeflag').value, []],
        priceflag: [, []],
        discautoflag: [, []],
        convfactor: [conversionfactor, []],
        indvqty: [, []],
        indvfreeqty: [, []],
        crntstkqty: [data[this.i][3], []],
        productname: [data[this.i][0], []],
        calcflag: [0, []],
        delflag: [false, []],
        soqty: [data[this.i][19], []],
        soremainqty: [data[this.i][20], []],
        batchname: [data[this.i][21], []],
        availfreeqty: [data[this.i][23], []],
        stkmainrefid: [data[this.i][24], []],
      }));
    }
  }
  init() {
    const control = <FormArray>this.registerForm.controls['invoice'];
    var data = [[], []];
    for (this.i = 0; this.i < data.length; this.i++) {
      control.push(this.formBuilder.group({
        salesprdtid: [, []],
        salesrefid: [, []],
        drugproductid: [, []],
        batchrefid: [, []],
        totalqty: [, []],
        totalfreeqty: [, []],
        unitprice: [, []],
        mrp: [, []],
        expirydate: [, []],
        unitdiscount: [, []],
        unitvat: [, []],
        unitsgst: [, []],
        unitcgst: [, []],
        unitigst: [, []],
        discountamt: [, []],
        vatamt: [, []],
        sgstamt: [, []],
        cgstamt: [, []],
        igstamt: [, []],
        subtotal: [, []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [, []],
        locrefid: [, []],
        locname: [, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        drgtyp: [, []],
        gstflag: [, []],
        frgstflag: [, []],
        freeflag: [, []],
        priceflag: [, []],
        discflag: [, []],
        discautoflag: [, []],
        convfactor: [, []],
        indvqty: [, []],
        indvfreeqty: [, []],
        crntstkqty: [, []],
        productname: [, []],
        calcflag: [1, []],
        delflag: [false, []],
        soqty: [, []],
        soremainqty: [, []],
        batchname: [, []],
      }));
    }
  }
  viewServWareHouseStock(data: any, stktype: any) {
    //   data[0][4] =5;  //remove
    var conversionfactor;
    var unitprice;
    var disc;
    var indtabprice;
    if (this.priceflag == 1) {
      indtabprice = data[0][4];
    } else if (this.priceflag == 2) {
      indtabprice = data[0][23];
    } else if (this.priceflag == 3) {
      indtabprice = data[0][24];
    }
    const control = <FormArray>this.registerForm.controls['invoice'];
    if (stktype == 1) {
      conversionfactor = data[0][11];
      unitprice = indtabprice * data[0][11];
    } else if (stktype == 2) {
      conversionfactor = data[0][12];
      unitprice = indtabprice * data[0][12];
    } else if (stktype == 3) {
      conversionfactor = 1;
      unitprice = indtabprice;
    }
    if ((this.registerForm.get('phycapflag').value == true || this.registerForm.get('scitizenflag').value == true)
      && (this.registerForm.get('phydiscountflag').value == true)) {
      disc = 20;
    } else {
      disc = 0;
    }
    /*      if(control.value[0].apprflag==1){
            while (control.length !== 0) {
              control.removeAt(0) ;
               }
          
          }  */
    for (this.i = 0; this.i < data.length; this.i++) {
      /*         if(this.prcsettings[0][1]==1){
              
                  unitprice=   data[this.i][5  ]  ;
                  }else if(this.prcsettings[0][1]==2){
                    unitprice=    data[this.i][15   ]   ;
              
                  }else if(this.prcsettings[0][1]==3){
              
                    unitprice=   data[this.i][16   ]   ;
                 }else if(this.prcsettings[0][1] ==4){
                  
                  unitprice=   data[this.i][17   ]   ;
                 }else if(this.prcsettings[0][1]==5){
                  
                  unitprice=  data[this.i][18   ]   ;
                  }   */
      //    unitprice = 20;
      control.insert(0, this.formBuilder.group({
        salesprdtid: [, []],
        salesrefid: [, []],
        drugproductid: [data[this.i][1], []],
        batchrefid: [data[this.i][2], []],
        totalqty: [0, []],
        totalfreeqty: [, []],
        unitprice: [data[this.i][5], []],
        mrp: [, []],
        expirydate: [data[this.i][20], []],
        unitdiscount: [disc, []],
        unitvat: [data[this.i][10], []],
        unitsgst: [data[this.i][6], []],
        unitcgst: [data[this.i][7], []],
        unitigst: [data[this.i][8], []],
        discountamt: [, []],
        vatamt: [, []],
        sgstamt: [, []],
        cgstamt: [, []],
        igstamt: [, []],
        subtotal: [, []],
        clientcdate: [this.dateformat.transform04(), []],
        clientcdate1: [this.dateformat.transform04(), []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        drgtyp: stktype,
        gstflag: [this.registerForm.get('gstflag').value, []],
        frgstflag: [this.registerForm.get('frgstflag').value, []],
        freeflag: [this.registerForm.get('freeflag').value, []],
        priceflag: [, []],
        discautoflag: [, []],
        convfactor: [conversionfactor, []],
        indvqty: [, []],
        indvfreeqty: [, []],
        crntstkqty: [data[this.i][3], []],
        productname: [data[this.i][0], []],
        calcflag: [0, []],
        delflag: [false, []],
        soqty: [, []],
        soremainqty: [, []],
        batchname: [data[this.i][19], []],
        availfreeqty: [data[this.i][21], []],
        stkmainrefid: [data[this.i][22], []],
      }));
    }
  }
  onSubmit() {
    //  alert(JSON.stringify(this.registerForm.value));
    var valflag: Number = 0;
    //    this.addscheme()  ;
    var answer = confirm("Save data?");
    valflag = this.validnew();
    const control = <FormArray>this.registerForm.controls['invoice'];
    if (answer && valflag == 0) {
      //alert(this.registerForm.get('salesorderrefid').value);
      if (this.registerForm.get('sorderflag').value == 1) {
        this.registerForm.get('salesorderrefid').setValue(this.sorders[this.registerForm.get('sotempflag').value][0]);
        //   alert(this.registerForm.get('salesorderrefid').value);
      } else {
        this.registerForm.get('salesorderrefid').setValue(0);
      }
      this.userService.saveSalesInvoice(JSON.stringify(this.registerForm.value)).subscribe(data => { this.saveSIProducts(data), this.saveSISalesJournal(data), this.saveSIReceipt(data) },
        errorCode => console.log(errorCode));
    }
  }
  poprint() {
    this.onSubmit();
    if (this.soid != undefined || null || '') {
      this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Value not fetching', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
    }
    else {
      // let companyurl: string="http://204.93.193.244:8082/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Billprnt_PO.rptdesign&Companyrefid="+this.locname;
      setTimeout(() => {
        window.location.href = "http://204.93.193.244:8082/birt/frameset?__report=MedeilReports/Vtaexpt/Bill_Vatexpt.rptdesign&salesrefid=" + this.soid + "&__format=PDF";
      }, 7000);
      //   setTimeout(() => {
      //    this.router.navigateByUrl('http://204.93.193.244:8082/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Billprnt_PO.rptdesign&branchrefid={{branchid}}&Locname={{locname}}&Locrefid={{locrefid}}&Companyrefid={{companyrefid}}&porefid={{poid}}&POID={{poid}}&ShopID={{shopid}}&__format=PDF');
      //  }, 2000);

    }

  }
  saveSIProducts(data: any) {
    const control = <FormArray>this.registerForm.controls['invoice'];
    if (data == 1) {
      this.userService.saveSIProducts(JSON.stringify(control.value)).subscribe(data => {
        let res = data.res;
        this.soid = res[1];
        this.saveEmailAttach()
        //alert(this.soid);
        this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.clear();




      },

        errorCode => console.log(errorCode));
    }

  }

  saveEmailAttach() {

    this.url = "http://204.93.193.244:8082/birt/frameset?__report=MedeilReports/Vtaexpt/Bill_Vatexpt.rptdesign&salesrefid=" + this.soid + "&__format=PDF";
    var obj = {

      customername: this.registerForm.get('customername').value,

      custinvoiceno: this.registerForm.get('custinvoiceno').value,

      url: this.url,

      email: this.registerForm.get('email').value,

      grandtotal: this.registerForm.get('grandtotal').value,


    }

    this.userService.sendMailAttachment(JSON.stringify(obj)).subscribe(data => { },
      errorCode => console.log(errorCode));

  }
  // saveSIProducts(data: any) {
  //   const control = <FormArray>this.registerForm.controls['invoice'];
  //   if (data == 1) {
  //     this.userService.saveSIProducts(JSON.stringify(control.value)).subscribe(data => { this.savevalid(data) },
  //       errorCode => console.log(errorCode));
  //   }
  // }
  saveSISalesJournal(data: any) {
    this.registerForm1.patchValue({
      debitamount: this.registerForm.get('grandtotal').value,
      creditamount: this.registerForm.get('grandtotal').value,
      personid: this.registerForm.get('customerrefid').value,
    });
    this.userService.saveSISalesJournal(JSON.stringify(this.registerForm1.value)).subscribe(data => { },
      errorCode => console.log(errorCode));
  }
  saveSIReceipt(data: any) {
    this.registerForm2.patchValue({
      debitamount: this.registerForm.get('paidamt').value,
      creditamount: this.registerForm.get('paidamt').value,
      personid: this.registerForm.get('customerrefid').value,
    });
    if (this.registerForm.get('paidamt').value > 0) {
      this.userService.saveSIReceipt(JSON.stringify(this.registerForm2.value)).subscribe(data => { },
        errorCode => console.log(errorCode));
    }
  }
  calc(e) {
    if (e.keyCode == 9) {
      this.calcGST();
    }
  }
  setDiscAmt() {
    var custdiscamt: number = 0;
    const control = <FormArray>this.registerForm.controls['invoice'];
    var sprod = control.value;
    if (parseInt(this.registerForm.get('custdiscamt').value)) {
      custdiscamt = parseInt(this.registerForm.get('custdiscamt').value);
    } else {
      custdiscamt = 0;
    }
    if (custdiscamt < 1) {
      for (this.i = 0; this.i < sprod.length; this.i++) {
        if (sprod[this.i].calcflag != 1) {
          sprod[this.i].unitdiscount = 0;
        }
      }
    }
  }
  calcGST() {
    const control = <FormArray>this.registerForm.controls['invoice'];
    var sprod = control.value;
    var preqty: number = 0;
    var preprodprice: number = 0;
    var prefree: number = 0;
    var premrp: number = 0;
    var predisc: number = 0;
    var prevat: number = 0;
    var presgst: number = 0;
    var precgst: number = 0;
    var preigst: number = 0;
    var pretotprice: number = 0;
    var pretotfreeprice: number = 0;
    var pretotmrp: number = 0;
    var discount: number = 0;
    var vatamt: number = 0;
    var sgstamt: number = 0;
    var cgstamt: number = 0;
    var igstamt: number = 0;
    var totdiscount: number = 0;
    var totvatamt: number = 0;
    var totsgstamt: number = 0;
    var totcgstamt: number = 0;
    var totigstamt: number = 0;
    var totutgstamt: number = 0;
    var totgstamt: number = 0;
    var totaltaxableamt: number = 0;
    var totaltaxamt: number = 0;
    var totalincamt: number = 0;
    var totalexclamt: number = 0;
    var grandtotal: number = 0;
    var totalproduct: number = 0;
    var totqty: number = 0;
    var subtotal: number = 0;
    var convfactor: number = 0;
    var gstflag: number = 0;
    var frgstflag: number = 0;
    var freeflag: number = 0;
    var prodcount: number = 0;
    var prodcount: number = 0;
    var precustdisc: number = 0;
    var inv;
    if (parseInt(this.registerForm.get('custdiscamt').value) > 0) {
      this.registerForm.get('discautoflag').setValue(1);
    } else {
      this.registerForm.get('discautoflag').setValue(0);
      this.registerForm.get('custdiscamt').setValue(0);
    }
    for (this.i = 0; this.i < sprod.length; this.i++) {
      if (parseInt(sprod[this.i].indvqty)) {
        preqty = parseFloat(sprod[this.i].indvqty);
      } else {
        preqty = 0;
      }
      if (parseFloat(sprod[this.i].unitprice)) {
        preprodprice = parseFloat(sprod[this.i].unitprice);
      } else {
        preprodprice = 0;
      }
      if (parseInt(sprod[this.i].freeflag)) {
        freeflag = parseInt(sprod[this.i].freeflag);
      } else {
        freeflag = 0;
      }
      pretotprice = preqty * preprodprice;
      if (freeflag == 1) {
        subtotal += pretotprice;
      }
    }
    precustdisc = (this.registerForm.get('custdiscamt').value / subtotal) * 100;
    subtotal = 0;
    pretotprice = 0;
    for (this.i = 0; this.i < sprod.length; this.i++) {
      if (sprod[this.i].calcflag != 1) {
        if (parseInt(sprod[this.i].indvqty)) {
          preqty = parseInt(sprod[this.i].indvqty);
        } else {
          preqty = 0;
        }
        if (parseInt(sprod[this.i].indvfreeqty)) {
          prefree = parseInt(sprod[this.i].indvfreeqty);
        } else {
          prefree = 0;
        }
        if (parseFloat(sprod[this.i].unitprice)) {
          preprodprice = parseFloat(sprod[this.i].unitprice);
        } else {
          preprodprice = 0;
        }
        if (parseInt(sprod[this.i].mrp)) {
          premrp = parseInt(sprod[this.i].mrp);
        } else {
          premrp = 0;
        }
        if (parseInt(sprod[this.i].unitdiscount)) {
          predisc = parseInt(sprod[this.i].unitdiscount);
        } else {
          predisc = 0;
        }
        if (parseInt(sprod[this.i].unitsgst)) {
          presgst = parseInt(sprod[this.i].unitsgst);
        } else {
          presgst = 0;
        }
        if (parseInt(sprod[this.i].unitcgst)) {
          precgst = parseInt(sprod[this.i].unitcgst);
        } else {
          precgst = 0;
        }
        if (parseInt(sprod[this.i].unitigst)) {
          preigst = parseInt(sprod[this.i].unitigst);
        } else {
          preigst = 0;
        }
        if (parseInt(sprod[this.i].gstflag)) {
          gstflag = parseInt(sprod[this.i].gstflag);
        } else {
          gstflag = 0;
        }
        if (parseInt(sprod[this.i].frgstflag)) {
          frgstflag = parseInt(sprod[this.i].frgstflag);
        } else {
          frgstflag = 0;
        }
        if (parseInt(sprod[this.i].freeflag)) {
          freeflag = parseInt(sprod[this.i].freeflag);
        } else {
          freeflag = 0;
        }
        if (parseInt(sprod[this.i].unitvat)) {
          prevat = parseInt(sprod[this.i].unitvat);
        } else {
          prevat = 0;
        }
        if (parseInt(sprod[this.i].convfactor)) {
          convfactor = parseInt(sprod[this.i].convfactor);
        } else {
          convfactor = 0;
        }
        if (freeflag == 0) {
          sprod[this.i].indvfreeqty = 0;
          discount = 0;
          prefree = 0;
        } else {
          prodcount += 1;
        }
        if (this.registerForm.get('discautoflag').value == 1) {
          sprod[this.i].unitdiscount = precustdisc;
          predisc = precustdisc;
        }
        sprod[this.i].subtotal = (preqty * preprodprice).toFixed(2);
        sprod[this.i].totalqty = convfactor * preqty;
        sprod[this.i].totalfreeqty = convfactor * prefree;
        pretotprice = preqty * preprodprice;
        discount = (pretotprice * predisc) / 100;
        if (gstflag == 1) {
          if (frgstflag == 1) {
            vatamt = ((pretotprice - discount) * prevat) / 100;
            sgstamt = ((pretotprice - discount) * presgst) / 100;
            cgstamt = ((pretotprice - discount) * precgst) / 100;
            igstamt = ((pretotprice - discount) * preigst) / 100;
          }
          else if (frgstflag == 2) {
            vatamt = (((preqty + prefree) * preprodprice - discount) * prevat) / 100;
            sgstamt = (((preqty + prefree) * preprodprice - discount) * presgst) / 100;
            cgstamt = (((preqty + prefree) * preprodprice - discount) * precgst) / 100;
            igstamt = (((preqty + prefree) * preprodprice - discount) * preigst) / 100;
          }
        }
        else if (gstflag == 2) {
          vatamt = (((preqty * preprodprice)) / (100 + prevat)) * (prevat);
          sgstamt = (preqty + prefree) * (premrp - (premrp / (1 + presgst / 100)));
          cgstamt = (preqty + prefree) * (premrp - (premrp / (1 + precgst / 100)));
          igstamt = (preqty + prefree) * (premrp - (premrp / (1 + preigst / 100)));
        }
        if (this.registerForm.get('disctaxflag').value == true) {
          discount = ((pretotprice - vatamt) * predisc) / 100;
        } else if (this.registerForm.get('disctaxflag').value == false) {
          discount = (pretotprice * predisc) / 100;
        }
        if (freeflag == 0 || freeflag == 1) {
          sprod[this.i].vatamt = vatamt;
          sprod[this.i].sgstamt = sgstamt;
          sprod[this.i].cgstamt = cgstamt;
          sprod[this.i].igstamt = igstamt;
          totvatamt += vatamt;
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
    if (this.registerForm.get('disctaxflag').value == true) {
      grandtotal = subtotal - totgstamt - totdiscount;
    } else if (this.registerForm.get('disctaxflag').value == false && this.registerForm.get('gstflag').value == 2) {
      grandtotal = subtotal - totdiscount;
    } else if (this.registerForm.get('gstflag').value == 1) {
      grandtotal = subtotal + totgstamt - totdiscount;
    }
    if (gstflag == 0) {
      totalincamt = grandtotal;
    } else {
      totalexclamt = grandtotal;
    }
    totaltaxableamt = subtotal;
    totaltaxamt = totgstamt;
    control.patchValue(sprod);
    this.registerForm.patchValue({
      totalitems: totalproduct,
      totaldiscount: totdiscount.toFixed(2),
      totaltaxamt: totaltaxamt.toFixed(2),
      taxableamt: totaltaxableamt.toFixed(2),
      totalinclamt: totalincamt.toFixed(this.truncatepos),
      totalexclamt: totalexclamt.toFixed(this.truncatepos),
      grandtotal: grandtotal.toFixed(2),
      createdby: this.selobj.userid,
      locrefid: this.selobj.locrefid,
      locname: this.selobj.locname,
      totalamount: subtotal.toFixed(2),
    });
  }

  fileChange(event) {
    var valflag = 0;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append('locrefid', this.selobj.locrefid);
      formData.append('locname', this.selobj.locname);
      this.userService.savePresImage(formData).subscribe(data => { this.registerForm.get('prescpath').setValue(data) },
        errorCode => console.log(errorCode));
    }
  }
  // photoValidation(files) {
  //   if (files.length > 0 && (!this.isValidFileExtension(files))) {
  //     return;
  //   }
  // }

  private isValidFileExtension(files) {
    var extensions = (this.fileExt.split(','))
      .map(function (x) { return x.toLocaleUpperCase().trim() });
    for (var i = 0; i < files.length; i++) {
      var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      var exists = extensions.includes(ext);
      if (!exists) {
        this.errors.push("Error (Extension): " + files[i].name);
      }
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
      if (parseInt(invoicedata[this.i].totalqty) > parseInt(invoicedata[this.i].crntstkqty)) {
        valflag = 1;
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Qty > Stkqty  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }
    return valflag;
  }
  savevalid(data: any) {
    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
      this.clear();
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  calcamt() {
    var cashamt: number = 0;
    var creditcardamt: number = 0;
    var debitcardamt: number = 0;
    if (parseInt(this.registerForm.get('cashamt').value)) {
      cashamt = parseInt(this.registerForm.get('cashamt').value);
    } else {
      cashamt = 0;
    }
    if (parseInt(this.registerForm.get('creditcardamt').value)) {
      creditcardamt = parseInt(this.registerForm.get('creditcardamt').value);
    } else {
      creditcardamt = 0;
    }
    if (parseInt(this.registerForm.get('debitcardamt').value)) {
      debitcardamt = parseInt(this.registerForm.get('debitcardamt').value);
    } else {
      debitcardamt = 0;
    }
    this.registerForm.get('paidamt').setValue(cashamt + creditcardamt + debitcardamt);
  }
  calcbal() {
    var givenamt: number = 0;
    var grandtotal: number = 0;
    if (parseInt(this.registerForm.get('paidamount').value)) {
      givenamt = parseInt(this.registerForm.get('paidamount').value);
    } else {
      givenamt = 0;
    }
    if (parseInt(this.registerForm.get('grandtotal').value)) {
      grandtotal = parseInt(this.registerForm.get('grandtotal').value);
    } else {
      grandtotal = 0;
    }
    this.registerForm.get('balanceamount').setValue(givenamt - grandtotal);
  }
  clickopen(content1, id: number) {
    this.registerForm.get('cashamtflag').setValue(id);
    this.modalService.open(content1).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  newprodopen(content2, id: number) {
    this.registerForm.get('cashamtflag').setValue(id);
    this.modalService.open(content2).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(event, content, id: number) {

    if (event.target.checked) {
      this.registerForm.get('cashamtflag').setValue(id);
      this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    if (id == 0) {
      this.registerForm.get('creditcheck').setValue(false);
      this.registerForm.get('debitcheck').setValue(false);
    }

    else if (id == 1) {

      this.registerForm.get('cashcheck').setValue(false);
      this.registerForm.get('debitcheck').setValue(false);
    }

    else if (id == 3) {
      this.registerForm.get('cashcheck').setValue(false);
      this.registerForm.get('creditcheck').setValue(false);
    }

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  viewCustOutstandingTot() {

    this.registerForm.get('customerrefid').setValue(this.customers[this.registerForm.get('custdummyid').value][0]);
    this.registerForm.get('scitizenflag').setValue(this.customers[this.registerForm.get('custdummyid').value][3]);
    this.registerForm.get('phycapflag').setValue(this.customers[this.registerForm.get('custdummyid').value][4]);
    this.registerForm.get('scitizenno').setValue(this.customers[this.registerForm.get('custdummyid').value][5]);
    this.registerForm.get('phycapno').setValue(this.customers[this.registerForm.get('custdummyid').value][6]);
    this.getcustemail();
    if (this.customers[this.registerForm.get('custdummyid').value][3] == 1 || this.customers[this.registerForm.get('custdummyid').value][4] == 1) {
      this.registerForm.get('phydiscountflag').setValue(true);
    } else {
      this.registerForm.get('phydiscountflag').setValue(false);
    }
    var frmdata = { frmint1: this.customers[this.registerForm.get('custdummyid').value][0], frmstr1: this.dateformat.transform05(Date.now()), createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewCustOutstandingTot(JSON.stringify(frmdata)).subscribe(data => { this.registerForm.get('outstandingamt').setValue(data) },
      errorCode => console.log(errorCode));
    if (this.scheme[0][6] == 2) {
      this.userService.viewCustAmt(JSON.stringify(frmdata)).subscribe(data => { this.custprevamt = data, this.calcpoints(data) },
        errorCode => console.log(errorCode));
    }

  }
  getcustemail() {

    this.userService.getcustemail(this.registerForm.get('customerrefid').value).subscribe(
      data => {


        this.registerForm.get('customername').setValue(data[0][1]),
          this.registerForm.get('email').setValue(data[0][2])
      });




  }
  addscheme() {
    if (this.scheme[0][6] == 1) {
      if (this.registerForm.get('grandtotal').value > this.scheme[0][4]) {
        var answer = confirm("Give Discount ?");
        if (answer) {
          this.setDiscPercent(this.scheme[0][7]);
          this.calcGST();
        }
      }
    } else if (this.scheme[0][6] == 2) {
      if (this.points > parseInt(this.scheme[0][8])) {
        this.notificationsComponent.addToast({ title: 'Success', msg: ' Gift Applicable  to  this  person    ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    }
  }
  calcpoints(data: any) {
    var points;
    var custprevamt;
    var amteq;
    var eqpoint;
    if (parseInt(data)) {
      custprevamt = parseInt(data);
    } else {
      custprevamt = 0;
    }
    if (parseInt(this.scheme[0][4])) {
      amteq = parseInt(this.scheme[0][4]);
    } else {
      amteq = 0;
    }
    if (parseInt(this.scheme[0][5])) {
      eqpoint = parseInt(this.scheme[0][5]);
    } else {
      eqpoint = 0;
    }
    points = (custprevamt * eqpoint) / amteq;
    this.points = points;
  }
  setDiscPercent(disc: any) {
    const control = <FormArray>this.registerForm.controls['invoice'];
    var sprod = control.value;
    for (this.i = 0; this.i < sprod.length; this.i++) {
      if (sprod[this.i].calcflag != 1) {
        sprod[this.i].unitdiscount = disc;
      }
    }
  }

  openrefill(){
    this.refill=true;
    this.clsrefill=true;
    this.opnrefill=false;
  }

  closerefill(){
    this.refill=false;
    this.clsrefill=false;
    this.opnrefill=true;
  }


  clear() {
    this.ngOnInit();
  }
}