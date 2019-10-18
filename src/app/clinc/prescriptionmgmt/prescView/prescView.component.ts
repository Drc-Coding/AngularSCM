
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import { Http, Response, RequestOptions , Headers} from '@angular/http';

import {prescViewService} from './prescView.service'  ;

@Component({
  selector: 'app-prescView',
  templateUrl: './prescView.component.html',
  providers: [prescViewService]
 
})
export class prescViewComponent implements OnInit {



  pharmacomp = [];
  
  selobj ;
    constructor(private userService: prescViewService) {}
  
    ngOnInit() {
  
  
      this.selobj  = {   userid  :'0' , locrefid  :'0' , locname  :'0'    }  ;
      
      this.viewAll() ;
  
    }
  
  
  
      viewAll() {
        var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      this.userService.phcompanyView(JSON.stringify(frmdata)).subscribe(data => this.pharmacomp = data,
        errorCode => console.log(errorCode));

      }

  

}