import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//
import { ActionSheetController, AlertController, IonSlides, LoadingController } from '@ionic/angular';
import { errorHandler } from 'src/app/errors-handler/errors-handler';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.page.html',
  styleUrls: ['./products-view.page.scss'],
})

export class ProductsViewPage implements OnInit {
  
  public titleHeader:string = "Platos";
  private errorHandler = new errorHandler(this.alertController, this.router);

  public cartHome:any = [];
  public item:any = [];
  private loading : any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController,
    public loadingCtlr: LoadingController
  ){}

  ngOnInit() {
    this.presentLoading();

    this.cartHome = this.cartService.getCart();  
    this.cartService.getProducts()
      .subscribe(
        productsData=> {
          this.item = productsData;
          this.hideLoading();
        },
        err=>{
          if(this.loading === undefined){
            this.ngOnInit();
          }else{  
            this.hideLoading();
            this.errorHandler.handlerError(err, true, "No pudimos cargar los productos.");
            setTimeout( ()=>{
              this.ngOnInit();
            }, 1000000)
          }
        }
      );
  }

  addToCart(product){
    this.cartService.addProduct(product);
  }

  openPageCart(){
    this.router.navigate(["cart-view"]);
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

}