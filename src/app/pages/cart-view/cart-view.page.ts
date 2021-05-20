import { AfterViewInit, Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { errorHandler } from 'src/app/errors-handler/errors-handler';
import { CartService } from 'src/app/services/cart.service';
import { ExchangeRateDataService } from 'src/app/services/exchange-rate-data.service';
//
@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.page.html',
  styleUrls: ['./cart-view.page.scss'],
})

export class CartViewPage implements OnInit, AfterViewInit {

  private errorHandler = new errorHandler(this.alertController, this.router);
  public titleHeaderPage:string = "Carrito";
  public selectedItems: any[] = [];
  public itemsProduct: any[] = [];
  public itemsPromotions: any[] = [];
  public totalPrice : number = 0;
  
  private loading : any;
  public items: any[];
  
  public flagExcludeCart:boolean = false;
  public flagCartClean:boolean = false;

  //Prueba promo
  public flagPromo: boolean = false;
  public flagExchange: boolean = false;
  
  //Reemplazar por Servicio.
  public exchangeRate: number= 0;
  public rate:number = 0;
  public currency:string ="$";
  public typeCurrency:any = {
    bolivares: "Bs",
    dolares: "$",
    euros: "€"
  }
  public dataCurrency:any = {
    bolivares: 0,
    dolares: 1,
    euros: 0.50
  }
  //public hola; 

  //public flagPay:string = "";
  //public activeBtn = true;

  //
  //@ViewChild('cardStripeInfo') cardStripeInfo: ElementRef;
  /*@ViewChild('cardInfoStripe') cardInfoStripe: ElementRef;
  cardError: string;
  cardInfoElement: any;*/

  constructor( 
    private cartService: CartService,
    private rateService: ExchangeRateDataService,
    public loadingCtlr: LoadingController,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
    //private ngZone : NgZone
  ) {}

  ngAfterViewInit(){
    //TODO: Add Stripe pay method.
  }

  ngOnInit() { 

    this.rateService.getExchangeRate().subscribe(
      rate => {
        this.dataCurrency.bolivares =  rate[0].rate.$numberDecimal;

        this.items = this.getAllProductCart();
  
        //promo
        const findPromo = this.items.find(i=> i.hasOwnProperty('promo') == true ? true : false);
        if(findPromo != undefined){
          this.flagPromo = true;
        }else{
          this.flagPromo = false;
        }

        //No hay nada en el carrito.
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
          
          if(this.currency == "$"){
            this.totalPrice * this.dataCurrency.dolares;
            this.rate = this.dataCurrency.dolares
          }else if(this.currency == "Bs"){
            this.totalPrice * this.dataCurrency.bolivares;
            this.rate = this.dataCurrency.bolivares
          }else{
            this.totalPrice * this.dataCurrency.euros;
            this.rate = this.dataCurrency.euros
          }

          //Data de Products/Promo
          this.itemsProduct = this.selectedItems.filter(i=> !i.hasOwnProperty('promo'));
          this.itemsPromotions = this.selectedItems.filter(i=> i.hasOwnProperty('promo'));

        }else{
          this.totalPrice = 0;
          this.presentToast("Agrega algo al carrito", 1800);
        }

      }, err=>{
        console.log("Hubo un error Inesperado: ", err);
        this.dataCurrency.bolivares = 0;
        this.errorHandler.handlerError(err);
      }
    );

  }

  changeCurrency(currency:any){
    const currencyValue:string = currency.detail.value.toString();

    if(currencyValue=="bolivares"){
      this.flagExchange = true;
      this.exchangeRate = this.dataCurrency.bolivares;
    }else{
      this.flagExchange = false;
      this.exchangeRate = 0;
    }
    
    this.currency = this.typeCurrency[currencyValue];
    this.ngOnInit();
  }

  getAllProductCart(){
    return this.cartService.getCart();
  }

  deleteProduct(excludeNameProduct){
    excludeNameProduct = excludeNameProduct.trim().trimStart();

    this.itemsProduct = this.itemsProduct.filter((e)=>e.name != excludeNameProduct);
    this.itemsPromotions = this.itemsPromotions.filter((e)=>e.title != excludeNameProduct);

    //console.log(this.itemsProduct)
    //console.log(this.itemsPromotions)

    this.cartService.deleteAllProducts();
    
    this.itemsProduct.map(e=>{
      this.cartService.addProduct(e);
    });

    this.itemsPromotions.map(e=>{
      this.cartService.addProduct(e);
    });

    this.flagExcludeCart = true;
    this.ngOnInit();
  }

  cartClear(){
    this.selectedItems = null;
    this.itemsProduct = null;
    this.itemsPromotions = null;
    this.totalPrice = 0;

    this.cartService.deleteAllProducts();
    this.flagCartClean = false;
    this.flagPromo = false;
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
        if(i.count != 1){
          i.count -= 1;
        }
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
      //color: "#FFFFFF",
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