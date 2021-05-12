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
