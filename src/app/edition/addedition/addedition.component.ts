import { Component, OnInit, ViewChild } from '@angular/core';
import { EditionService } from '../edition.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../notifications/notifications.component';
const textnumbers = '^[0-9]*$';
const txtnumbers = '^[0-9]+(\.[0-9]{1,3})?$';
@Component({
  selector: 'app-addedition',
  templateUrl: './addedition.component.html',
  styleUrls: ['./addedition.component.css'],
  providers: [NotificationsComponent, EditionService]
})
export class AddeditionComponent implements OnInit {
  @ViewChild('editionName') eName: any;
  editionForm: FormGroup;
  country = [];
  prodcutlist = [];
  domainlist = [];
  subdomainlist = [];
  mymodule: any;
  submodule: any;
  submitted = false;
  constructor(private editionService: EditionService, private router: Router, private notificationsComponent: NotificationsComponent) {
    const countryid = new FormControl();
    const domainrefid = new FormControl();
    const productid = new FormControl();
    const subdomainrefid = new FormControl();
    const editioncode = new FormControl();
    const moduleid = new FormControl();
    const submoduleid = new FormControl();
    const editionname = new FormControl();
    const version = new FormControl('', Validators.pattern(txtnumbers));
    const releasedate = new FormControl();
    const days = new FormControl('', Validators.pattern(textnumbers));
    const editiontype = new FormControl();
    const status = new FormControl();
    this.editionForm = new FormGroup({
      countryid: countryid,
      domainrefid: domainrefid,
      productid: productid,
      subdomainrefid: subdomainrefid,
      editioncode: editioncode,
      editionname: editionname,
      version: version,
      releasedate: releasedate,
      days: days,
      editiontype: editiontype,
      status: status
    });

  }


  ngOnInit() {
    //TO SET PLACEHOLDER FOR DROPDOWN LIST
    this.editionForm.get('countryid').setValue("opt1");
    this.editionForm.get('domainrefid').setValue("opt1");
    this.editionForm.get('productid').setValue("opt1");
    this.editionForm.get('subdomainrefid').setValue("opt1");
    this.editionForm.get('editiontype').setValue("Yearly");
    this.editionForm.get('status').setValue("0");
    this.editionService.getcountry().subscribe(data => {
      this.country = data,
        err => {
          console.log('Error occured On getcountry()');
        }
    });
  }


  getProduct() {
    this.editionService.getProduct(this.editionForm.get('countryid').value).subscribe(data => this.prodcutlist = data,
      err => {
        console.log('Error occured On getProduct()');
      });
  }

  getDomains() {
    this.editionService.getDomain(this.editionForm.get('countryid').value, this.editionForm.get('productid').value).subscribe(data => this.domainlist = data,
      err => {
        console.log('Error occured On getdomain()');
      });
  }

  getSubdomain() {
    this.editionService.getSubdomainid(this.editionForm.get('countryid').value, this.editionForm.get('productid').value, this.editionForm.get('domainrefid').value).subscribe(data => {
      this.subdomainlist = data;
      if (data == '' || data == null) {
        this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Sub-Domain Not Availabe For the Given Domain', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      }
    },
      err => {
        console.log('Error occured On getsubdomain()');
      });
  }

  returnFlag: boolean = false;
  onSubmit(): any {
    this.submitted = true;
    this.returnFlag = this.editionValidation();
    if (this.returnFlag == true) {
      this.editionService.checkExistedition(this.editionForm.get('countryid').value, this.editionForm.get('productid').value,
        this.editionForm.get('domainrefid').value, this.editionForm.get('subdomainrefid').value,
        this.editionForm.get('editionname').value, this.editionForm.get('version').value).subscribe(data => {
          if (data == 1) {
            this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Edition Name Already exist', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            this.eName.nativeElement.focus();
          }
          else {
            this.editionService.createRecord(JSON.stringify(this.editionForm.value)).subscribe(err => {
              console.log('Error On Domain createRecord()')
            });
            this.notificationsComponent.addToast({ title: 'Sucess', msg: 'Edition Saved Sucessfully..', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
            this.editionForm.reset();
            this.country = [];
            this.prodcutlist = [];
            this.domainlist = [];
            this.subdomainlist = [];
            this.ngOnInit();
          }
        },
        err => {
          console.log('Error occured On checkExistedition()');
        })

    }

  }


  editionValidation(): boolean {
    if (this.editionForm.get('countryid').value == 'opt1') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Country Select is required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.editionForm.get('productid').value == 'opt1') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'ProductName Select is required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.editionForm.get('domainrefid').value == 'opt1') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Domain Name Select is required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.editionForm.get('subdomainrefid').value == 'opt1') {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Sub-Domain Select is required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.editionForm.get('editionname').value == '' || this.editionForm.get('editionname').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Edition Name must Not be Empty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    if (this.editionForm.get('version').value == '' || this.editionForm.get('version').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Edition Version Is-required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.editionForm.get('releasedate').value == '' || this.editionForm.get('releasedate').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Edition Release Date Is-required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.editionForm.get('days').value == '' || this.editionForm.get('days').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Edition Days Is-required..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (true) {
      var str = this.editionForm.get('editionname').value;
      var res = str.substring(0, 3);
      this.editionForm.get('editioncode').setValue(res.toUpperCase());
    }
    return true;
  }

  view(): void {
    this.router.navigate(['Edition/ViewEdition']);
  }
}


