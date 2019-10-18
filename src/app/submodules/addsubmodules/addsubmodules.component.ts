import { Addsubmodulevalues } from '../submodules';
import { DataSubmodules } from '../submodules.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {NotificationsComponent }  from  '../../notifications/notifications.component';
import { AdminLayoutComponent } from '../../layouts/admin/admin-layout.component';

import {AppComponent} from '../../app.component';

import { Router  } from '@angular/router';

@Component({
  selector: 'app-addsubmodules',
  templateUrl: './addsubmodules.component.html',
  providers:[NotificationsComponent,AdminLayoutComponent]
})
export class AddsubmodulesComponent implements OnInit {
mysubmodules: FormGroup;
addsubmodule = new Addsubmodulevalues;
submitted = false;
submoduleid: any;         // submodules
  subproduct: any; // product
  subdomain: any; // domain
  submodulesubdomain: any; // subdomain
  submodulemodules: any;
  modules: Addsubmodulevalues[];
  selectedsubModules: Addsubmodulevalues;
  constructor(private dataService: DataSubmodules,  private router: Router,private notificationsComponent:NotificationsComponent,
    private location: Location)   {
   let countryid = new FormControl('', Validators.required);
    let productid = new FormControl('', Validators.required);
    let domainrefid = new FormControl('', Validators.required );
    let subdomainrefid = new FormControl('', Validators.required);
    let modulerefid = new FormControl('', Validators.required);
    let submodulename = new FormControl('', Validators.required);
    let submodulecode = new FormControl('', Validators.required);
    let url = new FormControl('', Validators.required);
    let status = new FormControl('', Validators.required);
    let approvalprocess = new FormControl('', Validators.required);
    let icon = new FormControl('', Validators.required);
    
 let clientcdate = new FormControl();
 let createdby = new FormControl();


    this.mysubmodules = new FormGroup({
     countryid: countryid,
      productid: productid,
      domainrefid: domainrefid,
      subdomainrefid: subdomainrefid,
      modulerefid: modulerefid,
      submodulename: submodulename,
      submodulecode: submodulecode,
      url: url,
      status: status,
      approvalprocess: approvalprocess,
      clientcdate: clientcdate,
      createdby:createdby,
      icon: icon

      });
    }

  ngOnInit() {


    this.mysubmodules.get('countryid').setValue("0");
    this.mysubmodules.get('productid').setValue("0");
    this.mysubmodules.get('domainrefid').setValue("0");
    this.mysubmodules.get('subdomainrefid').setValue("0");
    this.mysubmodules.get('modulerefid').setValue("0");

    this.getsubModules();
    this.getmodulescountry();


  }
 private save(): void {
 //alert("inside save");
  this.mysubmodules.get('clientcdate').setValue(AppComponent.date);
 this.mysubmodules.get('createdby').setValue(AppComponent.userID);
 
  this.dataService.subcreate( JSON.stringify( this.mysubmodules.value  )  ).subscribe(data => { },
    errorCode => console.log(errorCode));
  }
  onSubmit() {
   this.submitted = true;
    this.save();
    this.notificationsComponent.addToast({title:'Sucess', msg:'Sub-Module Saved Sucessfully..', timeout: 5000, theme:'default', position:'top-right',type:'success'});
    this.mysubmodules.reset();
    this.ngOnInit();
  }
   goBack(): void {
    this.location.back();
  }

  view(): void {
    this.router.navigate(['SubModule/ViewSubModule']);
   }


  getsubModules() {
     this.dataService.getsubModules().then(modules => this.modules = modules);
  }
// country in submodules
 getmodulescountry() {
     this.dataService.getmodulescountry().then(submoduleid => this.submoduleid = submoduleid);  // country access
  }
  // get product name by country
getsubmoduleproduct() {

     this.dataService.getmoduleproductid(this.mysubmodules.get('countryid').value).
       subscribe(subproduct => this.subproduct = subproduct);
  }
  // get domain name by product
  getsubmoduledomain() {

 
     this.dataService.getmoduledomainid(this.mysubmodules.get('countryid').value,
       this.mysubmodules.get('productid').value ).
       subscribe(subdomain => this.subdomain = subdomain);
  }
// get subdomain name by domain
  getsubmodulesubdomain() {

    this.dataService.getsubmodulesubdomain(this.mysubmodules.get('countryid').value,
      this.mysubmodules.get('productid').value,
      this.mysubmodules.get('domainrefid').value).
      subscribe(submodulesubdomain => this.submodulesubdomain = submodulesubdomain);
  }
  // get module name by subdomain
  getsubmodulemodules() {
    this.dataService.getsubmodulemodules(this.mysubmodules.get('countryid').value,
      this.mysubmodules.get('productid').value,
      this.mysubmodules.get('domainrefid').value,
      this.mysubmodules.get('subdomainrefid').value).
      subscribe(submodulemodules => this.submodulemodules = submodulemodules);
  }
  newAddsubmodule(): void {
    this.submitted = false;
    this.addsubmodule = new Addsubmodulevalues();
  }


}
