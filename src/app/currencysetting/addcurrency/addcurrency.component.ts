import { Component, OnInit } from '@angular/core';
import { CurrencySettingService } from '../currencysetting.service';
import { FormBuilder } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { from } from 'rxjs/observable/from';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-addcurrency',
  templateUrl: './addcurrency.component.html',

  providers: [NotificationsComponent]
})
export class AddcurrencyComponent implements OnInit {
  currencysettingForm: any;

  currency = [];
  country = [];
  returnValid: any;

  constructor(private currencySettingService: CurrencySettingService, private fb: FormBuilder, private notificationsComponent: NotificationsComponent, private appComponent: AppComponent) {
    this.currencysettingForm = this.fb.group({
      countryrefid: ['', []],
      currencyrefid: ['', []],
      companyrefid: ['', []],
    });

  }

  ngOnInit() {
    this.currencysettingForm.get('companyrefid').setValue(AppComponent.companyID);

    this.currencySettingService.getCountry().subscribe(data => this.country = data,
      err => {
        console.log('Error on  setting country')
      });

    this.currencysettingForm.get('countryrefid').setValue("0");
  }
  getCurrenySymbol() {
    alert(this.currencysettingForm.get('countryrefid').value)
    this.currencySettingService.getCurreny(this.currencysettingForm.get('countryrefid').value).subscribe(data => this.currency = data,
      err => {
        console.log('Error on setting currency')
      });

    alert(this.currency)
  }

  onSubmit() {
    this.returnValid = this.currencyvalidation();
    if (this.returnValid == true) {
alert(JSON.stringify(this.currencysettingForm.value))
      this.currencySettingService.savecurrency(JSON.stringify(this.currencysettingForm.value)).subscribe(data => { this.savevalid(data) },
        errorCode => console.log(errorCode));

    }

    else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }

  }
  currencyvalidation(): Boolean {
    return true;
  }

  savevalid(data: any) {

    if (data == 1) {
      this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
    }
    else {
      this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
}
