
import { editTherapeuticService } from './editTherapeutic.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { NotificationsComponent } from '../../notifications/notifications.component';

const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
const pattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

@Component({
  selector: 'app-editTherapeutic',
  templateUrl: './editTherapeutic.component.html',
  providers: [editTherapeuticService, NotificationsComponent]
})
export class editTherapeuticComponent implements OnInit {
  private id: any;
  private empValue: any;
  EditTherapeutic: FormGroup;
  therapeuticname = [];
  flag: boolean = false;
  constructor(private TherapeuticServices: editTherapeuticService, private route: ActivatedRoute, private router: Router, private notificationsComponent: NotificationsComponent) {
    let id = new FormControl();
    let therapeuticname = new FormControl();
    this.EditTherapeutic = new FormGroup({
      therapeuticname: therapeuticname,
      id:id
    });


  }

  ngOnInit() {


    this.empValue = this.route.params.subscribe(params => {
      this.id = +params['id'];
      alert(this.id);
    });

    this.TherapeuticServices.getTherapeutic(this.id).subscribe(data => { this.EditTherapeutic.patchValue(data),alert(JSON.stringify(data)) },
      err => {
        console.log('Error occured in Company edit ');
      });
  }

  onSubmit() {
    this.flag=this.validation();
    if(this.flag==true){
      this.TherapeuticServices.isTherapeuticExist(this.EditTherapeutic.get('therapeuticname').value,this.EditTherapeutic.get('id').value).subscribe(data => { alert(data);
        if (data == true) {
          alert(data);      
          this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'THERAPEUTIC NAME IS ALREADY EXIST', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
        }else{
          this.updateTherapeutic();
        }
      });
    }
  }

  private validation():boolean{
    if(this.EditTherapeutic.get('therapeuticname').value==null || this.EditTherapeutic.get('therapeuticname').value==''){
      this.notificationsComponent.addToast({title:'ERROR MESSAGE', msg:'THERAPEAUTIC NAME IS EMPTY', timeout: 5000, theme:'default', position:'bottom-right', type:'error'});
      return false;
    }
    return true;
  }


  private updateTherapeutic(): void {
    alert(JSON.stringify(this.EditTherapeutic.value));
    this.TherapeuticServices.updateTherapeutic(JSON.stringify(this.EditTherapeutic.value));
    this.router.navigate(['/therapeutic/viewtherapeutic']);
  }

}
