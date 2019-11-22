import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import {purchaseOrderViewService} from './purchaseOrderView.services';
import { Router } from '@angular/router'
import { error } from 'selenium-webdriver';
import { AppComponent } from '../../app.component'
import { NotificationsComponent } from '../../notifications/notifications.component';
@Component({
  selector: 'Purchase Order',
  templateUrl: './purchaseOrderView.component.html',
  styleUrls: ['./purchaseOrderView.component.css'],
  providers: [purchaseOrderViewService,  NotificationsComponent]
})
export class purchaseOrderViewComponent implements OnInit {
 
  public data=[];
  public rowsOnPage: number =20;
  public filterQuery: string = "";
  public sortBy: string = "";
  public sortOrder: string = "desc";
  purchaseOrder :any= [];  
  purchaseOrders: FormGroup;
  gifFail: boolean=true;
 
  
  constructor(private poservices: purchaseOrderViewService, private route: Router, private formBuilder:FormBuilder,private notificationsComponent: NotificationsComponent) {            
    this.purchaseOrders = this.formBuilder.group({
      companyid: ['', []],
      branchid: ['', []],
      locname: ['', []],
      locref: ['', []],
    }); 
  }

  ngOnInit() {
    this.purchaseOrders.get('companyid').setValue(AppComponent.companyID);
    this.purchaseOrders.get('branchid').setValue(AppComponent.branchID);
    this.purchaseOrders.get('locname').setValue(AppComponent.locrefID);

    if (AppComponent.shopID != 0) {
      this.purchaseOrders.get('locref').setValue(AppComponent.shopID);
    }

    if (AppComponent.warehouseID != 0) {
      this.purchaseOrders.get('locref').setValue(AppComponent.warehouseID);
    }

    if (AppComponent.hospitalID != 0) {
      this.purchaseOrders.get('locref').setValue(AppComponent.hospitalID);
    }
   
    setTimeout(() => {
    this.poservices.viewPurchaseOrders(AppComponent.companyID,AppComponent.branchID,AppComponent.locrefID,this.purchaseOrders.get('locref').value).subscribe(data =>{this.data = data},
    err =>{
      console.log('Error Occured Get States');
    });

    this.gifFail=false;
    
  },3000);

  }
 // i;
  // inc=0;
  // getTableData(datas:any){
  //   if(datas!==null || datas!==undefined)
  //   {   
  //     let flag:number=0; 
  //     for(this.i=0;this.i<datas.length;this.i++)
  //     {                      
  //       this.data.push(this.setTabledata(datas[this.i][0],datas[this.i][1],datas[this.i][2],datas[this.i][3],datas[this.i][4],datas[this.i][5],datas[this.i][6],datas[this.i][7],datas[this.i][8]));
  //       this.inc+=1;
  //     }     
  //    }
    
  // }
  // setTabledata(poid:any,distname:any,pono:any,podate:any,totptd:any,totboxqty:any,totstpqty:any,tottabqty:any,purchaseorderid:any) 
  // { 
  //   return {     
  //     id:poid,
  //     name:distname,
  //     purchaseorderno:pono,
  //     podate:podate,
  //     totalproduct:totptd,
  //     totalboxqty:totboxqty,
  //     totalstpqty:totstpqty,
  //     totaltabqty:tottabqty,
  //     poid:purchaseorderid     
  //   }
  // }

  PurchaseOrderDelete(id:number) {

    var answer = confirm("Delete data?");
    if (answer) {
     this.poservices.PurchaseOrderDelete(id).subscribe(data=>{
                     
      this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Deleted Sucessfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
                this.ngOnInit();
                  
                   }
           );
                  }
    
 }
}


