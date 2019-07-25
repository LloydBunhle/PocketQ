import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { BookingModelPageModule } from './booking-model/booking-model.module';
import { ContactPageModule } from './contact/contact.module';
import { LoginPage } from './login/login.page';


import { FirebaseUIModule } from 'firebaseui-angular';
import * as firebase from 'firebase/app';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import * as firebaseui from 'firebaseui';

// currently there is a bug while building the app with --prod
// - https://github.com/RaphaelJenni/FirebaseUI-Angular/issues/76
// the plugin exposes the two libraries as well. You can use those:

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ContactPage } from './contact/contact.page';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { StatisticsPageModule } from '../app/statistics/statistics.module';
import { AppService } from './app.service';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'redirect',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends',
        'https://www.googleapis.com/auth/drive'
      ],
      customParameters: {
        auth_type: 'reauthenticate'
      },


      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    /*
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    */
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
};

@NgModule({
  declarations: [
    AppComponent],
    entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    BookingModelPageModule,
    StatisticsPageModule,
    ContactPageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    Geolocation,
    NativeStorage,
    CookieService,
    LaunchNavigator,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ContactPage,
    AppService

    // Specify ng-circle-progress as an import
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
