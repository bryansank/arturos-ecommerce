import { Component, OnInit, AfterContentChecked, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController, IonContent } from '@ionic/angular';
import { errorHandler } from 'src/app/errors-handler/errors-handler';
import { CategoryProduct } from 'src/app/interfaces/category';
import { CartService } from 'src/app/services/cart.service';
//

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.page.html',
  styleUrls: ['./products-view.page.scss'],
})

export class ProductsViewPage implements OnInit, AfterContentChecked {

  public titleHeaderPage:string = "Platos";
  private errorHandler:errorHandler  = new errorHandler(this.alertController, this.router);

  private loading : any;
  public cartHome: any = [];
  public item: any = [];
  public dataCategory: any;

  public displaySrch:boolean=true;
  public flagDisplayListSearch:boolean = false;
  public notFound:boolean = true;
  public itemsForSearch:any;

  //TODO: Cambiar a un servicio
  public productsCategories: CategoryProduct[]  = [
    {
      name: "platos",
      //urlImage: "/assets/categories/platos.jpg",
      urlImage: "/assets/categories/bebidas.jpg",
    },
    {
      name: "bebidas",
      urlImage: "/assets/categories/extras.jpg",
    },
    {
      name: "extras",
      urlImage: "/assets/categories/bebidas.jpg",
    },
    {
      name: "postres",
      //urlImage: "/assets/categories/postres.jpg",
      urlImage: "/assets/categories/extras.jpg",
    },
    {
      name: "todos",
      //urlImage: "/assets/categories/todos.jpg",
      urlImage: "/assets/categories/bebidas.jpg",
    }
  ];
  
  @ViewChild('contentPlatos') productsContent: IonContent;

  constructor(
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController,
    public loadingCtlr: LoadingController,
    public toastController: ToastController
  ){}

  ngAfterContentChecked() {
    //Evento se dispara Se ejecuta cada vez que el contenido del componente ha sido verificado
    this.getCart();
  }

  ngOnInit() {
    this.presentLoading();
    this.cartService.getProducts().subscribe(
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
    this.productsContent.scrollToTop();
  }
  public displayCategoryProd(tabCategory:string){
    //cambio de estilos, se bugeaba con los de Home al llamarse igual
    tabCategory = tabCategory.toUpperCase();
    const category = this.item.filter((e)=>{
      return e.category.toUpperCase() == tabCategory ? e : false;
    });
    this.dataCategory = category[0].products;
  }

  /* SEARCH LOGIC */
  /* SEARCH LOGIC */
  public InitializeItems(){
    this.itemsForSearch = this.item;
  }

  public itemsContentData():boolean{
    const contentData = this.item;
    return (contentData.length != 0 ? true : false);
  }

  public getItemSearch(ev:any){

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
  
  public filterDataCategory(ParamCategory:string="TODOS"){
    return (
      this.itemsForSearch.filter(
        (e)=>{ return e.category == ParamCategory }
      )
    );
  }

  public noDisplaySrch(FlagnotFound:boolean=false){
    this.InitializeItems();
    this.displaySrch = false;
    this.notFound = FlagnotFound;
    return;
    //console.log("test");
  }
  /* SEARCH LOGIC */
  /* SEARCH LOGIC */


  /*CART LOGIC */
  /*CART LOGIC */
  public addToCart(product: any) {

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
  public notFoundProduct(product:any) {
    product.count = 1;
    
    this.presentToast("Producto añadido a tu carrito", 1200);
    this.cartService.addProduct(product);
  }
  public foundProduct(product:any) {
    this.cartService.deleteAllProducts();
    this.cartHome.map(i => {
      if(i.name == product.name){
        i.count += 1;
      }
      this.cartService.addProduct(i);
    });
    this.presentToast("Producto añadido a tu carrito", 1200);
  }
  public getCart() {
    this.cartHome = this.cartService.getCart();
  }
  public openPageCart() {
    this.router.navigate(["cart-view"]);
  }
  /*CART LOGIC */
  /*CART LOGIC */

  public async hideLoading() {
    this.loadingCtlr.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });
  }
  public async presentLoading() {
    this.loading = await this.loadingCtlr.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espere.',
    });

    return this.loading.present();
  }
  public async presentToast(msn:string,duration:number = 1800) {
    const toast = await this.toastController.create({
      message: msn.toUpperCase(),
      duration: duration,
      //color: "primary",
      position: 'bottom',
      cssClass: "toastCart"
    });
    toast.present();
  }
}