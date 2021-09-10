import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { handlersManager } from 'src/app/handlers/handler-errors-and-logs';
import { ShowpopupIonService } from 'src/app/services/showpopup-ion.service';

@Component({
  selector: 'app-pay-info',
  templateUrl: './pay-info.page.html',
  styleUrls: ['./pay-info.page.scss'],
})
export class PayInfoPage implements OnInit {

  constructor(
    private modalCtrl: ModalController, 
    private showPopupCtrlService : ShowpopupIonService, 
    private router: Router,
    private alertController: AlertController){ }

  private handlersManager: handlersManager = new handlersManager(this.alertController, this.router);

  @Input() restUseParam: string;

  // TODO: En localStorage, debe avisar que ya hay datos guardados, por consecuencia tildar datos guardados o desactivarla.
  //        crear boton para borrar la data, implementar los campos con los datos en localstorage.
  //        preguntar si implementar el pin de tarjeta pueda ser guardado.
  //        crear catchat?
  //        implementar JWT

  public cedula_client:string = ""
  public tel_client:string = ""
  public name_client:string = ""
  public direc_client:string = ""
  public card_client:string = ""
  public pin_client:string = ""
  public expiryDate_client:string = ""
  public checkFlagSave:boolean = false;

  ngOnInit(){ /*this.auxRestUseParam = this.restUseParam*/}

  public processData():void{

    const data = {
      cedula : this.cedula_client,
      tel : this.tel_client,
      name : this.name_client,
      direc : this.direc_client,
      card : this.card_client,
      pin : this.pin_client,
      expiryDate: this.expiryDate_client,
    }

    if(data.cedula==""||data.tel==""||data.name==""||data.direc==""||data.card==""||data.pin==""||data.expiryDate==""){
      this.showPopupCtrlService.ShowPopup("Datos Incompletos", 
      "Algun dato esta vacio, por favor completelo y siga su proceso de pago.", 
      "", "Ok");
    }else{
      if(this.checkFlagSave){
        if(localStorage.getItem('cedula') == null){
          this.expiryDate_client = this.handlersManager.transformDate(data.expiryDate, "/");
          this.saveInLocalDB();
        }else{
          localStorage.clear();
          this.expiryDate_client = this.handlersManager.transformDate(data.expiryDate, "/");
          this.saveInLocalDB();
        }
      }

      this.processPay();

    }

  }

  public processPay(){
    this.handlersManager.consoleForDebbug("Esperando a Endpoint.")

  }

  public saveInLocalDB():void{
    localStorage.setItem('cedula', this.cedula_client);
    localStorage.setItem('tel', this.tel_client);
    localStorage.setItem('name', this.name_client);
    localStorage.setItem('direc', this.direc_client);
    localStorage.setItem('card', this.card_client);
    localStorage.setItem('pin', this.pin_client);
    localStorage.setItem('expiryDate', this.expiryDate_client);
  }

  public activeCheckSaveInfo(){
    return this.checkFlagSave == false ? this.checkFlagSave = true: this.checkFlagSave = false;
  }

  

  public closeModal(){
    this.closeModalWithOuthParams();
    // this.closeModalWithParams();
  }

  public closeModalWithOuthParams(){
    this.modalCtrl.dismiss();
  }

  // public selectedItemLot(e:any){
  //   let a = e.detail.value.toString();
  //   if(a == "" || undefined){
  //     console.log("Nada fue seleccionado");
  //      a = "";
  //   }
  //   this.rest = a;
  //   // this.btnStockAcumFlag = false;
  // }

}
