import { Injectable } from '@angular/core';
import { IonContent, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastIonService {

  constructor(public toastController: ToastController){}

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