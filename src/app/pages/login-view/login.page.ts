import { OnInit } from '@angular/core';

//Componentes
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { errorHandler } from 'src/app/errors-handler/errors-handler';

//Servicio
import { AuthService } from 'src/app/services/firebaseAuth.service';

//Validar Form
import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  public titleHeaderPage = "Entrar a Mi Cuenta"
  public errorHandler = new errorHandler(this.alertController, this.router);
  private loading : any;

  constructor(
    private authFireService: AuthService,
    private router: Router, 
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    public loadingCtlr: LoadingController
  
  ){}

  ngOnInit() {
  }

  async onLogin(){

    this.presentLoading();

    const {email, password} = this.loginForm.value;
    
    try {
      const user = await this.authFireService.login(email, password);
      this.hideLoading();

      if(user){
        const isVerified = this.authFireService.isEmailValid(user);
        this.redirectUser(isVerified);
      }

    } catch (error) {
      this.hideLoading();
      this.errorHandler.handlerError(error);
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
      this.errorHandler.handlerError(error);
    }
  }

  goRegister(): void{
    this.router.navigate(["register-view"]);
  }

  passwordLost(): void{
    this.router.navigate(["forgot-password-view"]);
  }

  //--> Metodos back  

  private redirectUser(isVerified: boolean): void{
    //
    if(isVerified){
      if(this.authFireService.Authenticated()){
        //this.router.navigate(['menu-nav']);
        this.router.navigate(['admin-view']);
      }
    }else{
      this.ShowPopup("Atencion!", "Le hemos enviado un correo anteriormente para que verifique su correo primero.", true);
      setTimeout(()=>{
        this.router.navigate(["home-view"]);
      },6000)
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

  
  loginForm = this.formBuilder.group({
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
