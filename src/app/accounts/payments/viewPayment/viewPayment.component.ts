

import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {viewPaymentService} from './viewPayment.service';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-patientedit',
  templateUrl: './viewPayment.component.html',

  providers: [viewPaymentService,NgbDropdownConfig]

})
export class viewPaymentComponent  {



   public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";

  dataall = [];
  
    selobj ;
    constructor(private userService: viewPaymentService ) {}
  
    ngOnInit() {
  
  
 
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     
      
      this.viewAll() ;
  
    }
  
  
  
     viewAll() {
  
      var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      this.userService.viewPaymentAll(JSON.stringify(frmdata)).subscribe(data => this.data = data,
        errorCode => console.log(errorCode));
  
    }
  
}
 