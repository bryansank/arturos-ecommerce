import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebaseAuth.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPage implements OnInit {

  public titleHeaderPage:string = "Perfil";

  constructor(private authFirebaseService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.authFirebaseService.logout();
    this.router.navigate(["home-view"]);
  }

}
