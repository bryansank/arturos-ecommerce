import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataNav } from '../interfaces/dataNav';

@Injectable({
  providedIn: 'root'
})
export class MenuDataService {

  public dataMenu;
  public dataMenuLogin;
  public dataMenuAdmin;

  constructor(private http: HttpClient) {
     this.dataMenu = this.http.get<DataNav[]>('/assets/data/menu.json');
     this.dataMenuLogin = this.http.get<DataNav[]>('/assets/data/menuLogin.json');
     this.dataMenuAdmin = this.http.get<DataNav[]>('/assets/data/menuAdmin.json');
   }

  getMenuOptions(){
    return this.dataMenu;
  }

  getMenuOptionsLogin(){
    return this.dataMenuLogin;
  }
  
  getMenuOptionsAdmin(){
    return this.dataMenuAdmin;
  }


}
