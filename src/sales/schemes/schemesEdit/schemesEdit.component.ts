
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import { schemesEditService } from './schemesEdit.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


import {NotificationsComponent }  from  '../../../notifications/notifications.component'  ;

import {dateFormatPipe }  from  '../../../notifications/notifications.datepipe'  ; 


 import { AppComponent } from '../../../app.component';
               



@Component({
  selector: 'app-schemesEdit',
  templateUrl: './schemesEdit.component.html',

  providers: [schemesEditService ,NotificationsComponent    , dateFormatPipe  ]

 
})
export class schemesEditComponent implements OnInit {




  registerForm: FormGroup;
  
  id: number;
  
  private sub: any;
  


  selobj ;


  constructor(private formBuilder: FormBuilder  ,    private   dateformat: dateFormatPipe  , private userService: schemesEditService ,private modalService: NgbModal    , private route: ActivatedRoute  , private notificationsComponent:NotificationsComponent  ) {}

  ngOnInit() {
    
  
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
    


     

      this.selobj  = {   userid  : AppComponent.userID , locrefid  :AppComponent. locrefID1 , locname  :AppComponent.locRefName1       , countryrefid  :AppComponent.countryID   , companyid  :AppComponent.companyID    , branchrefid  :AppComponent.branchID   }  ;
     

        
    
        this.registerForm = this.formBuilder.group({
    

           id  : [, []],
          scheme_name : [, []],
          scheme_start_date : [, []],
          scheme_end_date : [, []],
          min_amt_equivalent_point : [, []],
          equivalent_point : [, []  ] ,
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
    

    
        var   frmdata={ frmint1 : this.id  ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
         this.userService.viewSchemeEdit(JSON.stringify(frmdata) ).subscribe(data => {  this.registerForm.patchValue(data)   },
      errorCode => {
        console.log('Error occured');
      });
    
 
  
    
        this.registerForm.get('reward_type').setValue(1) ;
     
         
    
      }
    


      onSubmit() {
        
        var answer =  confirm("Save data?");
        
         if (answer) { 
         
           this.userService.saveScheme(JSON.stringify(this.registerForm.value)) .subscribe(data =>{this.savevalid(data)},
           errorCode => {
             console.log(errorCode)   ;
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

  

      deleteScheme(){
      
  
   var   frmdata={ frmint1 : this.registerForm.get('id').value ,  frmstr1  :'', createdby  :'' , locrefid  :this.selobj.locrefid , locname  :this.selobj.locname   } ;
    this.userService.deleteScheme( JSON.stringify(frmdata) ).subscribe(data => {  },
      errorCode => console.log(errorCode));
          
        
    }



}