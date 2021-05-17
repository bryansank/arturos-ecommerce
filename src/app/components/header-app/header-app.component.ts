import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-component',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.scss'],
})
export class HeaderAppComponent implements OnInit {

  //public backArrowCondition: boolean = false;

  @Input() titleHeaderPage : string;

  constructor(private router: Router) { }

  ngOnInit() {}

  openPageCart() {
    this.router.navigate(["cart-view"]);
  }

}
