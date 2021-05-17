import { AfterViewInit, Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { errorHandler } from 'src/app/errors-handler/errors-handler';
import { CartService } from 'src/app/services/cart.service';
//
@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.page.html',
  styleUrls: ['./cart-view.page.scss'],
})
//
export class CartViewPage implements OnInit, AfterViewInit {

  //private errorHandler = new errorHandler(this.alertController, this.router);
  public titleHeaderPage:string = "Carrito";
  public selectedItems: any[] = [];
  public totalPrice : number = 0;
  
  private loading : any;
  public items: any[];
  
  public flagExcludeCart:boolean = false;
  public flagCartClean:boolean = false;
  //public flagPay:string = "";
  //public activeBtn = true;

  //
  //@ViewChild('cardStripeInfo') cardStripeInfo: ElementRef;
  /*@ViewChild('cardInfoStripe') cardInfoStripe: ElementRef;
  cardError: string;
  cardInfoElement: any;*/

  constructor( 
    private cartService: CartService,
    public loadingCtlr: LoadingController,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
    //private ngZone : NgZone
  ) { }

  ngAfterViewInit(){
    //TODO: Add Stripe pay method.
  }

  ngOnInit() { 
    if(this.flagExcludeCart){
      this.items = this.selectedItems;
    }else{
      this.items = this.getAllProductCart();
    }

    if(this.items == null || this.items == undefined){
      this.totalPrice = 0;
      this.presentToast("Agrega algo al carrito", 1800);
      return;
    }

    if(this.items.length != 0){

      this.flagCartClean = true;
      this.selectedItems = this.items;

      this.totalPrice = this.items.reduce(
        (inicial, actual) => {return((parseFloat(inicial) + (actual.price * actual.count)).toFixed(2))}, 0
      );

    }else{
      this.totalPrice = 0;
      this.presentToast("Agrega algo al carrito", 1800);
    }
  }

  getAllProductCart(){
    return this.cartService.getCart();
  }

  deleteProduct(excludeNameProduct){
    excludeNameProduct = excludeNameProduct.trim().trimStart();
    this.selectedItems = this.selectedItems.filter((e)=>e.name != excludeNameProduct);

    this.cartService.deleteAllProducts();
    
    this.selectedItems.map(e=>{
      this.cartService.addProduct(e);
    });

    this.flagExcludeCart = true;
    this.ngOnInit();
  }

  cartClear(){
    this.selectedItems = null;
    this.totalPrice = 0;

    this.cartService.deleteAllProducts();
    this.flagCartClean = false;
    this.ngOnInit();
  }

  addCountProduct(productName:string){
    this.cartService.deleteAllProducts();
    this.selectedItems.map(i => {
      if(i.name == productName){
        i.count += 1;
      }
      this.cartService.addProduct(i);
    });
    this.ngOnInit();
  }

  subCountProduct(productName:string){
    this.cartService.deleteAllProducts();
    this.selectedItems.map(i => {
      if(i.name == productName){
        i.count -= 1;
      }
      this.cartService.addProduct(i);
    });
    this.ngOnInit();
  }

  /*-------LOGIC FUNCTIONS------*/
  /*-------LOGIC FUNCTIONS------*/
  async presentToast(msn:string,duration:number = 1800) {
    const toast = await this.toastController.create({
      message: msn.toUpperCase(),
      duration: duration,
      color: "primary",
      position: 'bottom',
      cssClass: "toastCart"
    });
    toast.present();
  }
  async presentLoading() {
    this.loading = await this.loadingCtlr.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espere.',
    });

    return this.loading.present();
  }
  async hideLoading() {
    this.loadingCtlr.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });
  }
  async ShowPopup(msnHeader:string,msn:string){
    
    const alert = await this.alertController.create(
      {
        header : msnHeader,
        message : msn,
        buttons : [
          {
            text : 'Acepto',
            handler : () => { console.log("") }
          }
        ]
      }
    );

    await alert.present();

  }
  /*-------LOGIC FUNCTIONS------*/
  /*-------LOGIC FUNCTIONS------*/

}