
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {stkretViewService} from  './stkretView.service'  ;


import { AppComponent } from '../../../app.component';



@Component({
  selector: 'app-stkretView',
  templateUrl: './stkretView.component.html',
  providers: [stkretViewService]
})
export class stkretViewComponent implements OnInit {



   public data: any; 
  public rowsOnPage: number =10;
  public filterQuery: string = ""; 
  public sortBy: string = "";
  public sortOrder: string = "desc";

  
  registerForm: FormGroup;

  datall = [];
  
    selobj ;
    constructor(private userService: stkretViewService   ,private formBuilder: FormBuilder) {}
  
    ngOnInit() {
   
      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     

     
      this.registerForm = this.formBuilder.group({
        
        MID  : [ 'WorldP64425807474247'  , []],
        CHANNEL_ID : ['kbzk1DSbJiV_O3p5'   , []],
        INDUSTRY_TYPE_ID  : [ 'WEB'  , []],
        WEBSITE : [ 'worldpressplg'  , []],
 
      }) ;

      this.viewAll() ;
  
    }
  
  
  
      viewAll() {
  
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
     this.userService.viewAll(JSON.stringify(frmdata)).subscribe(data => this.data = data,
        errorCode => console.log(errorCode));
  
  
   
    } 




    onSubmit(){






      alert('')  ;
      this.userService.save(JSON.stringify(this.registerForm.value)).subscribe(data =>  console.log(data),
        errorCode => console.log(errorCode) );

    }



  
}