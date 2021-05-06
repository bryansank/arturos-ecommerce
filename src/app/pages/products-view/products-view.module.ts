import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsViewPageRoutingModule } from './products-view-routing.module';

import { ProductsViewPage } from './products-view.page';
import { OurComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsViewPageRoutingModule,
    OurComponentsModule
  ],
  declarations: [ProductsViewPage]
})
export class ProductsViewPageModule {}
