import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RoleService } from '../role.service';
import { NotificationsComponent } from '../../notifications/notifications.component';
@Component({
  selector: 'app-roledetails',
  templateUrl: './roledetails.component.html',
  providers: [NotificationsComponent]
})
export class RoledetailsComponent implements OnInit {
  @ViewChild("submod") smod: any;
  roleAssignForm: FormGroup;
  id: number;
  private sub: any;
  module = [];
  submodule = [];
  roleData = [];
  i; j;
  public reFlag: boolean = false;
  constructor(private editionService: RoleService, private route: ActivatedRoute,
    private notificationsComponent: NotificationsComponent, private router: Router) {
    const moduleid = new FormControl();
    const submoduleid = new FormControl();
    const roleid = new FormControl();
    const rolename = new FormControl();
    this.roleAssignForm = new FormGroup({
      moduleid: moduleid,
      submoduleid: submoduleid,
      roleid: roleid,
      rolename: rolename
    });

  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.roleAssignForm.get('roleid').setValue(this.id);
    this.editionService.getRoleName(this.id).subscribe(data => {
      this.roleAssignForm.get('rolename').setValue(data);
      err => {
        console.log('Error Occured On getRoleName()');
      }
    });
    this.roleAssignForm.get('moduleid').setValue('opt1');
    this.editionService.getModule(this.roleAssignForm.get('roleid').value).then(data => { this.module = data });
  }

  getSubmodule() {
    this.roleAssignForm.get("submoduleid").setValue('');
    this.editionService.getSubmodule(this.roleAssignForm.get('moduleid').value).subscribe(data => {
      this.submodule = data;
      this.smod.nativeElement.focus();
    },
      err => {
        console.log('Error Occured On getSubmodule()');
      });
  }

  roleValidation(): boolean {
    if (this.roleAssignForm.get("moduleid").value == null || this.roleAssignForm.get("moduleid").value == 'opt1') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Module Name is-Required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.roleAssignForm.get("submoduleid").value == 'noData' || this.roleAssignForm.get("submoduleid").value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'SubModule Name is-Required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  onSubmit() {
    this.reFlag = this.roleValidation();
    let subID = this.roleAssignForm.get("submoduleid").value;
    let mID = this.roleAssignForm.get("moduleid").value;
    let rID = this.roleAssignForm.get("roleid").value;
    this.roleData = [];
    if (this.reFlag == true) {
      for (this.i = 0; this.i < subID.length; this.i++) {
        this.roleData.push({ moduleid: mID, roleid: rID, submoduleid: subID[this.i] });
      }
      this.editionService.isRoleExist(rID, mID).subscribe(data => {
        if (data == true) {
          this.editionService.createCtrlRole(JSON.stringify(this.roleData)).subscribe(data => {
          },
            err => {
              console.log('Error Occured On createCtrlRole()');
            });
            this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Data Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            
         // this.router.navigate(['Role/ViewRole']);
        this.ngOnInit();
        }
        else {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Role Not Saved..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      },
        err => {
          console.log('Error Occured On isRoleExist()');
        })
    }
  }

  viewRole() {
    this.router.navigate(['Role/ViewRole']);
  }
}
















