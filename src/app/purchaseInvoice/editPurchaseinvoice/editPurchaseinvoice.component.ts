import { Component, OnInit, Input, Output, AfterViewInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { editinvoiceService } from './editPurchaseinvoice.services';
import { providers } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { DxDataGridComponent } from "devextreme-angular";
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { event } from 'd3';
const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,3})?$';
@Component({
  selector: 'app-editPurchaseinvoice',
  templateUrl: './editPurchaseinvoice.component.html',
  styleUrls: ['./editPurchaseinvoice.component.css'],
  providers: [editinvoiceService, NotificationsComponent]
})

export class editinvoiceComponent implements OnInit, AfterViewInit {
  
  pattern: any = '^[0-9]+(\.[0-9]{1,3})?$';
  sid: any;
  editdata = [];
 // dataSource = [];
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
  purtax = [];
  localstore = [];
  coltax: any;
  polist=[];
  //refpoid=[];
  constructor(private invoiceService: editinvoiceService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router,
    private notificationsComponent: NotificationsComponent, private appComponent: AppComponent) {
    this.invoiceForm = this.formBuilder.group({
      productid: ['', []],
      piids: ['', []],
      pino: ['', []],
      pidate: ['', [Validators.required]],
      vendorinvoiceno: ['', []],
      deliverytype: ['', []],
      previouspurchaseitem: ['', []],
     
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
      cashdiscount: ['', []],
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
      refpoid: ['', []],
      brandDetails: this.formBuilder.array([
      ]),
    });
  }
  // <dxi-column dataField="action" caption="Add Free" [width]="90"> </dxi-column>
  ngOnInit() {
    this.sid = this.route.snapshot.paramMap.get('id');

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

    this.invoiceService.getEditpurchase(this.sid).subscribe(data => {
      this.setViewdata(data)
      if (data != null || data != '') {
     //   alert(this.sid);
        this.invoiceService.getEditmaintance(this.sid).subscribe(data => {
          this.getEditmaintance(data),
            //To Get Distributor Details   
            this.invoiceService.getDistributor(this.invoiceForm.get('companyrefid').value, this.invoiceForm.get('branchrefid').value, this.invoiceForm.get('locrefid').value, this.invoiceForm.get('locname').value).subscribe(data => { this.distibutor = data },
              err => {
                console.log('Error Occured on Get Distributor Details');
              });
          /*Get Tax inclusive Or Exclusive*/
          this.invoiceService.getPurchasetax(this.invoiceForm.get('companyrefid').value, this.invoiceForm.get('branchrefid').value, this.invoiceForm.get('locrefid').value, this.invoiceForm.get('locname').value).subscribe(data => this.purtax = data,
            error => {
              console.log('Error Occured On getPurchasetax()');
            });
         //  this.invoiceService.getPoedit(this.sid).subscribe(data => {this.polist = data});
              // this.invoiceService.getPolist(this.invoiceForm.get('companyrefid').value, this.invoiceForm.get('branchrefid').value, this.invoiceForm.get('locrefid').value, this.invoiceForm.get('locname').value).subscribe(data => this.polist = data,
              //    err => {
              //     console.log('Error Occured On getPolist()');
              //   }
              // );
        },
          error => {
            console.log('Error Occured on getEditmaintance');
          });
      }
    },
      error => {
        console.log('Error Occured on getEditpurchase');
      });
     

    //Auto Increment        
   // this.invoiceForm.get('pino').setValue(this.val + this.id);
    //Here to Set Default Values For DropDownBoxes
    this.invoiceForm.get('previouspurchaseitem').setValue("opt1");
    this.invoiceService.getPoedit(this.sid).subscribe(data => {this.polist = data,this.invoiceForm.get('refpoid').setValue(data[0][0])});
   // this.invoiceForm.get('refpoid').setValue("opt1");

   

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
    let vals = event.target.value;
    let sk: number = 0;
    if (vals != '') {

    }
    this.invoiceService.getDistvalues(this.invoiceForm.get('vendorid').value).subscribe(data => {
      this.distvalues = data
      if (sk == 0) {
        this.openMyModal('effect-13', null);
      }
      error => {
        console.log('Error Occured on getDistvalues()' + data);
      }
    });
  }
  characters = [];
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
    this.invoiceService.getBrandlist(pid, AppComponent.companyID, AppComponent.branchID,AppComponent.locrefID1, AppComponent.locRefName1).subscribe(data => { this.getTabledata(data), this.branddata = data},
      error => {
        console.log('Error occured On getProvalues');
      });
  }
  x;
  public setvatTax: boolean = false;
  public setgstTax: boolean = false;
  getTabledata(data: any) {

    if (data !== undefined || data !== null) {
    let flag: number = 0;
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    let setData = getData.value;
    if (data !== undefined || data !== null) {
      for (this.i = 0; this.i < data.length; this.i++) {
        for (this.x = 0; this.x < setData.length; this.x++) {
          if (data[this.i][0] == setData[this.x].productid) {
            flag = 1;
          }
        }
        if (flag == 1) 
        {
          
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
        this.inc += 1;
      }
      this.invoiceForm.get('brandcode').setValue("");
      this.characters = [];
      this.getSum();
    }
  }
  }
  showBrandlist(pid: any, pname: any, form: any, dosage: any, mfrg: any, vats: any,
    gsts: any, cgsts: any, mrps: any, sgsts: any, dosageId: number, formID: number, mfgId: number) {
    return this.formBuilder.group({
      ID: this.inc,
      id: this.inc + 1,
      productid: pid,
      productname: pname,
      dosage: dosage,
      formulation: form,
      mfg: mfrg,
      vat: vats,
      gsts: gsts,
      sgst: sgsts,
      cgst: cgsts,
      mrp: mrps,
      dosageId: dosageId,
      formId: formID,
      mfgId: mfgId,
      piproductids: '',
      pirefids: this.sid,
      boxquantity: 0,
      stripquantity: 0,
      tabletquantity: 0,
      freeboxqty: 0,
      freestripqty: 0,
      freetabletqty: 0,
      batchno: '',
      expirydate: ['', Validators.required],
      purchaseprice: '',
      salesdisc: '',
      purchasedisc: '',
      igst: '',
      amount: '',
      vatamt: '',
      gstamt: '',
      sgstamt: '',
      cgstamt: '',
      igstamt: '',
      totalqty: '',
      totalfreeqty: '',
      discamt: '',
      utgst: '0',
      utgstamt: '',
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
      setData[this.j].amount = (txttabletquantity + txtstripquantity + txtboxquantity) * txtPurprice;
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
  
      textmargin = setData[this.j].mrp - (txtPurprice - txtdiscount);
     setData[this.j].amount  += parseFloat(setData[this.j].vatamt);
      //setData[this.j].amount -= parseFloat(setData[this.j].discamt);
      /* To Patch values Row wise */
      getData.patchValue(setData);
      /* Toatl Calculation*/
      totalproduct = txtproduct;
      totalQuantity += txttabletquantity + txtstripquantity + txtboxquantity;
      totalFree += txttabletfree + txtstripfree + txtboxfree;
      totalDiscount += txtdiscount;
      totalCgst += (txtcgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      totalSgst += (txtsgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      totalGst += (txtgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      totalIgst += (txtigst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
      totalUtgst += (txtutgst * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;

      totalVat += (txtvat * txtPurprice * (txttabletquantity + txtstripquantity + txtboxquantity)) / 100;
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
      /* To Set value from Table calculation Final Values on Input types*/
      this.invoiceForm.get('totalproduct').setValue(totalproduct);
      this.invoiceForm.get('totalquantity').setValue(totalQuantity);
      this.invoiceForm.get('totfreeqty').setValue(totalFree);
      this.invoiceForm.get('subtotal').setValue(subTotal.toFixed(2));
      this.invoiceForm.get('totalgst').setValue(totalGst.toFixed(2));
      this.invoiceForm.get('totalsgst').setValue(totalSgst);
      this.invoiceForm.get('totalcgst').setValue(totalCgst);
      this.invoiceForm.get('totaligst').setValue(totalIgst);
      this.invoiceForm.get('totalvat').setValue(totalVat.toFixed(2));
      this.invoiceForm.get('totaldiscount').setValue(totalDiscount.toFixed(2));
      this.invoiceForm.get('margin').setValue(totalMargin.toFixed(2));
      this.invoiceForm.get('totalamt').setValue(totalAmount.toFixed(2));
      this.invoiceForm.get('taxableamount').setValue(taxableAmt.toFixed(2));
      //To set Temporary Values In Bottom Input types
      this.invoiceForm.get('totalutgst').setValue(totalUtgst);
      this.invoiceForm.get('cashdiscount').setValue("0.00");
      this.invoiceForm.get('rounddedoff').setValue("0.00");
      this.invoiceForm.get('prnumber').setValue("0.00");
      this.invoiceForm.get('invoiceamt').setValue("0.00");
      this.invoiceForm.get('adjustamt').setValue("0.00");
    }
  }
  /* Table calculation End*/
  // keyup while typing show data...keyup.enter  while entering show data..keydown.Tab while tab 

  private valid: boolean;
  onSubmit() {
    this.returnValid = this.invoiceDatavalidation();
    if (this.returnValid == true) {
      this.appComponent.ngOnInit();
      alert(this.invoiceForm.get('refpoid').value)
      this.invoiceForm.get('clientcdate').setValue(AppComponent.date);
      this.invoiceService.getPurcmaintanance(JSON.stringify(this.invoiceForm.value)).subscribe(
        (result: any) => {
          let res = result.res;
          if (res == true) {
            setTimeout(() => {
              const saveData = this.invoiceForm.controls['brandDetails'];
              this.invoiceService.getPurcinvoice(JSON.stringify(saveData.value)).subscribe(
                () => { console.log("Error On getPurcinvoice()") }
              );
              this.router.navigate(['/PurchaseInvoice/ViewPurchaseInvoice']);
            }, 100);
          }
          else {
          }
        }, (error: any) => {
          console.log(error['Errors']);
        }
      );
    }
  }


  invoiceDatavalidation(): Boolean {
    let setData = this.invoiceForm.controls['brandDetails'];
    if (setData.length == '' || setData.length == null || setData.length == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Your Table Data is Empty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.invoiceForm.get('vendorid').value == 'opt1') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Required Distributor Name.....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }


  removeRow(index: number) {
    //this.dataGrid.instance.deleteRow(index);
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    getData.removeAt(index);
    this.getSum();
    let removeVal = getData.value;
    if (removeVal == null || removeVal == '') {
      getData.reset();
   
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


  /* To GET VIEW DATA(DevExtreme) */
  inc = 0;
  setViewdata(data) {
    let i;
    const getData = <FormArray>this.invoiceForm.controls['brandDetails'];
    let setData = getData.value; 
    if (data !== undefined || data !== null) {
      for (i = 0; i < data.length; i++) {
        for (this.j = 0; this.j < setData.length; this.j++) {
          // alert(setData.length);
          // if (data[this.i][0] == setData[this.j].itemcode) {
          //   flag = 1;
          // }
        }
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
     


        getData.push(this.returnViewpurcdata(
          data[i][0],
          data[i][1],
          data[i][2],
          data[i][3],
          data[i][4],
          data[i][5],
          data[i][6],
          data[i][7],
          data[i][8],
          data[i][9],
          data[i][10],
          data[i][11],
          data[i][12],
          data[i][13],
          data[i][14],
          data[i][15],
          data[i][16],
          data[i][17],
          data[i][18],
          data[i][19],
          data[i][20],
          data[i][21],
          data[i][22],
          data[i][23],
          data[i][24],
          data[i][25],
          data[i][26],
          data[i][27],
          data[i][28],
          data[i][29],
          data[i][30],
          data[i][31],
          data[i][32],
          data[i][33],
          data[i][34],
          data[i][35]
        ));
        this.inc += 1;
      }
    }
    else {
      console.log("Error In Push Data setViewdata()");
    }
  }
  returnViewpurcdata(pipid: any, piref: any, productid: any, brandname: any, fname: any, dosname: any, mfgname: any, boxqty: any, stripqty: any, tabqty: any, totqty: any, pdis: any, disamt: any, vat: any, vatamt: any,
    gst: any, gstamt: any, sgst: any, sgstamt: any, cgst: any, cgstamt: any, igst: any, igstamt: any, totamt: any, mfg: any, batchno: any, dosage: any,
    pprice: any, sdisc: any, form: any, fboxqty: any, fstripqty: any, ftabqty: any, ftotqty: any, mrp: any, expirydate: any) {
    return this.formBuilder.group({
      ID: this.inc,
      id: this.inc + 1,
      piproductids: pipid,
      pirefids: piref,
      productid: productid,
      productname: brandname,
      dosage: dosname,
      formulation: fname,
      mfg: mfgname,
      boxquantity: boxqty,
      stripquantity: stripqty,
      tabletquantity: tabqty,
      freeboxqty: fboxqty,
      freestripqty: fstripqty,
      freetabletqty: ftabqty,
      batchno: batchno,
      expirydate: expirydate,
      purchaseprice: pprice,
      mrp: mrp,
      salesdisc: sdisc,
      purchasedisc: pdis,
      vat: vat,
      gsts: gst,
      sgst: sgst,
      cgst: cgst,
      igst: igst,
      amount: totamt,
      dosageId: dosage,
      formId: form,
      mfgId: mfg,
      vatamt: vatamt,
      gstamt: gstamt,
      sgstamt: sgstamt,
      cgstamt: cgstamt,
      igstamt: igstamt,
      totalqty: totqty,
      totalfreeqty: ftotqty,
      discamt: disamt,
      utgst: 0,
      utgstamt: 0,
      clientcdate:[AppComponent.date,[]],
      refpoid: [this.invoiceForm.get('refpoid').value, []]
    });
  }
  getEditmaintance(data: any) {
    let k;
  //  alert(data);
    if (data !== undefined || data !== null) {
      for (k = 0; k < data.length; k++) {
     //   alert( data.length);
        this.invoiceForm.patchValue(this.fetchEidtdata(
          data[k][0],
          data[k][1],
          data[k][2],
          data[k][3],
          data[k][4],
          data[k][5],
          data[k][6],
          data[k][7],
          data[k][8],
          data[k][9],
          data[k][10],
          data[k][11],
          data[k][12],
          data[k][13],
          data[k][14],
          data[k][15],
          data[k][16],
          data[k][17],
          data[k][18],
          data[k][19],
          data[k][20],
          data[k][21],
          data[k][22],
          data[k][23],
          data[k][24],
          data[k][25],
          data[k][26],
          data[k][27],
          data[k][28],
          data[k][29]
        
        ));
      }
    }
  }
  fetchEidtdata(piid: any, pino: any, pidates: any, vendorid: any, invoiceno: any, delivery: any, dlno: any, gstno: any, address: any, itemamt: any, totproduct: any,
    totdis: any, round: any, cdisc: any, taxamt: any, tottaxamt: any, totmargin: any, totfreeqty: any, vatamt: any, gstamt: any,
    cgstamt: any, sgstamt: any, igstamt: any, utgstamt: any, totqty: any, ci: any, bi: any, lname: any, lrefid: any,refpoid: any) {
    return {
      piids: piid,
      pino: pino,
      pidate: pidates,
      vendorid: vendorid,
      vendorinvoiceno: invoiceno,
      deliverytype: delivery,
      dlnumber: dlno,
      gst: gstno,
      addreess: address,
      totalproduct: totproduct,
      totalquantity: totqty,
      totfreeqty: totfreeqty,
      subtotal: itemamt.toFixed(2),
      totaldiscount: totdis.toFixed(2),
      cashdiscount: '0.00',
      rounddedoff: '0.00',
      invoiceamt: '0.00',
      adjustamt: '0.00',
      prnumber: '0.00',
      margin: totmargin.toFixed(2),
      totalgst: gstamt.toFixed(2),
      totalamt: tottaxamt.toFixed(2),
      totalsgst: sgstamt,
      totalcgst: cgstamt,
      totaligst: igstamt,
      totalvat: vatamt,
      totalutgst: utgstamt,
      taxableamount: taxamt.toFixed(2),
      companyrefid: ci,
      branchrefid: bi,
      locname: lname,
      locrefid: lrefid
    };

  }
  openMyModal(event, id: number) {
    document.querySelector("#" + event).classList.add('md-show');

  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }
}

