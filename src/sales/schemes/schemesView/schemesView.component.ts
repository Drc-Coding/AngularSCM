
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import { schemesViewService } from './schemesView.service';


 import { AppComponent } from '../../../app.component';
               



@Component({
  selector: 'app-schemesView',
  templateUrl: './schemesView.component.html',

  providers: [schemesViewService     ]
 
})
export class schemesViewComponent implements OnInit {



  datall = [];
  
    selobj ;
    constructor(private userService: schemesViewService) {}
  
    ngOnInit() {
  
  
     
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     


      this.viewAll() ;
  
    }
  
  
  
      viewAll() {
  
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      this.userService.viewSchemeAll(JSON.stringify(frmdata)).subscribe(data => this.datall = data,
        errorCode => console.log(errorCode));
  
  
   
    }
  



}