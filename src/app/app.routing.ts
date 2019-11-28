import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: "/userlogin/login",
      pathMatch: 'full'
    }, {
      path: 'dashboard',
      loadChildren: './dashboard/dashboard.module#DashboardModule'
    }, {
      path: 'Doctor',
      loadChildren: './doctor/doctor.module#DoctorModule'
    }, {
      path: 'Edition',
      loadChildren: './edition/edition.module#EditionModule'
    }, {
      path: 'Role',
      loadChildren: './role/role.module#RoleModule'
    }, {
      path: 'Domain',
      loadChildren: './domain/domain.module#DomainModule'
    }, {
      path: 'SubDomain',
      loadChildren: './subdomain/subdomain.module#SubdomainModule'
    }, {
      path: 'User',
      loadChildren: './users/users.module#UsersModule'
    }, {
      path: 'user',
      loadChildren: './user/user.module#UserModule'
    }, {
      path: 'Registration',
      loadChildren: './shopinfo/shopinfoModule.module#ShopModule'
    }, {
      path: 'Registration',
      loadChildren: './companyInfo/companyInfoModule.module#CompanyModule'
    }, {
      path: 'ViewRegistration',
      loadChildren: './companyInfo/companyInfoModule.module#CompanyModule'
    }, {
      path: 'ViewRegistration',
      loadChildren: './shopinfo/shopinfoModule.module#ShopModule'
    }, {
      path: 'ViewRegistration',
      loadChildren: './branchInfo/branchInfoModule.module#BranchModule'
    }, {
      path: 'ViewRegistration',
      loadChildren: './hospitalform/hospitalform.module#HospitalformModule'
    }, {
      path: 'customer',
      loadChildren: './customer/customer.module#CustomerModule'

    }, {
      path: 'Appointment',
      loadChildren: './Appointment/Appointment.module#AppointmentModule'
    }, {
      path: 'SalesOrder',
      loadChildren: './salesordernew/salesordernew.module#salesOrderModulenew'
    }, {
      path: 'Registration',
      loadChildren: './hospitalform/hospitalform.module#HospitalformModule'
    }, {
      path: 'Module',
      loadChildren: './usersetting/usersetting.module#AddModules'
    }, {
      path: 'warehouse',
      loadChildren: './warehouse/warehouse.module#WarehouseModule'
    }, {
      path: 'StockEntryForm',
      loadChildren: './stocks/stocks.module#StocksModule'
    }, {
      path: 'Stock',
      loadChildren: './stocks/stocks.module#StocksModule'
    }, {
      path: 'SubModule',
      loadChildren: './submodules/submodules.module#Submodulesserv'
    }, {
      path: 'warehouseTransfer',
      loadChildren: './warehouseTransfer/warehouseTransfer.module#WarehTransferModules'
    }, {
      path: 'PurchaseApproval',
      loadChildren: './purchaseApproval/purchaseApproval.module#purchaseApprovalModule'
    }, {
      path: 'loginuserdetail',
      loadChildren: './loginuserdetail/loginuserdetail.module#LoginuserdetailModule'
    }, {
      path: 'DamageStock',
      loadChildren: './damagestock/damagestock.module#DamagestockModule'
    }, {
      path: 'Product',
      loadChildren: './product/product.module#ProductModule'
    }, {
      path: 'Employee',
      loadChildren: './employeeinfo/emp.module#empModule'
    }, {
      path: 'Registration',
      loadChildren: './branchInfo/branchInfoModule.module#BranchModule'
    }, {
      path: 'PurchaseOrder',
      loadChildren: './Purchase/purchase.module#PurchaseModule'
    }, {
      path: 'ProductMaster',
      loadChildren: './drugmaster/drugmaster.module#drugModule'
    }, {
      path: 'PurchaseInvoice',
      loadChildren: './purchaseInvoice/purchaseInvoice.module#invoiceModule'
    }, {
      path: 'PurchaseSession',
      loadChildren: './purchasesession/purchasesession.module#invoicesessionModule'
    }, {
      path: 'PatientAlert',
      loadChildren: './patientAlert/PatientAlert.module#PatientAlertmodule'
    },

    //Sabarish
    {
      path: 'TaxSettings',
      loadChildren: './taxsettings/taxsettings.module#TaxsettingsModule'
    },
    {
      path: 'CurrencySetting',
      loadChildren: './currencysetting/currencysetting.module#CurrencysettingsModule'
    },

    //Gokul
    {
      path: 'SalesReports',
      loadChildren: './reports/salesreports/report.module#reportModule'
    }, {
      path: 'PurchaseReports',
      loadChildren: './reports/purchasereports/report.module#reportModule'
    }, {
      path: 'AdminReports',
      loadChildren: './reports/adminreports/report.module#reportModule'
    }, {
      path: 'DoctorReports',
      loadChildren: './reports/doctorreports/report.module#reportModule'
    }, {
      path: 'HRMSReports',
      loadChildren: './reports/hrmsreports/report.module#reportModule'
    }, {
      path: 'InventoryReports',
      loadChildren: './reports/inventoryreports/report.module#reportModule'
    }, {
      path: 'VendorReports',
      loadChildren: './reports/vendorreports/report.module#reportModule'
    }, {
      path: 'CRMReports',
      loadChildren: './reports/crmreports/report.module#reportModule'
    }, {
      path: 'StockReports',
      loadChildren: './reports/stockreports/report.module#reportModule'
    },
    //sankar
    {
      path: 'HQReport',
      loadChildren: './reports/hqreport/hqreport.module#hqReportModule'
    },
    {
      path: 'SalesOrderLead',
      loadChildren: './salesorderlead/salesorderlead.module#SalesorderleadModule'
    },
    {
      path: 'Trackstatus',
      loadChildren: './trackstatus/trackstatus.component.module#TrackstatusModule'
    },
    {
      path: 'Packing',
      loadChildren: './packing/packing.module#PackingModule'
    },
    {
      path:'PrescriptionDGT',
      loadChildren: './practisemgmnt/practisemgmnt.module#PractiseassignModule'
    },
    //kishor
    {
      path: 'shipment',
      loadChildren: './shipment/shipment.module#ShipmentModule'
    },
    //Raja
    {
      path: 'Picking',
      loadChildren: './sales-pick/salespicking.module#salespickingModule'
    },
    {
      path:'PrescUpdation',
      loadChildren: './presc-updation/prescupdation.module#PrescriptionUpdationModule'
    },


    //Mani
    {
      path: 'StockChecking',
      loadChildren: './stockCheck/stockCheck.module#stockCheck'
    }, {
      path: 'RequisitionStatus',
      loadChildren: './indentStatus/indentStatus.module#indentStatus'
    }, {
      path: 'AssignBarcode',
      loadChildren: './generateBarcode/barcode.module#BarcodeModule'
    }, {
      path: 'ViewRequisition',
      loadChildren: './indentStand/indentStand.module#standlone'
    }, {
      path: 'DeliveryReceipt',
      loadChildren: './deliveryChallan/deliveryChallan.module#deliveryChallanModule'
    }, {
      path: 'GatePass',
      loadChildren: './gatePass/gatePass.module#gatePassModule'
    }, {
      path: 'PurchaseDeliveryReceipt',
      loadChildren: './purchaseDeliveryChallan/purchaseDeliveryChallan.module#purchaseDeliveryChallanModule'
    }, {
      path: 'SalesDeliveryReceipt',
      loadChildren: './salesDeliveryChallan/salesDeliveryChallan.module#salesDeliveryChallanModule'
    }, {
      path: 'PurchaseGatePass',
      loadChildren: './purchaseGatePass/purcGatePass.module#purcGatePassModule'
    },
    
    {
      path: 'SalesGatePass',
      loadChildren: './sales/salesGatePass/salesGatePass.module#salesGatePassModule'
    },



    //prasad
    {
      path: 'Patient',
      loadChildren: './regform/patient/patient.module#PatientModule'
    }, {
      path: 'Customer',
      loadChildren: './regform/customer/customer.module#customerModule'
    }, {
      path: 'Manufacturer',
      loadChildren: './regform/pharmacompany/companypharma.module#CompanypharmaModule'
    }, {
      path: 'ReorderForm',
      loadChildren: './inventory/stkminqty/stkminqty.module#stkminqtyModule'
    }, {
      path: 'Distributor',
      loadChildren: './regform/distributor/distributor.module#DistributorModule'
    }, {
      path: 'DistributorwiseProduct',
      loadChildren: './regform/distwiseproduct/distprod.module#distprodModule'
    }, {
      path: 'RequisitionForm',
      loadChildren: './inventory/indentrequest/indentrequest.module#indentreqModule'
    }, {
      path: 'RequisitionRequest-ST',
      loadChildren: './inventory/indentrequestst/indentrequest.module#indentreqModule'
    }, {
      path: 'RequisitionReceiving',
      loadChildren: './inventory/indentapproval/indentapproval.module#indentapprovalModule'
    }, {
      path: 'StockTransfer',
      loadChildren: './inventory/stocktransfer/stktrans.module#stktransModule'
    }, {
      path: 'GoodsReceivedNote',
      loadChildren: './inventory/stockreceive/stockreceive.module#stockreceiveModule'
    }, {
      path: 'StockReturn',
      loadChildren: './inventory/stockreturn/stockreturn.module#stockreturnModule'
    }, {
      path: 'StockAdjustment',
      loadChildren: './inventory/stockadjustment/stockadjustment.module#stockadjustmentModule'
    }, {
      path: 'ExpiredStock',
      loadChildren: './inventory/stockexpiry/stockexpiry.module#stockexpiryModule'
    }, {
      path: 'priscmgmt',
      loadChildren: './clinc/prescriptionmgmt/priscmgmt.module#priscmgmtModule'
    }, {
      path: 'perinv',
      loadChildren: './sales/perinv/perinv.module#perinvModule'
    }, {
      path: 'SalesDummy',
      loadChildren: './sales/salesdummy/salesdummy.module#salesdummyModule'
    }, {
      path: 'SalesInvoice',
      loadChildren: './sales/salesinvoice/salesinvoice.module#salesinvoiceModule'
    }, {
      path: 'SalesReturn',
      loadChildren: './sales/salesreturn/salesreturn.module#salesreturnModule'
    }, {
      path: 'salesmaintain',
      loadChildren: './sales/salesmaintain/salesmaintain.module#salesmaintainModule'
    },
 
    
  

    {
      path: 'Ledger',
      loadChildren: './accounts/ledger/ledger.module#ledgerModule'
    }, {
      path: 'Accounts',
      loadChildren: './accounts/accounts/accounts.module#accountsModule'
    }, {
      path: 'DayBook',
      loadChildren: './accounts/daybook/daybook.module#daybookModule'
    }, {
      path: 'PurchaseJournal',
      loadChildren: './accounts/purchjournal/pchjournal.module#pchjournalModule'
    }, {
      path: 'SalesJournal',
      loadChildren: './accounts/sjournal/sjournal.module#sjournalModule'
    }, {
      path: 'GeneralJournal',
      loadChildren: './accounts/genjournal/genjournal.module#genjournalModule'
    }, {
      path: 'CreditNote',
      loadChildren: './accounts/creditNote/creditNote.module#creditNoteModule'
    }, {
      path: 'Payment',
      loadChildren: './accounts/payments/payment.module#paymentModule'
    }, {
      path: 'DebitNote',
      loadChildren: './accounts/debitNote/debitNote.module#debitNoteModule'
    }, {
      path: 'Receipt',
      loadChildren: './accounts/receipts/receipts.module#receiptsModule'
    }, {
      path: 'BalanceSheet',
      loadChildren: './accounts/balancesheet/blncesheet.module#blncesheetModule'
    }, {
      path: 'CashflowStatement',
      loadChildren: './accounts/cashflowstmt/flowstmt.module#flowstmtModule'
    }, {
      path: 'ProfitLossStatement',
      loadChildren: './accounts/plstatement/plstmt.module#plstmtModule'
    }, {
      path: 'TrialBalance',
      loadChildren: './accounts/trialbalance/trialbalance.module#trialbalanceModule'
    }, {
      path: 'PriceEnquiry',
      loadChildren: './purchasemod/priceenquiry/priceenquiry.module#priceenquiryModule'
    }, {
      path: 'DistributorSelection',
      loadChildren: './purchasemod/distributorselect/distslct.module#distslctModule'
    }, {
      path: 'PurchaseReturn',
      loadChildren: './purchasemod/purchaseReturn/purchaseReturn.module#purchaseReturnModule'
    }, {
      path: 'PriceUpdation',
      loadChildren: './inventory/distupdation/distupdation.module#distupdationModule'
    },
    {
      path:'CustomerTracking',
      loadChildren: './custrack/custrack.module#CustrackModule'
    },
    {
      path:'usertask',
      loadChildren: './usertask/usertask.module#UsertaskModule'
    },
    {
      path:'Department',
      loadChildren: './department/department.module#DepartmentModule'
    },
    {

      path: 'Basic',
      loadChildren: './invoiceprint/invoiceprint.module#InvoiceModule'

    },


  
  ]
}, {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: 'userlogin',
    loadChildren: './userlogin/userlogin.module#UserloginModule'
  }, {
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'sinup',
    loadChildren: './SinUp/SinUp.module#SinupModule'
  }, {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule'
  }]
}, {
  path: '**',
  redirectTo: 'error/404'
}];