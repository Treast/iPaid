import { Component } from '@angular/core';
import { NavController, NavParams, Modal, ModalController } from 'ionic-angular';

import { CategoriesModalPage } from '../categories-modal/categories-modal';
import { ColorsModalPage } from '../colors-modal/colors-modal';

import { Transaction } from '../../providers/transaction';

/*
  Generated class for the AddTransaction page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-transaction',
  templateUrl: 'add-transaction.html'
})
export class AddTransactionPage {

  category: Object;
  color: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private transaction: Transaction, private modalCtrl: ModalController) {}

  public showCategories(): void
  {
    let modal = this.modalCtrl.create(CategoriesModalPage);
    modal.onDidDismiss(data => {
      this.category = data;
    });
    modal.present();
  }

  public showColors(): void
  {
    let modal = this.modalCtrl.create(ColorsModalPage);
    modal.onDidDismiss(data => {
      this.color = data;
    });
    modal.present();
  }

}
