import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HomeViewPage } from '../pages/home-view/home-view.page';

@Injectable({
  providedIn: 'root'
})
export class ShowpopupIonService {

  constructor(private alertController: AlertController) { }

  public async ShowPopup(msnHeader: string, msn: string, submsn?: string, btn_text:string="Acepto", functionHandler?){

    const alert = await this.alertController.create(
      {
        header: msnHeader,
        message: msn + " " + "<br/> <br/> " + submsn,
        buttons: [
          {
            text: btn_text,
            role:'cancel',
            handler: ()=>{ functionHandler.openModalChoiceRestaurant() }
          }
        ],
      }
    );

    await alert.present();

  }

}
