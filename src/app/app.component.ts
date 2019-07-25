import { Component } from '@angular/core';

import { Platform, MenuController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { CookieService } from 'angular2-cookie/core';
import { AuthService } from '../app/auth.service';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any = 'LoginPage';
  refnum;

  displayName;
  email;
  isLoggedIn = false;

  constructor(
    public storage: Storage,
    private authlogin: AuthService,
    private googlePlus: GooglePlus,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    public menuCtrl: MenuController,
    public afAuth: AngularFireAuth,
    public firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
    private cookieService: CookieService,
    private nativeStorage: NativeStorage,

    public alertController: AlertController
  ) {
    this.initializeApp();


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  Out() {
    this.authlogin.signOut();
    this.menuCtrl.close();
  }
}
