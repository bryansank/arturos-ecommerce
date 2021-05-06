import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ForgotPasswordViewPageRoutingModule } from './forgot-password-view-routing.module';
import { ForgotPasswordViewPage } from './forgot-password-view.page';

//Componentes Propios
import { OurComponentsModule } from 'src/app/components/components.module';
//validar formulario
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgotPasswordViewPageRoutingModule,
    OurComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [ForgotPasswordViewPage]
})
export class ForgotPasswordViewPageModule {}
