import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Addwarehouseservices } from "./addwarehouse.service";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { dateFormatPipe } from "app/notifications/notifications.datepipe";
import { AppComponent } from "app/app.component";


@Component({

  selector: 'app-warehouse',
  templateUrl: './addwarehouse.component.html',
  providers: [Addwarehouseservices, NotificationsComponent, dateFormatPipe]



})


export class Addwarehousecomponent implements OnInit {



  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  selobj;
  countries = [];
  states = [];
  cities = [];



  ngOnInit(): void {





    this.whService.getCountry().subscribe(data => this.countries = data,
      err => {
        console.log('Error Occured ');
      });


    this.selobj = {
      userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
      companyid: AppComponent.companyID
      , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
      , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
    };


    this.warehouseform = this.fb.group({

      // warehouseid: [, []],
      // productid: [, []],


      // countryid: [, []],


      companyid: [, []],

      warehousename: [, [Validators.required]],
      warehousecode: [, [Validators.required]],
      owner_name: [, [Validators.required]],
      address1: [, []],
      address2: [, []],
      address3: [, []],
      city: [, []],
      state: [, []],
      country: [, []],
      pincode: [, []],
      contact_no1: [, [Validators.required]],
      contact_no2: [, []],
      mobile_no: [, [Validators.required]],
      email_id: [, [Validators.pattern(this.emailPattern)]],
      dlno: [, []],
      license_holder: [, []],
      tinno: [, []],
      cstno: [, []],
      panno: [, []],
      status: [0, []],
      gstno: [, []],
      coldstorage: [, []],
      createdby: [, []],
      createddate: [, []],
      modifiedby: [, []],
      modifieddate: [, []],
      clientcdate: [this.dateformat.transform04(), []],
      clientmdate: [AppComponent.date, []],

      companyrefid: [AppComponent.companyID, []],
      branchrefid: [AppComponent.branchID, []],
      locname: [AppComponent.locRefName1, []],
      locrefid: [AppComponent.locrefID1, []],
      // registerflag: [, []],



    });





    this.warehouseform.get('country').setValue('0');
    this.warehouseform.get('state').setValue('0');
    this.warehouseform.get('city').setValue('0');

  }




  warehouseform: any;

  constructor(private fb: FormBuilder, private whService: Addwarehouseservices, private notificationsComponent: NotificationsComponent
    , private dateformat: dateFormatPipe) {



  }











  public retrunFlag: boolean = false;


  onSubmit() {

    this.retrunFlag = this.basicValidation();


    if (this.retrunFlag) {


      this.whService.saveWarohuseDetails(JSON.stringify(this.warehouseform.value)).subscribe(data => {
        this.savevalid(data);
        //  window.location.href = "warehouse/ViewWarehouse";


      })




    }

  }







  getState() {
    //Get States 
    this.whService.getStates(this.warehouseform.get('country').value).subscribe(data => this.states = data,
      err => {
        console.log('Error Occured Get States');
      });

  }

  getCity() {
    //Get City 
    this.whService.getCity(this.warehouseform.get('state').value).subscribe(data => this.cities = data,
      err => {
        console.log('Error Occured Get City');
      });
  }






  basicValidation(): boolean {






    if (this.warehouseform.get('warehousename').value == '' || 0 || null || undefined) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter warehousename..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }




    //  else if (this.warehouseform.get('productid').value == '' || 0 || null || undefined) {
    //     // debugger;

    //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter productid..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //     return false;

    //   }






    // else if (this.shipmentForm.get('package_description').value == null || undefined || "") {

    //     this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter description..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    //     return false;
    // }


    else if (this.warehouseform.get('warehousecode').value == '' || 0 || null || undefined) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter warehousename..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }



    else if (this.warehouseform.get('warehousename').value == '' || 0 || null || undefined) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter warehousename..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }


    else if (this.warehouseform.get('owner_name').value == '' || 0 || null || undefined) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter warehousename..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }

    else if (this.warehouseform.get('contact_no1').value == '' || 0 || null || undefined) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter warehousename..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }

    else if (this.warehouseform.get('mobile_no').value == '' || 0 || null || undefined) {


      this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter mobile number..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;

    }


    return true;
  }








  savevalid(data: any) {
    if (data == true) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 2000, theme: 'default', position: 'top-right', type: 'success' });
    } else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 2000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }















}