import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/firebaseAuth.service';

@Component({
  selector: 'app-logout-view',
  templateUrl: './logout-view.page.html',
  styleUrls: ['./logout-view.page.scss'],
})
export class LogoutViewPage implements OnInit {

  constructor(private authFirebaseService: AuthService, private router: Router){
    this.authFirebaseService.logout();
    this.router.navigate(["home-view"]);
  }

  ngOnInit() {
  }

}
