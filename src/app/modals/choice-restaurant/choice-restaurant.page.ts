import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-choice-restaurant',
  templateUrl: './choice-restaurant.page.html',
  styleUrls: ['./choice-restaurant.page.scss'],
})
export class ChoiceRestaurantPage implements OnInit {

  public flagRestSelect:boolean = true;

  //TODO: Pasar a un servicio.
  public restaurantesPrueba = [
    {rest: "131", location: "Lar guatire"},
    {rest: "164", location: "Lar guarenas"},
    {rest: "122", location: "Lar Paraiso"},
    {rest: "154", location: "Lar Urbina"}
  ]

  constructor(private modalCtrl: ModalController) { }

  ngOnInit(){/*agregar servicio de restaurante*/}

  public closeModal(valueComboRest:any){
    return valueComboRest.value != null || "" ? this.closeModalWithParams(valueComboRest.value) :  this.flagRestSelect = true;
  }

  public closeModalWithParams(valueRest:string){
    this.modalCtrl.dismiss({value: valueRest});
  }

  public changeComboRest(valueRest:any){
    return valueRest.value != null || "" ? this.flagRestSelect = false : null;
  }

}
