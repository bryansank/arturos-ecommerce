import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular/';

@Injectable({
  providedIn: 'root'
})
export class LoaderIonService {

  constructor(public loadingController: LoadingController){ }

  public async loadingIon(){
    await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Por favor espere.',
    }).then((response) => {
        response.present();
    });
  }

  public dismissLoader() {
    this.loadingController.dismiss().catch((err:any) => {
        // console.log("LoadingController fallo.");
    });
  }

}
