import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";

@Injectable()

export class ProductService {

  
  
  // URL to web API
  private headers = new Headers({'Content-Type': 'application/json'});
  private productUrl = 'api/saveproduct';
  private isExist='api/productexist';
  constructor(private http: Http) {}

 
  getproduct(): Promise<any> {
    return this.http.get('api/product')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }
  

  createProduct(product: String) {
    let head = new Headers({'Content-Type': 'application/json'});
    this.http.post(this.productUrl, product, {headers: head}).map(response => response.json())
      .subscribe(
      () => {console.log(product)}
      );
  }
  
    getcountry(): Promise<any> {
    return this.http.get('api/getCountry')
      .toPromise()
      .then(response => response.json() as any)
      .catch(this.handleError);
  }

   isExistProduct(cid:number,pname:String){
    return this.http.get(this.isExist + '/' + cid+'/'+pname).map(response => response.json());
   }
 
 
  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  
}
