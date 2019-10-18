import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { invoiceprintService } from './basic.service';
import { AppComponent } from '../../app.component';
import {Router,ActivatedRoute} from '@angular/router';
//import * as jspdf from 'jspdf';
//import 'jspdf-autotable';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],

  providers: [invoiceprintService]
})
export class BasicComponent implements OnInit {

  shop = [];

private pono: any;
private vendor: any;
  companyrefid;
  branchid;
  locname;
  locrefid;
  shopid;
 purcid;
 vendorNae: any;
 vaddress: any;
 vpin:any;
 vemail:any;

 
 public product = [];
 public rowsOnPage: number = 20;
 public filterQuery: string = "";
 public sortBy: string = "";
 public sortOrder: string = "desc";
id: number;
id2: number;
  constructor(private invoiceprintservice: invoiceprintService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.pono = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    // this.vendor = this.route.params.subscribe(params => {
    //   this.id2 = +params['id2'];
    // });


    this.companyrefid = AppComponent.companyID;
    this.branchid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
    this.shopid = AppComponent.shopID;

    


    this.invoiceprintservice.getShopName(this.companyrefid, this.branchid,
      this.locname, this.locrefid, this.shopid).subscribe(data => { this.shop = data[0],alert(data) })


    this.invoiceprintservice.getInvoice(this.companyrefid, this.branchid,
      this.locname, this.locrefid, this.id).subscribe(data => {  this.product = data,
        this.vendorNae=data[0][4];
        this.vaddress=data[0][5];
        this.vpin=data[0][6];
        this.vemail=data[0][7];
        alert(data);
       
       // this.product = data
      
      })
  }

  // public captureScreen()
  // {
  //   var data = document.getElementById('contentToConvert');
  //   html2canvas(data).then(canvas => {
  //     // Few necessary setting options
  //     var imgWidth = 208; 
  //     var pageHeight = 295;  
  //     var imgHeight = canvas.height * imgWidth / canvas.width;
  //     var heightLeft = imgHeight;

  //     const contentDataURL = canvas.toDataURL('image/png')
  //     let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  //     var position = 0;
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
  //     pdf.save('MYPdf.pdf'); // Generated PDF 
  //   });
  // }


}

