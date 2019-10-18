import { DataStocks } from '../stocks.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from 'app/app.component';
@Component({
  selector: 'app-create-stocks',
  templateUrl: './create-stocks.component.html',
  providers: [NotificationsComponent, AppComponent]
})
export class CreateStocksComponent implements OnInit {
  stockForm: FormGroup;
  characters = [];
  stockDosage = [];
  stockFormulation = [];
  unitsgst = [];
  unitcgst = [];
  unitigst = [];
  unitutgst = [];
  unitgst = [];
  vat = [];
  textnumbers = '^[0-9]+(\.[0-9]{1,2})?$';
  constructor(private dataService: DataStocks, private fb: FormBuilder, private router: Router, private notificationsComponent: NotificationsComponent,
    private appComponent: AppComponent) {
    this.stockForm = this.fb.group({
      rackno: ['', []],
      shelfno: ['', []],
      coldstorage: ['', []],
      drugproductid: ['', []],
      formulationid: ['', []],
      dosageid: ['', []],
      expirydate: ['', []],

      manufactureddate: ['', []],
      batchno: ['', []],
      minqty: ['1.00', [Validators.pattern(this.textnumbers)]],
      boxperstrip: ['1.00', [Validators.pattern(this.textnumbers)]],
      strippertablet: ['1.00', [Validators.pattern(this.textnumbers)]],
      qty: ['0.00', []],
      boxqty: ['0.00', [Validators.pattern(this.textnumbers)]],
      tabletqty: ['0.00', [Validators.pattern(this.textnumbers)]],
      stripqty: ['0.00', [Validators.pattern(this.textnumbers)]],
      freeboxqty: ['0.00', [Validators.pattern(this.textnumbers)]],
      freestripqty: ['0.00', [Validators.pattern(this.textnumbers)]],
      freetabletqty: ['0.00', [Validators.pattern(this.textnumbers)]],
      freetotalqty: ['0.00', []],
      sellingprice: ['', [Validators.pattern(this.textnumbers)]],
      purchaseprice: ['', [Validators.pattern(this.textnumbers)]],
      mrp: ['', [Validators.pattern(this.textnumbers)]],
      wholesellingprice: ['', [Validators.pattern(this.textnumbers)]],
      retailersellingprice: ['', [Validators.pattern(this.textnumbers)]],
      unitsgst: ['', []],
      unitcgst: ['', []],
      unitigst: ['', []],
      unitutgst: ['', []],
      unitgst: ['', []],
      vat: ['', []],
      margin: ['', [Validators.pattern(this.textnumbers)]],
      unitprice:['',[Validators.pattern(this.textnumbers)]],
      marginamt: ['', []],
      clientcdate: ['', []],
      companyrefid: ['', []],
      branchrefid: ['', []],
      locrefid: ['', []],
      locname: ['', []],
    });
  }
  ngOnInit() {
    //TO SET DROP DOWN PLACE HOLDER

    this.stockForm.get('formulationid').setValue('opt1');
    this.stockForm.get('unitsgst').setValue('0');
    this.stockForm.get('unitcgst').setValue('0');
    this.stockForm.get('unitigst').setValue('0');
    this.stockForm.get('unitgst').setValue('0');
    this.stockForm.get('unitutgst').setValue('0');
    this.stockForm.get('vat').setValue('0');
    this.stockForm.get('companyrefid').setValue(AppComponent.companyID);
    this.stockForm.get('branchrefid').setValue(AppComponent.branchID);
    this.stockForm.get('locname').setValue(AppComponent.locrefID);
    if (AppComponent.shopID != 0) {
      this.stockForm.get('locrefid').setValue(AppComponent.shopID);
    } if (AppComponent.warehouseID != 0) {
      this.stockForm.get('locrefid').setValue(AppComponent.warehouseID);
    } if (AppComponent.hospitalID != 0) {
      this.stockForm.get('locrefid').setValue(AppComponent.hospitalID);
    }
    this.dataService.getSgst().subscribe(data => this.unitsgst = data);

    this.dataService.getCgst().subscribe(data => this.unitcgst = data);

    this.dataService.getIgst().subscribe(data => this.unitigst = data);

    this.dataService.getUtgst().subscribe(data => this.unitutgst = data);

    this.dataService.getGst().subscribe(data => this.unitgst = data);

    this.dataService.getVat().subscribe(data => this.vat = data);
  }

  getProduct(searchValue: string) {
    this.dataService.getProduct(searchValue, this.stockForm.get('companyrefid').value,
      this.stockForm.get('branchrefid').value, this.stockForm.get('locrefid').value, this.stockForm.get('locname').value).subscribe(data => {
        this.characters = [];
        for (let i = 0; i < data.length; i++) {
          this.characters.push({ value: data[i][0], label: data[i][1] });
        }
      });
  }

  getProvalues() {
    let drugId: number = this.stockForm.get('drugproductid').value;

    this.dataService.getDosagevalues(drugId).subscribe(data => { this.stockForm.get('dosageid').setValue(data.toString()) }, err => {
      console.log('Error Occured on getDosagevalues()');
    });

    this.dataService.getFormulvalues(drugId).subscribe(data => { this.stockFormulation = data }, err => {
      console.log('Error Occured on getFormulvalues()');
    });
  }

  totQty: any = 0;
  totBox: any = 0;
  totStrip: any = 0;
  boxperstrip: any = 0;
  strippertablet: any = 0;
  boxqty: any = 0;
  stripqty: any = 0;
  tabletqty: any = 0;
  boxfree: any = 0;
  stripfree: any = 0;
  tabletfree: any = 0;
  totalFree: any = 0;
  totFreebox: any = 0;
  totFreestrip: any = 0;
  getQuantity() {
    
    this.boxperstrip = this.stockForm.get('boxperstrip').value;
    this.strippertablet = this.stockForm.get('strippertablet').value;
    this.boxqty = this.stockForm.get('boxqty').value;
    this.stripqty = this.stockForm.get('stripqty').value;
    this.tabletqty = this.stockForm.get('tabletqty').value;



    if (this.boxperstrip == '' || this.boxperstrip == NaN || this.boxperstrip == null) {
      this.boxperstrip = 0;
      this.stockForm.get('boxperstrip').setValue('0');
    }
    if (this.strippertablet == '' || this.strippertablet == NaN || this.strippertablet == null) {
      this.strippertablet = 0;
      this.stockForm.get('strippertablet').setValue('0');
    }
    if (this.boxqty == '' || this.boxqty == NaN || this.boxqty == null) {
      this.boxqty = 0;
      this.stockForm.get('boxqty').setValue('0');
    }
    if (this.stripqty == '' || this.stripqty == NaN || this.stripqty == null) {
      this.stripqty = 0;
      this.stockForm.get('stripqty').setValue('0');
    }
    if (this.tabletqty == '' || this.tabletqty == NaN || this.tabletqty == null) {
      this.tabletqty = 0;
      this.stockForm.get('tabletqty').setValue('0');
    }
    this.totBox = (parseFloat(this.boxperstrip) * parseFloat(this.boxqty)) * parseFloat(this.strippertablet);
    this.totStrip = parseFloat(this.strippertablet) * parseFloat(this.stripqty);
    this.totQty = parseFloat(this.totBox) + parseFloat(this.totStrip) + parseFloat(this.tabletqty);
    this.stockForm.get('qty').setValue(parseFloat(this.totQty).toFixed(3));
  }


  getFreeQuantity() {
    
    this.boxperstrip = this.stockForm.get('boxperstrip').value;
    this.strippertablet = this.stockForm.get('strippertablet').value;
    this.boxfree = this.stockForm.get('freeboxqty').value;
    this.stripfree = this.stockForm.get('freestripqty').value;
    this.tabletfree = this.stockForm.get('freetabletqty').value;

    if (this.boxperstrip == '' || this.boxperstrip == NaN || this.boxperstrip == null) {
      this.boxperstrip = 0;
      this.stockForm.get('boxperstrip').setValue('0');
    }
    if (this.strippertablet == '' || this.strippertablet == NaN || this.strippertablet == null) {
      this.strippertablet = 0;
      this.stockForm.get('strippertablet').setValue('0');
    }
    if (this.boxfree == '' || this.boxfree == NaN || this.boxfree == null) {
      this.boxfree = 0;
      this.stockForm.get('boxfree').setValue('0');
    }
    if (this.stripfree == '' || this.stripfree == NaN || this.stripfree == null) {
      this.stripfree = 0;
      this.stockForm.get('stripfree').setValue('0');
    }
    if (this.tabletfree == '' || this.tabletfree == NaN || this.tabletfree == null) {
      this.tabletfree = 0;
      this.stockForm.get('tabletfree').setValue('0');
    }
    this.totFreebox = (parseFloat(this.boxfree) * parseFloat(this.boxperstrip)) * parseFloat(this.strippertablet);
    this.totFreestrip = parseFloat(this.strippertablet) * parseFloat(this.stripfree);
    this.totalFree = parseFloat(this.totFreebox) + parseFloat(this.totFreestrip) + parseFloat(this.tabletfree);
    this.stockForm.get('freetotalqty').setValue(parseFloat(this.totalFree).toFixed(2));
  }

  showMargin(margin: any) {
    let pPrice: any = this.stockForm.get('purchaseprice').value;
    var re = ((pPrice * margin) / 100).toFixed(2);
    this.stockForm.get('marginamt').setValue(re);
    this.stockForm.get('sellingprice').setValue(parseFloat(pPrice) + parseFloat(re));
    if (this.stockForm.get('sellingprice').value > this.stockForm.get('mrp').value) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Selling Price Higher Than SRP', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }
  showmarginAmt(mAmt: any) {
    let pPrice: any = this.stockForm.get('purchaseprice').value;
    var per: any = ((mAmt * 100) / pPrice).toFixed(2);
    this.stockForm.get('margin').setValue(per);
    this.stockForm.get('sellingprice').setValue(parseFloat(pPrice) + parseFloat(mAmt));
    if (this.stockForm.get('sellingprice').value > this.stockForm.get('mrp').value) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Selling Price Higher Than SRP', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  showPrice(price: any) {
    this.stockForm.get('sellingprice').setValue(price);
    this.stockForm.get('wholesellingprice').setValue(price);
    this.stockForm.get('retailersellingprice').setValue(price);
  }
  public reFlag: boolean = false;

showUnitprice(){
  let totqty:any = this.stockForm.get('qty').value;
    var unpr:any = (this.stockForm.get('mrp').value/totqty).toFixed(2);
    this.stockForm.get('unitprice').setValue(unpr);
    
}


  onSubmit() {
    this.reFlag = this.stockValidation();
    if (this.reFlag == true) {
      let mrp: any = this.stockForm.get('mrp').value;
      let mAmt: any = this.stockForm.get('marginamt').value;
      let mPer: any = this.stockForm.get('margin').value;
      this.showPrice(mrp);
      this.showMargin(mPer);
      this.showmarginAmt(mAmt);
      this.getFreeQuantity();
      this.getQuantity();
      this.appComponent.ngOnInit();
      this.stockForm.get('clientcdate').setValue(AppComponent.date);
      this.dataService.createStock(JSON.stringify(this.stockForm.value)).subscribe(data => {
        if (data == true) {
          this.notificationsComponent.addToast({ title: 'Sucess Message', msg: 'Data Saved Sucessfully', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });
          this.stockForm.reset();
          this.stockDosage = [];
          this.stockFormulation = [];
          setTimeout(() => {
            this.router.navigate(['StockEntryForm/ViewStockList']);
          }, 2000);
         
        }
        else {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Data Not Saved!!', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
      });

    }
    //this.ngOnInit();

   
  }






  



  stockValidation(): boolean {
    if (this.stockForm.get('drugproductid').value == '' || this.stockForm.get('drugproductid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Product..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.stockForm.get('dosageid').value == 'opt1' || this.stockForm.get('dosageid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Dosage..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.stockForm.get('formulationid').value == 'opt1' || this.stockForm.get('formulationid').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Your Formulation..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.stockForm.get('expirydate').value == '' || this.stockForm.get('expirydate').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select  Expiry Date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }

    if (this.stockForm.get('manufactureddate').value == '' || this.stockForm.get('manufactureddate').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Select Manufactured Date..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }


    if (this.stockForm.get('batchno').value == '' || this.stockForm.get('batchno').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter  Your Batch Number..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.stockForm.get('minqty').value == '' || this.stockForm.get('minqty').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter Your Min-Qty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.stockForm.get('purchaseprice').value == '' || this.stockForm.get('purchaseprice').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter Your Purchase Price..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (this.stockForm.get('mrp').value == '' || this.stockForm.get('mrp').value == null) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Please Enter Your SRP..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (parseFloat(this.stockForm.get('purchaseprice').value) > parseFloat(this.stockForm.get('mrp').value)) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Purchase Price Higher Than SRP', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    if (parseFloat(this.stockForm.get('sellingprice').value) > parseFloat(this.stockForm.get('mrp').value)) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'Your Selling Price Higher Than SRP', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    return true;
  }

  

}
