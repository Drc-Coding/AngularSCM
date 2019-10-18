import { OnInit, Component } from "@angular/core";
import { addShipmentServices } from "./addShipment.component.services";
import { NotificationsComponent } from "app/notifications/notifications.component";
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from "@angular/forms";
import { AppComponent } from "app/app.component";
import { dateFormatPipe } from "app/notifications/notifications.datepipe";



@Component({
    selector: 'app-addshipment',
    templateUrl: './addShipment.component.html',

    providers: [addShipmentServices, dateFormatPipe, NotificationsComponent]
})


export class addShipment implements OnInit {

    email = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    productinfo;
    i;



    selobj;

    shipmentForm: FormGroup;

    packno = [];

    countries = [];
    states = [];

    ccode = [];
    cities = [];

    shtabhide;


    constructor(private addShipmentservices: addShipmentServices, private formBuilder: FormBuilder, private notificationsComponent: NotificationsComponent, private dateformat: dateFormatPipe) {





    }




    ngOnInit() {


        //this.shipmentForm.get('clientcdate').setValue(this.dateformat.transform05(Date.now()));



        this.addShipmentservices.getCountry().subscribe(data => this.countries = data,
            err => {
                console.log('Error Occured ');
            });


        this.selobj = {
            userid: AppComponent.userID, locrefid: AppComponent.locrefID1, locname: AppComponent.locRefName1, countryrefid: AppComponent.countryID,
            companyid: AppComponent.companyID
            , branchrefid: AppComponent.branchID, vatdispflag: AppComponent.vatDispFlag, boxdispflag: AppComponent.BoxDispFlag
            , stripdispflag: AppComponent.StripDispFlag, tabdispflag: AppComponent.TabDispFlag
        };

        this.shipmentForm = this.formBuilder.group({


            // shipid, shippmentno, packagerefID, salesinvoiceno, createdby, createddate, modifiedby, modifieddate, clientcdate, 
            // clientmdate,  shippingaddress1, shippingaddress2, shippingaddress3, billingaddress1, billingaddress2, billingaddress3, 
            // companyrefid, branchrefid, locname, locrefid,  custrefid, packageemprefid, emprefid, shipmentmode, shipmentname, 
            // transportno, countryrefid, plannedshipdate, totalbox, totalweight, totalshipmentcharge, qrcoderefid, barcoderefid



            packagerefid: [, [Validators.required]],
            salesinvoiceno: [, []],

            customername: [, []],


            custrefid: [, []],

            //date: [, []],


            //     shippingaddress1: [, []],
            //     shippingaddress2: [, []],
            //     shippingaddress3: [, []],
            //   billingaddress1: [, []],
            //   billingaddress2: [, []],


            // billingaddress3: [, []],


            emprefid: [1, []],

            employeename: [, []],

            shippingid: [, [Validators.required]],


            shipmentmode: [, []],
            shipmentname: [, []],
            transportno: [, []],
            plannedshipdate: [, [Validators.required]],

            totalbox: [, []],
            totalweight: [, []],
            totalshipmentcharge: [, []],



            createdby: [this.selobj.userid, []],
            locrefid: [this.selobj.locrefid, []],
            locname: [this.selobj.locname, []],
            countryrefid: [this.selobj.countryrefid, []],
            companyrefid: [this.selobj.companyid, []],
            branchrefid: [this.selobj.branchrefid, []],
            clientcdate: [this.dateformat.transform05(Date.now()), []],

            clientcdate1: [this.dateformat.transform04(), []],


            modifiedby: [AppComponent.userID, []],


            modifieddate: [, []],
            clientmdate: [AppComponent.date, []],
            qrcoderefid: [, []],

            barcoderefid: [, []],

            checkbox1: [, []],
            checkbox2: [, []],
            samebilling: [, []],



            billingaddress: [, [Validators.required]], bstreet: [, []], blocation: [, []],
            bcountry: [0, []], bstate: [0, []], bcity: [0, []],
            bcontactperson: [, [Validators.required]], bmobile: [, [Validators.required]],
            bemail: [, [Validators.pattern(this.email)]],
            shippingaddress: [, []], shstreet: [, []],


            // hsm_streetname:[,[]],



            slocation: [, []],
            shipmentaddress: [, []],
            shcountry: [0, []], shstate: [0, []], shcity: [0, []], shcontactperson: [, []],
            shmobile: [, []], shemail: [, [Validators.pattern(this.email)]],



            salesorderrefid: [, []],

            shipmentcalculation: this.formBuilder.array([

            ]),



        });





        this.addShipmentservices.getPackingno(this.selobj.companyid,
            this.selobj.branchrefid, this.selobj.locname,
            this.selobj.locrefid).subscribe(data => { this.packno = data })

        this.rowincrease();

    }


    // getValues() {
    //     //get Product Information
    //     this.addShipmentservices.getProductinfo(this.shipmentForm.get('bcountry').value).subscribe(data => this.productinfo = data,
    //         err => {
    //             console.log('Error Occured ProductInfo');
    //         });
    // }






    getState() {
        //Get States 
        this.addShipmentservices.getStates(this.shipmentForm.get('bcountry').value).subscribe(data => this.states = data,
            err => {
                console.log('Error Occured Get States');
            });

    }


    getState1() {


        //Get States 
        this.addShipmentservices.getStates(this.shipmentForm.get('shcountry').value).subscribe(data => this.states = data,
            err => {
                console.log('Error Occured Get States');
            });



        //Get Country Code
        // this.addShipmentservices.getCountrycode(this.shipmentForm.get('country').value).subscribe(data => {
        //     this.ccode = data,
        //         this.shipmentForm.get('countrycode').setValue(data.toString());
        // },
        //     err => {
        //         console.log('Error Occured Country Code');
        //     });


    }


    getCity() {
        //Get City 
        this.addShipmentservices.getCity(this.shipmentForm.get('bstate').value).subscribe(data => this.cities = data,
            err => {
                console.log('Error Occured Get City');
            });
    }



    getCity1() {
        //Get City 
        this.addShipmentservices.getCity(this.shipmentForm.get('shstate').value).subscribe(data => this.cities = data,
            err => {
                console.log('Error Occured Get City');
            });
    }










    rowincrease() {

        const rowinc = <FormArray>this.shipmentForm.controls['shipmentcalculation'];

        let data = [[]];

        for (let j = 0; j < data.length; j++) {
            rowinc.insert(0, this.formBuilder.group({


                createddate: [, []],
                modifiedby: [AppComponent.userID, []],
                modifieddate: [, []],
                clientmdate: [AppComponent.date, []],
                createdby: [this.selobj.userid, []],
                locrefid: [this.selobj.locrefid, []],
                locname: [this.selobj.locname, []],
                countryrefid: [this.selobj.countryrefid, []],
                companyrefid: [this.selobj.companyid, []],
                branchrefid: [this.selobj.branchrefid, []],
                clientcdate: [this.dateformat.transform04(), []],
                package_description: [, []],
                unitbox: [, []],
                unitweight: [, []],
                unitprice: [, []],
                amount: [, []],
                unitshipmentcharge: [, []]
            }));
        }
    }







    createRecords(): FormGroup {


        return this.formBuilder.group({




            package_description: [, []],
            unitbox: [, []],
            unitweight: [, []],
            unitprice: [, []],
            amount: [, []],
            unitshipmentcharge: [, []]

        })



    }

    public retrunFlag: boolean = false;


    onSubmit() {

        //debugger;


        this.retrunFlag = this.basicValidation();

        if (this.retrunFlag) {
            this.addShipmentservices.saveShipping(JSON.stringify(this.shipmentForm.value)).subscribe(

                data => { this.saveShippingdetail(data) },

                errorCode => console.log(errorCode)

            );
        }
    }

    basicValidation(): boolean {

        if (!this.shipmentForm.get('checkbox1').value && !this.shipmentForm.get('checkbox2').value) {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'please select either one..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;
        }

        else if (this.shipmentForm.get('bcountry').value == '' || 0 || null || undefined) {
            // debugger;

            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Billing Country..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }


        else if (this.shipmentForm.get('bstate').value == '' || 0 || null || undefined) {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Billing State..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }

      
        else if (this.shipmentForm.get('checkbox2').value && this.shipmentForm.get('shcontactperson').value == null || undefined || '') {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'Please Enter Contact Person..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }

        else if (this.shipmentForm.get('checkbox2').value && this.shipmentForm.get('shipmentaddress').value == null || undefined || '') {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Shipment Addres1..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }


        else if (this.shipmentForm.get('checkbox2').value && this.shipmentForm.get('shcountry').value == '' || 0 || null || undefined) {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Shipment Country..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }

        else if (this.shipmentForm.get('checkbox2').value && this.shipmentForm.get('shstate').value == '' || 0 || null || undefined) {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Shipment State..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }


        else if (this.shipmentForm.get('checkbox2').value && this.shipmentForm.get('shmobile').value == null || undefined || '') {


            this.notificationsComponent.addToast({ title: 'Error', msg: 'please enter Mobile No..', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
            return false;

        }




        return true;
    }






    saveShippingdetail(data: any) {



        if (data == 1) {


            const shipArrayCons = <FormArray>this.shipmentForm.controls['shipmentcalculation'];

            let setData = shipArrayCons.value;
            let arr = []




            for (let i = 0; i < setData.length; i++) {

                // if (setData[i].package_description != null || undefined || "") {

                arr.push(setData[i]);

                //  }


            }


            this.addShipmentservices.saveShippingdetail(JSON.stringify(arr)).subscribe(data => {
                this.savevalid(data);



                window.location.href = "shipment/ViewShipment";

                // [routerLink]="['/shipment/ViewShipment']"
            },


                errorCode => console.log(errorCode)

            );



        }


    }



    savevalid(data: any) {


        if (data == 1) {
            this.notificationsComponent.addToast({ title: 'Success', msg: 'Data  Saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'success' });

        } else {
            this.notificationsComponent.addToast({ title: 'Error', msg: 'Data Not  saved  ', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });
        }
    }








    getPackDetails() {



        let obj = {
            packagerefid: this.shipmentForm.get('packagerefid').value, companyrefid: this.selobj.companyid,
            branchrefid: this.selobj.branchrefid, locname: this.selobj.locname,
            locrefid: this.selobj.locrefid
        };

        this.addShipmentservices.getPackDetails(JSON.stringify(obj)).subscribe(data => {

            this.packageDetails(data)

        });

    }


    packageDetails(data: any) {

        if (data != null || undefined || "") {

            this.shipmentForm.get('salesinvoiceno').setValue(data[0][0]);
            this.shipmentForm.get('customername').setValue(data[0][1]);
            //this.shipmentForm.get('clientcdate').setValue(data[0][2]);
            this.shipmentForm.get('billingaddress').setValue(data[0][3]);
            // this.shipmentForm.get('shippingaddress2').setValue(data[0][4]);
            this.shipmentForm.get('custrefid').setValue(data[0][5]);




            // this.shipmentForm.get('shippingaddress3').setValue(data[0][6]);
            this.shipmentForm.get('salesorderrefid').setValue(data[0][7]);
            // this.shipmentForm.get('billingaddress2').setValue(data[0][8]);


        }


    }


    gettablevalue() {

        let obj = {
            packagerefid: this.shipmentForm.get('packagerefid').value, companyrefid: this.selobj.companyid,
            branchrefid: this.selobj.branchrefid, locname: this.selobj.locname,
            locrefid: this.selobj.locrefid
        };



        this.addShipmentservices.gettablevalue(JSON.stringify(obj)).subscribe(data => {
            this.loadGridData(data)
        });
    }

    k;

    tableCalculation() {


        // alert('tableCalculation ');
        // debugger;
        let TotalBox: any = 0;
        let TotalWeight: any = 0;
        let TotalShipmentCharge: any = 0;



        let txtTotalBox: any = 0;
        let txtTotalWeight: any = 0;
        let txtTotalShipmentCharge: any = 0;


        let txtTotalboxwghtshipcharges: any = 0;



        const getData = <FormArray>this.shipmentForm.controls['shipmentcalculation'];
        let setData = getData.value;

        for (this.k = 0; this.k < setData.length; this.k++) {



            if (setData[this.k].unitbox || setData[this.k].unitweight || setData[this.k].unitshipmentcharge != NaN || undefined || null) {





                // if (setData[this.j].tabqty == '' || parseFloat(setData[this.j].tabqty) == null) {
                //     setData[this.j].tabqty = 0;
                //     txttabletquantity = 0;
                //   }
                //   else {
                //     txttabletquantity = parseFloat(setData[this.j].tabqty);
                //     TabQuantity += parseFloat(setData[this.j].tabqty);
                //   }

                if (setData[this.k].unitbox == '' || NaN || undefined || parseFloat(setData[this.k].unitbox) == null || NaN || undefined) {
                    setData[this.k].unitbox = 0;
                    txtTotalBox = 0;

                }

                else {

                    txtTotalBox = parseFloat(setData[this.k].unitbox);
                    TotalBox += parseFloat(setData[this.k].unitbox);
                }




                if (setData[this.k].unitweight == '' || parseFloat(setData[this.k].unitweight) == null) {
                    setData[this.k].unitweight = 0;
                    txtTotalWeight = 0;

                }

                else {

                    txtTotalBox = parseFloat(setData[this.k].unitweight);
                    TotalWeight += parseFloat(setData[this.k].unitweight);
                }




                if (setData[this.k].unitshipmentcharge == '' || parseFloat(setData[this.k].unitshipmentcharge) == null) {
                    setData[this.k].unitshipmentcharge = 0;
                    txtTotalShipmentCharge = 0;

                }

                else {

                    txtTotalShipmentCharge = parseFloat(setData[this.k].unitshipmentcharge);
                    TotalShipmentCharge += parseFloat(setData[this.k].unitshipmentcharge);
                }



                getData.patchValue(setData);


                txtTotalboxwghtshipcharges += txtTotalBox + txtTotalWeight + txtTotalShipmentCharge;
                this.shipmentForm.get('totalbox').setValue(TotalBox);
                this.shipmentForm.get('totalweight').setValue(TotalWeight);
                this.shipmentForm.get('totalshipmentcharge').setValue(TotalShipmentCharge);





            }

        }//for





    }












    loadGridData(data: any) {


        const control = <FormArray>this.shipmentForm.controls['shipmentcalculation'];



        while (control.length !== 0) {
            control.removeAt(0);
        }



        let flag: number = 0;

        if (data != null || undefined || "") {

            const shipArrControls = <FormArray>this.shipmentForm.controls['shipmentcalculation'];
            let shipArrValue = shipArrControls.value;
            for (let i = 0; i < data.length; i++) {
                for (var j = 0; j < shipArrValue.length; j++) {
                    if (data[i][0] == shipArrValue[j][0]) {
                        flag = 1;
                    }
                }
                if (flag == 1) {
                    this.notificationsComponent.addToast({ title: 'Error Message', msg: 'The  ' + data[i][0].toUpperCase() + '   Already Exist...', timeout: 5000, theme: 'default', position: 'top-right', type: 'error' });

                } else {

                    shipArrControls.insert(0, this.shipCalculation(

                        data[i][0],
                        data[i][1],
                        data[i][2],

                    ));

                }
            }

            this.tableCalculation();
        }
    }



    shipCalculation(packdesc: any, unitbox: any, unitprice: any) {

        // , unitweight:any, unitprice:any, amount:any, utshipchrg:any


        return this.formBuilder.group({

            package_description: packdesc,
            unitbox: unitbox,
            unitweight: 0,
            unitprice: unitprice,
            amount: 0,
            unitshipmentcharge: 0,



            modifiedby: [AppComponent.userID, []],
            modifieddate: [, []],
            clientmdate: [AppComponent.date, []],
            createdby: [this.selobj.userid, []],
            locrefid: [this.selobj.locrefid, []],
            locname: [this.selobj.locname, []],
            countryrefid: [this.selobj.countryrefid, []],
            companyrefid: [this.selobj.companyid, []],
            branchrefid: [this.selobj.branchrefid, []],
            clientcdate: [this.dateformat.transform04(), []],

        })

    }




    shipShowMeth(event: any) {


        if (event) {


            this.shtabhide = 1;


            this.shipmentForm.get('checkbox1').setValue(false);
            this.shipmentForm.get('samebilling').setValue(0);

        }

        else {

            this.shtabhide = 0;

        }
    }


    sameAddress(event: any) {

        if (event) {
            this.shtabhide = 0;
            this.shipmentForm.get('checkbox2').setValue(false);


            this.shipmentForm.get('samebilling').setValue(1);


        }


    }








}