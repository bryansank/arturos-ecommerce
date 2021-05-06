/*import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginAuthGuard implements CanActivate {

  constructor(private authFireService: AuthService, private router: Router){}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    return this.authFireService.user$.pipe(
      take(1),
      map(userData =>{

        console.log("User: ", userData)

        if(userData){
          this.router.navigate(['home-view'])
          return true;
        }else{
          //Redirigirlo a login page
          this.router.navigate(['login-view'])
          return false;
        }
      })
    )
  }
}

*/