
import {editSubTherapeuticService} from './editSubTherapeutic.service';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {NotificationsComponent} from '../../notifications/notifications.component';

const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers='^[0-9]+(\.[0-9]{1,2})?$';
const pattern= "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

@Component({
  selector: 'app-editSubTherapeutic',
  templateUrl: './editSubTherapeutic.component.html',
  providers: [editSubTherapeuticService,NotificationsComponent]
})
export class editSubTherapeuticComponent implements OnInit {
  private id:any;
  private empValue: any;
  therapeutics=[];
  EditSubTherapeuticForm: FormGroup;
  flag:boolean=false;
  constructor(private SubTherapeuticServices: editSubTherapeuticService, private route: ActivatedRoute,private router: Router,private notificationsComponent: NotificationsComponent) {
    let subtherapeuticname = new FormControl();
    let therapeuticid = new FormControl();
    let id = new FormControl();
    this.EditSubTherapeuticForm = new FormGroup({
      id:id,
      therapeuticid:therapeuticid,
      subtherapeuticname:  subtherapeuticname
    });

  }

  ngOnInit() {
    

    this.empValue = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });


    alert("ngOnInit is calling");

    
     
     this.SubTherapeuticServices.getSubTherapeutic(this.id).subscribe(data => {this.EditSubTherapeuticForm.patchValue(data),alert(JSON.stringify(data))},
      err => {
      console.log('Error occured in Company edit ');
    });

    this.SubTherapeuticServices.getTherapeutic().subscribe(data => this.therapeutics=data,
      err => {
      console.log('Error occured in Company edit ');
    });
  }

     

  onSubmit(){
    this.flag=this.validation();
    if(this.flag==true){
      alert("is exist");
     this.SubTherapeuticServices.isExistSubTherapeutic(this.EditSubTherapeuticForm.get('therapeuticid').value,this.EditSubTherapeuticForm.get('subtherapeuticname').value,this.EditSubTherapeuticForm.get('id').value).subscribe(data => { alert(data);
       if (data == true) {
         alert(data);      
         this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'THERAPEUTIC NAME IS ALREADY EXIST', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
       }else{
         this.UpdateRecord();
       }
     });
   }
   
 }
 private validation():boolean{
   alert("validation is calling");
   if(this.EditSubTherapeuticForm.get('therapeuticid').value=="opt1"){
    this.notificationsComponent.addToast({title:'ERROR MESSAGE', msg:'THERAPEAUTIC NAME IS EMPTY', timeout: 5000, theme:'default', position:'bottom-right', type:'error'});
    return false;
   }
   if(this.EditSubTherapeuticForm.get('subtherapeuticname').value==null || this.EditSubTherapeuticForm.get('subtherapeuticname').value==''){
     this.notificationsComponent.addToast({title:'ERROR MESSAGE', msg:'SUB THERAPEAUTIC NAME IS EMPTY', timeout: 5000, theme:'default', position:'bottom-right', type:'error'});
     return false;
   }
   return true;
 }

 private UpdateRecord(): void { 
  alert("createTherapeutic is calling");
    this.SubTherapeuticServices.updateSubTherapeutic(JSON.stringify(this.EditSubTherapeuticForm.value));
    this.router.navigate(['/subtherapeutic/viewsubtherapeutic']);  
}

}

