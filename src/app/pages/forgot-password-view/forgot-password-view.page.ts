import { OnInit } from '@angular/core';
//Components
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { errorHandler } from 'src/app/errors-handler/errors-handler';
//Servicios
import { AuthService } from 'src/app/services/firebaseAuth.service';
//Validar Formulario
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-forgot-password-view',
  templateUrl: './forgot-password-view.page.html',
  styleUrls: ['./forgot-password-view.page.scss'],
})
export class ForgotPasswordViewPage implements OnInit {

  public titleHeaderPage:string = "Recuperar Contraseña";
  private errorHandler = new errorHandler(this.alertController, this.router);
  private loading : any;

  constructor(
    private authFireService: AuthService, 
    private router: Router, 
    public alertController: AlertController,
    public loadingCtlr: LoadingController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  async resetPassword(){

    const {email} = this.forgotPassVerificationForm.value;

    try {
      await this.authFireService.resetPassword(email);
      this.ShowPopup();
      setTimeout(()=>{ this.router.navigate(["login-view"])}, 60000);
      
    } catch (error) {
      this.errorHandler.handlerError(error);
    }
  }

  async ShowPopup(){
    const alert = await this.alertController.create(
      {
        header : 'Atencion.',
        message : "Hemos enviado un correo para recuperar tu cuenta.",
        buttons : [
          {text : 'Okey', handler : () => { this.router.navigate(["login-view"]); }}
        ]
      }
    );

    await alert.present();

  }

  async presentLoading() {
    this.loading = await this.loadingCtlr.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espere.',
    });

    return this.loading.present();
  }

  /*VALIDACION DE FORMULARIO*/
  /*VALIDACION DE FORMULARIO*/
  public forgotPassVerificationForm = this.formBuilder.group({
    email: [
      '', [ Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]
    ]
  });

  public errorMessages = {
    email: [
      { type: 'required', message: 'El correo es obligatorio.' },
      { type: 'pattern', message: 'Introduce un Email valido.' }
    ]
  }
  /*VALIDACION DE FORMULARIO*/
  /*VALIDACION DE FORMULARIO*/

}
