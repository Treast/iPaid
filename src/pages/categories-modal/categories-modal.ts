import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Transaction } from '../../providers/transaction';

@Component({
  selector: 'page-categories-modal',
  templateUrl: 'categories-modal.html'
})
export class CategoriesModalPage {

  categories: Object[];

  constructor(public navCtrl: NavController, private viewCtrl: ViewController, public navParams: NavParams, private transaction: Transaction) {}

  ionViewDidLoad() {
    this.transaction.getCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      console.log(error);
    });
  }

  selectCategory(category) {
    this.viewCtrl.dismiss(category);
  }

}
