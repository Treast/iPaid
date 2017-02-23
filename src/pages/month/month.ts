import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { Transaction } from '../../providers/transaction';

@Component({
  selector: 'page-month',
  templateUrl: 'month.html'
})
export class MonthPage {

  now: Date;

  currentTitle: String;
  prevTitle: String;
  nextTitle: String;

  monthlyTransactions: any;
  range: String = "month";

  public chartLabels: string[] = [];
  public chartData: number[] = [];
  public chartColors: any = [{
    backgroundColor: []
  }];

  public loaded = false;

  loading: Loading;

  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicked(e: any): void {
    console.log('Labels', this.chartLabels);
    console.log('Data', this.chartData);

    console.log('Off', this.loading._state);
    console.log(e);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private transaction: Transaction, private loadingCtrl: LoadingController, private datePipe: DatePipe) {
    this.now = new Date();
  }

  ionViewWillEnter() {
    this.showLoading();
    this.transaction.getCategories().subscribe(categories => {
      categories.forEach(category => {
        this.chartLabels[category.$key] = category.name;
        this.chartColors[0].backgroundColor[category.$key] = category.color;
      });
      this.showMonth(this.now);
    });
  }

  showLoading() {
    this.loaded = false;
    this.loading = this.loadingCtrl.create({
      content: 'Retrieve data',
    });
    this.loading.present();
  }

  goPrev() {
    this.showLoading();
    this.now.setMonth(this.now.getMonth() - 1);
    this.now = this.now;
    this.showMonth(this.now);
  }

  goNext() {
    this.showLoading();
    this.now.setMonth(this.now.getMonth() + 1);
    this.now = this.now;
    this.showMonth(this.now);
  }

  private getMonday(date: Date) {
    var day = date.getDay() || 7;
    if (day !== 1)
      date.setHours(-24 * (day - 1));
    return date;
  }

  private showWeek(date: Date) {

  }
  private showMonth(date: Date) {
    let previous = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    let next = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.prevTitle = this.datePipe.transform(previous, 'MMM y');
    this.currentTitle = this.datePipe.transform(date, 'MMM y');
    this.nextTitle = this.datePipe.transform(next, 'MMM y');

    this.getTransactions(startDate, endDate);
  }

  private getTransactions(startDate: Date, endDate: Date) {
    this.chartData = new Array(this.chartLabels.length + 1).join('0').split('').map(parseFloat);
    this.transaction.getTransactionsBetween(startDate, endDate).subscribe(transactions => {
      transactions.subscribe(data => {
        data.forEach(transaction => {
          if (transaction.amount != undefined) this.chartData[transaction.category_key] += parseInt(transaction.amount);
        });
        this.loading.dismiss();
        this.loaded = true;
      });
    });
  }

}
