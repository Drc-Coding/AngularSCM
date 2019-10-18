import { Addmodule } from '../addmodule';
import { DataModules } from '../modules.service';
import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NotificationsComponent }  from  '../../notifications/notifications.component';
import { AdminLayoutComponent } from '../../layouts/admin/admin-layout.component';

import { Router  } from '@angular/router';

@Component({
  selector: 'app-addmodules',
  templateUrl: './addmodules.component.html',
  providers:[NotificationsComponent,AdminLayoutComponent]

})
export class AddmodulesComponent implements OnInit {
mymodules: FormGroup;
addmodule = new Addmodule;
submitted = false;
   moduleid: any;
   product: any;
   domain: any;            
   subdomain: any;
  modules: Addmodule[];
  selectedModules: Addmodule;
  constructor(private dataService: DataModules,  private router: Router,private notificationsComponent:NotificationsComponent,
    private location: Location)   {

   let countryid = new FormControl('', Validators.required);
    let productid = new FormControl('', Validators.required);
    let domainrefid = new FormControl('', Validators.required );
    let subdomainrefid = new FormControl('', Validators.required);
    let label = new FormControl('', Validators.required);
    let modulename = new FormControl('', Validators.required);
    let modulecode = new FormControl('', Validators.required);
    let icon = new FormControl('', Validators.required);
    let status = new FormControl('', Validators.required);
    let clientcdate = new FormControl();
    let createdby = new FormControl();


    
    
    this.mymodules = new FormGroup({

      clientcdate : clientcdate,
      createdby : createdby,
     countryid: countryid,
      productid: productid,
      domainrefid: domainrefid,
      subdomainrefid: subdomainrefid,
      label: label, 
      modulename: modulename,
      modulecode: modulecode, 
      icon: icon,
      status: status,
      
      });
    }

  ngOnInit() {
      this.getModules();
      this.getmodulesid();

      this.mymodules.get('countryid').setValue(0);
      this.mymodules.get('productid').setValue(0);
      this.mymodules.get('domainrefid').setValue(0);
      this.mymodules.get('subdomainrefid').setValue(0);
    



  }
  private save(): void {
    this.dataService.create(this.mymodules.value);
    this.notificationsComponent.addToast({title:'Sucess', msg:'Module Saved Sucessfully..', timeout: 5000, theme:'default', position:'top-right',type:'success'});
    this.mymodules.reset();
    this.ngOnInit();
  }
  getModules() {
    this.dataService.getModules().then(modules => this.modules = modules);
 }
  // modules byid country
  getmodulesid() {
    this.dataService.getmodulesid().then(moduleid => this.moduleid = moduleid);
 }
  view(): void {
    this.router.navigate(['Module/ViewModule']);
   }
  // product name
  getproduct() {
    this.dataService.getmoduleid(this.mymodules.get('countryid').value).
      subscribe(product => this.product = product);
 }

  // domain name
  getdomain() {
   this.dataService.getdomainid(this.mymodules.get('countryid').value,
     this.mymodules.get('productid').
       value).subscribe(domain => this.domain = domain);
    }
  // subdomain name
  getsubdomain() {
   this.dataService.getsubdomainid(this.mymodules.get('countryid').value,
     this.mymodules.get('productid').value,
     this.mymodules.get('domainrefid').value).
     subscribe(subdomain => this.subdomain = subdomain);
    }
onSubmit() {
  this.submitted = true;

  



 this.save();
  
  }
   goBack(): void {
    this.location.back();
  }
newAddmodule(): void {
    this.submitted = false;
    this.addmodule = new Addmodule();
  }
//   onSelect(cust: Addmodule): void {
//    this.selectedModules = cust;
//  }
}
