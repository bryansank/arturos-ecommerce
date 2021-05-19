import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataNav } from 'src/app/interfaces/dataNav';
import { AuthService } from 'src/app/services/firebaseAuth.service';
import { MenuDataService } from 'src/app/services/menu-data.service';

@Component({
  selector: 'menuNav-component',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.scss'],
})
export class MenuNavComponent implements OnInit {

  resultNavOptions: DataNav[];

  constructor(
    private dataMenuService: MenuDataService, 
    private authServiceWithFirebase: AuthService
  ) { }

  ngOnInit() {

    this.authServiceWithFirebase.authenticationAdminState.subscribe(
      authAdmin => {
        if(authAdmin){
          this.dataMenuService.getMenuOptionsAdmin().subscribe(
            data=> {
              this.resultNavOptions = data;
            }
          );
        }else{
          this.authServiceWithFirebase.authenticationState
            .subscribe(
              (isAuthenticated)=>{
                if(isAuthenticated){
                  this.dataMenuService.getMenuOptionsLogin().subscribe(
                    data=> {
                      this.resultNavOptions = data;
                      //console.log(this.resultNavOptions)
                    }
                  );
                }else{  
                  this.dataMenuService.getMenuOptions().subscribe(
                    data=> {
                      this.resultNavOptions = data;
                      //console.log(this.resultNavOptions)
                    }
                  );
                }
            });
        }
      }
    );

  }

}