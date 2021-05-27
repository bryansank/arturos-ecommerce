import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-build-order',
  templateUrl: './build-order.page.html',
  styleUrls: ['./build-order.page.scss'],
})
export class BuildOrderPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  @Input() dataCart: any;
  @Input() extras: any;
  
  public dataProducts:any = []; 
  public dataPromotions:any = [];
  public extraData :any = [];
  public bebidaData :any = [];
  public postreData :any = [];
  
  // public extraInCart: any = [];
  public flags:any = {
    flagExtraSection: false,
    flagBebidasSection: false,
    flagPostresSection: false,
    flafPromoExist: false,
  }

  public total = 273;
  
  

  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];

  ngOnInit() {
    //Inciando productos del carrito con sus extras/bebidas.
    this.dataProducts = this.dataCart[0];
    this.dataPromotions = this.dataCart[1];

    this.dataPromotions.length == 0 ? this.flags.flafPromoExist = false : this.flags.flafPromoExist = true;
    
    this.extraData = this.extras.filter((i:any)=> i.category.toUpperCase() == "EXTRAS" ? i : null);
    this.extraData = this.extraData[0].products.map((i:any)=> { return {...i, count: 0}});

    this.bebidaData = this.extras.filter((i:any)=> i.category.toUpperCase() == "BEBIDAS" ? i : null);
    this.bebidaData = this.bebidaData[0].products.map((i:any)=> { return {...i, count: 0}});

    this.postreData = this.extras.filter((i:any)=> i.category.toUpperCase() == "POSTRES" ? i : null);
    this.postreData = this.postreData[0].products.map((i:any)=> { return {...i, count: 0}});
  }

  public moreExtras(section:string){
    if(section.toLowerCase()=="bebidas"){
      this.flags.flagBebidasSection = this.flags.flagBebidasSection ? false : true;
    }else if(section.toLowerCase()=="postres"){
      this.flags.flagPostresSection = this.flags.flagPostresSection ? false : true;
    }else{
      this.flags.flagExtraSection = this.flags.flagExtraSection ? false : true;
    }
  }

  public closeModal(){
    this.closeModalWithOuthParams();
  }

  editContent(){
    console.log("editContent")
  }

  public closeModalWithOuthParams(){
    this.modalCtrl.dismiss();
  }

  public closeModalWithParams(){
    //Parametros que devuelve el modal al cerrarse
    this.modalCtrl.dismiss({
      prueba: "soyguapo"
    });
  }

  
  public addCountProduct(extraObj:any, category:string){
    
    let data: any = [];

    if(category.toLowerCase()=="bebidas"){
      data = this.bebidaData.filter((i:any)=>{return i.name == extraObj.name});
    }else if(category.toLowerCase()=="postres"){
      data = this.postreData.filter((i:any)=>{return i.name == extraObj.name});
    }else{
      data = this.extraData.filter((i:any)=>{return i.name == extraObj.name});
    }

    data.map((i:any)=> i.count++);

  }

  public subCountProduct(extraObj:any, category:string){

    let data: any = [];

    if(category.toLowerCase()=="bebidas"){
      data = this.bebidaData.filter((i:any)=>{return i.name == extraObj.name});
    }else if(category.toLowerCase()=="postres"){
      data = this.postreData.filter((i:any)=>{return i.name == extraObj.name});
    }else{
      data = this.extraData.filter((i:any)=>{return i.name == extraObj.name});
    }

    data.map((i:any)=> i.count--);
  }

}
