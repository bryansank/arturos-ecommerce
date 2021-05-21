import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonSlides, LoadingController, NavController, ToastController } from '@ionic/angular';
import { errorHandler } from 'src/app/errors-handler/errors-handler';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.page.html',
  styleUrls: ['./home-view.page.scss'],
})
export class HomeViewPage implements OnInit, AfterContentChecked {

  

  public titleHeaderPage: string = "Arturos";
  private errorHandler = new errorHandler(this.alertController, this.router);
  private loading: any;

  public cartHome: any = [];
  public item: any = [];

  public displaySrch: boolean = true;
  public flagDisplayListSearch: boolean = false;
  public notFound = true;
  public itemsForSearch;

  public slideOpts: any = {
    initialSlide: 0,
    speed: 400,
  };
  public viewEntered = false;

  @ViewChild('homeContent') homeContent: IonContent;

  promoTest = [1, 2, 3, 4];

  //Method for display css Categorys...
  displayCategory(tabCategory) {

    const elementGrid = document.getElementById(tabCategory + "Grid");

    if (elementGrid.classList.contains('displayContent')) {
      elementGrid.setAttribute("class", "noDisplayContent md hydrated");
    } else {
      elementGrid.setAttribute("class", "displayContent md hydrated");
    }
  }

  constructor(
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController,
    public loadingCtlr: LoadingController,
    public toastController: ToastController,
    public navCtrl: NavController
  ){}
  
  ngAfterContentChecked() {
    //Evento se dispara Se ejecuta cada vez que el contenido del componente ha sido verificado
    this.getCart();
  }

  ngOnInit() {
    this.presentLoading();

    this.cartService.getProducts().subscribe(
      productsData=>{
        this.item = productsData;
        //llenamos cartHome.
        this.getCart();
        this.hideLoading();
        this.ionViewDidEnter();
      }, err =>{
        this.hideLoading();
        this.errorHandler.handlerError(err, true, "No pudimos cargar los productos.");
      }
    );

    setTimeout(()=>{
      this.hideLoading();
      this.ShowPopup(
        "Hola Querid@ Cliente.", 
        "Te recordamos que si usas algun tipo de bloqueador de anuncios debes desactivarlo.",
        "No usaremos ningun dato personal fuera de este sitio o con fines comerciales."
      );
    }, 4000);
    
  }

  /* SEARCH LOGIC */
  /* SEARCH LOGIC */
  public InitializeItems() {
    this.itemsForSearch = this.item;
  }

  public itemsContentData(): boolean {
    const contentData = this.item;
    return (contentData.length != 0 ? true : false);
  }

  public getItemSearch(ev: any) {

    this.flagDisplayListSearch = true;
    const valueSrch: string = ev.srcElement.value == null ? "" : ev.srcElement.value.toString();

    if (!this.itemsContentData() || valueSrch != "") {

      this.displaySrch = true;
      this.InitializeItems();

      const category = this.filterDataCategory("TODOS");
      //No funciona fusionado ambos metodos...
      const allProducts = category.map((e) => e.products);

      this.itemsForSearch = allProducts[0].filter(
        (i) => {
          return (i.name.toLowerCase().indexOf(valueSrch.toLowerCase()) !== -1 ? i : "")
        }
      )

      if (this.itemsForSearch.length == 0) {
        this.noDisplaySrch(true);
      }
      //
    } else {
      this.noDisplaySrch();
    }

  }

  public filterDataCategory(ParamCategory: string = "TODOS") {
    return (
      this.itemsForSearch.filter(
        (e) => { return e.category == ParamCategory }
      )
    );
  }

  public noDisplaySrch(FlagnotFound: boolean = false) {
    this.InitializeItems();
    this.displaySrch = false;
    this.notFound = FlagnotFound;
    return;
    //console.log("test");
  }
  /* SEARCH LOGICCC */
  /* SEARCH LOGICCC */

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

  /* Slides */
  /* Slides */
  public slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
  public ionViewDidEnter() {
    this.viewEntered = true;
  }
  public pageScroller(){
    let yOffset = document.getElementById("idTextProducts").offsetTop;
    this.homeContent.scrollToPoint(0, yOffset);
  }
  public viewPromos(){
    this.pageScroller();
  }
  /* Slides */
  /* Slides */

  public async hideLoading() {
    this.loadingCtlr.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });
  }
  public doRefresh(event) {
    //console.log('Begin async operation');
    setTimeout(() => {
      this.navCtrl.navigateRoot("/");
      event.target.complete();  
      //console.log("refresh")
    },1000);    
  }
  public async presentLoading() {
    this.loading = await this.loadingCtlr.create({
      cssClass: 'my-custom-class',
      message: 'Por favor espere.',
    });

    return this.loading.present();
  }
  public async ShowPopup(msnHeader: string, msn: string, submsn?: string) {

    const alert = await this.alertController.create(
      {
        header: msnHeader,
        message: msn + " " + "<br/> <br/> " + submsn,
        buttons: [
          {
            text: 'Acepto',
            handler: () => { }
          }
        ]
      }
    );

    await alert.present();

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

/*
aka(product){
  if(this.cartHome.length != 0){
    const a = this.cartHome.filter(i=>i.name==product.name);
    if(a.length > 0){
      if(a.hasOwnProperty('count')){
        a[0].count++;
      }else{
        a[0].count = 1;
      }
      this.cartService.addProduct(a[0]);
    }else{
      console.log("no entro nada")
      this.cartService.addProduct(product);
    }
  }else{
    this.cartService.addProduct(product);
  }
  console.log(this.cartHome)
}
*/

// removeItemCart(data, itemForRemove) {

  //   /*
  //     for (const [i, v] of ['a', 'b', 'c'].entries()) {}
  //   */

  //   for (const [indexx, val] of data.entries()) {
  //     //console.log("datos: ", data)
  //     console.log("dataaaaa: ", data)
  //     debugger;
  //     console.log("name del obj: ", val.name.toLowerCase())
  //     console.log("name del produ ", itemForRemove.name.toLowerCase())
  //     const findvalue = val.name.toLowerCase() == itemForRemove.name.toLowerCase();
  //     console.log(findvalue);
  //     if (findvalue) {
  //       console.log("disparo")
  //       this.cartHome = data.splice( indexx, 1 );
  //     }
  //   }
  //   //console.log(this.cartHome)
  // }
