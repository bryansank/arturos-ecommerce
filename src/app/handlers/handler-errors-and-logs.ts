import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

export class handlersManager {

    constructor(public alertController: AlertController, public router: Router){}
    
    /*** Method handler ****/
    private MY_LOCAL_MACHINE = true;

    public consoleForDebbug(text:string, obj:any="", styleText:string=""):void{
        if(this.MY_LOCAL_MACHINE){console.log(text,styleText==null?"":styleText, obj==null?"":obj);}
    }

    public handlerError(error:any, typeError:boolean=false, additionalText?:string){

        this.consoleForDebbug('%c Manejador de Errores esta siendo Utilizado.', null, 'background: #222; color: #bada55');
        this.consoleForDebbug(error);
        this.consoleForDebbug('%c Manejador de Errores esta siendo Utilizado.', null,'background: #222; color: #bada55');

        if(typeError){ 
            switch (error.name) {
                case "HttpErrorResponse":
                    this.consoleForDebbug("Http-Response fallo.", null, null);
                    this.ShowPopup("Atencion", "Hubo un error de conexion con nuestro sitio, intente mas tarde. ", additionalText, true)
                    break;
                
                default:
                    this.consoleForDebbug('%c No se reconocio el error.', null, 'background: #222; color: red');
                    this.consoleForDebbug('Error TypeError: ', error, 'background: #222; color: red');
                    this.ShowPopup("Atencion","Hubo un error con la conexion, intente mas tarde.")
                    break;
            }
            return;
        }
    
        switch (error.code) {
            
            case "auth/unauthorized-domain":
                this.consoleForDebbug("Dominio incorrecto para Google!.");
                this.ShowPopup("Atencion","DevOps please.")
                break;

            case "auth/popup-blocked":
                this.consoleForDebbug("Esta siendo usado un ADBLOCK!.");
                this.ShowPopup("Atencion","Usted esta usando un adblock, lo que limita los usos de esta pagina. Por favor desactivelo para su estancia en el sitio sea amigable. No usamos informacion personal para nada fuera de este sitio.")
                break;

            case "auth/wrong-password":
                this.consoleForDebbug("Contraseña invalida.");
                this.ShowPopup("Atencion","Contraseña invalida.")
                break;

            case "auth/argument-error":
                this.consoleForDebbug("Fallo la forma: Correo/Password: El primer arg 'email' debe ser una cadena válida.");
                this.ShowPopup("Atencion","Coloque un Correo/Contraseña Valida")
                break;
            
            case "auth/popup-closed-by-user":
                this.consoleForDebbug("El usuario ha cerrado la ventana emergente antes de finalizar la operación de authentication con Google.");
                this.ShowPopup("Atencion","Ha cerrado la ventana emergente antes de finalizar la operación.")
                break;
            
            case "auth/network-request-failed":
                this.consoleForDebbug("Se ha producido un error de red.");
                this.ShowPopup("Atencion","Ha ocurrido un error en la red.")
                break;
            
            case "auth/weak-password":
                this.consoleForDebbug("La contraseña debe tener al menos 6 caracteres.");
                this.ShowPopup("Atencion","La contraseña debe tener al menos, 6 caracteres.")
                break;
    
            case "auth/email-already-in-use":
                this.consoleForDebbug("El correo que esta colocando, ya esta registrado.");
                this.ShowPopup("Atencion","El correo que esta colocando, ya esta registrado.")
                break;
            
            case "auth/invalid-email":
                this.consoleForDebbug("El formato de correo que esta colocando es invalido.");
                this.ShowPopup("Atencion","El formato de correo que esta colocando es invalido.")
                break;

            case "auth/user-not-found":
                this.consoleForDebbug("El usuario no existe. Verifique su corre.");
                this.ShowPopup("Atencion","El usuario no existe. Verifique su correo.")
                break;

            default:
                this.consoleForDebbug('%c No se reconocio el error.', null, 'background: #222; color: red');
                this.consoleForDebbug('Error code: ', error);
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