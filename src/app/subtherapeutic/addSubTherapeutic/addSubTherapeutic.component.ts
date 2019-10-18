import {Component, OnInit,} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {addSubTherapeuticService} from './addSubTherapeutic.services';
import {providers} from 'ng2-toasty';
import { Router } from '@angular/router';
import {NotificationsComponent} from '../../notifications/notifications.component';

const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers='^[0-9]+(\.[0-9]{1,2})?$';
const pattern= "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  @Component({
  selector: 'app-addSubTherapeutic',
  templateUrl: './addSubTherapeutic.component.html',
  providers: [addSubTherapeuticService,NotificationsComponent]

})
export class addSubTherapeuticComponent implements OnInit {
  subTherapeuticForm: FormGroup; 
  submitted = false;
  flag:boolean=false;
  therapeutics=[];

  constructor(private TherapeuticService: addSubTherapeuticService ,private router: Router,formBuilder: FormBuilder,private notificationsComponent: NotificationsComponent)  {
    let subtherapeuticname = new FormControl();
    let therapeuticid = new FormControl();
    this.subTherapeuticForm = new FormGroup({
      therapeuticid:therapeuticid,
      subtherapeuticname:  subtherapeuticname
    });

   
  }

  ngOnInit() {  
    this.subTherapeuticForm.get('therapeuticid').setValue("opt1");   
    this.TherapeuticService.getTharapeutics().subscribe(data => {this.therapeutics = data,alert(data)},  
      err => {
        console.log('Error Occured ');
      });  
   }

   onSubmit(){
    this.flag=this.validation();
    if(this.flag==true){
     this.TherapeuticService.isExistSubTherapeutic(this.subTherapeuticForm.get('therapeuticid').value,this.subTherapeuticForm.get('subtherapeuticname').value).subscribe(data => { alert(data);
       if (data == true) {
         alert(data);      
         this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'THERAPEUTIC NAME IS ALREADY EXIST', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
       }else{
         this.createRecord();
       }
     });
   }
   
 }
 private validation():boolean{
   alert("validation is calling");
   if(this.subTherapeuticForm.get('therapeuticid').value=="opt1"){
    this.notificationsComponent.addToast({title:'ERROR MESSAGE', msg:'THERAPEAUTIC NAME IS EMPTY', timeout: 5000, theme:'default', position:'bottom-right', type:'error'});
    return false;
   }
   if(this.subTherapeuticForm.get('subtherapeuticname').value==null || this.subTherapeuticForm.get('subtherapeuticname').value==''){
     this.notificationsComponent.addToast({title:'ERROR MESSAGE', msg:'SUB THERAPEAUTIC NAME IS EMPTY', timeout: 5000, theme:'default', position:'bottom-right', type:'error'});
     return false;
   }
   return true;
 }

 private createRecord(): void { 
  alert("createTherapeutic is calling");
    this.TherapeuticService.createSubTherapeutic(JSON.stringify(this.subTherapeuticForm.value));
    this.router.navigate(['/subtherapeutic/viewsubtherapeutic']);  
}

}
