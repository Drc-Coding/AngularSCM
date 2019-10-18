
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {priceUpdateService} from  './priceUpdate.service'  ;

import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-priceUpdate',
  templateUrl: './priceUpdate.component.html',
    providers: [priceUpdateService]

 
})
export class priceUpdateComponent implements OnInit {




   public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";
    selobj ;
    constructor(private userService: priceUpdateService) {}
  
    ngOnInit() {
  
  

      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     

     
      this.viewAll() ;
  
    }
  
  
  
      viewAll() {

        var   frmdata={ frmint1 : ''  ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname  , companyid  :this.selobj.companyid   } ;
   
    
      this.userService.viewAll(JSON.stringify(frmdata)  ).subscribe(data =>{  this.data = data     },
        errorCode => console.log(errorCode));
  
  
   
    }

}