import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { addinvoiceService } from './addPurchaseinvoice.services';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import swal from 'sweetalert2';
import { dateFormatPipe } from '../../notifications/notifications.datepipe';
//import * as $ from 'jquery';
const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,3})?$';
declare var $: any;
@Component({
  selector: 'app-addPurchaseinvoice',
  templateUrl: './addPurchaseinvoice.component.html',
  styleUrls: ['./addPurchaseinvoice.component.css'],
  providers: [addinvoiceService, NotificationsComponent]
})
export class addinvoiceComponent implements OnInit, AfterViewInit {
  $: any;
  invoiceForm: any;
  @Input() searchText;
  isDesc: boolean = false;
  column;
  id: string = '0000001';
  val: string = 'PIV';
  brandlist = [];
  branddata = [];
  returnValid: any;
  distibutor: Array<any>
  distvalues = [''];
  characters = [];
  purtax = [];
  localstore = [];
  x;
  polist = [];
  coltax: any;
  Math : string;
  roundamount: any;
  constructor(private invoiceService: addinvoiceService, private router: Router, private formBuilder: FormBuilder,
     private notificationsComponent: NotificationsComponent, private appComponent: AppComponent,  private dateformat: dateFormatPipe) {
    this.invoiceForm = this.formBuilder.group({
      productid: ['', []],
      pino: ['', []],
      pidate: [this.dateformat.transform05(Date.now()), [Validators.required]],
      vendorinvoiceno: ['',[]],
      deliverytype: ['', []],
      previouspurchaseitem: ['', []],
      refpoid: ['', []],
      vendorid: ['', []],
      dlnumber: ['', []],
      gst: ['', []],
      addreess: ['', []],
      actamount: ['', []],
      barcode: ['', []],
      totalproduct: ['', []],
      totalquantity: ['', []],
      totfreeqty: ['', []],
      subtotal: ['', []],
      totaldiscount: ['', []],
      cashdiscount: ['0.00', []],
      rounddedoff: ['', []],
      invoiceamt: ['', []],
      adjustamt: ['', []],
      prnumber: ['', []],
      margin: ['', []],
      totalgst: ['', []],
      brandcode: ['', []],
      brandname: ['', []],
      totalamt: ['', []],
      totalsgst: ['', []],
      totalcgst: ['', []],
      totaligst: ['', []],
      totalvat: ['', []],
      totalutgst: ['', []],
      taxableamount: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
      clientcdate: ['', []],
      brandDetails: this.formBuilder.array([
      ]),
    });
  }
  ngOnInit() {
    //Auto Increment        
    this.invoiceForm.get('pino').setValue(this.val + this.id);
    //Here to Set Default Values For DropDownBoxes
    this.invoiceForm.get('previouspurchaseitem').setValue("opt1");
    this.invoiceForm.get('refpoid').setValue("0");
 //   this.invoiceForm.get('vendorid').setValue("opt1");
    this.invoiceForm.get('companyrefid').setValue(AppComponent.companyID);
    this.invoiceForm.get('branchrefid').setValue(AppComponent.branchID);
    this.invoiceForm.get('locname').setValue(AppComponent.locrefID);
    this.invoiceForm.get('locname').setValue(AppComponent.locRefName1);
    this.autoIncrement(AppComponent.companyID, AppComponent.branchID, AppComponent.locrefID1, AppComponent.locRefName1);
    if (AppComponent.shopID != 0) {
      this.invoiceForm.get('locrefid').setValue(AppComponent.shopID);
      this.invoiceService.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.distibutor = data,
        err => {
          console.log('Error Occured on Get Distributor Details');
        });
      this.invoiceService.getPolist(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.polist = data,
        err => {
          console.log('Error Occured On getPolist()');
        }
      );
      /*Get Tax inclusive Or Exclusive*/
      this.invoiceService.getPurchasetax(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.purtax = data,
        error => {
          console.log('Error Occured On getPurchasetax()');
        });
      this.invoiceService.getTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => {
        this.coltax = data
        if (data[0] == 0) {
          $("#colhide").hide();
          $('.colhide').hide();
          $("#colvathide").show();
          $('.colvathide').show();
        }
        if (data[0] == 1) {
          $("#colvathide").hide();
          $('.colvathide').hide();
          $("#colhide").show();
          $('.colhide').show();
        }
      },
        err => {
          console.log('Console Error getTaxmaster()');
        }
      );
    }
    if (AppComponent.hospitalID != 0) {
      this.invoiceForm.get('locrefid').setValue(AppComponent.hospitalID);
      this.invoiceService.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => this.distibutor = data,
        err => {
          console.log('Error Occured on Get Distributor Details');
        });
      this.invoiceService.getPolist(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => this.polist = data,
        err => {
          console.log('Error Occured On getPolist()');
        }
      );
      /*Get Tax inclusive Or Exclusive*/
      this.invoiceService.getPurchasetax(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => this.purtax = data,
        error => {
          console.log('Error Occured On getPurchasetax()');
        });
      this.invoiceService.getTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => {
        this.coltax = data
        if (data[0] == 0) {
          $("#colhide").hide();
          $('.colhide').hide();
          $("#colvathide").show();
          $('.colvathide').show();
        }
        if (data[0] == 1) {
          $("#colvathide").hide();
          $('.colvathide').hide();
          $("#colhide").show();
          $('.colhide').show();
        }
      },
        err => {
          console.log('Console Error getTaxmaster()');
        }
      );
    }
    if (AppComponent.warehouseID != 0) {
      this.invoiceForm.get('locrefid').setValue(AppComponent.warehouseID);
      this.invoiceService.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => this.distibutor = data,
        err => {
          console.log('Error Occured on Get Distributor Details');
        });
      this.invoiceService.getPolist(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => this.polist = data,
        err => {
          console.log('Error Occured On getPolist()');
        }
      );
      /*Get Tax inclusive Or Exclusive*/
      this.invoiceService.getPurchasetax(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => this.purtax = data,
        error => {
          console.log('Error Occured On getPurchasetax()');
        });
      this.invoiceService.getTaxmaster(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => {
        this.coltax = data
        if (data[0] == 0) {
          $("#colhide").hide();
          $('.colhide').hide();
          $("#colvathide").show();
          $('.colvathide').show();
        }
        if (data[0] == 1) {
          $("#colvathide").hide();
          $('.colvathide').hide();
          $("#colhide").show();
          $('.colhide').show();
        }
      },
        err => {
          console.log('Console Error getTaxmaster()');
        }
      );
    }
  }
  distvalue(){
    this.invoiceService.getposistributor(this.invoiceForm.get('refpoid').value).subscribe(data => {this.invoiceForm.get('vendorid').setValue(data[0][0]),this.invoiceForm.get('dlnumber').setValue(data[0][2]),this.invoiceForm.get('gst').setValue(data[0][3]),this.invoiceForm.get('addreess').setValue(data[0][4])},
      err => {
        console.log('Error Occured on Get Distributor Details');
      });
  }
  /* auto ictrement function */
  autoIncrement(cid: any, bid: any, lrefid: any, lname: any) {
    this.invoiceService.autoIcrement(cid, bid, lrefid, lname).subscribe(data => {
      this.invoiceForm.get('pino').setValue(data.toString())
    },
      err => {
        console.log('Error occured On autoIcrement()');
      });
  }
  /* Get Strip(S  Stripperbox ) and Box(B Quantityperstrip) Quantity */
  getSBQuantity(id: number) {
    this.invoiceService.getSBQuantity(id).subscribe(data => { this.sbQuantity = data }),
      error => {
        console.log("Error Occured on getSBQuantity");
      }
  }
  //get Dist Values 
  getDistvalues(event) {
    this.invoiceService.getDistvalues(this.invoiceForm.get('vendorid').value).subscribe(data => {
      this.distvalues = data,
        error => {
          console.log('Error Occured on getDistvalues()' + data);
        }
    });
  }
  getProduct(val: string) {
    this.invoiceService.getProductlist(val, AppComponent.companyID, AppComponent.branchID, this.invoiceForm.get('locrefid').value, AppComponent.locrefID).subscribe(data => {
      this.characters = [];
      for (let i = 0; i < data.length; i++) {
        this.characters.push({ value: data[i][0], label: data[i][1] });
      }
    });
  }
  getProvalues() {
    let pid: any = this.invoiceForm.get('productid').value;
    this.invoiceService.getBrandlist(pid, AppComponent.companyID, AppComponent.branchID, this.invoiceForm.get('locrefid').value, AppComponent.locrefID1).subscribe(data => { this.getTabledata(data), this.branddata = data },
      error => {
        console.log('Error occured On getProvalues');
      });
  }
  public setvatTax: boolean = false;
  public setgstTax: boolean = false;
  getTabledata(data: any) {
    if (data !== undefined || data !== null) {
      let flag: number = 0;
      const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
      let setData = getData.value;
      for (this.i = 0; this.i < data.length; this.i++) {
        for (this.x = 0; this.x < setData.length; this.x++) {
           if (data[this.i][0] == setData[this.x].productid) {
             flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[this.i][1].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        else {
          if (this.coltax[0] == 0) {
            this.setvatTax = true;
            $("#colvathide").show();
            $('.colvathide').show();
            $("#colhide").hide();
            $('.colhide').hide();
          }
          if (this.coltax[0] == 1) {
            this.setgstTax = true;
            $("#colvathide").hide();
            $('.colvathide').hide();
            $("#colhide").show();
            $('.colhide').show();
          }
          getData.push(this.showBrandlist(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3],
            data[this.i][4],
            data[this.i][5],
            data[this.i][6],
            data[this.i][7],
            data[this.i][8],
            data[this.i][9],
            data[this.i][10],
            data[this.i][11],
            data[this.i][12]
          ));
        }
      }
      this.invoiceForm.get('brandcode').setValue("");
      this.characters = [];
      this.getSum();
    }
  }
  showBrandlist(pid: any, pname: any, form: any, dosage: any, mfrg: any, vats: any,
    gsts: any, cgsts: any, mrps: any, sgsts: any, dosageId: number, formID: number, mfgId: number) {
    return this.formBuilder.group({
      indexval: ['', []],
      productid: [pid, []],
      productname: [pname, []],
      dosage: [dosage, []],
      formulation: [form, []],
      mfg: [mfrg, []],
      boxquantity: ['0', Validators.pattern(textnumbers)],
      stripquantity: ['0', Validators.pattern(textnumbers)],
      tabletquantity: ['0', Validators.pattern(textnumbers)],
      freeboxqty: ['0', Validators.pattern(textnumbers)],
      freestripqty: ['0', Validators.pattern(textnumbers)],
      freetabletqty: ['0', Validators.pattern(textnumbers)],
      batchno: ['', []],
      expirydate: ['', Validators.required],
      packing: ['', []],
      purchaseprice: ['0', Validators.pattern(textnumbers)],
      mrp: [mrps, []],
      salesdisc: ['0', []],
      purchasedisc: ['0', Validators.pattern(textnumbers)],
      vat: [vats, Validators.pattern(textnumbers)],
      gsts: [gsts, []],
      sgst: [sgsts, Validators.pattern(textnumbers)],
      cgst: [cgsts, Validators.pattern(textnumbers)],
      igst: ['0', []],
      utgst: ['0', []],
      amount: ['', []],
      dosageId: [dosageId, []],
      formId: [formID, []],
      mfgId: [mfgId, []],
      vatamt: ['', []],
      gstamt: ['', []],
      sgstamt: ['', []],
      cgstamt: ['', []],
      igstamt: ['', []],
      utgstamt: ['0', []],
      totalqty: ['', []],
      totalfreeqty: ['', []],
      discamt: ['', []],
      clientcdate:[AppComponent.date,[]],
      refpoid: [this.invoiceForm.get('refpoid').value, []]
    });
  }
  /**Table calculation Start **/
  i;
  j;
  m;
  imagepath: string;
  sbQuantity = [];
  getSum() {
    /** Declare Given Table Datas**/
    let txtproduct: number = 0;
    let txttabletquantity: any = 0;
    let txtstripquantity: any = 0;
    let txtboxquantity: any = 0;
    let txtPurprice: any = 0;
    let txtsubtotal: any = 0;
    let txttabletfree: any = 0;
    let txtstripfree: any = 0;
    let txtboxfree: any = 0;
    let txtgst: any = 0;
    let txtdiscount: any = 0;
    let textmargin: any = 0;
    let txtsgst: any = 0;
    let txtcgst: any = 0;
    let txtigst: any = 0;
    let txtutgst: any = 0;
    let txtvat: any = 0;
    /** To set and calculate Given Table Datas into total values(formcontrolname) **/
    let totalproduct: any = 0;
    let totalQuantity: any = 0;
    let subTotal: any = 0;
    let totalFree: any = 0;
    let totalGst: any = 0;
    let totalDiscount: any = 0;
    let totalMargin: any = 0;
    let totalAmount: any = 0;
    let totalSgst: any = 0;
    let totalCgst: any = 0;
    let totalIgst: any = 0;
    let totalUtgst: any = 0;
    let totalVat: any = 0;
    let taxableAmt: any = 0;
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    let setData = getData.value;
    let purcTax: any = this.purtax;
    let k: number = 0;
    let Stripperbox: any;
    let Quantityperstrip: any;
    let totalgsts: any;
    let overallgst: any = 0;
    let invoicetax: any;
    let roundedamnt: any;
    let roundvalue: any;
    for (this.j = 0; this.j < setData.length; this.j++) {
      this.getSBQuantity(setData[this.j].productid);
      Stripperbox = this.sbQuantity[0][0];
      Quantityperstrip = this.sbQuantity[0][1];//dosage
      if (setData[this.j].dosage == '') {
        setData[this.j].dosage = 0;
      }
      /* To Get Total Products */
      if (parseInt(setData.length) !== null) {
        txtproduct = parseInt(setData.length);
      }
      /* Tablet Quantity */
      if (setData[this.j].tabletquantity == '' || parseFloat(setData[this.j].tabletquantity) == null) {
        setData[this.j].tabletquantity = 0;
        txttabletquantity = 0;
      }
      else {
        txttabletquantity = parseFloat(setData[this.j].tabletquantity);
      }
      /* Strip Quantity */
      if (setData[this.j].stripquantity == '' || parseFloat(setData[this.j].stripquantity) == null) {
        setData[this.j].stripquantity = 0;
        txtstripquantity = 0;
      }
      else {
        txtstripquantity = parseFloat(setData[this.j].stripquantity) * Quantityperstrip;
      }
      /* Box Quantity */
      if (setData[this.j].boxquantity == '' || parseFloat(setData[this.j].boxquantity) == null) {
        setData[this.j].boxquantity = 0;
        txtboxquantity = 0;
      }
      else {
        txtboxquantity = parseFloat(setData[this.j].boxquantity) * Stripperbox * Quantityperstrip;
      }
      /* Free Tablet Quantity*/
      if (setData[this.j].freetabletqty == '' || parseFloat(setData[this.j].freetabletqty) == null) {
        setData[this.j].freetabletqty = 0;
        txttabletfree = 0;
      }
      else {
        txttabletfree = parseFloat(setData[this.j].freetabletqty);
      }
      /* Free Strip Quantity*/
      if (setData[this.j].freestripqty == '' || parseFloat(setData[this.j].freestripqty) == null) {
        setData[this.j].freestripqty = 0;
        txtstripfree = 0;
      }
      else {
        txtstripfree = parseFloat(setData[this.j].freestripqty) * Quantityperstrip;
      }
      /* Free Box Quantity */
      if (setData[this.j].freeboxqty == '' || parseFloat(setData[this.j].freeboxqty) == null) {
        setData[this.j].freeboxqty = 0;
        txtboxfree = 0;
      }
      else {
        txtboxfree = parseFloat(setData[this.j].freeboxqty) * Stripperbox * Quantityperstrip;
      }
      /* GST Calculation  */
      if (setData[this.j].sgst == '' || setData[this.j].sgst == null) {
        txtsgst = 0;
        setData[this.j].sgst = 0;
      }
      else {
        txtsgst = parseFloat(setData[this.j].sgst);
      }
      if (setData[this.j].cgst == '' || setData[this.j].cgst == null) {
        setData[this.j].cgst = 0;
        txtcgst = 0;
      }
      else {
        txtcgst = parseFloat(setData[this.j].cgst);
      }
      if (setData[this.j].igst == '' || setData[this.j].igst == null) {
        setData[this.j].igst = 0;
        txtigst = 0;
      }
      else {
        txtigst = parseFloat(setData[this.j].igst);
      }
      if (setData[this.j].utgst == '' || setData[this.j].utgst == null) {
        setData[this.j].utgst = 0;
        txtutgst = 0.00;
      }
      else {
        txtutgst = parseFloat(setData[this.j].utgst);
      }
      if (setData[this.j].gsts != '' || setData[this.j].gsts != null) {
        txtgst = (parseFloat(setData[this.j].sgst) + parseFloat(setData[this.j].cgst)).toFixed(2);
      }
      else {
        txtgst = 0;
        setData[this.j].gsts = 0;
      }
      /* VAT Calculation */
      if (setData[this.j].vat == '' || setData[this.j].vat == null) {
        setData[this.j].vat = 0;
        txtvat = 0;
      }
      else {
        txtvat = parseFloat(setData[this.j].vat);
      }
      /*Discount Calculation*/
      if (setData[this.j].purchasedisc == '' || setData[this.j].purchasedisc == null) {
        txtdiscount = 0;
        setData[this.j].purchasedisc = 0;
      }
      else {
        txtdiscount = (setData[this.j].amount * setData[this.j].purchasedisc) / 100;
      }
      /*Sales Discount */
      if (setData[this.j].salesdisc == '' || setData[this.j].salesdisc == null) {
        setData[this.j].salesdisc = 0;
      }
      /* Purchase Price */
      if (setData[this.j].purchaseprice <= setData[this.j].mrp) {
        txtPurprice = setData[this.j].purchaseprice;
      }
      else {
        //$('.focuss').focus();
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'PurchasePrice Higher than SRP....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
      /* Batch Number */
      if (setData[this.j].batchno == '') {
        //$('.batchfocus').focus();
        setData[this.j].batchno = 0;
        this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Batch Number Required....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
      else {
      }
      if (txttabletquantity <= 0) {
        //$('.tabqfocus').focus();
        this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Please Enter valid Quantity....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
      /* Row Wise SubTotal Amount */
      setData[this.j].amount =(txttabletquantity + txtstripquantity + txtboxquantity) * txtPurprice;
      setData[this.j].gsts = txtgst;
      setData[this.j].vatamt = (txtvat * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      setData[this.j].gstamt = (txtgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      setData[this.j].sgstamt = (txtsgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      setData[this.j].cgstamt = (txtcgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      setData[this.j].igstamt = (txtigst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      setData[this.j].utgstamt = (txtutgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      setData[this.j].totalqty = txttabletquantity + txtstripquantity + txtboxquantity;
      setData[this.j].totalfreeqty = txttabletfree + txtstripfree + txtboxfree;
     setData[this.j].discamt = txtdiscount;
     
     totalgsts = setData[this.j].gstamt + setData[this.j].sgstamt + setData[this.j].cgstamt;
     textmargin = setData[this.j].mrp - (txtPurprice - txtdiscount);
     if(this.coltax[0] == 0){
      setData[this.j].vatamt = setData[this.j].vatamt;
      totalgsts = 0;
    // setData[this.j].amount  += parseFloat(setData[this.j].vatamt);
     }else if(this.coltax[0] == 1){
      totalgsts = totalgsts;
      setData[this.j].vatamt = 0;
     }
     setData[this.j].amount  +=parseFloat(setData[this.j].vatamt) + parseFloat(totalgsts);
      //setData[this.j].amount -= parseFloat(setData[this.j].discamt);
      /* To Patch values Row wise */
      getData.patchValue(setData);
      /* Toatl Calculation*/
      totalproduct = txtproduct;
      totalQuantity += txttabletquantity + txtstripquantity + txtboxquantity;
      totalFree += txttabletfree + txtstripfree + txtboxfree;
      totalDiscount += txtdiscount;
     
      // totalCgst += (txtcgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      // totalSgst += (txtsgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      // totalGst += (txtgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
       if(this.coltax[0] == 1){
    
       overallgst += totalgsts
       totalVat = 0; 
    
     }else if(this.coltax[0] == 0){
       totalVat += setData[this.j].vatamt
       overallgst = 0
     }
    invoicetax = parseFloat(overallgst) + parseFloat(totalVat);
   
      totalIgst += (txtigst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      totalUtgst += (txtutgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      subTotal += setData[this.j].amount;
      totalMargin += textmargin;
      if (purcTax == '0') {
        taxableAmt = ((txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) - txtdiscount * 100) / 100 + totalGst;
        totalAmount = subTotal - totalDiscount;
      }
      else {
        taxableAmt = (txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) - txtdiscount;
        totalAmount = (subTotal - totalDiscount) + totalGst;
      }
    // alert(totalAmount);
      totalAmount -= this.invoiceForm.get('cashdiscount').value;
     // alert("a1"+totalAmount)
      roundedamnt = (Math.round(totalAmount * 10) / 10 );
     // alert("a2"+roundedamnt);
   roundvalue = roundedamnt.toFixed() - totalAmount.toFixed(2)
      /* To Set value from Table calculation Final Values on Input types*/
      this.invoiceForm.get('totalproduct').setValue(totalproduct);
      this.invoiceForm.get('totalquantity').setValue(totalQuantity);
      this.invoiceForm.get('totfreeqty').setValue(totalFree);
      this.invoiceForm.get('subtotal').setValue(subTotal.toFixed(2));
      this.invoiceForm.get('totalgst').setValue(invoicetax.toFixed(2));
      this.invoiceForm.get('totalsgst').setValue(totalSgst);
      this.invoiceForm.get('totalcgst').setValue(totalCgst);
      this.invoiceForm.get('totaligst').setValue(totalIgst);
      this.invoiceForm.get('totalvat').setValue(totalVat.toFixed(2));
      this.invoiceForm.get('totaldiscount').setValue(totalDiscount.toFixed(2));
      this.invoiceForm.get('margin').setValue(totalMargin.toFixed(2));
      this.invoiceForm.get('totalamt').setValue(roundedamnt.toFixed(2));
      this.invoiceForm.get('taxableamount').setValue(taxableAmt.toFixed(2));
      //To set Temporary Values In Bottom Input types
      this.invoiceForm.get('totalutgst').setValue(totalUtgst);
     // this.invoiceForm.get('cashdiscount').setValue("0.00");
     this.invoiceForm.get('rounddedoff').setValue(roundvalue.toFixed(2));
      this.invoiceForm.get('prnumber').setValue("0.00");
      this.invoiceForm.get('invoiceamt').setValue("0.00");
      this.invoiceForm.get('adjustamt').setValue("0.00");
    }
 
  }
  /* Table calculation End*/
  onSubmit(): any {
    this.returnValid = this.invoiceDatavalidation();
    if (this.returnValid == true) {
      this.appComponent.ngOnInit();
      this.invoiceForm.get('clientcdate').setValue(AppComponent.date);
       if(this.invoiceForm.get('refpoid').value == null){
         this.invoiceForm.get('refpoid').setValue('');
      }
      this.invoiceService.getPurcmaintanance(JSON.stringify(this.invoiceForm.value)).subscribe(
        (result: any) => {
          let res = result.res;
          if (res == true) {
            setTimeout(() => {
              const saveData = this.invoiceForm.controls['brandDetails'];
              this.invoiceService.getPurcinvoice(JSON.stringify(saveData.value));
              this.openSuccessSwal();
              this.router.navigate(['PurchaseInvoice/ViewPurchaseInvoice']);
            }, 100);
            this.ngOnInit();
          }
        }, (error: any) => {
          console.log(error['Errors getPurcmaintanance()']);
        }
      );
    }
    else {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Purchase Data is Invalid....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
 
  }
  invoiceDatavalidation(): Boolean {
    const getData = this.invoiceForm.controls['brandDetails'];
    let setData = getData.value;
    if (setData.length == '' || setData.length == null || setData.length == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Your Table Data is Empty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.invoiceForm.get('vendorid').value == 'opt1') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Required Distributor Name.....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    else {
    }
    return true;
  }
  removeRow(index: number) {
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    getData.removeAt(index);
    this.getSum();
    let removeVal = getData.value;
    if (removeVal == null || removeVal == '') {
      this.invoiceForm.reset();
      this.ngOnInit();
    }
  }
  ngAfterViewInit() {
    $(document).ready(function () {
      var minlength = 2;
      var searchRequest = null;
      $("#brand").on("input", function () {
        var that = this,
          value = $(this).val();
        if (value.length >= minlength) {
          if (searchRequest != null)
            searchRequest.abort();
          searchRequest = $.ajax({
            type: "GET",
            url: '/api/getPibrandlist' + '/' + value,
            dataType: "json",
            success: function (data) {
              $("#brandlist").empty();
              for (var i = 0; i < data.length; i++) {
                $("#brandlist").append("<option value='" + data[i] + "'></option>");
              }
            },
            error: function (data) {
              $("#brandlist").val('');
              console.log("No Data Available");
            }
          });
        }
      });
    });
    //remove Row
    $(document).ready(function () {
      $(".removebutton").click(function () {
        $("table tbody").find('input[name="check"]').each(function () {
          if ($(this).is(":checked")) {
            if (confirm("Are you sure you want to delete..")) {
              $(this).closest("tr").remove();
            }
          }
        });
      });
    });
    //Search outer
    var elem = $('#searchorder')[0];
    $(document).on('click', function (e) {
      if ($(e.target).closest(elem).length === 0) {
        $(elem).hide();
      }
    });
    $(document).ready(function () {
      var inv = [];
      setInterval(function search() {
        var hos = $("#searchproduct").val();
        if (hos == 0 || hos == null) {
          $("#searchorder").hide();
        } else {
          $("#searchorder").show();
        }
        if (hos != 0 && hos != null) {
          $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/api/getTest",
            data: {
              'val': hos
            },
            success: function (data) {
              inv.push(data);
              $('#searchorder .form75').each(function () {
                $(this).val("");
              });
              var i = 0;
              $('#searchorder .form75').each(function () {
                $(this).val(data[i]);
                i++;
              });
            },
            error: function (e) {
              $('#searchorder .form75').each(function () {
                $(this).val("");
              });
            }
          });
        }
      }, 570);
    });
    //Panel Show and Hide 
    $(document).ready(function () {
      $("#flip").click(function () {
        $("#panel").slideToggle("slow");
      });
    });
    //Check Box in Table
    $(document).ready(function () {
      $('.checkAll').on('click', function () {
        $(this).closest('table').find('tbody :checkbox')
          .prop('checked', this.checked)
          .closest('tr').toggleClass('selected', this.checked);
      });
      $('tbody :checkbox').on('click', function () {
        $(this).closest('tr').toggleClass('selected', this.checked);
        $(this).closest('table').find('.checkAll').prop('checked',
          ($(this).closest('table').find('tbody :checkbox:checked').length == $(this).closest('table').find('tbody :checkbox').length));
      });
    });
  }
  //Search Box
  insertDrug(articleId: number) {
    var n = 56;
    var rt = $("#searchorder li:nth-child(" + articleId + ") .form75").val();
    $("#searchproduct").val(rt);
    $("#searchproduct").focus();
    $("#searchorder").hide();
  }
  upDown(event: KeyboardEvent, articleId: number) {
    var nr: number;
    var n = 74;
    if (event.keyCode == 13) {
      $(".dropdown-menu").hide();
      var rt = $("#searchorder li:nth-child(" + articleId + ") .form75").val();
      $("#searchproduct").val(rt);
      $("#searchproduct").focus();
      $("#searchorder").hide();
    }
    if (event.keyCode == 9) {
      if (articleId == 0) {
        $("#searchorder li:nth-child(" + articleId + ") input").focus();
      }
    }
    if (event.keyCode == 38) {
      var nr = articleId - 1;
      if (nr == 0) {
        $("#searchproduct").focus();
      } else {
        $("#searchorder li:nth-child(" + nr + ") input").focus();
      }
    }
    if (event.keyCode == 40) {
      var nr = articleId + 1;
      $("#searchorder li:nth-child(" + nr + ") input").focus();
    }
  }
  /**TO CONVERT PURCHASE ORDER TO PURCHASE INCOICE START**/
  getPOrder(event): any {
    let pid = event.target.value;
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    getData.controls = [];
    this.invoiceService.getPotablelist(pid).subscribe(data => { this.getPodata(data) },
      error => {
        console.log('Error occured On getPotablelist()');
      });
  }
  getPodata(data: any) {
  //  alert(JSON.stringify(data));
    if (data !== undefined || data !== null) {
      let flag: number = 0;
      const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
      let setData = getData.value;
      for (this.i = 0; this.i < data.length; this.i++) {
        for (this.x = 0; this.x < setData.length; this.x++) {
          if (data[this.i][0] == setData[this.x].productid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[this.i][1].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        else {
          if (this.coltax[0] == 0) {
            this.setvatTax = true;
            $("#colvathide").show();
            $('.colvathide').show();
            $("#colhide").hide();
            $('.colhide').hide();
          }
          if (this.coltax[0] == 1) {
            this.setgstTax = true;
            $("#colvathide").hide();
            $('.colvathide').hide();
            $("#colhide").show();
            $('.colhide').show();
          }
          getData.push(this.showPOdata(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3],
            data[this.i][4],
            data[this.i][5],
            data[this.i][6],
            data[this.i][7],
            data[this.i][8],
            data[this.i][9],
            data[this.i][10],
            data[this.i][11],
            data[this.i][12],
            data[this.i][13],
            data[this.i][14],
            data[this.i][15],
            data[this.i][16],
            data[this.i][17],
            data[this.i][18]
          ));
        }
      }
      this.invoiceForm.get('brandcode').setValue("");
      this.invoiceForm.get('productid').setValue("");
      this.getSum();
    }
  }
  showPOdata(pid: any, barandname: any, fname: any, dosname: any, pcomp: any, mrp: any, formid: any,
    mfgid: any, bqty: any, sqty: any, tabqty: any, uprice: any, disc: any, vat: any, gst: any, sgst: any, cgst: any, igst: any, utgst: any): any {
    return this.formBuilder.group({
      indexval: ['', []],
      productid: [pid, []],
      productname: [barandname, []],
      dosage: [dosname, []],
      formulation: [fname, []],
      mfg: [pcomp, []],
      boxquantity: [bqty, [Validators.pattern(textnumbers)]],
      stripquantity: [sqty, [Validators.pattern(textnumbers)]],
      tabletquantity: [tabqty, [Validators.pattern(textnumbers)]],
      freeboxqty: ['0', [Validators.pattern(textnumbers)]],
      freestripqty: ['0', [Validators.pattern(textnumbers)]],
      freetabletqty: ['0', [Validators.pattern(textnumbers)]],
      batchno: ['', []],
      expirydate: ['', Validators.required],
      packing: ['', []],
      purchaseprice: [uprice.toFixed(2), [Validators.pattern(textnumbers)]],
      mrp: [mrp, []],
      salesdisc: ['0', []],
      purchasedisc: [disc, [Validators.pattern(textnumbers)]],
      vat: [vat, [Validators.pattern(textnumbers)]],
      gsts: [gst, []],
      sgst: [sgst, [Validators.pattern(textnumbers)]],
      cgst: [cgst, [Validators.pattern(textnumbers)]],
      igst: [igst, []],
      utgst: [utgst, []],
      amount: ['0', []],
      dosageId: ['0', []],
      formId: [formid, []],
      mfgId: [mfgid, []],
      vatamt: ['', []],
      gstamt: ['', []],
      sgstamt: ['', []],
      cgstamt: ['', []],
      igstamt: ['', []],
      utgstamt: ['0', []],
      totalqty: ['', []],
      totalfreeqty: ['', []],
      discamt: ['', []],
      clientcdate:[AppComponent.date,[]],
      refpoid: [this.invoiceForm.get('refpoid').value, []]
    });
  }
  openSuccessSwal() {
    swal({
      title: 'Good job!',
      text: "Data Saved Sucessfully",
      type: 'success'
    }).catch(swal.noop);
  }
}
