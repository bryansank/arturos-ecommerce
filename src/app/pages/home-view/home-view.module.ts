import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeViewPageRoutingModule } from './home-view-routing.module';

import { HomeViewPage } from './home-view.page';
import { OurComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeViewPageRoutingModule,
    OurComponentsModule,
  ],
  declarations: [HomeViewPage]
})
export class HomeViewPageModule {}
