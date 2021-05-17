import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController, ActionSheetController, ToastController, IonContent } from '@ionic/angular';
import { errorHandler } from 'src/app/errors-handler/errors-handler';
import { CartService } from 'src/app/services/cart.service';
//

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.page.html',
  styleUrls: ['./products-view.page.scss'],
})

export class ProductsViewPage implements OnInit {

  public titleHeaderPage:string = "Inicio";
  private errorHandler = new errorHandler(this.alertController, this.router);

  private loading : any;
  public cartHome: any = [];
  public item: any = [];

  public displaySrch:boolean=true;
  public flagDisplayListSearch:boolean = false;
  public notFound = true;
  public itemsForSearch;

  @ViewChild('pageTop') pageTop: IonContent;

  constructor(
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController,
    public loadingCtlr: LoadingController,
    public toastController: ToastController
  ){}

  ngOnInit() {
    this.presentLoading();
    this.cartService.getProducts()
      .subscribe(
        (productsData) => {

          this.item = productsData;
          this.hideLoading();

          this.getCart();

        }, (err) => {

          this.hideLoading();
          this.errorHandler.handlerError(err, true, "No pudimos cargar los productos.");

        }
      );
  }

  public pageScroller(){
    //scroll to page top
    this.pageTop.scrollToTop();
  }

  displayCategoryProd(tabCategory){

    //TODO: cambio de estilos, se bugeaba con los de Home al llamarse igual
    const elementGrid = document.getElementById(tabCategory+"GridProd");

    if(elementGrid.classList.contains('displayContentProd')){
      elementGrid.setAttribute("class","noDisplayContent md hydrated");
    }else{
      elementGrid.setAttribute("class","displayContentProd md hydrated");
    }

  }

  /* SEARCH LOGIC */
  InitializeItems(){
    this.itemsForSearch = this.item;
  }

  itemsContentData():boolean{
    const contentData = this.item;
    return (contentData.length != 0 ? true : false);
  }

  getItemSearch(ev:any){

    this.flagDisplayListSearch = true;

    const valueSrch:string = ev.srcElement.value == null ? "": ev.srcElement.value.toString();
    console.log(valueSrch)

    if(!this.itemsContentData()){console.log("A")}
    if(valueSrch==""){console.log("b")}

    if(!this.itemsContentData() || valueSrch !=""){

      this.displaySrch = true;
      this.InitializeItems();

      const category = this.filterDataCategory("TODOS");
      //No funciona fusionado ambos metodos...
      const allProducts = category.map( (e)=> e.products );

      this.itemsForSearch = allProducts[0].filter(
        (i)=>{
          return(i.name.toLowerCase().indexOf(valueSrch.toLowerCase()) !== -1 ? i : "")
        }
      )

      if(this.itemsForSearch.length == 0){
        this.noDisplaySrch(true);
      }
      

    }else{
      this.noDisplaySrch();
    }
    
  }
  
  filterDataCategory(ParamCategory:string="TODOS"){
    return (
      this.itemsForSearch.filter(
        (e)=>{ return e.category == ParamCategory }
      )
    );
  }

  noDisplaySrch(FlagnotFound:boolean=false){
    this.InitializeItems();
    this.displaySrch = false;
    this.notFound = FlagnotFound;
    return;
    //console.log("test");
  }
  /* SEARCH LOGICCC */

  /*CART LOGIC */
  addToCart(product: any) {

    this.getCart();

    if(this.cartHome.length != 0) {
      const productObjFound = this.cartHome.find(i => i.name == product.name);
      //si no consigue es undefined
      productObjFound==undefined ? this.notFoundProduct(product) : this.foundProduct(product)
    } else {
      //product entrate, le agrega 1
      product.count = 1;
      this.presentToast("Producto añadido a tu carrito", 1200);
      this.cartService.addProduct(product);
    }
  }
  notFoundProduct(product:any) {
    product.count = 1;
    
    this.presentToast("Producto añadido a tu carrito", 1200);
    this.cartService.addProduct(product);
  }
  foundProduct(product:any) {
    this.cartService.deleteAllProducts();
    this.cartHome.map(i => {
      if(i.name == product.name){
        i.count += 1;
      }
      this.cartService.addProduct(i);
    });
    this.presentToast("Producto añadido a tu carrito", 1200);
  }
  getCart() {
    this.cartHome = this.cartService.getCart();
  }
  openPageCart() {
    this.router.navigate(["cart-view"]);
  }
  /*CART LOGIC */

  async hideLoading() {
    this.loadingCtlr.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });
  }
  async presentLoading() {
    this.loading = await this.loadingCtlr.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espere.',
    });

    return this.loading.present();
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