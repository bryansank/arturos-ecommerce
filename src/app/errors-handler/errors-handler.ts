import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

export class errorHandler {

    constructor(public alertController: AlertController, public router: Router){}
    
    /*** Method handler ****/

    handlerError(error, typeError:boolean=false, additionalText?:string){

        console.log('%c Manejador de Errores esta siendo Utilizado.', 'background: #222; color: #bada55');
        console.log(error);
        console.log('%c Manejador de Errores esta siendo Utilizado.', 'background: #222; color: #bada55');

        if(typeError){ 
            switch (error.name) {
                case "HttpErrorResponse":
                    console.log("Http response fallo.");
                    this.ShowPopup("Atencion", "Hubo un error de conexion con nuestro sitio, intente mas tarde. ", additionalText, true)
                    break;
                
                default:
                    console.log('%c No se reconocio el error.', 'background: #222; color: #bada55');
                    console.log('Error: =?>> ', error);
                    this.ShowPopup("Atencion","Hubo un error con la conexion, intente mas tarde.")
                    break;
            }
            return;
        }
    
        switch (error.code) {
            
            case "auth/unauthorized-domain":
                console.log("Dominio incorrecto para Google!.");
                this.ShowPopup("Atencion","DevOps please.")
                break;

            case "auth/popup-blocked":
                console.log("Esta siendo usado un ADBLOCK!.");
                this.ShowPopup("Atencion","Usted esta usando un adblock, lo que limita los usos de esta pagina. Por favor desactivelo para su estancia en el sitio sea amigable. No usamos informacion personal para nada fuera de este sitio.")
                break;

            case "auth/wrong-password":
                console.log("Contraseña invalida.");
                this.ShowPopup("Atencion","Contraseña invalida.")
                break;

            case "auth/argument-error":
                console.log("Fallo la forma: Correo/Password: El primer arg 'email' debe ser una cadena válida.");
                this.ShowPopup("Atencion","Coloque un Correo/Contraseña Valida")
                break;
            
            case "auth/popup-closed-by-user":
                console.log("El usuario ha cerrado la ventana emergente antes de finalizar la operación de authentication con Google.");
                this.ShowPopup("Atencion","Ha cerrado la ventana emergente antes de finalizar la operación.")
                break;
            
            case "auth/network-request-failed":
                console.log("Se ha producido un error de red.");
                this.ShowPopup("Atencion","Ha ocurrido un error en la red.")
                break;
            
            case "auth/weak-password":
                console.log("La contraseña debe tener al menos 6 caracteres.");
                this.ShowPopup("Atencion","La contraseña debe tener al menos, 6 caracteres.")
                break;
    
            case "auth/email-already-in-use":
                console.log("El correo que esta colocando, ya esta registrado.");
                this.ShowPopup("Atencion","El correo que esta colocando, ya esta registrado.")
                break;
            
            case "auth/invalid-email":
                console.log("El formato de correo que esta colocando es invalido.");
                this.ShowPopup("Atencion","El formato de correo que esta colocando es invalido.")
                break;

            case "auth/user-not-found":
                console.log("El usuario no existe. Verifique su corre.");
                this.ShowPopup("Atencion","El usuario no existe. Verifique su correo.")
                break;

            default:
                console.log('%c No se reconocio el error.', 'background: #222; color: #bada55');
                console.log('Error: =?>> ', error);
                this.ShowPopup("Atencion","Hubo un error inesperado, intente mas tarde.")
                
                break;
        }
          
    }
 
    //
    async ShowPopup(msnHeader:string, msn:string, msnAditional?:string, goRoute?:boolean){
    
        const alert = await this.alertController.create(
          {
            header : msnHeader,
            message : (msnAditional == undefined ? "": msnAditional +"<br /><br />" ) + msn,
            buttons : [
              {
                text : 'Acepto',
                handler : () => { 
                    if(goRoute){
                        this.router.navigate(['home-view']);
                    }
                }
              }
            ]
          }
        );
    
        await alert.present();
    
    }

}