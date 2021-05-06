import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound-view',
  templateUrl: './notfound-view.page.html',
  styleUrls: ['./notfound-view.page.scss'],
})
export class NotfoundViewPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goHome(){
    this.router.navigate(["home-view"])
  }

}
