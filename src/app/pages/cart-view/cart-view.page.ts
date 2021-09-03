import { AfterViewInit, Component, OnInit, ElementRef, NgZone, ViewChild, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { handlersManager } from 'src/app/handlers/handler-errors-and-logs';
// import { BuildOrderPage } from 'src/app/modals/build-order/build-order.page';
import { CartService } from 'src/app/services/cart.service';
import { LoaderIonService } from 'src/app/services/loader-ion.service';
import { ExchangeRateDataService } from 'src/app/services/exchange-rate-data.service';
//
@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.page.html',
  styleUrls: ['./cart-view.page.scss'],
})

export class CartViewPage implements OnInit{

  private handlersManager: handlersManager = new handlersManager(this.alertController, this.router);
  public titleHeaderPage:string = "Carrito";
  public selectedItems: any[] = [];
  public itemsProduct: any[] = [];
  public itemsPromotions: any[] = [];
  public totalPrice : number = 0;
  public dataExtras: any;
  
  // private loading : any;
  public items: any[];
  
  public flagExcludeCart:boolean = false;
  public flagCartClean:boolean = false;
  public flagForCartVoid:boolean = true;

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


  constructor( 
    public loadingCtlrService: LoaderIonService,
    private cartService: CartService,
    private rateService: ExchangeRateDataService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    //private ngZone : NgZone,
    private modalCtrl: ModalController,
  ) {}

  ionViewWillLeave(){
    //console.log("ionViewWillLeave")
  }

  ionViewDidLeave(){
    //
  }

  ionViewWillEnter(){
    this.ngOnInit()
  }

  async ngOnInit(){
    await this.loadingCtlrService.loadingIon();

    this.rateService.getExchangeRate().subscribe(
      (rate)=> {
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

          //Si se trajo la tasa, carga el carrito.

          this.cartService.getProducts().subscribe( 
            (data)=>{
              this.dataExtras = data.filter(
                (i:any)=> i.category.toUpperCase()=="POSTRES" 
                  || i.category.toUpperCase()=="EXTRAS" 
                  || i.category.toUpperCase()=="BEBIDAS" ? i : ""
              );
              this.loadingCtlrService.dismissLoader();
            },(error)=>{
              this.handlersManager.handlerError(error, true, "No cargaron los productos.");
              this.loadingCtlrService.dismissLoader();
            }
          );

      },(error)=>{
        this.dataCurrency.bolivares = 0;
        this.loadingCtlrService.dismissLoader();
        this.handlersManager.handlerError(error);
      }
    );

    // this.loadingCtlrService.dismissLoader()

  }


  public changeCurrency(currency:any){
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

  public getAllProductCart(){
    return this.cartService.getCart();
  }

  public deleteProduct(excludeNameProduct:any){
    excludeNameProduct = excludeNameProduct.trim().trimStart();

    this.itemsProduct = this.itemsProduct.filter((e)=>e.name != excludeNameProduct);
    this.itemsPromotions = this.itemsPromotions.filter((e)=>e.title != excludeNameProduct);

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

  public addCountProduct(productName:string){
    this.cartService.deleteAllProducts();
    this.selectedItems.map(i => {
      if(i.name == productName){
        i.count += 1;
      }
      this.cartService.addProduct(i);
    });
    this.ngOnInit();
  }

  public subCountProduct(productName:string){
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

  /*-------ACTION BUTTONS-------*/
  /*-------ACTION BUTTONS-------*/
  public pay(){console.log("pagar")}
  public cartClear(){
    this.selectedItems = null;
    this.itemsProduct = null;
    this.itemsPromotions = null;
    this.totalPrice = 0;

    this.cartService.deleteAllProducts();
    this.flagCartClean = false;
    this.flagPromo = false;
    this.ngOnInit();
  }
  public async openModalForPay(){

    alert('Hola, esto esta en construccion./')

    //dataForModal => pruebas eliminar...
    // const dataForModal:any[] = [
    //   [
    //     {id: 1, name: "JUNIOR", price: 5.15, count: 2},
    //     {id: 22, name: "SUPER YUCA", price: 5.9, count: 1},
    //     {id: 23, name: "SUPER Y/A", price: 5.9, count: 1},
    //     {id: 600, name: "TORTA DE QUESO", price: 2.75, count: 1},
    //     {id: 601, name: "TORTA DE QUESO C/HEL", price: 4, count: 1},
    //     {id: 501, name: "BEBIDA 22oz", price: 0.78, count: 1},
    //     {id: 502, name: "BEBIDA 32oz", price: 1.18, count: 1},
    //   ],
    //   [
    //     {
    //       count: 1, detail: "2 cervezas y 2 papas.", items: "cervezas, papas", 
    //       price: 1.1, promo: true, title: "Dia del padre",
    //     },
    //     {
    //       count: 1, detail: "2 super con 2 refrescos de lata y papas grandes.", 
    //       items: "super, refresco de lata, papas", price: 5.1, 
    //       promo: true, title: "Dia de las madres",
    //     },
    //   ],
    // ];

    //TODO: -?????
    // if(this.dataExtras.length != 0){
      // const modalForPay = await this.modalCtrl.create({
      //   component: BuildOrderPage,
      //   componentProps: {
      //     dataCart: [this.itemsProduct, this.itemsPromotions],
      //     extras: this.dataExtras,
      //   }
      // });
      // await modalForPay.present();
      // const {data} = await modalForPay.onDidDismiss();
  
      // if(data == undefined){
      //   console.log("Esta undefined");
      // }else{
      //   console.log(data);
      // }

    // }
    //this.openModalForPay();
  }
  public goHomePage(){
    this.router.navigate(["/home-view"]);
  }
  /*-------ACTION BUTTONS-------*/
  /*-------ACTION BUTTONS-------*/

  /*-------LOGIC FUNCTIONS------*/
  /*-------LOGIC FUNCTIONS------*/
  public async presentToast(msn:string,duration:number = 1800) {
    const toast = await this.toastController.create({
      message: msn.toUpperCase(),
      duration: duration,
      //color: "#FFFFFF",
      position: 'bottom',
      cssClass: "toastCart"
    });
    toast.present();
  }
  // public async presentLoading() {
  //   this.loading = await this.loadingCtlr.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Por favor, espere.',
  //   });

  //   return this.loading.present();
  // }
  // public async hideLoading() {
  //   this.loadingCtlr.getTop().then(loader => {
  //     if (loader) {
  //       loader.dismiss();
  //     }
  //   });
  // }
  public async ShowPopup(msnHeader:string,msn:string){
    
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