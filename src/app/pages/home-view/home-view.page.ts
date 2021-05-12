import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController } from '@ionic/angular';
import { errorHandler } from 'src/app/errors-handler/errors-handler';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.page.html',
  styleUrls: ['./home-view.page.scss'],
})
export class HomeViewPage implements OnInit {

  public titleHeaderPage:string = "Inicio";
  private errorHandler = new errorHandler(this.alertController, this.router);
  private loading : any;

  public cartHome: any = [];
  public item: any = [];

  public displaySrch:boolean=true;
  public flagDisplayListSearch:boolean = false;
  public notFound = true;
  public itemsForSearch;

  public slideOpts: any = {
    initialSlide: 0,
    speed: 400,
  };

  promoTest = [1, 2, 3, 4];

  displayCategory(tabCategory){

    const elementGrid = document.getElementById(tabCategory+"Grid");

    if(elementGrid.classList.contains('displayContent')){
      elementGrid.setAttribute("class","noDisplayContent md hydrated");
    }else{
      elementGrid.setAttribute("class","displayContent md hydrated");
    }
  }

  constructor(
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController,
    public loadingCtlr: LoadingController
  ){
    this.cartHome = this.cartService.getCart();
  }

  ngOnInit() {

    this.presentLoading();

    //this.cartHome = this.cartService.getCart();

    this.cartService.getProducts()
      .subscribe(
        (productsData) => { 

          this.item = productsData; 
          this.hideLoading();
          
          
          setTimeout(()=>{
            this.ShowPopup("Hola Querid@ Cliente.", "Te recordamos que si usas algun tipo de bloqueador de anuncios debes desactivarlo.", "No usaremos ningun dato personal fuera de este sitio o con fines comerciales.");
          },1500);

          //console.log("home-view::item", this.item);

        },(err)=>{

          this.hideLoading();
          
          setTimeout(()=>{
            this.ShowPopup("Hola Querid@ Cliente.", "Te recordamos que si usas algun tipo de bloqueador de anuncios debes desactivarlo.", "No usaremos ningun dato personal fuera de este sitio o con fines comerciales.");
          },1500);
          
          this.errorHandler.handlerError(err, true, "No pudimos cargar los productos.");

        }
      );
    
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

    /*if (!valueSrch || valueSrch=="") {
      this.notFound = false;
      return;
    }*/

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

  addToCart(product){
    //console.log(this.cartHome.length)
    this.cartService.addProduct(product);
  }

  openPageCart(){
    this.router.navigate(["cart-view"])
  }

  async hideLoading() {
    this.loadingCtlr.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });
  }

  //Slides
  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  async presentLoading() {
    this.loading = await this.loadingCtlr.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espere.',
    });

    return this.loading.present();
  }

  async ShowPopup(msnHeader:string,msn:string,submsn?:string){
    
    const alert = await this.alertController.create(
      {
        header : msnHeader,
        message : msn + " "+"<br/> <br/> "+submsn,
        buttons : [
          {
            text : 'Acepto',
            handler : () => { }
          }
        ]
      }
    );

    await alert.present();

  }

  
}
