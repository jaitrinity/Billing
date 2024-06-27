import { Injectable } from '@angular/core';
import { Http , RequestOptions , Response , Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constant } from '../constant/Constant';

@Injectable({
    providedIn: 'root'
})
export class DashboardService{
    private phpServerURL : string  = "";
    constructor(private http:Http){
        this.phpServerURL = Constant.phpServerURL+"php/";
    }

    public getDashboard(jsonData: any) {
        let bodyString = JSON.stringify(jsonData);
        return this.http.post(this.phpServerURL+'dashboard.php',bodyString)
               .map((response:Response) => response.json())
               .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}