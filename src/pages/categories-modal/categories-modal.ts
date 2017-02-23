import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Transaction } from '../../providers/transaction';

@Component({
  selector: 'page-categories-modal',
  templateUrl: 'categories-modal.html'
})
export class CategoriesModalPage {

  categories: any;

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, public navParams: NavParams, private transaction: Transaction) {}

  ionViewDidEnter() {
    this.categories = this.transaction.getCategories();
  }

  selectCategory(category) {
    this.viewCtrl.dismiss(category);
  }

}
