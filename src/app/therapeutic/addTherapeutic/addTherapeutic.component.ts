import {Component, OnInit,} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {addTherapeuticService} from './addTherapeutic.services';
import {providers} from 'ng2-toasty';
import { Router } from '@angular/router';
import {NotificationsComponent} from '../../notifications/notifications.component';

const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers='^[0-9]+(\.[0-9]{1,2})?$';
const pattern= "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  @Component({
  selector: 'app-addTherapeutic',
  templateUrl: './addTherapeutic.component.html',
  providers: [addTherapeuticService,NotificationsComponent]

})
export class addTherapeuticComponent implements OnInit {
  Therapeutic: FormGroup; 
  submitted = false;
  flag:boolean=false;

  constructor(private addTherapeuticService: addTherapeuticService ,private router: Router,formBuilder: FormBuilder,private notificationsComponent: NotificationsComponent)  {
    let therapeuticname = new FormControl();
    this.Therapeutic = new FormGroup({
      therapeuticname:  therapeuticname
    });

   
  }

  ngOnInit() {     
   
   }

   onSubmit(){
     this.flag=this.validation();
     if(this.flag==true){
      this.addTherapeuticService.isExistTherapeutic(this.Therapeutic.get('therapeuticname').value).subscribe(data => { alert(data);
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
    if(this.Therapeutic.get('therapeuticname').value==null || this.Therapeutic.get('therapeuticname').value==''){
      this.notificationsComponent.addToast({title:'ERROR MESSAGE', msg:'THERAPEAUTIC NAME IS EMPTY', timeout: 5000, theme:'default', position:'bottom-right', type:'error'});
      return false;
    }
    return true;
  }



  
  private createRecord(): void { 
    alert("createTherapeutic is calling");
      this.addTherapeuticService.createTherapeutic(JSON.stringify(this.Therapeutic.value));
      this.router.navigate(['/therapeutic/viewtherapeutic']);  
  }


}
