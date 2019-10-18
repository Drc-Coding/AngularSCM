import {Injectable} from '@angular/core';
//import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class purchaseOrderService{
  handleError: any;
  headers: any;
  private getCompanies = 'api/getPOrderCompany';
  private getBranches = 'api/getPOrderBranch';
  private getPOWarehouses = 'api/getPOrderWareHouse';
  private getPOHospitals = 'api/getPOrderHospitals';
  private getShops = 'api/getPOrderShop';
  private getDistributors= 'api/getPODistributor';
  private getSuperDistributors= 'api/getSuperAdminPODistributor';
  private getSuperDrugUrl= 'api/getsuperdrugval';
  private getDrugUrl= 'api/getdrugval';
  private getDrugInfo= 'api/getDruginfo';
  private getSuperDistributorProducts= 'api/getSuperDistributorProducts';
  private getDistributorProducts= 'api/getDistributorProducts';
  private getAutonIncrement= 'api/getPOAutoIncrements';
  private purchaseOrderUrl='api/createPurchaseOrder';
  private purchaseOrderProductUrl='api/createPurchaseOrderProduct';
  private pURl = 'api/stockproductdata';
  private getbarcodeurl ='api/barcodeurl';
  private distSession = 'api/distsessionurl';
  private loadsession = 'api/loadsesssionurl';
private uom = 'api/getuom';

  private getSGQtyURL = 'api/getPurquantity';
 // private header = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}



  PurchaseOrderEmailDistributor(did:any){


    return this.http.get('api/PurchaseOrderEmailDistributor' + '/'+ did).map(res=> res.json());



  }



  getSuperDist(searchValue: string) {
    return this.http.get(this.getSuperDistributors + '/' + searchValue).map(res => res.json());
  }


  getDistributor(searchValue: string,compid: number,brnchid: number,locname:number,locrefid: number) {
    //Get Distributor
    return this.http.get(this.getDistributors+ '/'+searchValue+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid).map(response => response.json());
   }


   getBarcodeProduct(barcode: string) {
    //Get Companies
    return this.http.get(this.getbarcodeurl+'/'+barcode).map(response => response.json());
   }

   getSuperDrugs(searchValue: string) {
    //Get Companies
    return this.http.get(this.getSuperDrugUrl+'/'+searchValue).map(response => response.json());
   }
  
   getDrugs(searchValue: string,compid: number,brnchid: number,locname:number,locrefid: number) {
    //Get Companies
    return this.http.get(this.getDrugUrl+'/'+searchValue+'/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid).map(response => response.json());
   }
   getAutoIncr() {
    //Get getAutoIncrement
    return this.http.get(this.getAutonIncrement).map(response =>response.json());
   }

   getSuperAdminDistributor() {
    //Get Distributor
    return this.http.get(this.getSuperDistributors).map(response => response.json());
   }

   getSessHosp(cid: number, bid: any) {
    return this.http.get(this.distSession + '/' + cid + '/' + bid).map(res => res.json());
  }

  
  getPurcSessionshop(pid: any,distid) {
    return this.http.get(this.getSuperDistributorProducts + '/' + pid + '/' + distid).map(res => res.json());
}
  
  
   getDrugsData(id: number,cid : any, bid :any , lname :any , lrefid : any) {
    //Get Companies
   return this.http.get(this.getDrugInfo+ '/' +id + '/' + cid + '/' +bid + '/' + lname + '/'+ lrefid).map(response => response.json());
   }


   getSuperDistributorProduct(distID: number) {
    //Get getDrugList
    return this.http.get(this.getSuperDistributorProducts+ '/'+distID).map(response => response.json());
   }



   getProduct(searchValue: string, cid: any, bid: any, locrefid: any, locname: any) {
    return this.http.get(this.pURl + '/' + searchValue + '/' + cid + '/' + bid + '/' + locrefid + '/' + locname).map(res => res.json());
  }


   getDistributorProduct(compid: number,brnchid: number,locname:number,locrefid: number,distID: number) {
    //Get getDrugList
    return this.http.get(this.getDistributorProducts+ '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid+'/'+ distID).map(response => response.json());
   }

  createPurchaseOrder(purchaseorder:String){
     let head = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.purchaseOrderUrl, purchaseorder, {headers: head}).map((res:Response)=>{
       return {"res":res.json()}
     })         
   }

   createPurchaseOrderProduct(data:String){
    let head = new Headers({'Content-Type': 'application/json'});
   return this.http.post(this.purchaseOrderProductUrl, data, {headers: head}).map((res:Response)=>{
      return {"res":res.json()}
    })         
  }


  sendMailPurchaseOrder(serobj: any){



    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: header});

    return this.http
      .post('api/sendMailPurchaseOrder', serobj, options).map((res: Response) => res.json());



  }













  getSBQuantity(id) {
    return this.http.get(this.getSGQtyURL + '/' + id).map(res => res.json());
  }
 
  getuom(compid: number,brnchid: number,locname:number,locrefid: number){
    return this.http.get(this.uom + '/'+compid+'/'+brnchid+'/'+locname+'/'+locrefid).map(response => response.json());

  }

}
