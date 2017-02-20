import { NgModule, ErrorHandler } from '@angular/core';
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
import { ColorsModalPage } from '../pages/colors-modal/colors-modal';

import { Auth } from '../providers/auth';
import { Transaction } from '../providers/transaction';

import { AngularFireModule } from 'angularfire2';

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
    ColorsModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
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
    ColorsModalPage
  ],
  providers: [Auth, Transaction, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
