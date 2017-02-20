import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Transaction } from '../../providers/transaction';

/*
  Generated class for the ColorsModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-colors-modal',
  templateUrl: 'colors-modal.html'
})
export class ColorsModalPage {

  colors: Object[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private transaction: Transaction) {}

  ionViewDidLoad() {
    this.transaction.getColors().subscribe(data => {
      this.colors = data;
    });
  }

}
