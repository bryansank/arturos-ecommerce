import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { errorHandler } from 'src/app/errors-handler/errors-handler';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.page.html',
  styleUrls: ['./cart-view.page.scss'],
})
export class CartViewPage implements OnInit, AfterViewInit {

  public titlePage:string = "Carrito";
  private errorHandler = new errorHandler(this.alertController, this.router);
  public selectedItems: any[] = [];
  public totalPrice : number = 0;
  
  private loading : any;
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
    //console.log(this.cardStripeInfo);
    /*if(this.flagPay != "" && this.flagPay != null){
      //
    }else{
      console.log("Sin acciones")
    }*/
  }

  ngOnInit() {
    
    let items = this.cartService.getCart();
    let itemSelected = {};

    if(items.length != 0){

      for (let obj of items) {
        if(itemSelected[obj.id]){
          itemSelected[obj.id].count++;
        }else{
          itemSelected[obj.id] = { ...obj, count : 1}
        }
      }
      
      this.selectedItems = Object.keys(itemSelected).map((key)=> itemSelected[key]);

      console.log("Items: " , this.selectedItems);

      this.totalPrice = this.selectedItems.reduce(
        
        (inicial, actual) => {
          
          debugger;
          console.log( (parseFloat(inicial) + (actual.price * actual.count)));
          return ( (parseFloat(inicial) + (actual.price * actual.count)).toFixed(2) );

        }, 0
      );
      

    }else{
      this.totalPrice = 0;
      this.presentToast("Agrega algo carrito!", 2500)
      //TODO: COLOCAAR UN MENSAJE DE AGREGAR ALGO AL CARRITO
    }
    
  }

  cartClean(){
    this.totalPrice = 0;
  }

  /*onChangeStripeCard(elem, {error}){
    console.log(elem)
    console.log(error)

    if(error){
      //ngZone forza el trazado en el html
      this.ngZone.run( ()=> {
        this.cardError = error.message;
      });
      
    }else{
      this.ngZone.run( ()=> {
        this.cardError = null;
      });
    }
  }*/

  /*onClick(typePay){

    if(typePay == "stripe"){
      this.flagPay = "1";

      if(this.activeBtn){
        const divStripe = document.getElementById("cardStripe");
        divStripe.setAttribute("class", "credit-card-stripe");
        this.activeBtn = true;
      }else{
        const divStripe = document.getElementById("cardStripe");
        divStripe.setAttribute("class", "credit-card-stripe noneDis");
        this.activeBtn = false;
      }
      
    }else{
      console.log(this.flagPay)
      console.log(typePay)
    }
  }*/

  /*displayLa(){
    console.log("hola")
    this.cardInfoElement = elements.create('card');
    //apuntamos al element html
    console.log(this.cardInfoStripe.nativeElement);
    this.cardInfoElement.mount(this.cardInfoStripe.nativeElement);
    this.cardInfoElement.addEventListener('change', this.onChangeStripeCard.bind(this))
  }*/

  async presentToast(msn:string,duration:number = 2000) {
    const toast = await this.toastController.create({
      message: msn.toUpperCase(),
      duration: duration,
      color: "primary",
      /*buttons: [{
        side: 'start',
        icon: 'restaurant-outline',
        text: '¡Elegir que comer!',
        handler: () => {
          console.log(this.router.navigate(["home-view"]));
        }
      }],*/
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

}
