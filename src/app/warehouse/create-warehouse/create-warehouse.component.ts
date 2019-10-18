import { Addwarehouse } from '../addwarehouse';
import { Datawarehouse } from '../warehouse.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
})
export class CreateWarehouseComponent implements OnInit {
  mywarehouse: FormGroup;
warehouse = new Addwarehouse;
  countryid: any;
  countryw: any;
  statew: any;
  cityw: any;
  submitted = false;
  constructor(private dataWarehouse: Datawarehouse) {
 let warehousename = new FormControl('', Validators.required);
     let warehousecode = new FormControl('', Validators.required);
     let owner_name = new FormControl('', Validators.required);
     let address1 = new FormControl('', Validators.required);
     let address2 = new FormControl('', Validators.required);
     let address3 = new FormControl('', Validators.required);
     let country = new FormControl('', Validators.required);
     let state = new FormControl('', Validators.required);
     let city = new FormControl('', Validators.required);
     let pincode = new FormControl('', Validators.required);
     let contact_no1 = new FormControl('', Validators.required);
     let contact_no2 = new FormControl('', Validators.required);
     let mobile_no = new FormControl('', Validators.required);
     let email_id = new FormControl('', Validators.email);
     let dlno = new FormControl('', Validators.required);
     let license_holder = new FormControl('', Validators.required);
     let tinno = new FormControl('', Validators.required);
     let panno = new FormControl('', Validators.required);
     let cst = new FormControl('', Validators.required);
     let gst = new FormControl('', Validators.required);

     let clientcdate = new FormControl();
     let createdby = new FormControl();

     let coldstorage = new FormControl('', Validators.required);
    this.mywarehouse = new FormGroup({
    warehousename: warehousename,
    warehousecode: warehousecode,
    owner_name: owner_name,
    address1: address1,
    address2: address2,
    address3: address3,
    country: country,
    state: state,
    city: city,
    pincode: pincode,
    contact_no1: contact_no1,
    contact_no2: contact_no2,
    mobile_no: mobile_no,
    email_id: email_id,
    dlno: dlno,
    license_holder: license_holder,
    tinno: tinno,
    panno: panno,
    cst: cst,
    gst: gst,
    clientcdate : clientcdate,
    createdby : createdby,
    coldstorage: coldstorage,
      })
  }
 newWarehouse(): void {
    this.submitted = false;
    this.warehouse = new Addwarehouse();
  }
  ngOnInit() {
  // this.getCountry();
    this.getCountrywarehouse();
  }
private save(): void {
    this.dataWarehouse.create(this.warehouse);
  }
onSubmit() {
    this.submitted = true;

   this.save();
  //  alert(JSON.stringify(this.mywarehouse.value));

  }
  // access country
getCountry() {
  this.dataWarehouse.getCountry(this.mywarehouse.get('country').value).subscribe(countryid => this.countryid = countryid);
  }
  // get country
   getCountrywarehouse() {


 




     this.dataWarehouse.getCountrywarehouse().then(countryw => this.countryw = countryw);
  }
  // get state warehouse
getstate() {
     this.dataWarehouse.getstate(this.mywarehouse.get('country').value).subscribe(statew => this.statew = statew);
  }
  // get city
getcityw() {
  this.dataWarehouse.getcityw(this.mywarehouse.get('state').value).subscribe(cityw => this.cityw = cityw);
}
}
