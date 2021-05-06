import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsDataService } from './products-data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = [];

  constructor( private productsService: ProductsDataService) {}
  
  getProducts(){
    return this.productsService.getProducts();
  }
  
  getCart(){
    return this.cart;
  }
  
  addProduct(product){
    this.cart.push(product)
  }
  
}
