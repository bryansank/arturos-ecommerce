import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from './services/firebaseAuth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateLoginGuard implements CanActivate {

  constructor(private authServiceWithFirebase: AuthService, private router: Router){}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {   
      return this.authServiceWithFirebase.dataUser$.pipe(
        take(1),
        map( (userData) =>{
          //Devuelve true, si existe el usuario
          if(userData){
            this.authServiceWithFirebase.Authenticated(true);
            return true;
          }else{
            //Esta llegando null, no esta logueado.
            this.router.navigate(['login-view']);
            return false;
          }
        })
      );

  }
  
}
