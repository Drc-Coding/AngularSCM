import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { liveTrackServices } from './livetrack.component.services';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppComponent } from 'app/app.component';

@Component({
  selector: 'app-livetrack',
  templateUrl: './livetrack.component.html',
  providers: [liveTrackServices, NotificationsComponent]
})
export class LivetrackComponent implements OnInit {

  soid: any;
  status: any;
  so1;
  so2;
  so3;
  si1;
  si2;
  si3;
  pic1;
  pic2;
  pic3;
  pak1;
  pak2;
  pak3;
  lab1;
  lab2;
  lab3;
  ship1;
  ship2;
  ship3;
  del1;
  del2;
  del3;

  selobj;

  msg = 'Hello World';

  OrderPlaced;

  InvoiceCreated;

  Picking;

  Packing;

  Labelling;

  Shipment;

  OutforDelivery;

  Delivered;


  livetrackingform: FormGroup;


  salesNo: any;
  salesInvNo: number;
  salesInvDtsArr = [];

  k;

  dumm: any = [];
  public dumm2;

  constructor(private route: ActivatedRoute, private notificationsComponent: NotificationsComponent, private livetrckservices: liveTrackServices, private fb: FormBuilder) {



    this.livetrackingform = this.fb.group({

      customername: [, []],
      mobilenumber: [, []],
      salesordernumber: [, []],
      salesorderdate: [, []],


      dumset: [, []],



    });


  }

  ngOnInit() {



    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };


    this.salesNo = this.route.snapshot.paramMap.get('id');


 

    this.livetrckservices.getSoProd(this.salesNo, AppComponent.companyID, AppComponent.branchID,
      AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
       
          this.setSalesInvDetails(data)
      })

    // this.salesNo = this.route.params.subscribe(params => { this.salesInvNo = params['sInvid'] });


   
   
   
   
   
   
    // this.livetrckservices.getSalesInvoiceNoDetails(this.salesNo).subscribe(data => {
    //   this.status = data[0][0], alert("status "+this.status);
    // });

    this.livetrckservices.customersalesstatus(this.salesNo).subscribe(data => 
      {
        this.status = data[0][0],
        this.so1 = data[0][1],
        this.so2 = data[0][2],
        this.so3 = data[0][3],
        this.si1 = data[1][1],
        this.si2 = data[1][2],
        this.si3 = data[1][3],
        this.pic1 = data[2][1],
        this.pic2 = data[2][2],
        this.pic3 = data[2][3],
        this.pak1 = data[3][1],
        this.pak2 = data[3][2],
        this.pak3 = data[3][3],
        this.lab1 = data[4][1],
        this.lab2 = data[4][2],
        this.lab3 = data[4][3],
        this.ship1 = data[5][1],
        this.ship2 = data[5][2],
        this.ship3 = data[5][3],
        this.del1 = data[6][1],
        this.del2 = data[6][2],
        this.del3 = data[6][3],
      err => console.log("error occurs in getsoleadrecord()")
      });
  }  //ngOnInit() End


  setSalesInvDetails(data: any) {

    if (data != null || undefined || "") {

      this.livetrackingform.get('customername').setValue(data[0][0])
      this.livetrackingform.get('mobilenumber').setValue(data[0][1])
      this.livetrackingform.get('salesordernumber').setValue(data[0][2])
      this.livetrackingform.get('salesorderdate').setValue(data[0][3])

    }

    this.dumm = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    this.OrderPlaced = this.dumm[0];

    this.InvoiceCreated = this.dumm[1];

    this.Picking = this.dumm[2];

    this.Packing = this.dumm[3];

    this.Labelling = this.dumm[4];

    this.Shipment = this.dumm[5];

    this.OutforDelivery = this.dumm[6];

    this.Delivered = this.dumm[7];

  }



}
