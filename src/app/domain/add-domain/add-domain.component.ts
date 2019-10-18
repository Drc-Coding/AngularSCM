import {Component, OnInit,ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Domain} from '../domain';
import {DomainService} from '../domain.service';
import {NotificationsComponent }  from  '../../notifications/notifications.component';
import { AppComponent} from '../../app.component';
@Component({
  selector: 'app-add-domain',
  templateUrl: './add-domain.component.html',
  providers:[NotificationsComponent]
}) 
export class AddDomainComponent implements OnInit {
  @ViewChild('domainName') dom: any;
  domainForm: FormGroup;
  country=[];
  product=[];
  flag:any;
  public submitted=false;
  constructor(private domainService: DomainService,private router: Router,private notificationsComponent:NotificationsComponent) {
    const countryid = new FormControl();
    const domainname = new FormControl('',[Validators.minLength(3)]);
    const domaincode = new FormControl();
    const productid = new FormControl();
    this.domainForm = new FormGroup({
      countryid: countryid,
      domainname: domainname,
      domaincode: domaincode,
      productid: productid,
    });
  }

  ngOnInit() {
    this.domainForm.get('countryid').setValue("opt1");
    this.domainForm.get('productid').setValue("opt1");       
    this.domainService.getcountry().then(data => this.country = data,
      err=>
      {
        console.log('Error Domain getCountry()');
      }
    );
   //alert('userid  '+AppComponent.userID+'compid  '+AppComponent.companyID+'usertype '+AppComponent.usertype+ 'barnch id'+AppComponent.branchID);
   //alert('shopidd '+AppComponent.shopID+'hospitak '+AppComponent.hospitalID+'warehouseid '+AppComponent.warehouseID );
   //alert('locrefid '+AppComponent.locrefID+'locname '+AppComponent.locRefName);
   //alert('locrefid1 '+AppComponent.locrefID1+'locname1 '+AppComponent.locRefName1);
  }

  getproduct() {
    this.domainService.getproduct(this.domainForm.get('countryid').value).subscribe(data => this.product = data,
    err=>
    {
      console.log('Error Domain getproduct()');
    }
    );
  }
  onSubmit() {
    this.submitted = true; 
    this.save();
  }

  private save(): void {
    this.flag=this.validation();
    if(this.flag==true)
    {      
      this.domainService.checkProduct(this.domainForm.get('countryid').value,this.domainForm.get('productid').value,this.domainForm.get('domainname').value).subscribe(
        data=>{          
        if(data==1)
        {        
          this.notificationsComponent.addToast({title:'Error', msg:'Domain Name Already Exist', timeout: 5000, theme:'default', position:'top-right',type:'error'});           
          this.domainForm.get('domainname').setValue("");
          this.dom.nativeElement.focus();              
        }
        else{        
          this.domainService.create(this.domainForm.value).subscribe(data=>
            err=>{
               console.log('Error On Domain save()')
           });          
           this.notificationsComponent.addToast({title:'Sucess', msg:'Domain Saved Sucessfully..', timeout: 5000, theme:'default', position:'top-right',type:'success'});
           this.domainForm.reset();
           this.ngOnInit();
        }       
      });      
    }    
  }

  public validation():boolean
  {    
    if(this.domainForm.get('countryid').value=="opt1")
    {     
     this.notificationsComponent.addToast({title:'Error', msg:'CountryName must Not be Empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});           
      return false;
    }
   

    if(this.domainForm.get('productid').value=="opt1")
    {    
      this.notificationsComponent.addToast({title:'Error', msg:'ProductName must Not be Empty', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }
    

    if(this.domainForm.get('domainname').value=="" || this.domainForm.get('domainname').value==null)
    {     
      this.notificationsComponent.addToast({title:'Error', msg:'Domain Name is Required Field', timeout: 5000, theme:'default', position:'top-right',type:'error'});
      return false;
    }
    
              
    if(true)                   
    {
      var str = this.domainForm.get('domainname').value;
      var res = str.substring(0, 3);          
      this.domainForm.get('domaincode').setValue(res.toUpperCase());
    }
    return true;
  }

  viewDomain()
  {
      this.router.navigate(['/Domain/ViewDomain']);    
  }
}
