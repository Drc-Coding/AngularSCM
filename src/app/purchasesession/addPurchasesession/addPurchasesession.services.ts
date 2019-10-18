import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class addInvoicesessionService {

    private compURl = 'api/getSessioncomp';
    private branchURL = 'api/getSessionbranch';
    private shopURL = 'api/getSessionshop';
    private wareURL = 'api/getSessionwarehouse';
    private hospURl = 'api/getSessionhosp';
    private tableURL = 'api/getpurcSessiontable';
    private tablesshopURL = 'api/getpurcSessionshoptable';
    private tablewarehouseURL = '/api/getpurcSessionwaretable';
    private tableshospURL = 'api/getpurcSessionhosptable';
    private sessView = 'api/getpurcSessionview';
    private saveURL = 'api/savePurcsession';
    private psessURL = 'api/savePurcsessionproducts';
    constructor(private http: Http) { }


    getsessCompany(compid: any): any {
        return this.http.get(this.compURl + '/' + compid).map(res => res.json());
    }

    getsessBranch(cid: number) {
        return this.http.get(this.branchURL + '/' + cid).map(res => res.json());
    }

    getSessShop(cid: number, bid: any) {
        return this.http.get(this.shopURL + '/' + cid + '/' + bid).map(res => res.json());
    }

    getSessWarehouse(cid: number, bid: any) {
        return this.http.get(this.wareURL + '/' + cid + '/' + bid).map(res => res.json());
    }

    getSessHosp(cid: number, bid: any) {
        return this.http.get(this.hospURl + '/' + cid + '/' + bid).map(res => res.json());
    }

    getPurcSessiontable1(sid: any, wid: any, hid: any) {
        return this.http.get(this.tableURL + '/' + sid + '/' + wid + '/' + hid).map(res => res.json());
    }

    getPurcSessionshop(sid: any, cid: any, bid: any, locname: any, locrefid: any) {
        return this.http.get(this.tablesshopURL + '/' + sid + '/' + cid + '/' + bid + '/' + locname + '/' + locrefid).map(res => res.json());
    }

    
    getPurcSessionwarehouse(wid: any, cid: any, bid: any, locname: any, locrefid: any) {
        return this.http.get(this.tablewarehouseURL + '/' + wid + '/' + cid + '/' + bid + '/' + locname + '/' + locrefid).map(res => res.json());
    }
    getPurcSessionhosp(hid: any, cid: any, bid: any, locname: any, locrefid: any) {
        return this.http.get(this.tableshospURL + '/' + hid + '/' + cid + '/' + bid + '/' + locname + '/' + locrefid).map(res => res.json());
    }
    getPurcSessionview(id: any) {
        return this.http.get(this.sessView + '/' + id).map(res => res.json());
    }
    savePurcSession(purcsessionData: string) {
        let head = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.saveURL, purcsessionData, { headers: head }).map((res: Response) => {
            return { "res": res.json() };
        })
            .catch((e: any) => {
                console.log("Status" + e.status);
                return Observable.throw({ "Errors savePurcSession(Service)": e.json() });
            });
    }

    getSessiondata(sessionData: string) {
        let head = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(this.psessURL, sessionData, { headers: head }).map((res: Response) => {
            return { "res": res.json() };
        });
    }

}