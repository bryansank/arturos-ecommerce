import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header-component',
  templateUrl: './header-app.component.html',
  styleUrls: ['./header-app.component.scss'],
})
export class HeaderAppComponent implements OnInit {

  //public backArrowCondition: boolean = false;

  @Input() titleHeaderPage : string;

  constructor() { }

  ngOnInit() {}

}
