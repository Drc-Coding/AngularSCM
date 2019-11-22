
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import { schemesSaveService } from './schemesSave.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;

import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 

 import { AppComponent } from '../../../app.component';
               


@Component({
  selector: 'app-schemesSave',
  templateUrl: './schemesSave.component.html',
  providers: [schemesSaveService ,NotificationsComponent  , dateFormatPipe ]
})
export class schemesSaveComponent implements OnInit {




  selobj ;

  registerForm: FormGroup;




  constructor(private formBuilder: FormBuilder  ,    private   dateformat: dateFormatPipe , private userService: schemesSaveService ,private modalService: NgbModal  , private notificationsComponent:NotificationsComponent) {}

  ngOnInit() {



    var  date  =this.dateformat.transformnew(Date.now()) ;



      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     


    this.registerForm = this.formBuilder.group({

      
	  scheme_name : [, []],
	  scheme_start_date : [, []],
	  scheme_end_date : [, []],
	  min_amt_equivalent_point : [, []],
	  equivalent_point : [, [ ]  ] ,
	  reward_type : [, []],
	  cash_discount : [, []],
	  min_reward_point : [, []],


	  is_active : [, []],

	  clientcdate : [  this.dateformat.transform04()  , []],
	  clientcdate1 : [   this.dateformat.transform04()  , []],

	   schemeno : [, []],


   



   
      createdby:   [this.selobj.userid , []]         ,
      locrefid:   [this.selobj.locrefid , []]         ,
     locname:     [this.selobj.locname , []]         , 
   
   
    });


  
      
      $( document ).ready(function() {
        
   
    
        });

        this.registerForm.get('reward_type').setValue(1) ;

  }




  onSubmit() {

    var answer =  confirm("Save data?");

    
     if (answer) { 

   this.userService.saveScheme(JSON.stringify(this.registerForm.value  )  ) .subscribe(data =>{   this.savevalid( data)  },
   errorCode => {
   console.log(errorCode)  ;
   });  

   }


  }






savevalid(data:any){
  if(data==1){ 
  
        this.notificationsComponent.addToast({title:'Success', msg:'Data  Saved  ', timeout: 5000, theme:'default', position:'top-right',type:'success'}); 
  }else{

    this.notificationsComponent.addToast({title:'Error', msg:'Data Not  saved  ', timeout: 5000, theme:'default', position:'top-right',type:'error'}); 

  }
    }
  
 








}