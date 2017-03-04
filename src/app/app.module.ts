import { NgModule, ErrorHandler } from '@angular/core';
import { DatePipe } from '@angular/common';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { AddTransactionPage } from '../pages/add-transaction/add-transaction';
import { CategoriesModalPage } from '../pages/categories-modal/categories-modal';
import { HistoryPage } from '../pages/history/history';
import { SubscriptionsPage } from '../pages/subscriptions/subscriptions';
import { AddSubscriptionPage } from '../pages/add-subscription/add-subscription';
import { StatsPage } from '../pages/stats/stats';

import { Auth } from '../providers/auth';
import { Transaction } from '../providers/transaction';

import { AngularFireModule } from 'angularfire2';
import { ChartsModule } from 'ng2-charts';

export const firebaseConfig = {
  apiKey: "AIzaSyCtKGD9srLLDXN1YGvdiAw10ShHFRcGNcU",
  authDomain: "ipaid-7ac27.firebaseapp.com",
  databaseURL: "https://ipaid-7ac27.firebaseio.com",
  storageBucket: "ipaid-7ac27.appspot.com",
  messagingSenderId: "486224117588"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignUpPage,
    AddTransactionPage,
    CategoriesModalPage,
    HistoryPage,
    SubscriptionsPage,
    AddSubscriptionPage,
    StatsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignUpPage,
    AddTransactionPage,
    CategoriesModalPage,
    HistoryPage,
    SubscriptionsPage,
    AddSubscriptionPage,
    StatsPage
  ],
  providers: [Auth, Transaction, DatePipe, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
