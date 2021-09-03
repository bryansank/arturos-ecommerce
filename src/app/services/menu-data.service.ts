import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataNav } from '../interfaces/dataNav';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  public dataMenu:any;
  public dataMenuLogin:any;
  public dataMenuAdmin:any;

  constructor(private http: HttpClient) {
     this.dataMenu = this.http.get<DataNav[]>('/assets/data/menu.json');
     this.dataMenuLogin = this.http.get<DataNav[]>('/assets/data/menuLogin.json');
     this.dataMenuAdmin = this.http.get<DataNav[]>('/assets/data/menuAdmin.json');
   }

  public getMenuOptions():any{
    return this.dataMenu;
  }

  public getMenuOptionsLogin():any{
    return this.dataMenuLogin;
  }
  
  public getMenuOptionsAdmin():any{
    return this.dataMenuAdmin;
  }


}
