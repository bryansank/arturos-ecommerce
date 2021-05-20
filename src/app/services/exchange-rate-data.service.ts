import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
//
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL:string = environment.apiHost + ((environment.apiHostPort !== "") ? ":"+ environment.apiHostPort : "") +"/api/";

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateDataService {

  constructor(private http: HttpClient) { }

  //effectiveDate YYYY-MM-DD
  //{"effectiveDate":"2021-05-03"}

  getExchangeRate(): Observable<any>{
    return this.http.get(API_URL + "rates" + "/2021-05-03").pipe(
      map( response=> {
        //console.log("response", response)
        return response;
      }, err=>{
        console.log("Hubo un error: ", err);
        return 0;
      })
    );
  }

}
