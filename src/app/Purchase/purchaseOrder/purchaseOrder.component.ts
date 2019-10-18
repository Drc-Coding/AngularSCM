import { Component, OnInit, ViewChild, Renderer2,ElementRef,AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, NgSelectOption } from '@angular/forms';
import { purchaseOrderService } from './purchaseOrder.services';
import { Router } from '@angular/router'
import { error } from 'selenium-webdriver';
import { DxDataGridComponent } from "devextreme-angular";
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { dateFormatPipe } from '../../notifications/notifications.datepipe';


const textPattern = "[a-zA-Z][a-zA-Z ]+";
const textnumbers = '^[0-9]+(\.[0-9]{1,3})?$';

@Component({
  selector: 'Purchase Order',
  templateUrl: './purchaseOrder.component.html',
  styleUrls: ['./purchaseOrder.component.css'],
  providers: [purchaseOrderService, NotificationsComponent]
})
export class purchaseOrderComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  purchaseOrder: FormGroup;
  submitted: false;
  distributors = [];

  characters = [];
  dataSource = [];
  drugs = [];
  drugList = [];
  dist = [];
  data = [];
  poid: any;
  dropdownSettings3 = {};
  selectedItems = [];
  hospitallist = [];
  branch = [];
  g;
  drugid: any;
  flags: boolean = false;
  x;
  branchid: any;
  locname: any;
  locrefid: any;
  companyrefid: any;
  shopid: any;
  emailaddress = [];



  constructor(private purchaseOrders: purchaseOrderService, private router: Router, private renderer: Renderer2, 
    private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent, private dateformat: dateFormatPipe) {

    this.purchaseOrder = this.formBuilder.group({
      distributor: ['', []],
      drug: ['', []],
      barcode: ['', []],
      poautoincr: ['', []],
      podate: [this.dateformat.transform05(Date.now()), []],
      totalproduct: ['', []],
      totalboxquantity: ['', []],
      totalstpquantity: ['', []],
      totaltabquantity: ['', []],
      totalquantity: ['', []],
      hospitalid: ['', []],
      companyid: ['', []],
      branchid: ['', []],
      locname: ['', []],
      locref: ['', []],
      grandtotal: ['', []],
      qty:[],
      brandDetails: this.formBuilder.array([
      ]),
    });

  }
  auto: any;
  ngOnInit() {

    this.branchid = AppComponent.branchID;
    this.locname = AppComponent.locRefName1;
    this.locrefid = AppComponent.locrefID1;
    this.companyrefid = AppComponent.companyID;
    this.shopid = AppComponent.shopID
    this.purchaseOrder.get('companyid').setValue(AppComponent.companyID);
    this.purchaseOrder.get('branchid').setValue(AppComponent.branchID);
    this.purchaseOrder.get('locname').setValue(AppComponent.locRefName1);
    this.purchaseOrder.get('locref').setValue(AppComponent.locrefID1);
    
  //  this.purchaseOrder.get('poautoincr').setValue('0');
    this.purchaseOrder.get('distributor').setValue("opt1");
    this.purchaseOrder.get('drug').setValue("opt1");
    /*  get UOM  */
    this.purchaseOrders.getuom(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data =>  this.unitofMsr = data )

     if (AppComponent.usertype == "\"SuperAdmin\" ") {

       /*   this.purchaseOrders.getSuperAdminDistributor().subscribe(data => { this.dist = data },
            err => {
              console.log('Error Occured Get States');
            });*/


       this.purchaseOrders.getAutoIncr().subscribe(data => { this.purchaseOrder.get('poautoincr').setValue(data.toString()); },
         err => {
           console.log('Error Occured Get AutoIncrement');
         });


       /*   this.purchaseOrders.getDrugs().subscribe(data => { this.drugs = data },
            err => {
              console.log('Error Occured Get States');
            });*/

     } else {


       /* this.purchaseOrders.getDistributor(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => { this.dist = data },
          err => {
            console.log('Error Occured Get States');
          });*/

       this.purchaseOrders.getAutoIncr().subscribe(data => { this.purchaseOrder.get('poautoincr').setValue(data.toString()) },
         err => {
           console.log('Error Occured Get AutoIncrement');
         });

       /*  this.purchaseOrders.getDrugs().subscribe(data => { this.drugs = data },
           err => {
             console.log('Error Occured Get States');
           });*/


     }
   
    this.dropdownSettings3 = {
      maxHeight: 400,
      singleSelection: false,
      text: "--- Session Number ---",
      badgeShowLimit: 1,
      classes: "myclass custom-class"
    };


  }




  getDist(searchValue: string) {

   // if (AppComponent.usertype == "\"SuperAdmin\" ") {


    //   this.purchaseOrders.getSuperDist(searchValue).subscribe(data => {
    //     this.distributors = [];
    //     for (let i = 0; i < data.length; i++) {
    //       this.distributors.push({ value: data[i][0], label: data[i][1] });
    //     }
    //   });
    // } else {
      this.purchaseOrders.getDistributor(searchValue, AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
        this.distributors = [];
        for (let i = 0; i < data.length; i++) {
          this.distributors.push({ value: data[i][0], label: data[i][1] });
        }
      });



    }
  //}

  getProduct(searchValue: string) {

    // if (AppComponent.usertype == "\"SuperAdmin\" ") {
    //   this.purchaseOrders.getSuperDrugs(searchValue).subscribe(data => {
    //     this.characters = [];
    //     for (let i = 0; i < data.length; i++) {
    //       this.characters.push({ value: data[i][0], label: data[i][1] });
    //     }
    //   });
    // } else {

      this.purchaseOrders.getDrugs(searchValue, AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
        this.characters = [];
        for (let i = 0; i < data.length; i++) {
          this.characters.push({ value: data[i][0], label: data[i][1] });
        }
      });

    }
  //}


  sess: any = 0;
  getPurchaseSession() {
    this.sess = this.purchaseOrder.get('hospitalid').value;
    const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
    getData.controls = [];

    if (this.sess != "") {
      for (this.g = 0; this.g < this.sess.length; this.g++) {
    // alert("sessionid" + this.sess[this.g].id)
        this.purchaseOrders.getPurcSessionshop(this.sess[this.g].id,this.purchaseOrder.get('distributor').value).subscribe(data => { this.getTabledata(data) },
          error => {
            console.log("Error Occured from getPurcSessiontable()");
          });

      }
    } else {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'SELECT SESSION NUMBER..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }
  }

  getHosp() {
    this.purchaseOrder.get('distributor').value;
    if (this.purchaseOrder.get('distributor').value != "") {
      this.hospitallist = [];
      //for (this.g = 0; this.g < this.branch.length; this.g++) {
      /** Get Hospital Info**/
      this.purchaseOrders.getSessHosp(this.purchaseOrder.get('companyid').value, this.purchaseOrder.get('distributor').value).subscribe(data => { this.hosplist(data) },
        error => {
          console.log('Error Occured On getSessHosp()')
        }
      );
    } else {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: 'SELECT DISTRIBUTOR NAME..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
    }

  }

  hosplist(data: any) {
    for (this.i = 0; this.i < data.length; this.i++) {
      this.hospitallist.push({ id: data[this.i][0], itemName: data[this.i][1] });
    }
  }

  getBarcodeProduct(event) {
    this.purchaseOrders.getBarcodeProduct(this.purchaseOrder.get('barcode').value).subscribe(data => this.drugid = data
       , err => {
      console.log('Error Occured Get States');
    });
    this.getBarcodeDrugs();
  }


  getBarcodeDrugs() {
    this.purchaseOrders.getDrugsData(this.drugid,this.companyrefid,this.branchid,this.locname,this.locrefid).subscribe(data => { this.getDrugData(data) },
      err => {
        console.log('Error Occured Get States');
      });
  }
  
  @ViewChild('drug') inputEl:ElementRef;

  ngAfterViewInit() {
        setTimeout(() => this.inputEl.nativeElement.focus());
  }

  getDrugs(event) {
   
    if (event.keyCode == 9) {

      this.purchaseOrders.getDrugsData(this.purchaseOrder.get('drug').value,this.purchaseOrder.get('companyid').value,this.purchaseOrder.get('branchid').value,
      this.purchaseOrder.get('locname').value,this.purchaseOrder.get('locref').value).subscribe(data =>  this.getDrugData(data) ,
      err => {
         console.log('Error Occured Get States');
       });
       this.ngAfterViewInit();
    // const element = this.renderer.selectRootElement('#drug');

    //  setTimeout(() => element.focus, 0);
    }
    else if(event.keyCode ==13){
     this.purchaseOrders.getDrugsData(this.purchaseOrder.get('drug').value,this.purchaseOrder.get('companyid').value,this.purchaseOrder.get('branchid').value,
     this.purchaseOrder.get('locname').value,this.purchaseOrder.get('locref').value).subscribe(data =>  this.getDrugData(data) ,
     err => {
       console.log('Error Occured Get States');
    });
   
 }
  }

  getDistributorProduct() {

    /*  if (AppComponent.usertype == "\"SuperAdmin\" ") {
        //   alert("distributorvalue"+this.purchaseOrder.get('distributor').value);
        this.purchaseOrders.getSuperDistributorProduct(this.purchaseOrder.get('distributor').value).subscribe(data => { this.getTabledata(data) },
          err => {
            console.log('Error Occured Get States');
          });
  
      } else {
        this.purchaseOrders.getDistributorProduct(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.purchaseOrder.get('distributor').value).subscribe(data => { this.getTabledata(data) },
          err => {
            console.log('Error Occured Get States');
          });
  
      }*/


    this.PurchaseOrderEmailDistributor();
  }


  PurchaseOrderEmailDistributor() {

    //   alert(this.purchaseOrder.get('distributor').value)

    if (this.purchaseOrder.get('distributor').value != "opt1" || null || undefined || "") {

      this.purchaseOrders.PurchaseOrderEmailDistributor(this.purchaseOrder.get('distributor').value).subscribe(data => { this.emailaddress = data[0][1] });



     


    }

  }

  getTabledata(data: any) {

    if (data !== undefined || data !== null) {
      let flag: number = 0;
      const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];

      let setData = getData.value;
      for (this.i = 0; this.i < data.length; this.i++) {
        for (this.x = 0; this.x < setData.length; this.x++) {
          if (data[this.i][0] == setData[this.x].productid) {
            flag = 1;
          }
        }
        if (flag == 1) {
          this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[this.i][1].toUpperCase() + '  Product Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
        else {
          getData.push(this.showBrandlist(
            data[this.i][0],
            data[this.i][1],
            data[this.i][2],
            data[this.i][3],
            data[this.i][4],
            data[this.i][5],
            data[this.i][6],
            data[this.i][7],
            data[this.i][8],
            data[this.i][9]
     
          ));
        }
      }
      this.characters = [];
      this.getSum();
    }
  }
  showBrandlist(psesid: any, pid: any, pname: any, dosage: any, totqty: any, distpice: any,
      abc: any, rank: any, remarks: number, id:any) {
    return this.formBuilder.group({
      pursessionno: [psesid, []],
      pursessionid:[id,[]],
      itemcode: [pid, []],
      itemname: [pname, []],
      dosage: [dosage, []],
      boxqty: ['0', Validators.pattern(textnumbers)],
      stripqty: ['0', Validators.pattern(textnumbers)],
      tabletqty: [totqty, Validators.pattern(textnumbers)],
      unitprice: [distpice, []],
      abc: [abc, []],
      distprodrank: [rank, []],
      distremarks: [remarks, []],
      totalqty: ['0', []],
      totalproductprice: ['', []],
      uom: ['1', []],
      equalto: ['1', []]
    });
  }
  calc(event) {
    // alert(event.keyCode)
    if (event.keyCode == 9) {

      this.getSum();
    }
  }
  i;
  j;
  m;
  imagepath: string;
  sbQuantity = [];
  unitofMsr = [];
  getSum() {
    /** Declare Given Table Datas**/
    let txtproduct: number = 0;
    let txttabletquantity: any = 0;
    let txtstripquantity: any = 0;
    let txtboxquantity: any = 0;
    let totalacquisition: any = 0;
    /** To set and calculate Given Table Datas into total values(formcontrolname) **/
    let totalproduct: any = 0;
    let totalQuantity: any = 0;
    let BoxQuantity: any = 0;
    let StripQuantity: any = 0;
    let TabQuantity: any = 0;
    let totalacqcost: any = 0;
    const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
    let setData = getData.value;
    let k: number = 0;
    let Stripperbox: any;
    let Quantityperstrip: any;
    for (this.j = 0; this.j < setData.length; this.j++) {
      this.getSBQuantity(setData[this.j].itemcode);
      Stripperbox = this.sbQuantity[0][0];
     // alert(Stripperbox);
      Quantityperstrip = this.sbQuantity[0][1];
     // alert(Quantityperstrip);
      /* To Get Total Products */
      if (parseInt(setData.length) !== null) {
        txtproduct = parseInt(setData.length);
      }
      /* Tablet Quantity */
      if (setData[this.j].tabletqty == '' || parseFloat(setData[this.j].tabletqty) == null) {
        setData[this.j].tabletqty = 0;
        txttabletquantity = 0;
      }
      else {
        txttabletquantity += parseFloat(setData[this.j].tabletqty);
        TabQuantity += parseFloat(setData[this.j].tabletqty);
      }
      /* Strip Quantity */
      if (setData[this.j].stripqty == '' || parseFloat(setData[this.j].stripqty) == null) {
        setData[this.j].stripqty = 0;
        txtstripquantity = 0;
      }
      else {
        txtstripquantity = parseFloat(setData[this.j].stripqty) * Quantityperstrip;
        StripQuantity += parseFloat(setData[this.j].stripqty);
      }
      /* Box Quantity */
      if (setData[this.j].boxqty == '' || parseFloat(setData[this.j].boxqty) == null) {
        setData[this.j].boxqty = 0;
        txtboxquantity = 0;
      }
      else {
        txtboxquantity = parseFloat(setData[this.j].boxqty) * Stripperbox * Quantityperstrip;
        BoxQuantity += parseFloat(setData[this.j].boxqty);
      }

      // /* per cost */
      // if(setData[this.j].price == '' || parseFloat(setData[this.j].price) == null){
      //   setData[this.j].price = 0;
      //   totalacquisition = 0;
      // }

      // else{
      //   totalacquisition = parseFloat(setData[this.j].price);
      //   totalacqcost+=parseFloat(setData[this.j].price);

      // }
      /*Total cost */


      // alert("a1"+setData[this.j].price);
      //alert("a2"+setData[this.j].tabletqty);

      (setData[this.j].totalproductprice) = (parseFloat(setData[this.j].unitprice) * parseFloat(setData[this.j].tabletqty)).toFixed(2);
      //alert("a3"+setData[this.j].grandtotal);

      totalacqcost += parseFloat(setData[this.j].totalproductprice);
      // alert("a4"+totalacqcost)
      /* Row Wise SubTotal Amount */


      //setData[this.j].totalqty = txttabletquantity + txtstripquantity + txtboxquantity;



      
      /* To Patch values Row wise */
      getData.patchValue(setData);
      /* Toatl Calculation*/
      totalproduct = txtproduct;
      totalQuantity += txttabletquantity + txtstripquantity + txtboxquantity;
      /* To Set value from Table calculation Final Values on Input types*/
      this.purchaseOrder.get('totalproduct').setValue(totalproduct);
      this.purchaseOrder.get('totalquantity').setValue(totalQuantity);
      this.purchaseOrder.get('totalboxquantity').setValue(BoxQuantity);
      this.purchaseOrder.get('totalstpquantity').setValue(StripQuantity);
      this.purchaseOrder.get('totaltabquantity').setValue(TabQuantity);
      // alert("a5"+totalacqcost);
      this.purchaseOrder.get('grandtotal').setValue(totalacqcost.toFixed(2));

      //To set Temporary Values In Bottom Input types    
    }
  }


  getSBQuantity(id: number) {
    this.purchaseOrders.getSBQuantity(id).subscribe(data => { this.sbQuantity = data }),
      error => {
        console.log("Error Occured on getSBQuantity");
      }
  }


  removeRow(index: number) {
   // alert("RemoveRow" + index);
    const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
    getData.removeAt(index);
    this.getSum();
    let removeVal = getData.value;
    if (removeVal == null || removeVal == '') {
      this.purchaseOrder.reset();
      this.ngOnInit();
    }
  }



  inc = 0;
  getDrugData(data: any) {

    if (data !== null || data !== undefined) {
      const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];

      let setData = getData.value;
      let flag: number = 0;
      for (this.i = 0; this.i < data.length; this.i++) {
        for (this.j = 0; this.j < setData.length; this.j++) {
          if (setData[this.j].itemcode == data[this.i][0]) {
            flag = 1;
          }
        }
        if (flag == 1) {
          //    alert("The " + data[this.i][1] + " is already exist pls change the quantity");
          this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'The ' + data[this.i][1] + ' is already exist pls change the quantity', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
        }
        else {
         // alert("push data");

         getData.push(this.setDrugdata(data[this.i][0], data[this.i][1], data[this.i][2],data[this.i][3]));
         this.inc += 1;
         this.purchaseOrder.get('qty').setValue('');
        }
      }
    }
  }



  setDrugdata(id: any, itemname: any, dosage: any, prank :any) {
    return this.formBuilder.group({
      pursessionid: [0, []],
      pursessionno:['NA',[]],
      itemcode: [id, []],
      itemname: [itemname, []],
      dosage: [dosage, []],
      boxqty: ['0', Validators.pattern(textnumbers)],
      stripqty: ['0', Validators.pattern(textnumbers)],
      tabletqty: [this.purchaseOrder.get('qty').value, Validators.pattern(textnumbers)],
      totalqty: ['0', Validators.pattern(textnumbers)],
      unitprice: ['0', []],
      abc: [prank, []],
      distprodrank: ['NA', []],
      distremarks: ['NA', []],
      totalproductprice: ['', []],
      uom: ['1', []],
      equalto: ['1', []]
    });
    
  }




  // getPOSum(event) {

  //   let cols: number = event.columnIndex;
  //   let rows: number = event.rowIndex;
  //   if (cols == 8) {
  //     this.dataGrid.instance.deleteRow(rows);
  //   }



  //   let setData = this.dataSource;


  //   let pqty: any = 0;


  //   let bqty: any = 0;
  //   let totBqty: any = 0;

  //   let sqty: any = 0;
  //   let totSripQty: any = 0;

  //   let tabqty: any = 0;
  //   let totTapQty: any = 0;

  //   let tqty: any = 0;
  //   let totQty: any = 0;

  //   for (this.i = 0; this.i < setData.length; this.i++) {
  //     pqty = 1
  //     pqty += this.i;
  //     this.purchaseOrder.get('totalproduct').setValue(pqty);


  //     bqty = setData[this.i].boxqty;
  //     totBqty += bqty;
  //     /**Here totBqty having total product **/
  //     this.purchaseOrder.get('totalboxquantity').setValue(totBqty);

  //     sqty = setData[this.i].stripqty;
  //     totSripQty += sqty;
  //     /**Here totSripQty having total product **/
  //     this.purchaseOrder.get('totalstpquantity').setValue(totSripQty);

  //     tabqty = setData[this.i].tabletqty;
  //     totTapQty += tabqty;
  //     /**Here TableQty having total product **/
  //     this.purchaseOrder.get('totaltabquantity').setValue(totTapQty);


  //     tqty = (setData[this.i].boxqty * (setData[this.i].stripqty * setData[this.i].tabletqty));
  //     totQty += tqty;
  //     /**Here TableQty having total product **/
  //     this.purchaseOrder.get('totalquantity').setValue(totQty);
  //     setData[this.i].totalqty = totQty;

  //   }
  // }

  onSubmit() {
    
    this.flags = this.validation();
    if (this.flags == true) {
      this.createRecord();
  

    }
  }


  private validation(): boolean {
    const getData = this.purchaseOrder.controls['brandDetails'];
    let setData = getData.value;
    if (setData.length == '' || setData.length == null || setData.length == undefined) {
      this.notificationsComponent.addToast({ title: 'Error Message', msg: ' Your Table Data is Empty..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
      return false;
    }
    else if (this.purchaseOrder.get('distributor').value == "opt1") {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'SELECT DISTRIBUTOR NAME', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }
    else if (this.purchaseOrder.get('podate').value == '' || this.purchaseOrder.get('podate').value == null) {
      this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'DATE IS NOT SELECTED', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
      return false;
    }
    return true;
  }

  private createRecord(): void {
    //  alert(JSON.stringify(this.purchaseOrder.value));
 
    this.purchaseOrders.createPurchaseOrder(JSON.stringify(this.purchaseOrder.value)).subscribe(
      (result: any) => {
        let re = result.res;
        // alert("re"+re);
        if (re == true) {
          const saveData = this.purchaseOrder.controls['brandDetails'];
          // alert("purchaseOrder"+JSON.stringify(saveData.value));
          this.purchaseOrders.createPurchaseOrderProduct(JSON.stringify(saveData.value)).subscribe(
            (result: any) => {
              let res = result.res;  
              this.poid = res[1];
              var obj = {
                email: this.emailaddress, url: "http://204.93.193.244:8082/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Billprnt_PO.rptdesign&branchrefid=" + AppComponent.branchID + "&Locname=" + AppComponent.locRefName1 + "&Locrefid=" + AppComponent.locrefID1 + "&Companyrefid=" + AppComponent.companyID + "&POID=" + this.poid + "&porefid=" + this.poid + "&ShopID=" + this.shopid +"&__format=PDF"
              };


              // alert("Hi " +JSON.stringify(obj));


              this.purchaseOrders.sendMailPurchaseOrder(JSON.stringify(obj)).subscribe(data => { },
                errorCode => console.log(errorCode));



            },
            error => {
              console.log("Error createPurchaseOrderProduct");
            }

          );
        }
        this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Data Saved Succesfully', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        //   window.location.href = "PurchaseOrder/ViewPurchaseOrder";
        setTimeout(() => {
          this.router.navigate(['PurchaseOrder/ViewPurchaseOrder']);
        }, 500);
      }
    );
    
  }
  poprint() {
   this.onSubmit();
    if (this.poid != undefined || null || '') {
      // let companyurl: string="http://204.93.193.244:8082/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Billprnt_PO.rptdesign&Companyrefid="+this.locname;
      this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'Value not fetching', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });

      //   setTimeout(() => {
      //    this.router.navigateByUrl('http://204.93.193.244:8082/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Billprnt_PO.rptdesign&branchrefid={{branchid}}&Locname={{locname}}&Locrefid={{locrefid}}&Companyrefid={{companyrefid}}&porefid={{poid}}&POID={{poid}}&ShopID={{shopid}}&__format=PDF');
      //  }, 2000);

    }
    else {
      setTimeout(() => {
        window.location.href = "http://204.93.193.244:8082/birt/frameset?__report=MedeilReports/BillPrint_PurchaseOrder/Billprnt_PO.rptdesign&Companyrefid=" + this.companyrefid + "&branchrefid=" + this.branchid + "&Locname=" + this.locname + "&Locrefid=" + this.locrefid + "&POID=" + this.poid + "&porefid=" + this.poid + "&ShopID=" + this.shopid + "&__format=PDF";
      }, 7000);
    }

  }
}
