
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { prcenquiryViewService } from './prcenquiryView.service';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-prcenquiryView',
  templateUrl: './prcenquiryView.component.html',
  providers: [prcenquiryViewService]
})
export class prcenquiryViewComponent implements OnInit {
  private priceenquiry: FormGroup;
  public data: any;
  public rowsOnPage: number = 10;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  datall = [];
  selobj;
  branchid: any;
  locname: any;
  locrefid: any;
  companyrefid: any;
  dist = [];
  orderdate;
  prcproduct=[];
  shopid=[];
  distr: any;
  date: any;

  constructor(private userService: prcenquiryViewService, private fb: FormBuilder) {
    this.priceenquiry = this.fb.group({
      distributor: ['', []],
      clientcdate: ['', []]
    });

  }
  ngOnInit() {

    this.branchid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
    this.companyrefid = AppComponent.companyID;
   this.shopid=  AppComponent.shopID;

    this.userService.distributorlist(this.companyrefid, this.branchid, this.locname, this.locrefid).subscribe(data => this.dist = data);
  }
  getorderdate() {
    this.userService.orderdatelist(this.companyrefid, this.branchid, this.locname, this.locrefid, this.priceenquiry.get('distributor').value).subscribe(data => this.orderdate = data)
  }
  getpriceenquirypro(){
    this.userService.Priceenqiryproduct(this.companyrefid, this.branchid, this.locname, this.locrefid, this.priceenquiry.get('distributor').value, this.priceenquiry.get('clientcdate').value).subscribe(data => this.prcproduct = data)

  }
  
  peprint(){
    this.distr=this.priceenquiry.get('distributor').value
    this.date=this.priceenquiry.get('clientcdate').value
// let companyurl: string="http://204.93.193.244:8082/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Billprnt_PO.rptdesign&Companyrefid="+this.locname;
setTimeout(() => {
window.location.href = "http://204.93.193.244:8082/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Billprnt_PEnqy.rptdesign&companyID="+this.companyrefid+"&branchrefid="+this.branchid+"&LocName="+this.locname+"&locrefid="+this.locrefid+"&DistributorID="+this.distr+"&clientcdate="+this.date+"&shopid="+this.shopid+"&__format=PDF";
}, 2000);

  }
}