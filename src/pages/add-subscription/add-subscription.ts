import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { CategoriesModalPage } from '../categories-modal/categories-modal';
import { Transaction } from '../../providers/transaction';

@Component({
  selector: 'page-add-subscription',
  templateUrl: 'add-subscription.html'
})
export class AddSubscriptionPage {

  newSubscription: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private transaction: Transaction)
  {
    this.newSubscription = {
      name: "",
      amount: 0,
    };
  }

  public showCategories(): void
  {
    let modal = this.modalCtrl.create(CategoriesModalPage);
    modal.onDidDismiss(data => {
      this.newSubscription.category = data;
    });
    modal.present();
  }

  public addSubscription(): void {
    this.transaction.addSubscription(this.newSubscription).subscribe(data => {
      console.log(data);
      this.navCtrl.pop();
    }, err => {
      console.log(err);
    });
  }
}
