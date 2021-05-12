
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_URL:string = environment.apiHost + ((environment.apiHostPort !== "") ? ":"+ environment.apiHostPort : "") +"/api/";

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  constructor(private http: HttpClient) { }
 
  getProducts() : Observable<any[]>{
    //debugger;
    //console.log(API_URL)
    return zip(
        this.http.get(API_URL + "categories"),
        this.http.get(API_URL + "products/active/true")
    ).pipe(
      map( ([categories, products] : [any[], any[]]) => 
        {
          return categories.map( e=>(
              { "category": e.name,  
                "expanded": e.name.trim().toUpperCase() == "PLATOS",
                "products": 
                  products.filter(
                    f=> f.categories.some(g => g == e.categoryId) && f.isActive ).map(r=>(
                        { id: r.levelId, 
                          name: r.name, 
                          price: Number(r.salePriceUsd.$numberDecimal),
                          imageUrl : "/assets/productos/" + ((r.imageUrl !== "") ? r.imageUrl : "junior.png")
                        }
                    ))  
              }
          ))
        }
    ));
  }
}
