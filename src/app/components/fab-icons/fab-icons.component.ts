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

  changeTheme(){
    /*
    console.log(window.matchMedia('(prefers-color-scheme: light)').matches);
    console.log(window.matchMedia('(prefers-color-scheme: dark)'));
    console.log(window.matchMedia('(prefers-color-scheme)'));
*/
    //const b = window.matchMedia();
    //console.log(b);
    //console.log(document.documentElement);
    //document.addEventListener("DOMContentLoaded", function(event) {
      //document.documentElement.setAttribute("data-theme", "light");
  
      // Get our button switcher
      //var themeSwitcher = document.getElementById("theme-switcher");
  
      // When our button gets clicked
      //function() {
        // Get the current selected theme, on the first run
        // it should be `light`
        //var currentTheme = document.documentElement.getAttribute("data-theme");
  
        // Switch between `dark` and `light`
        //var switchToTheme = currentTheme === "dark" ? "light" : "dark"
  
        // Set our currenet theme to the new one
        //document.documentElement.setAttribute("data-theme", switchToTheme);
      //}
    //});
  
  }

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
