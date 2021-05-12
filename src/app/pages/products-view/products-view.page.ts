import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonSlides, LoadingController, ActionSheetController } from '@ionic/angular';
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
    this.cartService.getProducts()
      .subscribe(
        (productsData) => { 

          this.item = productsData; 
          this.hideLoading();

        },(err)=>{
          this.hideLoading();

          this.errorHandler.handlerError(err, true, "No pudimos cargar los productos.");
        }
      );
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

    const valueSrch:string = ev.detail.value.toString();

    if(valueSrch != "" && this.itemsContentData()){

      this.InitializeItems();
      /* console.log(this.itemsForSearch); */

      const categoryAll = this.itemsForSearch.filter(
        (e)=>{ return e.category == "TODOS" }
      );
      //No funciona fusionado ambos metodos...
      const allProducts = categoryAll.map(
        (e)=> e.products
      );

      this.itemsForSearch = allProducts[0].filter(
        (i)=>{
          return(i.name.toLowerCase().indexOf(valueSrch.toLowerCase()) !== -1 ? i : "")
        }
      )

      //console.log(this.itemsForSearch);

      //todo: pique la primera palabra del nombre
      //Si se coloca espacio, que tome la 2da palabra
      //manipular categorias en un futuro

    }else{
      if(!this.itemsContentData){
        this.notFound = false;
      }
      this.displaySrch = false;
    }
  }

  noDisplaySrch(){
    this.InitializeItems();
    this.displaySrch = false;
  }
  /* SEARCH LOGICCC */

  addToCart(product){
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

  async presentLoading() {
    this.loading = await this.loadingCtlr.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espere.',
    });

    return this.loading.present();
  }


  
}
