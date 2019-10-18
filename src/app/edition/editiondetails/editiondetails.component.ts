import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { EditionService } from '../edition.service';
@Component({
  selector: 'app-editiondetails',
  templateUrl: './editiondetails.component.html',
  styleUrls: ['./editiondetails.component.css'],
  providers: [NotificationsComponent]
})
export class EditiondetailsComponent implements OnInit {
  eId: any;
  subDomainID: any;
  moduleAssignForm: any;
  modulelist = [];
  submodulelist = [];
  dropdownSettings1 = {};
  dropdownSettings2 = {};
  submitted = false;
  i;
  editionID: any;
  sub: any;
  public returnFlag: boolean = false;
  constructor(private editionService: EditionService, private notificationsComponent: NotificationsComponent,
    private router: ActivatedRoute, private formBuilder: FormBuilder, private routers: Router) {
    this.moduleAssignForm = this.formBuilder.group({
      editionid: ['', []],
      subdomainrefid: ['', []],
      moduleid: ['', []],
      submoduleid: ['', []],
      editionname: ['', []],
      subdomainname: ['', []],
    });
  }

  ngOnInit() {
    this.sub = this.router.queryParams.subscribe(params => {
      this.eId = +params['editionId'];
      this.subDomainID = +params['subDomainID'];
    });

    this.moduleAssignForm.get('editionid').setValue(this.eId);
    this.editionService.checkEditionid(this.eId).subscribe(data => {
      this.editionID = data;
    },
      err => {
        console.log('Console Error On getModules()');
      });

    this.moduleAssignForm.get('subdomainrefid').setValue(this.subDomainID);
    //**Get Edition**//
    this.editionService.getEditionname(this.eId).subscribe(data => {
      this.moduleAssignForm.get('editionname').setValue(data.toString())
    },
      err => {
        console.log('Error Occured On getEditionname()');
      });
    //**Get Sub-Domain**//
    this.editionService.getSubdomainname(this.subDomainID).subscribe(data => {
      this.moduleAssignForm.get('subdomainname').setValue(data.toString())
    },
      err => {
        console.log('Error Occured On getSubdomainname()');
      });

    //**GET MODULE LIST**//
    this.editionService.getModulelist(this.eId).subscribe(data => { this.setModuleList(data) },
      err => {
        console.log('Error Occured On getModulelist()');
      });

    this.dropdownSettings1 = {
      maxHeight: 400,
      singleSelection: false,
      text: "--- Select Module ---",
      badgeShowLimit: 1,
      classes: "myclass custom-class",
    };

    this.dropdownSettings2 = {
      maxHeight: 400,
      singleSelection: false,
      text: "--- Select Sub-Module ---",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };
  }

  setModuleList(data: any) {
    for (this.i = 0; this.i < data.length; this.i++) {
      this.modulelist.push({ id: data[this.i][0], itemName: data[this.i][1] });
    }
  }
  /** Get SUB-MODULE Info**/
  getSubmodule() {
    this.submodulelist = [];
    let submodule: any = this.moduleAssignForm.get('moduleid').value;
    for (let k = 0; k < submodule.length; k++) {
      this.editionService.getsubModulelist(this.moduleAssignForm.get('editionid').value, submodule[k].id).subscribe(data => { this.setsubModuleList(data); },
        error => {
          console.log('Error Occured On getsubModulelist()')
        }
      );
    }
  }

  setsubModuleList(data: any) {
    for (this.i = 0; this.i < data.length; this.i++) {
      this.submodulelist.push({ id: data[this.i][0], itemName: data[this.i][1] });
    }
  }


  onSubmit(): any {
    this.submitted = true;
    this.returnFlag = this.validation();
    if (this.returnFlag == true) {
      this.editionService.createControl(JSON.stringify(this.moduleAssignForm.value)).subscribe(data => {
        if (data == true) {
          this.routers.navigate(['Edition/ViewEdition']);
          this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Module Assign Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'sucess' });
        }
      },
        err => {
          console.log('Error Occured On createControl()');
        });
    }
  }

  validation(): boolean {
    if (this.moduleAssignForm.get('moduleid').value == null || this.moduleAssignForm.get('moduleid').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Module Is required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.moduleAssignForm.get('submoduleid').value == null || this.moduleAssignForm.get('submoduleid').value == '') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Sub-Module Is required', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }
  viewEdition() {
    this.routers.navigate(['Edition/ViewEdition']);
  }

}






