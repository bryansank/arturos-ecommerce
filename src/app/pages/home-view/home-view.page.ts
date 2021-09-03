import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, IonSlides, LoadingController, ModalController, NavController, Platform, ToastController } from '@ionic/angular';
import { handlersManager } from 'src/app/handlers/handler-errors-and-logs';
import { CategoryProduct } from 'src/app/interfaces/category';
import { BuildOrderPage } from 'src/app/modals/build-order/build-order.page';
import { CartService } from 'src/app/services/cart.service';
import { LoaderIonService } from 'src/app/services/loader-ion.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.page.html',
  styleUrls: ['./home-view.page.scss'],
})
export class HomeViewPage implements OnInit, AfterContentChecked {

  @ViewChild('homeContent') homeContent: IonContent;

  //-> For Global Functions
  // public loading: any;
  public flagReloadBug:boolean = true;
  public loadSlide:boolean = false;
  private handlersManager: handlersManager = new handlersManager(this.alertController, this.router);
  //-> For Data Cart
  public dataCartHome: any = [];
  public item: any = [];
  public dataCategory: any;
  //-> For search list
  public flagDisplayListSearch: boolean = false;
  public displaySrch: boolean = true;
  public itemsForSearch:any;
  public FlagNotFoundDataInSearchList: boolean = true;
  public img:string;
  //-> For Slider Products
  public slideOpts: any = {
    initialSlide: 0,
    speed: 400,
  };
  //-> For Device Mobile.
  private deviceWidth: number;
  public flagProductsMobile:boolean = true;




  // //TODO: Cambiar a un servicio
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
  promoTest = [1, 2, 3, 4];






  constructor(
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController,
    //public loadingCtlr: LoadingController,
    private loadingCtlrService: LoaderIonService,
    public toastController: ToastController,
    public navCtrl: NavController,
    private platform: Platform,
    private modalCtrl: ModalController
  ){
    this.platform.ready().then(()=>{  
      
      this.deviceWidth = this.platform.width();
      
      if (this.deviceWidth > 768){
        this.flagProductsMobile = true;
      }else if(this.deviceWidth <= 992){
        this.flagProductsMobile = false;
      }

    });
  }
  
  ngAfterContentChecked() {
    //Evento se dispara Se ejecuta cada vez que el contenido del componente ha sido verificado
    this.getCart();
  }

  async ngOnInit() {

    await this.loadingCtlrService.loadingIon();
    
    this.cartService.getProducts().subscribe(
      (productsData)=> {
        this.item = productsData;
        this.getCart();//llenamos dataCartHome.
        this.loadIonViewForSlides();
        this.loadingCtlrService.dismissLoader();
        this.welcomeClients();
      },(error)=>{
        this.loadingCtlrService.dismissLoader();
        this.handlersManager.handlerError(error, true, "No pudimos cargar los productos.");
      }
    );
  }

  public welcomeClients():void{
    setTimeout(()=>{
      this.ShowPopup(
        "¡Bienvenidos!", 
        "Te recordamos que si usas algun tipo de bloqueador de anuncios debes desactivarlo.",
        "No usaremos ningun dato personal fuera de este sitio o con fines comerciales."
      );
    }, 1000);
  }

  public async openModalCart(){
    const modalForPay = await this.modalCtrl.create({
      component: BuildOrderPage,
      // componentProps: {
      //   dataCart: [0, 1],
      //   extras: "hola",
      // }
    });
    await modalForPay.present();
    const {data} = await modalForPay.onDidDismiss();
    //    console.log(data);
  }

  ///////////////////
  ///////////////////
  /* Products Logic*/
  //Method for display css Categorys...
  public displayCategoryForMobile(tabCategory:any) {

    const elementGrid = document.getElementById(tabCategory + "GridHome");

    if (elementGrid.classList.contains('displayContent')) {
      elementGrid.setAttribute("class", "noDisplayContent md hydrated");
    } else {
      elementGrid.setAttribute("class", "displayContent md hydrated");
    }
  }
  public displayCategoryForPageBlock(tabCategory:string){

    this.scrollToBeforeCategories();

    //cambio de estilos, se bugeaba con los de Home al llamarse igual
    tabCategory = tabCategory.toUpperCase();
    const category = this.item.filter((e:any)=>{
      return e.category.toUpperCase() == tabCategory ? e : false;
    });
    this.dataCategory = category[0].products;
  }
  public viewPagePromo(){
    //this.router.navigate(["/promotions-view"]);
  }
  public scrollToBeforeCategories(): void {
      const beforeCatefories = document.getElementById('beforeCategoryScroll').offsetTop;      
      this.homeContent.scrollToPoint(0, (beforeCatefories-60));
      return;
  }
  public goTopPage(){
    this.homeContent.scrollToPoint(0, 0, 0);
    return;
  }
  /* Products Logic*/
  ///////////////////
  ///////////////////

  /////////////////
  /////////////////
  /*Cart LOGIC*/
  public getCart():void{
    this.dataCartHome = this.cartService.getCart();
    //return this.dataCartHome
  }
  public goCartPage() {
    this.router.navigate(["cart-view"]);
  }
  /*Cart LOGIC*/
  /////////////////
  /////////////////



  /////////////////
  /////////////////
  /*Search LOGIC*/
  public InitializeItems() {
    this.itemsForSearch = this.item;
  }
  public itemsContentData(): boolean {
    const contentData = this.item;
    return (contentData.length != 0 ? true : false);
  }
  public filterDataCategory(ParamCategory: string = "TODOS") {
    return (this.itemsForSearch.filter( (e:any) => { return e.category == ParamCategory }));
  }
  public noDisplaySrch(FlagNotFound: boolean = false) {
    this.InitializeItems();
    this.displaySrch = false;
    this.FlagNotFoundDataInSearchList = FlagNotFound;
    return;
  }
  public getItemSearch(ev: any) {

    const valueSrch:string = ev.srcElement.value == null ? "" : ev.srcElement.value.toString();
    this.flagDisplayListSearch = true;

    if (!this.itemsContentData() || valueSrch != "") {

      this.displaySrch = true;
      this.InitializeItems();

      const category = this.filterDataCategory("TODOS");
      //No funciona fusionado ambos metodos...
      if(category.length == 0){
        this.ngOnInit();
      }
      const allProducts = category.map((e:any) => e.products);

      this.itemsForSearch = allProducts[0].filter(
        (i:any) => {
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
  public notFoundProduct(product:any) {
    product.count = 1;
    
    this.presentToast("Producto añadido a tu carrito", 1200);
    this.cartService.addProduct(product);
  }
  public foundProduct(product:any) {
    this.cartService.deleteAllProducts();
    
    this.dataCartHome.map((i:any) => {
      if(i.name == product.name){
        i.count += 1;
      }
      this.cartService.addProduct(i);
    });
    this.presentToast("Producto añadido a tu carrito", 1200);
  }
  public addToCart(product: any) {
    //public addToCart(product: any, flagClearSearch?:any, id?:any) {

    // if(flagClearSearch == 'yes'){ 
    //   const searchProductsID = id;
    //   searchProductsID.value = "";
    //   this.noDisplaySrch()
    // }

    this.getCart();

    if(this.dataCartHome.length != 0) {
      const productObjFound = this.dataCartHome.find((i:any) => i.name == product.name);
      //si no consigue es undefined
      productObjFound==undefined ? this.notFoundProduct(product) : this.foundProduct(product)
    } else {
      //product entrate, le agrega 1
      product.count = 1;
      this.presentToast("Producto añadido a tu carrito", 1200);
      this.cartService.addProduct(product);
    }
  }
  public openModalImageSearch(objSearch:any){
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    this.img = objSearch.imageUrl;
  }
  public envEnterProductSearch(){/*console.log("Se dispara el envento over mouse")*/}
  public closeModalImageSearch(){
    let modal = document.getElementById("myModal"); 
    modal.style.display = "none";
  }
  public closeSearch(id:any){ 
    const searchProductsID = id;
    searchProductsID.value = "";
    this.noDisplaySrch()
  }
  /* Search LOGIC*/
  /////////////////
  /////////////////


  /////////////////
  /////////////////
  /* SLIDER  */
  public slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
  public viewPromos(){
    //console.log("funcionando")
    //this.pageScroller("idTextProducts");
  }
  /* SLIDER  */
  /////////////////
  /////////////////



  /////////////////
  /////////////////
  /* GLOBAL FUNCTIONS */
  // public async presentLoading(){
  //   this.loading = await this.loadingCtlr.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Por favor espere.',
  //   });

  //   return this.loading.present();
  // }

  // public async hideLoading(){
  //   this.loadingCtlr.getTop().then(loader => {
  //     if (loader) {
  //       loader.dismiss();
  //     }
  //   });
  // }

  public loadIonViewForSlides(){
    this.loadSlide = true;
  }
  public doRefresh(event:any){
    setTimeout(() => {
      //this.navCtrl.navigateRoot("/home-view");
      event.target.complete();
      window.location.reload();
    },1000);    
  }
  public async ShowPopup(msnHeader: string, msn: string, submsn?: string){

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
  /* GLOBAL FUNCTIONS */
  /////////////////
  /////////////////


  
}