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
  public extrasData :any = [];

  ngOnInit() {
    this.dataProducts = this.dataCart[0];
    this.dataPromotions = this.dataCart[1];
    //console.log(this.extras)
    this.extrasData = this.extras.filter((i)=> i.category.toUpperCase() == "EXTRAS" ? i : null);
    this.extrasData = this.extrasData[0].products;
    console.log(this.extrasData)
  }

  editContent(){
    console.log("editContent")
  }

  sin(){
    this.modalCtrl.dismiss();
  }

  con(){
    //Parametros que devuelve el modal al cerrarse
    this.modalCtrl.dismiss({
      //nombre: "felipe",
      //pais:"espana"
    });
  }

}
