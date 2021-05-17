import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-promotions-view',
  templateUrl: './promotions-view.page.html',
  styleUrls: ['./promotions-view.page.scss'],
})
export class PromotionsViewPage implements OnInit {


  promoTest = [1, 2, 3, 4];

  @ViewChild('pageTop') pageTop: IonContent;

  constructor() { }

  ngOnInit() {
  }

  public pageScroller(){
    //scroll to page top
    this.pageTop.scrollToTop();
  }

}