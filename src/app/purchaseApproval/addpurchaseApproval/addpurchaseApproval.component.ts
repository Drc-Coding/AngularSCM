import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { addpurchaseApprovalService } from './addpurchaseApproval.services';
import { providers } from 'ng2-toasty';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NotificationsComponent } from '../../notifications/notifications.component';
const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,3})?$';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
@Component({
  selector: 'app-addpurchaseApproval',
  templateUrl: './addpurchaseApproval.component.html',
  styleUrls: ['./addpurchaseApproval.component.css'],
  providers: [addpurchaseApprovalService, NotificationsComponent]
})
export class addpurchaseApprovalComponent implements OnInit, AfterViewInit {
  purchaseApproval: any;
  invoicenumber = [];
  i;
  j;
  constructor(private approvalService: addpurchaseApprovalService, private router: Router, private formBuilder: FormBuilder, 
    private notificationsComponent: NotificationsComponent, private appComponent: AppComponent, private dateformat: dateFormatPipe
    ) {
    this.purchaseApproval = this.formBuilder.group({
      approvalno: ['', []],
      invoicenumber: ['', []],
      approvaldate: [this.dateformat.transform05(Date.now()), []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      shoprefid: ['', []],
      hospitalrefid: ['', []],
      warehouserefid: ['', []],
      locrefid: ['', []],
      locname: ['', []],
      purcApproval: this.formBuilder.array([]),
    });
  }
  ngOnInit() {
    this.purchaseApproval.get('invoicenumber').setValue("opt1");
    this.purchaseApproval.get('companyrefid').setValue(AppComponent.companyID);
    this.purchaseApproval.get('branchrefid').setValue(AppComponent.branchID);
    this.purchaseApproval.get('shoprefid').setValue(AppComponent.shopID);
    this.purchaseApproval.get('hospitalrefid').setValue(AppComponent.hospitalID);
    this.purchaseApproval.get('warehouserefid').setValue(AppComponent.warehouseID);
    this.purchaseApproval.get('locname').setValue(AppComponent.locrefID);

    if (AppComponent.shopID != 0) {
      this.purchaseApproval.get('locrefid').setValue(AppComponent.shopID);
      this.approvalService.getApprovalinvoices(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => this.invoicenumber = data,
        error => {
          console.log("Error Occured On getApprovalinvoices()");
        }
      );
    } if (AppComponent.warehouseID != 0) {
      this.purchaseApproval.get('locrefid').setValue(AppComponent.warehouseID);
      this.approvalService.getApprovalinvoices(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => this.invoicenumber = data,
        error => {
          console.log("Error Occured On getApprovalinvoices()");
        }
      );
    } if (AppComponent.hospitalID != 0) {
      this.purchaseApproval.get('locrefid').setValue(AppComponent.hospitalID);
      this.approvalService.getApprovalinvoices(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => this.invoicenumber = data,
        error => {
          console.log("Error Occured On getApprovalinvoices()");
        }
      );
    }


  }

  getPurcAppdata(event): any {
    let id = event.target.value;
    const setApproval = <FormArray>this.purchaseApproval.controls['purcApproval'];
    setApproval.controls = [];
    this.approvalService.getPurcApprovaldata(id).subscribe(data => {
      this.getPurcApprovaldata(data),
        err => {
          console.log('Error Occured On getPurcApprovaldata()')
        }
    });
  }

  getPurcApprovaldata(data: any): any {   
    if (data != null || data != undefined) {
      const setApproval = <FormArray>this.purchaseApproval.controls['purcApproval'];
      for (this.i = 0; this.i < data.length; this.i++) {
        setApproval.push(this.setPurcApprovaldata(
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
          data[this.i][18],
          data[this.i][19],
          data[this.i][20],
          data[this.i][21],
          data[this.i][22],
          data[this.i][23],
          data[this.i][24],
          data[this.i][25],
          data[this.i][26],
          data[this.i][27],
          data[this.i][28],
          data[this.i][29],
          data[this.i][30],
          data[this.i][31]
        ));
      }
    }
  }
  setPurcApprovaldata(pid: any, bname: any, bqty: any, sqty: any, tabqty: any, tqty: any, uprice: any, pdisc: any, vat: any,
    gst: any, sgst: any, cgst: any, igst: any, utgst: any, batchno: any, pprice: any, sdisc: any, mrp: any, fid: any, did: any,
    expdate: any, fboxqty: any, fstripqty: any, ftabqty: any, ftotqty: any, vatamt: any, gstamt: any, sgstamt: any, cgstamt: any, igstamt: any, utgstamt: any,batchid: any ): any {
    return this.formBuilder.group({
      productid: [pid, []],
      brandname: [bname, []],
      boxqty: [bqty, []],
      stripqty: [sqty, []],
      tabletqty: [tabqty, []],
      totqty: [tqty, []],
      approvalqty: ['0', []],
      damageqty: ['0', []],
      penddingqty: ['0', []],
      unitprice: [uprice, []],
      discount: [pdisc, []],
      vat: [vat, []],
      gst: [gst, []],
      sgst: [sgst, []],
      cgst: [cgst, []],
      igst: [igst, []],
      utgst: [utgst, []],
      batchname: [batchno, []],
      purprice: [pprice, []],
      salesdisc: [sdisc, []],
      mrp: [mrp, []],
      formulationid: [fid, []],
      dosageid: [did, []],
      expirydate: [expdate, []],
      freeboxqty: [fboxqty, []],
      freestripqty: [fstripqty, []],
      freetabletqty: [ftabqty, []],
      freetotalqty: [ftotqty, []],
      vatamt: [vatamt, []],
      gstamt: [gstamt, []],
      sgstamt: [sgstamt, []],
      cgstamt: [cgstamt, []],
      igstamt: [igstamt, []],
      utgstamt: [utgstamt, []],
      companyrefid: [this.purchaseApproval.get('companyrefid').value, []],
      branchrefid: [this.purchaseApproval.get('branchrefid').value, []],
      locname: [this.purchaseApproval.get('locname').value, []],
      locrefid: [this.purchaseApproval.get('locrefid').value, []],
      clientcdate: ['', []],
      batchno:[batchid,[]]
      
    });
  }
  approvalCalculation($event) {
    let totalQuantity: any = 0;
    let tqty: any = 0;
    const approvalCalc = <FormArray>this.purchaseApproval.controls['purcApproval'];
    let appValues = approvalCalc.value;
    let eVal = $event.target.value;
    let flag: number = 0;
    let chflag: number = 0;
    for (this.j = 0; this.j < appValues.length; this.j++) {
      totalQuantity = parseFloat(appValues[this.j].totqty);
      if (eVal > totalQuantity || eVal > totalQuantity || eVal > totalQuantity) {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Your QUANTITY Higher Than Total Quantity....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        $event.preventDefault();
        $event.stopPropagation();
      }
      tqty = parseFloat(appValues[this.j].approvalqty) + parseFloat(appValues[this.j].damageqty) + parseFloat(appValues[this.j].penddingqty);
      if (tqty > totalQuantity) {
        flag = 1;
      }
      if (flag == 1) {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Your TS-QUANTITY Higher Than Total Quantity....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        $event.stopPropagation();
        $event.stopPropagation();
      }
      if (tqty < totalQuantity) {
        chflag = 2;
      }
      if (chflag == 2) {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'Your TQ-QUANTITY Below Than Total Quantity....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        $event.preventDefault();
        $event.stopPropagation();
      }
      if (true) {
        this.appComponent.ngOnInit();
        appValues[this.j].clientcdate = AppComponent.date;
      }
    }
  }
  returnValid: any;
  onSubmit(): any {
    this.returnValid = this.invoiceDatavalidation();
    if (this.returnValid == true) {
      this.approvalService.getApprovalrecord(JSON.stringify(this.purchaseApproval.value)).subscribe(
        data => {
          if (data == true) {
            const approvalCalc = <FormArray>this.purchaseApproval.controls['purcApproval'];
            this.approvalService.getApprovaldata(JSON.stringify(approvalCalc.value)).subscribe(
              data => {
                if (data == true) {
                  this.purchaseApproval.reset();
                  this.purchaseApproval.get('invoicenumber').setValue("opt1");
                  approvalCalc.controls = [];
                  this.ngOnInit();
                  //this.router.navigate(['']);
                  this.notificationsComponent.addToast({ title: 'Sucess', msg: 'Data Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                }
              },
              err => console.log('Error Occured On getPurcinvoice()')
            );
          }
        });
    }
  }

  invoiceDatavalidation(): Boolean {
    const approvalCalc = <FormArray>this.purchaseApproval.controls['purcApproval'];
    let appValues = approvalCalc.value;
    if (appValues == '' || appValues == null) {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Approval Data Is Empty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    for (this.j = 0; this.j < appValues.length; this.j++) {
      if (appValues[this.j].approvalqty == '0') {
        this.notificationsComponent.addToast({ title: 'Error', msg: 'please Enter valid Quantity', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        return false;
      }
    }
    return true;
  }

  ngAfterViewInit() {
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
}