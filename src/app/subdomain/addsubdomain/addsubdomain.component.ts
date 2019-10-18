import {SubdomainService} from '../subdomain.service';
import {Component, OnInit,ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {NotificationsComponent }  from  '../../notifications/notifications.component';
import { AdminLayoutComponent } from '../../layouts/admin/admin-layout.component';
import {dateFormatPipe }  from  '../../notifications/notifications.datepipe';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-addsubdomain',
  templateUrl: './addsubdomain.component.html',
  providers:[NotificationsComponent,AdminLayoutComponent,dateFormatPipe]
})
 
export class AddsubdomainComponent implements OnInit {
  @ViewChild('subdomainName') subDom: any;
  subDomainForm: FormGroup;
  country=[];
  productname=[];
  domainname=[];
  submitted = false;
  reFlag:boolean=false;
  date:any;
  constructor(private domainService: SubdomainService, private router: Router,private notificationsComponent:NotificationsComponent,
    private adminLayoutComponent:AdminLayoutComponent,private dateformatPipe:dateFormatPipe) {
    const countryid = new FormControl();
    const domainrefid = new FormControl();
    const subdomaincode = new FormControl();
    const productid = new FormControl();
    const subdomainname = new FormControl('', Validators.required);    
    const status = new FormControl();
    let clientcdate = new FormControl();
    let createdby = new FormControl();


    this.subDomainForm = new FormGroup({

      clientcdate : clientcdate,
      createdby : createdby,
      countryid: countryid,
      domainrefid: domainrefid,    
      productid: productid,
      subdomainname: subdomainname,
      subdomaincode :subdomaincode,
      status: status
    });

  }
  ngOnInit() {
    this.subDomainForm.get('countryid').setValue("opt1");
    this.subDomainForm.get('domainrefid').setValue("opt1");
    this.subDomainForm.get('productid').setValue("opt1");
    this.subDomainForm.get('status').setValue("0");
    this.getCountry();
  }


  getproduct() {
   
    this.domainService.getproduct(this.subDomainForm.get('countryid').value).subscribe(data => this.productname = data,
    err=>
    {
    console.log("Error Occur On getproduct()");
  });
}
  

  getdomain() {
    if(this.subDomainForm.get('countryid').value=='opt1')
    {      
      this.notificationsComponent.addToast({title:'Warning Message', msg:'Select Your Country Name First..', timeout: 5000, theme:'default', position:'top-right',type:'warning'});
    }else{
    this.domainService.getdomain(this.subDomainForm.get('productid').value).subscribe(data => this.domainname = data,
      err=>
      {
      console.log("Error Occur On getproduct()");
    });
  }
  }
  getCountry() {
    this.domainService.getcountry().then(data => this.country = data);
  }

onSubmit():any {
  this.submitted = true;  
  this.reFlag=this.subDomainValidation();
  if(this.reFlag==true)
  {

    this.subDomainForm.get('clientcdate').setValue(AppComponent.date);
    this.subDomainForm.get('createdby').setValue(AppComponent.userID);

    this.domainService.chkSubdomain(this.subDomainForm.get('domainrefid').value,this.subDomainForm.get('countryid').value,
    this.subDomainForm.get('productid').value,this.subDomainForm.get('subdomainname').value).subscribe(data=>{  
    if(data==1)
    {
      this.notificationsComponent.addToast({title:'Error', msg:'sub-Domain Name Already Exist..', timeout: 5000, theme:'default', position:'top-right',type:'error'});           
      this.subDomainForm.get('subdomainname').setValue("");
      this.subDom.nativeElement.focus();     
    } else{     
      this.domainService.createSubdomain(this.subDomainForm.value).subscribe(data=>{
        err=>{
          console.log('Error Occured On createSubdomain()');
        }
      });
      this.notificationsComponent.addToast({title:'Sucess', msg:'Sub-Domain Saved Sucessfully..', timeout: 5000, theme:'default', position:'top-right',type:'success'});
      let dates:any=new Date();   
      this.date = this.dateformatPipe.transform(dates);         
      let setData:any=['Sub-Domain','Sub-Domain Saved Sucessfully..',this.date];
      localStorage.setItem("Sucess-Notify",JSON.stringify(setData));
      this.subDomainForm.reset();
      this.ngOnInit();
    }   
  });
  }
}

subDomainValidation():boolean
{  
  if(this.subDomainForm.get('countryid').value=="opt1" || this.subDomainForm.get('countryid').value==null)
 { 
  this.notificationsComponent.addToast({title:'Error Message', msg:'Please Select Your Country..', timeout: 5000, theme:'default', position:'top-right',type:'error'});
  return false;
 }

 if(this.subDomainForm.get('productid').value=="opt1" || this.subDomainForm.get('productid').value==null)
 { 
  this.notificationsComponent.addToast({title:'Error Message', msg:'Please Select Your ProdutnName..', timeout: 5000, theme:'default', position:'top-right',type:'error'});
  return false;
 }

 if(this.subDomainForm.get('domainrefid').value=="opt1" || this.subDomainForm.get('domainrefid').value==null)
 { 
  this.notificationsComponent.addToast({title:'Error Message', msg:'Please Select Your DomainName..', timeout: 5000, theme:'default', position:'top-right',type:'error'});
  return false;
 }

 if(true)
 {
  var str = this.subDomainForm.get('subdomainname').value;
  var res = str.substring(0, 3);          
  this.subDomainForm.get('subdomaincode').setValue(res.toUpperCase());
 }
return true;
}

viewSubDomain(): void{
  this.router.navigate(['SubDomain/ViewSubDomain']);
}
}

