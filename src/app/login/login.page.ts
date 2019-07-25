import { Component, OnInit } from '@angular/core';
import { ToastController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseUISignInSuccessWithAuthResult, FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { User } from '../user.model';
import { AppService } from '../app.service';
import { CookieService } from 'angular2-cookie/core';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  userProfile: any = null;
  isLoggedIn = false;

  constructor(
    private authlogin: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth,
    public toastController: ToastController,
    public firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
    private cookieService: CookieService,
    public appService: AppService  ) {  }



  ngOnInit() {
    // this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();

  }

skip() {
    this.router.navigateByUrl('/tabs');

  }

googleLogin() {
  this.authlogin.googleLogin();
}


  /* async successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    // navigete to home page
    if (this.platform.is('cordova')) {
    this.router.navigateByUrl('/tabs');
    const toast = await this.toastController.create({
      message: 'Successfully logged in !',
      duration: 1000
    });

    this.firebaseuiAngularLibraryService.firebaseUiInstance.disableAutoSignIn();
    toast.present();

    const userInfo = new User();
    userInfo.name = signInSuccessData.authResult.user.displayName;
    userInfo.useremail = signInSuccessData.authResult.user.email;
    this.populateUser(userInfo);
  }
  } */



}
