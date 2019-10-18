import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
@Component({
  selector: 'app-addusermodules',
  templateUrl: './addusermodules.component.html',
  styleUrls: ['./addusermodules.component.css'],
  providers: [NotificationsComponent]
})
export class AddusermodulesComponent implements OnInit {
  usermoduleForm: FormGroup;
  submoduleData = [];
  i;
  companylist = [];
  usermodulelist = [];
  submodulelist = [];
  userlist: any;
  public flag: boolean = false;
  constructor(private moduleService: UsersService, private notificationsComponent: NotificationsComponent, private router: Router) {
    const suserrefid = new FormControl();
    const moduleid = new FormControl();
    const submoduleid = new FormControl();
    const companyrefid = new FormControl();

    let is_approver = new FormControl();

    this.usermoduleForm = new FormGroup({
      companyrefid: companyrefid,
      is_approver: is_approver,
      suserrefid: suserrefid,
      moduleid: moduleid,
      submoduleid: submoduleid,
    });
  }

  ngOnInit() {
    //DROP DOWN PLACE HOLDER
    this.usermoduleForm.get('companyrefid').setValue('opt1');
    this.usermoduleForm.get('suserrefid').setValue('opt1');
    this.usermoduleForm.get('moduleid').setValue('opt1');
    this.moduleService.getCompanylist().then(data => { this.companylist = data });
    this.usermoduleForm.get('is_approver').setValue(false);

  }

  getUser() {
    this.moduleService.getUserlist(this.usermoduleForm.get('companyrefid').value).then(data => {
      this.userlist = data;
      if (data == null || data == '') {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'User Not Available..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    });
  }

  getUsermodule() {
    this.moduleService.getModule(this.usermoduleForm.get('suserrefid').value).then(data => { this.usermodulelist = data },
      err => {
        console.log('Error Occured On getModule()');
      });
  }

  getuserSubmodule() {
    this.usermoduleForm.get("submoduleid").setValue('');
    this.moduleService.getSubmodule(this.usermoduleForm.get('moduleid').value, this.usermoduleForm.get('suserrefid').value).subscribe(data => { this.submodulelist = data }, err => {
      console.log('Error Occured On getSubmodule()');
    });
  }

  onSubmit() {
    this.flag = this.validation();
    if (this.flag == true) {
      this.moduleService.addModule(this.usermoduleForm.get('suserrefid').value, 
      this.usermoduleForm.get('moduleid').value,
      this.usermoduleForm.get('is_approver').value,
      this.usermoduleForm.get('companyrefid').value).subscribe(data => {
        if (data == true) {
          this.saveSumnoduleData();
        }
      }, err => {
        console.log('Error Occured On addModule()')
      });
    }
  }

  saveSumnoduleData() {
    let sModuleID: any = this.usermoduleForm.get("submoduleid").value;
    let userid: any = this.usermoduleForm.get("suserrefid").value;
    let newmoduleid: any = this.usermoduleForm.get("moduleid").value;
    let approver: any = this.usermoduleForm.get("is_approver").value;
    for (this.i = 0; this.i < sModuleID.length; this.i++) {
      this.submoduleData.push({ suserrefid: userid, submoduleid: sModuleID[this.i], moduleid: newmoduleid,  is_approver: approver, companyrefid: this.usermoduleForm.get('companyrefid').value });
    }
    this.moduleService.addSubmodule(JSON.stringify(this.submoduleData)).subscribe(data => {
      if (data == true) {
        this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Data Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
        this.submodulelist = [];
        this.usermodulelist = [];
        this.userlist = [];
        this.usermoduleForm.reset();
        this.submoduleData = [];
        this.ngOnInit();
      }
    }, err => {
      console.log('Error Occured On addSubmodule()')
    });
  }
  validation(): boolean {
    if (this.usermoduleForm.get('companyrefid').value == 'opt1' || this.usermoduleForm.get('companyrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Company..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.usermoduleForm.get('suserrefid').value == 'opt1' || this.usermoduleForm.get('suserrefid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your UserName..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.usermoduleForm.get('moduleid').value == 'opt1' || this.usermoduleForm.get('moduleid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Module..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.usermoduleForm.get('submoduleid').value == 'opt1' || this.usermoduleForm.get('submoduleid').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your SubModule..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  viewUserModule() {
    this.router.navigate(['User/userviewmodule']);
  }


  isCheck(event: any) {

    if (event) {

      this.usermoduleForm.get('is_approver').setValue(event);

    }
    else {

      this.usermoduleForm.get('is_approver').setValue(event);

    }
  }
}