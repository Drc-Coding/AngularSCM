import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { purchaseOrderEditService } from './purchaseOrderEdit.services';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'selenium-webdriver';
import { DxDataGridComponent } from "devextreme-angular";
import { AppComponent } from '../../app.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
@Component({
  selector: 'Purchase Order',
  templateUrl: './purchaseOrderEdit.component.html',
  styleUrls: ['./purchaseOrderEdit.component.css'],
  providers: [purchaseOrderEditService, NotificationsComponent]
})
export class purchaseOrderEditComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  private purchaseNo: any;
  purchaseOrder: any;
  id: any;
  characters = [];
  drugid:any;
  companyid: number;
  branchid: number;
  submitted: false;
  distributors = [];
  unitofMsr=[];
  dataSource = [];
  drugs = [];
  drugList = [];
  dist = [];
  flags: boolean = false;

  constructor(private purchaseOrders: purchaseOrderEditService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent) {
    this.purchaseOrder = this.formBuilder.group({
      distributor:['',[]],
      distributorname:['',[]],
      drug: ['',[]],
      poautoincr: ['', []],
      podate: ['',[]],
      barcode:['',[]],
      totalproduct: ['', []],
      totalboxquantity: ['', []],
      totalstpquantity: ['', []],
      totaltabquantity: ['', []],
      totalquantity: ['', []],
      grandtotal: ['', []],
      companyid: ['', []],
      branchid: ['', []],
      locname: ['', []],
      locref: ['', []],
      brandDetails: this.formBuilder.array([
      ]),
  
    });


  }
  auto: any;
  ngOnInit() {

    this.purchaseOrder.get('companyid').setValue(AppComponent.companyID);
    this.purchaseOrder.get('branchid').setValue(AppComponent.branchID);
    this.purchaseOrder.get('locname').setValue(AppComponent.locRefName1);
    this.purchaseOrder.get('locref').setValue(AppComponent.locrefID1);

   //this.purchaseOrder.get('distributor').setValue("opt1");
    this.purchaseOrder.get('drug').setValue("opt1");

    
      this.id = this.route.snapshot.paramMap.get('id');
    
    this.purchaseOrders.editPurchseOrder(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1, this.id).subscribe(data => {this.setDatas(data)},
      err => {
        console.log('Error Occured Get States');
      });



    this.purchaseOrders.getPurchaseOrderProductedit(AppComponent.companyID, AppComponent.branchID,  AppComponent.locRefName1, AppComponent.locrefID1, this.id).subscribe(data => { this.getTableData(data) },
      err => {
        console.log('Error occured in Company edit ');
      });


   /* this.purchaseOrders.getDistributorEdit(this.purchaseOrder.get('distributor').value).subscribe(data => { this.distributors = data },
      err => {
        console.log('Error Occured Get States');
      });
       */
   

      this.purchaseOrders.getuom(AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data =>  this.unitofMsr = data )
  }
  // getDist(searchValue: string) {

  //   if (AppComponent.usertype == "\"SuperAdmin\" ") {


  //     this.purchaseOrders.getSuperDist(searchValue).subscribe(data => {
  //       this.distributors = [];
  //       for (let i = 0; i < data.length; i++) {
  //         this.distributors.push({ value: data[i][0], label: data[i][1] });
  //       }
  //     });
  //   } else {
  //     this.purchaseOrders.getDistributor(searchValue,AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
  //       this.distributors = [];
  //       for (let i = 0; i < data.length; i++) {
  //         this.distributors.push({ value: data[i][0], label: data[i][1] });
  //       }
  //     });



  //   }
  // }
  getBarcodeProduct(event) {
    this.purchaseOrders.getBarcodeProduct(this.purchaseOrder.get('barcode').value).subscribe(data => {this.drugid=data}, err => {
        console.log('Error Occured Get States');
      }); 
      this.getBarcodeDrugs();
    }    


    getBarcodeDrugs() {
      this.purchaseOrders.getDrugsData(this.drugid).subscribe(data => { this.getDrugData(data) },
        err => {
          console.log('Error Occured Get States');
        });
    }

  getProduct(searchValue: string) {

    if (AppComponent.usertype == "\"SuperAdmin\" ") {
    this.purchaseOrders.getSuperDrugs(searchValue).subscribe(data => {
        this.characters = [];
        for (let i = 0; i < data.length; i++) {
          this.characters.push({ value: data[i][0], label: data[i][1] });
        }
      });
    }else{

      this.purchaseOrders.getDrugs(searchValue,AppComponent.companyID, AppComponent.branchID, AppComponent.locRefName1, AppComponent.locrefID1).subscribe(data => {
        this.characters = [];
        for (let i = 0; i < data.length; i++) {
          this.characters.push({ value: data[i][0], label: data[i][1] });
        }
      });

    }
  }




  setDatas(data: any) {
  
    if (data != null || data != undefined) {
        
        this.purchaseOrder.get('distributorname').setValue(data[0][0]); 
         this.purchaseOrder.get('poautoincr').setValue(data[0][1]); 
         this.purchaseOrder.get('podate').setValue(data[0][2]); 
         this.purchaseOrder.get('totalproduct').setValue(data[0][3]); 
         this.purchaseOrder.get('totalboxquantity').setValue(data[0][4]); 
         this.purchaseOrder.get('totalstpquantity').setValue(data[0][5]); 
         this.purchaseOrder.get('totaltabquantity').setValue(data[0][6]); 
         this.purchaseOrder.get('totalquantity').setValue(data[0][7]); 
         this.purchaseOrder.get('grandtotal').setValue(data[0][8]); 
         this.purchaseOrder.get('distributor').setValue(data[0][9]); 
     
    }
  }
  /*patchData(dist: any, pono: any, podate: any, totpdt: any, totBqty: any, totSripQty: any, totTabQty: any, totQty: any) {
    alert("dist"+dist+"pono"+pono+"podate"+podate+"totpdt"+totpdt+"totBqty"+totBqty+"totStripQty"+totSripQty+"totTabQty"+totTabQty+"totQty"+totQty)
    return {
      distributor: dist,
      poautoincr: pono,
      podate: podate,
      totalproduct: totpdt,
      totalboxquantity: totBqty,
      totalstpquantity: totSripQty,
      totaltabquantity: totTabQty,
      totalquantity: totQty,
    }
  }*/


  // getDistributorProduct() {
  //   if (AppComponent.usertype == "\"SuperAdmin\" ") {
  //     this.purchaseOrders.getSuperDistributorProduct(this.purchaseOrder.get('distributor').value).subscribe(data => { this.getTableData(data) },
  //       err => {
  //         console.log('Error Occured Get States');
  //       });
  //   }else{
  //     this.purchaseOrders.getDistributorProduct(AppComponent.companyID, AppComponent.branchID,  AppComponent.locRefName1,  AppComponent.locrefID1, this.purchaseOrder.get('distributor').value).subscribe(data => { this.getTableData(data) },
  //     err => {
  //       console.log('Error Occured Get States');
  //     });
  //   }
  //   }
    getDrugs(){
  //    alert(""+this.purchaseOrder.get('drug').value);
      this.purchaseOrders.getDrugsData(this.purchaseOrder.get('drug').value).subscribe(data => { this.getDrugData(data)},
        err => {
          console.log('Error Occured Get States');
        });
    }

    i;
    j;
    inc = 0;
    getTableData(data: any){ 
      let flag: number = 0;
      if (data !== null || data !== undefined) {
        
        const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
        let setData = getData.value; 
        for (this.i = 0; this.i < data.length; this.i++) {
          for (this.j = 0; this.j < setData.length; this.j++) {
            // alert(setData.length);
            // if (data[this.i][0] == setData[this.j].itemcode) {
            //   flag = 1;
            // }
          }
          if (flag == 1) {
            alert("The "+data[this.i][1]+" is already exist pls change the quantity");
            this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: "The " + data[this.i][1] + 'is already exist pls change the quantity', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
          }
          else {
            getData.push(this.setTabledata(
              data[this.i][0], 
              data[this.i][1], 
              data[this.i][2], 
              data[this.i][3], 
              data[this.i][4], 
              data[this.i][5],
              data[this.i][6],
              data[this.i][7],
              data[this.i][8],
              data[this.i][9],
              data[this.i][10],
              data[this.i][11],
              data[this.i][12],
              data[this.i][13],
              data[this.i][14]));
           
            this.inc += 1;
          }
        }
        this.characters = [];
        this.getSum();
      }

    }
    setTabledata(itemcode: any, itemname: any, dosage: any, boxqty: any, stripqty: any,
       tabletqty: any, uom: any, equalto: any, distpice: any,totalproductprice: any, abc: any, rank: any, remarks: any,sessionid: any,Sessionno:any )
    {
      return this.formBuilder.group({
       ID:this.inc,
        id: this.inc + 1,
        itemcode: itemcode,
        itemname: itemname,
        dosage: dosage,
        boxqty: boxqty,
        stripqty: stripqty,
        tabletqty: tabletqty,
        unitprice: distpice,
        totalqty: tabletqty,
        totalproductprice: totalproductprice,
        abc: abc,
        distprodrank:rank,
        distremarks: remarks,
        uom: uom,
        equalto: equalto,
        remove: 'remove',
        poid: this.id,
        pursessionid: sessionid,
        pursessionno:Sessionno
        
      });
    }
    getDrugData(data: any){
      let flag: number = 0;
      if (data !== null || data !== undefined) {
       
        const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
        let setData = getData.value; 
        for (this.i = 0; this.i < data.length; this.i++) {
          for (this.j = 0; this.j < setData.length; this.j++) {
         //  if (setData[this.j].itemcode == data[this.i][0]) {
         //   flag = 1;
          // }
          }
          if (flag == 1) {         
            this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: "The " + data[this.i][1] + 'is already exist pls change the quantity', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
          }
          else {
            getData.push(this.setDrugdata(data[this.i][0], data[this.i][1], data[this.i][2]));
            this.inc += 1;
          }
        }
      }
    }



    setDrugdata(pid: any, itemname: any, dosage: any)
    {
      return this.formBuilder.group({
        ID: this.inc,
        id: this.inc + 1,
        itemcode: pid,
        itemname: itemname,
        dosage: dosage,
        boxqty: 0,
        stripqty: 0,
        tabletqty: 0,
        totalqty: 0,
        unitprice: '',   
        totalproductprice: '',
        abc: '',
        distprodrank:'',
        distremarks: '',
        uom: 0,
        equalto: 0,
        poid: this.id
      });
    }

    // getPOSum(event){


    // let cols: number = event.columnIndex;
    // let rows: number = event.rowIndex;
    // if (cols == 8) {
    //   this.dataGrid.instance.deleteRow(rows);
    // }

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
        //this.getSBQuantity(setData[this.j].itemcode);
      //  Stripperbox = this.sbQuantity[0][0];
       // alert(Stripperbox);
      //  Quantityperstrip = this.sbQuantity[0][1];
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
  
        setData[this.j].totalproductprice = parseFloat(setData[this.j].unitprice) * parseFloat(setData[this.j].tabletqty);
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
        this.purchaseOrder.get('totalboxquantity').setValue(BoxQuantity);
        this.purchaseOrder.get('totalstpquantity').setValue(StripQuantity);
        this.purchaseOrder.get('totaltabquantity').setValue(TabQuantity);
        this.purchaseOrder.get('totalquantity').setValue(totalQuantity);
        // alert("a5"+totalacqcost);
        this.purchaseOrder.get('grandtotal').setValue(totalacqcost);
  
        //To set Temporary Values In Bottom Input types    
      }
    }
    removeRow(index: number) {
      // alert("RemoveRow" + index);
       const getData = <FormArray>this.purchaseOrder.controls['brandDetails'];
       getData.removeAt(index);
       this.getSum();
       let removeVal = getData.value;
       if (removeVal == null || removeVal == '') {
         getData.reset();
  
       }
     }
    onSubmit() {
      this.flags = this.validation();
      if (this.flags == true) {
        this.updateRecord();
      }
    }


   private validation(): boolean {
    // if (this.dataSource.length==0) {
    //   this.notificationsComponent.addToast({ title: 'ERROR MESSAGE', msg: 'THERE IS NO PRDOUCT ADDED FOR PURCHASE ORDER', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'error' });
    //   return 
    
    
    false;
    // } 
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

  private updateRecord(): void {
    //  alert(JSON.stringify(this.purchaseOrder.value));
    this.purchaseOrders.updatePurchaseOrder(JSON.stringify(this.purchaseOrder.value)).subscribe(
      (result: any) => {
        let re = result.res;
        //    alert(re);
        if (re == true) {
             //   alert(JSON.stringify(this.dataSource));
             const saveData = this.purchaseOrder.controls['brandDetails'];
          this.purchaseOrders.updatePurchaseOrderProduct(JSON.stringify(saveData.value)).subscribe(
            error => {
              console.log("Error createPurchaseOrderProduct");
            }

          );
        }
        this.notificationsComponent.addToast({ title: 'ALERT MESSAGE', msg: 'DATA UPDATED SUCCESSFULLY', timeout: 5000, theme: 'default', position: 'bottom-right', type: 'success' });
        setTimeout(() => {
        this.router.navigate(['PurchaseOrder/ViewPurchaseOrder']);
      }, 2000);
        // window.location.href = "PurchaseOrder/ViewPurchaseOrder";
      }
    );
  }
}
