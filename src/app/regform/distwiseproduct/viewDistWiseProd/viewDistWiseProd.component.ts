
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { viewDistWiseProdService } from './viewDistWiseProd.service';

import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';


import { NotificationsComponent } from '../../../notifications/notifications.component';



import { AppComponent } from '../../../app.component';


@Component({
  selector: 'app-viewDistWiseProd',
  templateUrl: './viewDistWiseProd.component.html',
  providers: [viewDistWiseProdService, NotificationsComponent]

})
export class viewDistWiseProdComponent implements OnInit {




  registerForm: FormGroup;


  distributors = [];

  distproducts = [];

  i;
  inc = 1;


  selobj;

  constructor(private userService: viewDistWiseProdService, private formBuilder: FormBuilder, config: NgbDropdownConfig, private notificationsComponent: NotificationsComponent) {

    config.autoClose = false;
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      distributor: [, []],

      autonamenew: [, []],
      distprod: this.formBuilder.array([

      ])

    });



    this.selobj = { userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID, companyid: AppComponent.companyID, branchrefid: AppComponent.branchID };


    var frmdata = { frmint1: '', frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid, companyrefid: this.selobj.companyid };
    this.userService.viewProdDistributors(JSON.stringify(frmdata)).subscribe(data => { this.distributors = data },
      errorCode => console.log(errorCode));




    $(document).ready(function () {


    });


    this.init();


  }



  onSubmit() {




  }



  viewDistProdWhole() {


    var frmdata = { frmint1: this.registerForm.get('distributor').value, frmstr1: '', createdby: '', locrefid: this.selobj.locrefid, locname: this.selobj.locname, companyid: this.selobj.companyid };
    this.userService.viewDistProdWhole(JSON.stringify(frmdata)).subscribe(data => { this.viewServDistProduct(data) },
      errorCode => console.log(errorCode));
  }

  viewServDistProduct(data: any) {

    const control = <FormArray>this.registerForm.controls['distprod'];


    while (control.length !== 0) {
      control.removeAt(0);
    }

    this.init();
    var v = 0;
    for (this.i = 0; this.i < data.length; this.i++) {

      v = 0;


      control.insert(0, this.formBuilder.group({


        id: [data[this.i][v++], []],
        distrefid: [data[this.i][v++], []],
        drugprdid: [data[this.i][v++], []],
        masterprice: data[this.i][v++],
        distprice: [data[this.i][v++], []],

        productname: [data[this.i][v++], []],

        distname: [data[this.i][v++], []],
        createdby: [this.selobj.userid, []],
        locrefid: [this.selobj.locrefid, []],
        locname: [this.selobj.locname, []],

        distprodno: [data[this.i][1], []],



      }));


    }

  }









  init() {
    const control = <FormArray>this.registerForm.controls['distprod'];
    var data = [[], []];



    for (this.i = 0; this.i < data.length; this.i++) {

      control.push(this.formBuilder.group({

        distprdid: [, []],
        distrefid: [, []],
        drugprdid: [, []],
        masterprice: [, []],
        distprice: [, []],
        qty: [, []],

        clientcdate: [, []],
        clientcdate1: [, []],
        createdby: [, []],
        locrefid: [, []],
        locname: [, []],
        countryrefid: [this.selobj.countryrefid, []],
        companyrefid: [this.selobj.companyid, []],
        branchrefid: [this.selobj.branchrefid, []],
        productname: [, []],


        creditdays: [, []],
        leadtime: [, []],

        proddelflag: [, []],

        distprdlocid: [, []],

        calcflag: [1, []],
        delflag: [false, []],
      }));


    }

  }

















}