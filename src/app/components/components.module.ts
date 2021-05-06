import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
//
import { HeaderAppComponent } from "./header-app/header-app.component";
import { FooterComponent } from './footer/footer.component';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { RouterModule } from '@angular/router';
import { FabIconsComponent } from './fab-icons/fab-icons.component';
//import { TopBtnComponent } from './top-btn/top-btn.component';



@NgModule({
  declarations: [
    HeaderAppComponent,
    FooterComponent,
    //TopBtnComponent
    MenuNavComponent,
    FabIconsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports:[
    HeaderAppComponent,
    FooterComponent,
    //TopBtnComponent
    MenuNavComponent,
    FabIconsComponent
  ]
})
export class OurComponentsModule { }
