import { Component, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, ToastController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-promotions-view',
  templateUrl: './promotions-view.page.html',
  styleUrls: ['./promotions-view.page.scss'],
})
export class PromotionsViewPage implements OnInit, AfterContentChecked {

  public titleHeaderPage:string = "Promociones";

  //promoTest = [1, 2, 3, 4];
  public viewDetail:boolean = false
  public obj:any;
  public promoData: any[] = [
    { title: "Dia de las madres", detail: "2 super con 2 refrescos de lata y papas grandes.", price: 5.10, items:"super, refresco de lata, papas", promo: true},
    { title: "Dia del padre", detail: "2 cervezas y 2 papas.", price: 1.10, items:"cervezas, papas", promo: true},
    { title: "Dia del niño", detail: "2 cajitas felices.", price: 4.10, items:"cajitas", promo: true},
    { title: "Dia de promocion", detail: "2 super con 2 refrescos de lata y papas grandes.", price: 3.00, items:"super, refresco de lata, papas", promo: true}
  ];

  public cartData: any[]= [];

  @ViewChild('pageTop') pageTop: IonContent;

  constructor(private cartService: CartService, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  ngAfterContentChecked() {
    //Evento se dispara Se ejecuta cada vez que el contenido del componente ha sido verificado
    this.getCart();
  }

  public pageScroller(){
    //scroll to page top
    this.pageTop.scrollToTop();
  }

  public viewDetails(ev: any){
    //this.viewDetail ? this.viewDetail = false : this.viewDetail = true;
    this.viewDetail = true;
    this.obj = this.promoData[ev];
    this.pageScroller();
  }
  
  public sendToCart(promo: any) {

    console.log("construccion")

    /*this.getCart();

    console.log(this.cartData)
    console.log(promo)

    if(this.cartData.length != 0) {
      const productObjFound = this.cartData.find(i => i.title == promo.title);
      //si no consigue es undefined
      productObjFound==undefined ? this.notFoundProduct(promo) : this.foundProduct(promo)
    } else {
      //product entrate, le agrega 1
      promo.count = 1;
      this.presentToast("Promocion añadida a tu carrito", 1200);
      this.cartService.addProduct(promo);
    }*/
  }

  notFoundProduct(promo:any) {
    promo.count = 1;
    
    this.presentToast("Promocion añadida a tu carrito", 1200);
    this.cartService.addProduct(promo);
  }
  foundProduct(promo:any) {
    this.cartService.deleteAllProducts();
    this.cartData.map(i => {
      if(i.title == promo.title){
        i.count += 1;
      }
      this.cartService.addProduct(i);
    });
    this.presentToast("Promocion añadida a tu carrito", 1200);
  }
  getCart() {
    this.cartData = this.cartService.getCart();
  }
  openPageCart() {
    this.router.navigate(["cart-view"]);
  }


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

}