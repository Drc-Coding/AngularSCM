import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from "@angular/forms";
import { salesOrderServicenew } from '../salesordernew.services';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { dateFormatPipe } from 'app/notifications/notifications.datepipe';
declare var $: any;
@Component({
  selector: 'app-addSalesOrder',
  templateUrl: './addsalesordernew.component.html',
  styleUrls: ['./addsalesordernew.component.css'],
  providers:[salesOrderServicenew]
})
export class addsalesOrderComponentnew implements OnInit {
  @ViewChild("qty") qty: any;
  salesOrderForm: any;
  searchProducts = [];
  dataSource = [];
  patientlist = [];
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  pattern: any = '^[0-9]+(\.[0-9]{1,3})?$';
  destination = [];
  sotype=[];
  selobj;
  constructor(private salesOrderService: salesOrderServicenew, private notificationsComponent: NotificationsComponent,
    private fb: FormBuilder, private route: Router, private appComponent: AppComponent,private dateformat: dateFormatPipe) {
    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };
    this.salesOrderForm = this.fb.group({
      orderdate: [this.dateformat.transform05(Date.now()), []],
      drugproductid: ['', []],
      deliverytype: ['', []],
      patientid: ['', []],
      mobileno:['',[]],
      quantity: ['', [Validators.pattern(this.textnumbers)]],
      salesorderno: ['', []],
      totalitem: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locname: ['', []],
      locrefid: ['', []],
      clientcdate: ['', []],
      fromlocname: [this.selobj.locname, []],
      fromlocrefid: [this.selobj.locrefid, []],
      tolocname: ['', []],
      tolocrefid: ['', []],
      sotype: ['', []],
      soinfo: ['', []],
      salesstatus: [1, []],
      sDetails: this.fb.array([
      ]),
    });
  }
  ngOnInit() {
    this.salesOrderForm.get('deliverytype').setValue('opt1');
    this.salesOrderForm.get('patientid').setValue('opt1');
    this.salesOrderForm.get('tolocname').setValue(0);
    this.salesOrderForm.get('sotype').setValue(0);
    this.dataSource = [];
    this.salesOrderForm.get('companyrefid').setValue(AppComponent.companyID);
    this.salesOrderForm.get('branchrefid').setValue(AppComponent.branchID);
    this.salesOrderForm.get('locname').setValue(AppComponent.locrefID);
    this.salesOrderService.getsotype().subscribe(data => this.sotype = data,
      err => {
        console.log('Error Occured ');
       });
    if (AppComponent.shopID != 0) {
      this.salesOrderForm.get('locrefid').setValue(AppComponent.shopID);
      this.salesOrderService.patientList(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID).subscribe(data => { this.patientlist = data },
        err => {
          console.log('Error occured On patientList()');
        });
      this.autoIncrement(AppComponent.companyID, AppComponent.branchID, AppComponent.shopID, AppComponent.locrefID);
    }
    if (AppComponent.warehouseID != 0) {
      this.salesOrderForm.get('locrefid').setValue(AppComponent.warehouseID);
      this.salesOrderService.patientList(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID).subscribe(data => { this.patientlist = data },
        err => {
          console.log('Error occured On patientList()');
        });
      this.autoIncrement(AppComponent.companyID, AppComponent.branchID, AppComponent.warehouseID, AppComponent.locrefID);
    }
    if (AppComponent.hospitalID != 0) {
      this.salesOrderForm.get('locrefid').setValue(AppComponent.hospitalID);
      this.salesOrderService.patientList(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID).subscribe(data => { this.patientlist = data },
        err => {
          console.log('Error occured On patientList()');
        });
      this.autoIncrement(AppComponent.companyID, AppComponent.branchID, AppComponent.hospitalID, AppComponent.locrefID);
    }
  }
  autoIncrement(cid: any, bid: any, lrefid: any, lname: any) {
    this.salesOrderService.autoIcrement(cid, bid, lrefid, lname).subscribe(data => {
      this.salesOrderForm.get('salesorderno').setValue(data.toString())
    },
      err => {
        console.log('Error occured On autoIcrement()');
      });
  }
  searchProduct(searchValue: any) {
    this.salesOrderService.searchProduct(searchValue, this.salesOrderForm.get('companyrefid').value, this.salesOrderForm.get('branchrefid').value, this.salesOrderForm.get('locrefid').value, this.salesOrderForm.get('locname').value).subscribe(data => {
      this.searchProducts = [];
      for (let j = 0; j < data.length; j++) {
        this.searchProducts.push({ value: data[j][0], label: data[j][1] });
      }
    },
      err => {
        console.log('Error occured On searchProduct()');
      });
  }
  setFocus() {
    this.qty.nativeElement.focus();
  }
  
  getProductInfo() {
    if (this.salesOrderForm.get('drugproductid').value == '' || this.salesOrderForm.get('drugproductid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Product', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    } else {
      this.salesOrderService.getsalesProdcut(this.salesOrderForm.get('drugproductid').value).subscribe(data => { this.getProoductData(data) });
    }
  }
  inc = 0;
  getProoductData(data: any) {
    
    let flag: number = 0;
    if (data !== null || data !== undefined) {
      const getData = <FormArray>this.salesOrderForm.controls['sDetails'];
      let sourceData1 = getData.value;
      for (let k = 0; k < data.length; k++) {
        for (let c = 0; c < sourceData1.length; c++) {
          if (data[k][3] == sourceData1[c].drugproductid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[k][0].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          this.salesOrderForm.get('quantity').setValue('');
        } else {
          getData.push(this.setProoductData(
            data[k][0],
            data[k][1],
            data[k][2],
            data[k][3]
          ));
          // this.showSaleorder(this.dataSource)
          this.inc += 1;
          this.salesOrderForm.get('quantity').setValue('');
          this.searchProducts = [];
        }
      }
    }
  }
  setProoductData(d0: any, d1: any, d2: any, d3: any) {
    return this.fb.group({
      ID: this.inc,
      sno: this.inc + 1,
      drugproductid: d3,
      productname: d0,
      dosage: d1,
      formulation: d2,
      totalqty: this.salesOrderForm.get('quantity').value,
      boxqty: 0,
      stripqty: 0,
      tabletqty: 0,
    });
  }
  // getdata(event) {
  //   //Table dataSource Function Write Here//
  // }
  public flag: boolean = false;


  onSubmit() {
    this.flag = this.salesOrderValidation();
    if (this.flag == true) {
      this.appComponent.ngOnInit();
      this.salesOrderForm.get('clientcdate').setValue(this.dateformat.transform04());

     
      const getData = <FormArray>this.salesOrderForm.controls['sDetails'];
     let data: any = getData.value
      this.salesOrderForm.get('totalitem').setValue(data.length);

  

      this.salesOrderService.createSalesorder(JSON.stringify(this.salesOrderForm.value)).subscribe(data => {
        if (data == true) {
        
          this.salesOrderService.createSaleRecord(JSON.stringify(getData.value)).subscribe(data => {
            if (data == true) {
              this.notificationsComponent.addToast({ title: 'Success Message', msg: 'Data Saved Successfully.', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
             setTimeout(() => {
              this.route.navigate(['SalesOrder/SalesOrderHistory']);
             }, 2000);
              
            }
          });
        } else {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'SalesOrder Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },
        err => {
          console.log('Error Occured On createSalesorder()');
        })
    }
  }
  salesOrderValidation(): boolean {
    if (this.salesOrderForm.get('orderdate').value == '' || this.salesOrderForm.get('orderdate').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Required Order Date', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.salesOrderForm.get('patientid').value == 'opt1' || this.salesOrderForm.get('patientid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Required Patient name', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }
  viewOrder() {
    this.route.navigate(['SalesOrder/SalesOrderHistory']);
  }
  viewDestination() {
    var destid = 0;
    destid = this.salesOrderForm.get('tolocname').value;
    if (destid == 2) {
      var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyrefid: this.selobj.companyid ,branchrefid: this.selobj.branchrefid};
      this.salesOrderService.viewWareHouse(JSON.stringify(frmdata)).subscribe(data => { this.destination = data },
        errorCode => console.log(errorCode));
    } else if (destid == 1) {
      var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyrefid: this.selobj.companyid ,branchrefid: this.selobj.branchrefid};
      this.salesOrderService.viewshopinformation(JSON.stringify(frmdata)).subscribe(data => { this.destination = data },
        errorCode => console.log(errorCode));
    } else if (destid == 3) {
      var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyrefid: this.selobj.companyid,branchrefid: this.selobj.branchrefid };
      this.salesOrderService.viewHospital(JSON.stringify(frmdata)).subscribe(data => { this.destination = data },
        errorCode => console.log(errorCode));
    }
  }
  removeRow(index: number) {
     const getData = <FormArray>this.salesOrderForm.controls['sDetails'];
     getData.removeAt(index);
     let removeVal = getData.value;
     if (removeVal == null || removeVal == '') {
       getData.reset();
     //  this.ngOnInit();
     }
   }
}
