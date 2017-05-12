import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/last';


import { AngularFire } from 'angularfire2';

import { Auth } from './auth';

@Injectable()
export class Transaction {

  constructor(public http: Http, private angularFire: AngularFire, private auth: Auth) {
  }

  public getCategories(): Observable<any> {
    return this.angularFire.database.list('/categories');
  }
  public getColors(): Observable<any> {
    return this.angularFire.database.list('/colors');
  }

  public addTransaction(transaction): Observable<any> {
    return Observable.create(observer => {
      this.auth.getUserData().subscribe(data => {
        this.angularFire.database.list('/users/' + data.auth.uid + '/transactions').push({
          name: transaction.name,
          category_key: transaction.category.$key,
          amount: transaction.amount,
          paid_at: transaction.paid_at,
        }).then(sent => {
          observer.next(sent);
        }).catch(err => {
          observer.error(err);
        });
      }, error => {
        observer.error(error);
      });
    });
  }

  public removeTransaction(transaction): Observable<any> {
    return Observable.create(observer => {
      this.auth.getUserData().subscribe(data => {
        this.angularFire.database.object('/users/' + data.auth.uid + '/transactions/' + transaction.$key).remove().then(sent => {
          observer.next(sent);
        }).catch(err => {
          observer.error(err);
        });
      }, error => {
        observer.error(error);
      });
    });
  }

  public addSubscription(subscription): Observable<any> {
    return Observable.create(observer => {
      this.auth.getUserData().subscribe(data => {
        this.angularFire.database.list('/users/' + data.auth.uid + '/subscriptions').push({
          name: subscription.name,
          category_key: subscription.category.$key,
          amount: subscription.amount,
        }).then(sent => {
          observer.next(sent);
        }).catch(err => {
          observer.error(err);
        });
      }, error => {
        observer.error(error);
      });
    });
  }


  public getLastTransactions(): Observable<any> {
    return Observable.create(observer => {
      this.auth.getUserData().subscribe(auth => {
        let transactions = this.angularFire.database.list('/users/' + auth.auth.uid + '/transactions', {
          query: {
            orderByChild: 'paid_at'
          }
        }).map(transactions => {
          return transactions.map(transaction => {
            transaction.category = this.angularFire.database.object('/categories/' + transaction.category_key);
            return transaction;
          });
        });
        observer.next(transactions);
      }, error => {
        observer.error(error);
      });
    });
  }

  public getTransactionsBetween(startDate: Date, endDate: Date): Observable<any> {
    return Observable.create(observer => {
      this.auth.getUserData().subscribe(auth => {
        let transactions = this.angularFire.database.list('/users/' + auth.auth.uid + '/transactions', {
          query: {
            orderByChild: 'paid_at',
            startAt: startDate.toISOString(),
            endAt: endDate.toISOString()
          }
        }).map(transactions => {
          return transactions.map(transaction => {
            transaction.category = this.angularFire.database.object('/categories/' + transaction.category_key);
            return transaction;
          });
        });
        observer.next(transactions);
      }, error => {
        observer.error(error);
      });
    });
  }

  public getSubscriptions(): Observable<any> {
    return Observable.create(observer => {
      this.auth.getUserData().subscribe(auth => {
        let subscriptions = this.angularFire.database.list('/users/' + auth.auth.uid + '/subscriptions').map(subs => {
          return subs.map(subscription => {
            subscription.category = this.angularFire.database.object('/categories/' + subscription.category_key);
            return subscription;
          });
        });
        observer.next(subscriptions);
      }, error => {
        observer.error(error);
      });
    });
  }

}
