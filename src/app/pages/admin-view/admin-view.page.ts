import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebaseAuth.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.page.html',
  styleUrls: ['./admin-view.page.scss'],
})
export class AdminViewPage implements OnInit {

  public titleHeaderPage = "Modulo de Admin"

  constructor(private authFirebaseService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.authFirebaseService.logout();
    this.router.navigate(["home-view"]);
  }

}
