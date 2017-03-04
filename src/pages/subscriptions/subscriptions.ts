import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Transaction } from '../../providers/transaction';
import { AddSubscriptionPage } from '../add-subscription/add-subscription';

@Component({
  selector: 'page-subscriptions',
  templateUrl: 'subscriptions.html'
})
export class SubscriptionsPage {

  subscriptions;

  constructor(public navCtrl: NavController, public navParams: NavParams, private transaction: Transaction) {}

  ionViewWillEnter() {
    this.transaction.getSubscriptions().subscribe(subscriptions => {
      this.subscriptions = subscriptions;
    }, error => {
      console.log('Error:' + error);
    });
  }

  addSubscription() {
    this.navCtrl.push(AddSubscriptionPage);
  }

  removeSubscription(subscription): void {
    this.subscriptions.remove(subscription);
  }
}
