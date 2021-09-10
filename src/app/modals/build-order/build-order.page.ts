import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';
import { ToastIonService } from 'src/app/services/toast-ion.service';
import { PayInfoPage } from '../pay-info/pay-info.page';

@Component({
  selector: 'app-build-order',
  templateUrl: './build-order.page.html',
  styleUrls: ['./build-order.page.scss'],
})
export class BuildOrderPage implements OnInit {

  constructor(
    private modalCtrl: ModalController, 
    private cartService: CartService,
    public toasCtrlService: ToastIonService
  ){}

  // @Input() dataCart: any;
  // @Input() extras: any;
  @Input() restUse: string;
  public auxRestUse:string;

  public rate = 1.00;
  public currency = "$";

  public items: any[];
  public selectedItems: any[] = [];
  public itemsProduct: any[] = [];
  public itemsPromotions: any[] = [];
  public totalToPay: number = 0;

  public flagPromo: boolean = false;
  public flagCartClean: boolean = false;
  public flagPay: boolean = true;

  ngOnInit(){

    this.items = this.getAllProductCart();

    //No hay nada en el carrito.
    if(this.items == null || this.items == undefined){
      this.totalToPay = 0;
      this.toasCtrlService.presentToast("Agrega algo al carrito", 1800);
      return;
    }

    //Find Promo in items, for print in the view.
    const findPromo = this.items.find((i:any)=> i.hasOwnProperty('promo') == true ? true : false);
    findPromo != undefined ? this.flagPromo = true : this.flagPromo = false;

    if(this.items.length != 0){
      this.selectedItems = this.items;
      this.flagCartClean = true;
      this.flagPay = false;

      //Data de Products/Promo
      this.itemsProduct = this.selectedItems.filter((i:any)=> !i.hasOwnProperty('promo'));
      this.itemsPromotions = this.selectedItems.filter((i:any)=> i.hasOwnProperty('promo'));

      this.calculateTotalToPay();

    }else{
      this.totalToPay = 0;
      this.toasCtrlService.presentToast("Agrega algo al carrito", 1800);
    }
  }

  public async openModalToPay(){
    const modalForPay = await this.modalCtrl.create({
      component: PayInfoPage,
      componentProps: {
        restUseParam : this.restUse
      }
    });
    await modalForPay.present();
    const {data} = await modalForPay.onDidDismiss();
  }

  public calculateTotalToPay():void{
    this.totalToPay = this.items.reduce(
      (counterIni, objActual) => {return((parseFloat(counterIni) + (objActual.price * objActual.count)).toFixed(2))}, 0
    );
  }

  public deleteProduct(excludeNameProduct:any){
    excludeNameProduct = excludeNameProduct.trim().trimStart();

    this.itemsProduct = this.itemsProduct.filter((e:any)=>e.name != excludeNameProduct);
    this.itemsPromotions = this.itemsPromotions.filter((e:any)=>e.title != excludeNameProduct);

    this.cartService.deleteAllProducts();
    
    this.itemsProduct.map(e=>{
      this.cartService.addProduct(e);
    });

    this.itemsPromotions.map(e=>{
      this.cartService.addProduct(e);
    });

    // this.flagExcludeCart = true;
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

  public cartClear(){
    this.selectedItems = null;
    this.itemsProduct = null;
    this.itemsPromotions = null;
    this.totalToPay = 0;

    this.cartService.deleteAllProducts();
    this.flagCartClean = false;
    this.flagPromo = false;
    this.ngOnInit();
  }

  public getAllProductCart(){
    return this.cartService.getCart();
  }

  public closeModal(){
    this.closeModalWithOuthParams();
    // this.closeModalWithParams();
  }

  public closeModalWithOuthParams(){
    this.modalCtrl.dismiss();
  }

  // public closeModalWithParams(){
  //   //Parametros que devuelve el modal al cerrarse
  //   this.modalCtrl.dismiss({
  //     prueba: "soyguapo"
  //   });
  // }

}
