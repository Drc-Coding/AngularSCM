import { Component, OnInit } from '@angular/core';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { AppComponent } from '../../app.component';
import { CustrackingServices } from './custracking.component.services';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { stringify } from 'querystring';
import { NotificationComponent } from 'angular2-notifications';
import { touches } from 'd3';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { id } from '@swimlane/ngx-datatable/release/utils';


@Component({
  selector: 'app-custracking',
  templateUrl: './custracking.component.html',

  providers: [CustrackingServices, NotificationsComponent]



})
export class CustrackingComponent implements OnInit {



  private searchData: any = [
    {

      "saleorderno": "1",
      "productcode": "S02323",
      "salesordertype": "Sales",
      "salesorderdate": "17/09/2019",
      "productname": "celesis",
      "noofproducts": "6",
      "status": "active"
    }, {
      "saleorderno": "2",
      "productcode": "e02323",
      "salesordertype": "Sales",
      "salesorderdate": "17/09/2019",
      "Productname": "celesis",
      "noofproducts": "6",
      "status": "active"
    }, {
      "saleorderno": "3",
      "productcode": "h02523",
      "salesordertype": "Sales",
      "salesorderdate": "17/09/2019",
      "productname": "demat",
      "noofproducts": "6",
      "status": "active"
    },
    {
      "saleorderno": "3",
      "productcode": "hfdfrdewsd",
      "salesordertype": "Sales",
      "salesorderdate": "17/09/2019",
      "productname": "demat",
      "noofproducts": "6",
      "status": "active"
    }];

  ndt = false;
  newcustomer:boolean=false;
  closeResult: string;

  selobj;
  i;
  filtArr = [];



  datas1 = [];
  datas2 = [];



  customerTrackingForm: FormGroup;


  name: boolean;
  invoice: boolean;
  mobile: boolean;
  all: boolean;

  constructor(private custrackingServices: CustrackingServices, private fb: FormBuilder, private notificationsComponent: NotificationsComponent, private modalService: NgbModal) {


    this.customerTrackingForm = this.fb.group({

      customername: [, []],
      mobileno: [, []],
      email: [, []],
      customertype: [, []],
      address: [, []],

      saleorderno: [, []],
      salesordertype: [, []],
      salesorderdate: [, []],
      productcode: [, []],
      productname: [, []],
      noofproducts: [, []],
      status: [, []],




      customerDetails: this.fb.array([


      ])

      ,



      customerDetails1: this.fb.array([

      ])







    })



  }

  ngOnInit() {

    this.ndt = true;
    this.invoice = false;
    this.name = false;
    this.all = true;

    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };







    this.custrackingServices.getAllList(AppComponent.companyID, AppComponent.branchID,
      AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => this.datas1 = data)
  }


  datas = [["IND/REQ/SH_22/0000000051", "2019-05-29", "Shop", 104, "Para Plus", null, null, null, 10.0000, 2291,
    "Emedsure Pharmacy Palayan"],
  ["2019-05-29", "Shop", 106, "Jakavi", null, null, null, 5.0000, 11909, "Emedsure Pharmacy Palayan"]]





  getSalesOrdDetails(soNum: any, content: any) {




    this.custrackingServices.getSalesOrdDetails(soNum, AppComponent.companyID, AppComponent.branchID,
      AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.datas2 = data, this.getSalesOrdDetails1(data, content) })






  }


  getSalesOrdDetails1(data: any, content: any) {


    const getData1 = <FormArray>this.customerTrackingForm.controls['customerDetails1'];


    getData1.controls = [];


    for (let i = 0; i < data.length; i++) {
      getData1.push(this.getSalesDeails1(
        data[i][0],
        data[i][1],
        data[i][2]

      ))


    }


    this.clickopen(content);


  }



  getSalesDeails1(procode: any, prdname: any, noofprods: any) {

    return this.fb.group({
      productcode: [procode, []],

      productname: [prdname, []],

      noofproducts: [noofprods, []]


    })


  }




  generalSearch(value: any) {

    if (value == 1) {

      this.name = true;
      this.invoice = false;
      this.mobile = false;
      this.all = false;

    }

    else if (value == 2) {

      this.name = false;
      this.invoice = true;
      this.mobile = false;
      this.all = false;

    }

    else if (value == 3) {
      this.name = false;
      this.invoice = false;
      this.mobile = true;
      this.all = false;


    }

    else if (value == 0) {
      this.name = false;
      this.invoice = false;
      this.mobile = false;
      this.all = true;


    }
  }


  getCustSearch(event: any) {

    this.customerTrackingForm.get('customername').setValue("");
    this.customerTrackingForm.get('customertype').setValue("");
    this.customerTrackingForm.get('mobileno').setValue("");
    this.customerTrackingForm.get('email').setValue("");
    this.customerTrackingForm.get('address').setValue("");
    this.newcustomer=false;


    const getData = <FormArray>this.customerTrackingForm.controls['customerDetails'];
    getData.controls = [];


    if (event.length > 0 || this.customerTrackingForm.get('customername').value == null || undefined || "") {
      this.customerTrackingForm.get('customertype').setValue("New Customer");
      this.newcustomer=true;
    }




    if (event) {

      this.ndt = false;

      let srch = Object.assign([], this.datas1).filter(
        item => ((item[6].toLowerCase()).indexOf(event) === 0 || (item[6].toUpperCase()).indexOf(event) === 0));

      // let srch1 = Object.assign([], this.datas1).filter(
      //   item => ((item[6].toLowerCase()).indexOf(event) === 0 || (item[6].toUpperCase()).indexOf(event) === 0)
      //     || (item[0] === event));

      srch.map(item => {
        this.customerTrackingForm.get('customername').setValue(item[6]);
        this.customerTrackingForm.get('mobileno').setValue(item[7]);
        this.customerTrackingForm.get('email').setValue(item[8]);
        this.customerTrackingForm.get('address').setValue("");


        let data = this.fb.group({
          saleorderno: [item[0], []],

          // productcode: [item[1], []],


          salesordertype: [item[2], []],
          salesorderdate: [item[3], []],

          // productname: [item[4], []],
          // noofproducts: [item[5], []],


          status: [item[10], []],
        })
        getData.push(data)

        if (event.length > 0 && this.ndt == false && this.customerTrackingForm.get('customername').value) {

          this.customerTrackingForm.get('customertype').setValue("Existing")
          this.newcustomer = false;
        }

      });
    }
    else {

      this.ndt = true;

      // if (this.ndt) {

      //   this.customerTrackingForm.get('customertype').setValue("New Customer")
      // }
      // this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Value you Searching for doesnot exist....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }

  }

  getSalesInvSearch(event: any) {
    // alert(event);
    this.customerTrackingForm.get('customername').setValue("");
    this.customerTrackingForm.get('customertype').setValue("");
    this.customerTrackingForm.get('mobileno').setValue("");
    this.customerTrackingForm.get('email').setValue("");
    this.customerTrackingForm.get('address').setValue("");
    this.newcustomer=false;


    const getData = <FormArray>this.customerTrackingForm.controls['customerDetails'];
    getData.controls = [];

    if (event.length > 0 || this.customerTrackingForm.get('customername').value == null || undefined || "") {
      this.customerTrackingForm.get('customertype').setValue("New Customer");
      this.newcustomer=true;
    }
    if (event) {

      if (typeof event == 'number' || typeof event == 'string') {

        this.ndt = false;

        let srch = Object.assign([], this.datas1).filter(
          item => ((item[3].toLowerCase()).indexOf(event) === 0 || (item[3].toUpperCase()).indexOf(event) === 0)
            || (item.toString(item[3]).indexOf(event) === 0));



        srch.map(item => {

          this.customerTrackingForm.get('customername').setValue(item[6]);
          this.customerTrackingForm.get('mobileno').setValue(item[7]);
          this.customerTrackingForm.get('email').setValue(item[8]);
          this.customerTrackingForm.get('address').setValue("");


          let data = this.fb.group({
            saleorderno: [item[0], []],

            // productcode: [item[1], []],


            salesordertype: [item[2], []],
            salesorderdate: [item[3], []],

            // productname: [item[4], []],
            // noofproducts: [item[5], []],


            status: [item[10], []],
          })
          getData.push(data)


          if (event.toString() != null || undefined || "" && this.customerTrackingForm.get('customername').value) {

            this.customerTrackingForm.get('customertype').setValue("Existing")
            this.newcustomer =false;
          }

        });
      }
    }
    else {
      this.ndt = true;

      // this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Value you Searching for doesnot exist....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }

  }


  getMobileSearch(event: any) {
    this.customerTrackingForm.get('customername').setValue("");
    this.customerTrackingForm.get('customertype').setValue("");
    this.customerTrackingForm.get('mobileno').setValue("");
    this.customerTrackingForm.get('email').setValue("");
    this.customerTrackingForm.get('address').setValue("");
    this.newcustomer=false;


    const getData = <FormArray>this.customerTrackingForm.controls['customerDetails'];
    getData.controls = [];


    if ((event.length > 0 && isNaN(event) !== true) || this.customerTrackingForm.get('mobileno').value == null || undefined || "") {
      this.customerTrackingForm.get('customertype').setValue("New Customer");
      this.newcustomer=true;
    }

    if (event) {

      this.ndt = false;

      let srch = Object.assign([], this.datas1).filter(
        item => item[7] && item[7].indexOf(event) === 0);

      srch.map(item => {

        this.customerTrackingForm.get('customername').setValue(item[6]);
        this.customerTrackingForm.get('mobileno').setValue(item[7]);
        this.customerTrackingForm.get('email').setValue(item[8]);
        this.customerTrackingForm.get('address').setValue("");


        let data = this.fb.group({
          saleorderno: [item[0], []],
          // productcode: [item[1], []],
          salesordertype: [item[2], []],
          salesorderdate: [item[3], []],
          // productname: [item[4], []],
          // noofproducts: [item[5], []],
          status: [item[10], []],
        })
        getData.push(data)

        if (event.length > 0 && this.ndt == false && this.customerTrackingForm.get('mobileno').value) {
          this.customerTrackingForm.get('customertype').setValue("Existing")
          this.newcustomer = false;
        }

      });
    }
    else {
      this.ndt = true;

      // this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Value you Searching for doesnot exist....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }
  }


  getSearchAll(event: any) {

    this.customerTrackingForm.get('customername').setValue("");
    this.customerTrackingForm.get('customertype').setValue("");
    this.customerTrackingForm.get('mobileno').setValue("");
    this.customerTrackingForm.get('email').setValue("");
    this.customerTrackingForm.get('address').setValue("");
    this.newcustomer=false;

    const getData = <FormArray>this.customerTrackingForm.controls['customerDetails'];
    getData.controls = [];

    if (event.length > 0 || this.customerTrackingForm.get('customername').value == null || undefined || "") {
      this.customerTrackingForm.get('customertype').setValue("New Customer");
      this.newcustomer=true;

    }


    if (event) {

      this.ndt = false;

      let srch = Object.assign([], this.datas1).filter(
        item => ((item[6].toLowerCase()).indexOf(event) === 0 || (item[6].toUpperCase()).indexOf(event) === 0) ||
          (item[3].toLowerCase()).indexOf(event) === 0 || (item[3].toUpperCase()).indexOf(event) === 0 ||
          item[7] && item[7].indexOf(event) === 0);



      // (
      //     ((item[6].toLowerCase()).indexOf(event) === 0 || (item[6].toUpperCase()).indexOf(event) === 0 || item.toString(item[6]).indexOf(event) === 0)
      //     || ((item[3].toLowerCase()).indexOf(event) === 0 || (item[3].toUpperCase()).indexOf(event) === 0 || item.toString(item[3]).indexOf(event) === 0)
      //   )


      // || ((item[0].toLowerCase()).indexOf(event) === 0 || (item[0].toUpperCase()).indexOf(event) === 0 || item.toString(item[0]).indexOf(event) === 0



      // }



      // let srch1 = Object.assign([], this.datas1).filter(
      //   item => ((item[6].toLowerCase()).indexOf(event) === 0 || (item[6].toUpperCase()).indexOf(event) === 0)
      //     || (item[0] === event));



      srch.map(item => {

        this.customerTrackingForm.get('customername').setValue(item[6]);
        this.customerTrackingForm.get('mobileno').setValue(item[7]);
        this.customerTrackingForm.get('email').setValue(item[8]);
        this.customerTrackingForm.get('address').setValue("");


        let data = this.fb.group({
          saleorderno: [item[0], []],

          // productcode: [item[1], []],

          salesordertype: [item[2], []],
          salesorderdate: [item[3], []],

          // productname: [item[4], []],
          // noofproducts: [item[5], []],


          status: [item[10], []],
        })
        getData.push(data)
        if (event.length > 0 && this.ndt == false && this.customerTrackingForm.get('customername').value) {

          this.customerTrackingForm.get('customertype').setValue("Existing")
          this.newcustomer = false;
        }

        // getData1.push(data)
      });
    }
    else {
      this.ndt = true;

      // this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Value you Searching for doesnot exist....', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

    }

  }



  passingResponseData(data) {
    const getData = <FormArray>this.customerTrackingForm.controls['customerDetails'];
    for (this.i = 0; this.i < data.length; this.i++) {
      getData.push(this.methforInjectVals(
        data[this.i][0],
        data[this.i][1],
        data[this.i][2],
        data[this.i][3],
        data[this.i][4],
        data[this.i][5]
      ));
    }
  }

  methforInjectVals(slinno: any, sotype: any, sodate: any, pdcode: any, pdname: any, noprd: any) {

    return this.fb.group({
      saleorderno: [slinno, []],
      salesordertype: [sotype, []],
      salesorderdate: [sodate, []],
      productcode: [pdcode, []],
      productname: [pdname, []],
      noofproducts: [noprd, []],
      status: [, []],

    });

  }
  searchReqData(data: any) {
    if (data) {
      this.filtArr = data;
    }
  }



  clickopen(content) {

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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






}
