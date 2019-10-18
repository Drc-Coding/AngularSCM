
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';


import {prodmapViewService} from './prodmapView.service';

 import { AppComponent } from '../../../app.component';
               

@Component({
  selector: 'app-prodmapView',
  templateUrl: './prodmapView.component.html',
   providers: [prodmapViewService ]
})
export class prodmapViewComponent implements OnInit {




  datall = [];
  
  selobj ;
  
    statusCode: number;
  
    constructor(private userService: prodmapViewService) {}
  
    ngOnInit() {
  
 
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     

      var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      this.userService.viewProdMapAll(JSON.stringify(frmdata)).subscribe(data => this.datall = data,
        errorCode => console.log(errorCode));
  
    }
  
    
  
  
 


}