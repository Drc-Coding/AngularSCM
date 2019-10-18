import {Injectable} from '@angular/core';
//import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class purchaseOrderEditService{
  handleError: any;
  headers: any;
  private getCompanies = 'api/getPOrderCompany';
  private editPurchaseOrder = 'api/getporderedit';
  private getBranches = 'api/getPOrderBranch';
  private getPOWarehouses = 'api/getPOrderWareHouse';
  private getPOHospitals = 'api/getPOrderHospitals';
  private getShops = 'api/getPOrderShop';
  private getDistributorsedit= 'api/getPODistributoredit';
  private getSuperDrugUrl= 'api/getsuperdrugval';
  private getDrugUrl= 'api/getdrugval';
  private getDrugInfo= 'api/getDruginfo';
  private getDistributors= 'api/getPODistributor';
  private getSuperDistributors= 'api/getSuperAdminPODistributor';
  private getDistributorProducts= 'api/getDistributorProducts';
  private getAutonIncrement= 'api/getAutoIncrements';
  private purchaseOrderUrl='api/updatePurchaseOrder';
  private purchaseOrderProductUrl='api/updatePurchaseOrderProduct';
  private getPurchaseOrders='api/getPurchaseOrdersedit';
  private getEmpCompanyById = 'api/getEmpCompanyById';
  private getEmpBranchById = 'api/getEmpBranchById';
  private getSuperDistributorProducts= 'api/getSuperDistributorProducts';
  private getbarcodeurl ='api/barcodeurl';
 // private header = new Headers({'Content-Type': 'application/json'});
 private uom = 'api/getuom';
  constructor(private http: Http) {}



  getSuperDist(searchValue: string) {
    return this.http.get(this.getSuperDistributors + '/' + searchValue).map(res => res.json());
  }


  getDistributor(searchValue: string,compid: number,brnchid: number,locname:number,locrefid: number) {
    //Get Distributor
    return this.http.get(this.getDistributors+ '/'+searchValue+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid).map(response => response.json());
   }




   getCompany() {
    //Get Companies
    return this.http.get(this.getCompanies).map(response => response.json());
   }
   editPurchseOrder(compid:number,brnchid:number,loc:number,locref:number,poid: number) {
    //Get Companies
    return this.http.get(this.editPurchaseOrder+'/'+compid+'/'+brnchid+'/'+loc+'/'+locref+'/'+poid).map(response => response.json());
   }
   getAutoIncr() {
    //Get getAutoIncrement
    return this.http.get(this.getAutonIncrement).map(response =>response.json());
   }

   getSuperAdminDistributor() {
    //Get Distributor
    return this.http.get(this.getSuperDistributors).map(response => response.json());
   }


   getBarcodeProduct(barcode: string) {
    //Get Companies
    return this.http.get(this.getbarcodeurl+'/'+barcode).map(response => response.json());
   }

  
   getDistributorEdit(poid: number) {
    //Get Distributor
    return this.http.get(this.getDistributorsedit+'/'+poid).map(response => response.json());
   }

   getSuperDrugs(searchValue: string) {
    //Get Companies
    return this.http.get(this.getSuperDrugUrl+'/'+searchValue).map(response => response.json());
   }
  
   getDrugs(searchValue: string,compid: number,brnchid: number,locname:number,locrefid: number) {
    //Get Companies
    return this.http.get(this.getDrugUrl+'/'+searchValue+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid).map(response => response.json());
   }


  
   getDrugsData(id: number) {
    //Get Companies
   return this.http.get(this.getDrugInfo+ '/' +id).map(response => response.json());
   }
   getPurchaseOrderProductedit(compid:number,brnchid:number,loc:number,locref:number,POID: number) {
    //Get getDrugList
    return this.http.get(this.getPurchaseOrders+'/'+compid+'/'+brnchid+'/'+loc+'/'+locref+'/'+ POID).map(response => response.json());
   }

   getSuperDistributorProduct(distID: number) {
    //Get getDrugList
    return this.http.get(this.getSuperDistributorProducts+ '/'+distID).map(response => response.json());
   }


   getDistributorProduct(compid: number,brnchid: number,locname:number,locrefid: number,distID: number) {
    //Get getDrugList
    return this.http.get(this.getDistributorProducts+ '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid+'/'+ distID).map(response => response.json());
   }

  

  updatePurchaseOrder(purchaseorder:String){

     let head = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.purchaseOrderUrl, purchaseorder, {headers: head}).map((res:Response)=>{
       return {"res":res.json()}
     })         
   }

   updatePurchaseOrderProduct(data:String){
    let head = new Headers({'Content-Type': 'application/json'});
   return this.http.post(this.purchaseOrderProductUrl, data, {headers: head}).map((res:Response)=>{
      return {"res":res.json()}
    })         
  }
  getBranche1(id: number) {    
    return this.http.get('/api/getBran' + '/' + id).map(response => response.json());
   }

   getuom(compid: number,brnchid: number,locname:number,locrefid: number){
    return this.http.get(this.uom + '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid).map(response => response.json());

  }
}
