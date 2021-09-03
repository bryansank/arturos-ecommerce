import { OnInit } from '@angular/core';
//Components
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { handlersManager } from 'src/app/handlers/handler-errors-and-logs';
//Servicios
import { AuthService } from 'src/app/services/firebaseAuth.service';
//Validar Formulario
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public titleHeaderPage:string = "Registrate"
  public handlersManager:handlersManager = new handlersManager(this.alertController, this.router);
  private loading : any;

  constructor(
    private authFireService: AuthService, 
    private router: Router, 
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    public loadingCtlr: LoadingController
  ) { }

  ngOnInit() {
  }

  async onRegister(){

    const {email, password} = this.registerVerificationForm.value;

    try {
      const user = await this.authFireService.register(email, password);

      if(user){
        //CheckEmail para seguir en la page
        //console.log("Usuario: ", user);
        const isVerified = this.authFireService.isEmailValid(user);
        this.redirectUser(isVerified);
      }

    } catch (error) {
      this.handlersManager.handlerError(error);
    }
  }

  async onGoogleLogin(){
    this.presentLoading();
    //debugger;
    try {
      const user = await this.authFireService.loginGoogle();
      this.hideLoading();

      if(user){
        const isVerified = this.authFireService.isEmailValid(user);
        this.redirectUser(isVerified);
      }

    } catch (error) {
      this.handlersManager.handlerError(error);
    }
  }

  private redirectUser(isVerified: boolean): void{
    //
    if(isVerified){
      this.router.navigate(['admin-view'])
    }else{
      //Aun no se ha verificado.
      this.ShowPopup("Enhorabuena.", "Hemos enviado un correo para la verificacion de tu cuenta! ");
      setTimeout( ()=>{
          this.router.navigate(["login-view"])
        },5000
      );
    }
  }

  async ShowPopup(msnHeader:string,msn:string, flagRouter: boolean=false){
    
    const alert = await this.alertController.create(
      {
        header : msnHeader,
        message : msn,
        buttons : [
          {
            text : 'Acepto',
            handler : () => { if(flagRouter){this.router.navigate(["home-view"]);}else{console.log("funciona")}  }
          }
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

  async hideLoading() {
    this.loadingCtlr.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });
  }

  //---> Metodos de validacion

  
  public registerVerificationForm = this.formBuilder.group({
    email: [
      '', [ Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')]
    ],
    password: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(7),]],
  });

  public errorMessages = {
    email: [
      { type: 'required', message: 'El correo es obligatorio.' },
      { type: 'pattern', message: 'Introduce un Email valido.' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'Debe tener minimo de 7 caracteres.' },
      { type: 'maxlength', message: 'Debe tener maximo de 25 caracteres.' }
    ],
  }

}
