import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleService } from '../role.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {AppComponent} from '../../app.component';


@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  providers: [NotificationsComponent]
})
export class AddroleComponent implements OnInit {
  @ViewChild('role') rName: any;
  roleForm: any;
  companylist = [];
  flag: boolean = false;
  constructor(private rollService: RoleService, private router: Router, private notificationsComponent: NotificationsComponent) {
    const companyid = new FormControl();
    const rolename = new FormControl();

    let clientcdate = new FormControl();
    let createdby = new FormControl();




    this.roleForm = new FormGroup({
      companyid: companyid,
      rolename: rolename,
      clientcdate: clientcdate,
      createdby:createdby,

    });
  }

  ngOnInit() {
    this.roleForm.get('companyid').setValue("opt1");
    this.rollService.getCompanies().subscribe(data => this.companylist = data);
  }
  public reFlag: boolean = false;
  onSubmit() {
    this.reFlag = this.roleValidation();
    if (this.reFlag == true) {
      this.rollService.isExist(this.roleForm.get('companyid').value, this.roleForm.get('rolename').value).subscribe(data => {
        if (data == true) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Role Name is Already Exist', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
          this.roleForm.get('rolename').setValue("");
          this.rName.nativeElement.focus();
        }
        else {

          this.roleForm.get('clientcdate').setValue(AppComponent.date);
          this.roleForm.get('createdby').setValue(AppComponent.userID);
    
    
    
          this.rollService.createRole(JSON.stringify(this.roleForm.value)).subscribe(data => {
            if (data == true) {
              this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Role Saved Sucessfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
              this.roleForm.reset();
              
              this.ngOnInit();
            }
            else {
              this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Role Name Not Saved', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            }
          },
            err => {
              console.log('Errror occured omn createRole()');
            }
          );
        }
      },
        err => {
          console.log('Errror occured omn isExist()');
        });
    }
  }

  roleValidation(): boolean {
    if (this.roleForm.get('companyid').value == "opt1" || this.roleForm.get('companyid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Company Name is required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.roleForm.get('rolename').value == "" || this.roleForm.get('rolename').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Role Name is required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }
  view(): void {
    this.router.navigate(['Role/ViewRole']);
  }

}