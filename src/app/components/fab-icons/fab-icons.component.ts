import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'fab-icons-component',
  templateUrl: './fab-icons.component.html',
  styleUrls: ['./fab-icons.component.scss'],
})
export class FabIconsComponent implements OnInit {

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {}

  goAdmin(){
    this.router.navigate(['admin-view']);
  }

  goCart(){
    this.router.navigate(['cart-view']);
  }

  goLanguages(){
    this.ShowPopup("Hola!", "Esta opcion esta en construccion. :D")
  }

  onClick(icon){

    const ico = icon;
    let url;

    if(ico=="twitter"){
      url = "https://twitter.com/arturosdeverdad";
    }else if(ico=="facebook"){
      url = "https://www.facebook.com/ArturosDeVerdad";
    }else{
      url = "https://www.instagram.com/arturosdeverdad/?hl=es-la";
    }

    window.open(url, '_system');
  }

  async ShowPopup(msnHeader:string,msn:string){
    
    const alert = await this.alertController.create(
      {
        header : msnHeader,
        message : msn,
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
