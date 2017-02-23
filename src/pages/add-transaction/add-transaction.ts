import { Component } from '@angular/core';
import { NavController, NavParams, Modal, ModalController } from 'ionic-angular';

import { CategoriesModalPage } from '../categories-modal/categories-modal';

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

  newTransaction: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private transaction: Transaction, private modalCtrl: ModalController)
  {
    this.newTransaction = {
      paid_at: new Date().toISOString(),
      amount: 0,
      outcome: true,
    };
  }

  public showCategories(): void
  {
    let modal = this.modalCtrl.create(CategoriesModalPage);
    modal.onDidDismiss(data => {
      this.newTransaction.category = data;
    });
    modal.present();
  }
  
  public addTransaction(): void {
    this.transaction.addTransaction(this.newTransaction).subscribe(data => {
      console.log(data);
      this.navCtrl.pop();
    }, err => {
      console.log(err);
    });
  }

}
