import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { Transaction } from '../../providers/transaction';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  now: Date;

  currentTitle: String;
  prevTitle: String;
  nextTitle: String;

  currentTransactions: any;
  currentSubscriptions: any;
  transactions: any;
  range: String = "month";

  public chartLabels: string[] = [];
  public chartData: number[] = [];
  public chartColors: any = [{
    backgroundColor: []
  }];
  public chartOptions: any = {
    responsive: true,
    defaultFontColor: '#FFF',
    legend: {
      labels: {
        fontColor: '#FFF',
      }
    }
  };

  public loaded = false;

  public hasValue: boolean;

  public total_amount: number;

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

  public viewWeek() {
    this.showLoading();
    this.showWeek(this.now);
  }

  public viewMonth() {
    this.showLoading();
    this.showMonth(this.now);
  }

  public viewYear() {
    this.showLoading();
    this.showYear(this.now);
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
    switch (this.range) {
      case 'week':

        this.now = this.getMonday(this.now);
        this.now.setDate(this.now.getDate() - 7);
        this.showWeek(this.now);

        break;
      case 'month':
        this.now.setMonth(this.now.getMonth() - 1);
        this.showMonth(this.now);
        break;
      case 'year':
        this.now.setFullYear(this.now.getFullYear() - 1);
        this.showYear(this.now);
        break;
    }
  }

  goNext() {
    this.showLoading();
    switch (this.range) {
      case 'week':
        this.now = this.getMonday(this.now);
        this.now.setDate(this.now.getDate() + 7);
        this.showWeek(this.now);
        break;
      case 'month':
        this.now.setMonth(this.now.getMonth() + 1);
        this.showMonth(this.now);
        break;
      case 'year':
        this.now.setFullYear(this.now.getFullYear() + 1);
        this.showYear(this.now);
        break;
    }
  }

  private getMonday(date: Date) {
    var day = date.getDay() || 7;
    if (day !== 1)
      date.setHours(-24 * (day - 1));
    return date;
  }

  private showWeek(date: Date) {
    let current = this.getMonday(date);
    let previous = new Date(current.getTime() - 7 * 24 * 60 * 60 * 1000);
    let next = new Date(current.getTime() + 7 * 24 * 60 * 60 * 1000);

    let startDate = new Date(current.getFullYear(), current.getMonth(), current.getDate());
    let endDate = new Date(next.getFullYear(), next.getMonth(), next.getDate());

    this.prevTitle = this.datePipe.transform(previous, 'dd MMM y');
    this.currentTitle = this.datePipe.transform(current, 'dd MMM y');
    this.nextTitle = this.datePipe.transform(next, 'dd MMM y');

    this.getTransactions(startDate, endDate);
  }

  private showYear(date: Date) {
    let previous = new Date();
    let next = new Date();

    next.setFullYear(this.now.getFullYear() + 1);
    previous.setFullYear(this.now.getFullYear() - 1);

    let startDate = new Date(this.now.getFullYear(), 1, 1);
    let endDate = new Date(next.getFullYear(), 1, 1);

    this.prevTitle = this.datePipe.transform(previous, 'y');
    this.currentTitle = this.datePipe.transform(this.now, 'y');
    this.nextTitle = this.datePipe.transform(next, 'y');

    this.getTransactions(startDate, endDate);
  }

  private showMonth(date: Date) {
    let previous = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    let next = new Date(date.getFullYear(), date.getMonth() + 1, 1);


    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let endDate = new Date(date.getFullYear(), date.getMonth()+1, 1);

    this.prevTitle = this.datePipe.transform(previous, 'MMM y');
    this.currentTitle = this.datePipe.transform(date, 'MMM y');
    this.nextTitle = this.datePipe.transform(next, 'MMM y');

    this.getTransactions(startDate, endDate);
  }

  private checkIfValue() {
    this.chartData.forEach(element => {
      if(element > 0) this.hasValue = true;
    });
  }

  private getTransactions(startDate: Date, endDate: Date) {
    // Tweak to initialize the array with O as value
    this.chartData = new Array(this.chartLabels.length + 1).join('0').split('').map(parseFloat);
    this.total_amount = 0.0;
    // Hide the chart during loading
    this.hasValue = false;
    // Get all transactions between two dates via the transaction provider
    this.transaction.getTransactionsBetween(startDate, endDate).subscribe(transactions => {
      this.currentTransactions = transactions;
      // Unwrap the transaction collection
      transactions.subscribe(data => {
        data.forEach(transaction => {
          this.transactions = data;
          // Make sure that the transaction get an amount
          if (transaction.amount != undefined)
          {
            // Add the amount of the current transaction to the category total
            this.chartData[transaction.category_key] += parseFloat(transaction.amount);
            // And to the total amount shown in the middle
            this.total_amount += parseFloat(transaction.amount);
          }
        });
        // Make sure that the chart contains at least a value
        // If no, then show a message instead
        this.checkIfValue();
        // Hide the loader
        this.loading.dismiss();
        // Show the chart
        this.loaded = true;
      });
    });

    if(this.range == 'month' || this.range == 'year') {
      this.transaction.getSubscriptions().subscribe(subscriptions => {
         subscriptions.subscribe(data => {
            this.currentSubscriptions = data;

           data.forEach(subscription => {
             if(this.range == 'year')
               this.total_amount += 12 * parseFloat(subscription.amount);
             else 
               this.total_amount += parseFloat(subscription.amount);
           });
         }, error => {
           console.log(error);
         });
      }, error => {
        console.log(error);
      });
    }
  }

  public removeTransaction(t) {
    this.currentTransactions.remove(t);

    this.showLoading();
    this.transaction.getCategories().subscribe(categories => {
      categories.forEach(category => {
        this.chartLabels[category.$key] = category.name;
        this.chartColors[0].backgroundColor[category.$key] = category.color;
      });
      this.showMonth(this.now);
    });
  }

}
