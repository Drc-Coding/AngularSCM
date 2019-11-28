
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {perinvViewService } from './perinvView.service'  ;


@Component({
  selector: 'app-perinvView',
  templateUrl: './perinvView.component.html',
 
  
  providers: [perinvViewService  ]
})
export class perinvViewComponent implements OnInit {





  

  pharmacomp = [];
  selobj  ;
  
    constructor(private userService: perinvViewService) {}
  
    ngOnInit() {
      this.selobj  = {   userid  :'0' , locrefid  :'0' , locname  :'0'    }  ;
  
  



     var   frmdata={ frmint1 : '' ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
      this.userService.phcompanyView( JSON.stringify(frmdata) ).subscribe(data => {this.pharmacomp = data     } ,
        errorCode => console.log(errorCode));


    }
  
  
  


}