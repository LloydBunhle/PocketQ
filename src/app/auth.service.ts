import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { environment } from 'src/environments/environment';
export const firebaseConfig = environment.firebase;
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app/app.service';
import { User } from './user.model';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';



// Initialise firebase with our config variable
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email: any;
  displayName: any;
  userDetails: any;
  user: string;
  cookie: any;
  isLoggedIn = false;

  constructor(
    public storage: Storage,
    public appService: AppService,
    private googlePlus: GooglePlus,
    private platform: Platform,
    private router: Router,
    private nativeStorage: NativeStorage,
    private http: HttpClient
  ) { }


  googleLogin() {
    this.googlePlus.login({

    })
      .then(res => {
        this.isLoggedIn = true;
        console.log(res.displayName, res.email);
        this.email = res.email;
        this.displayName = res.displayName;
        this.router.navigateByUrl('/tabs');

        // populating user details
        const userInfo = new User();
        userInfo.name = this.displayName;
        userInfo.useremail = this.email;
        console.log(userInfo);
        this.populateUser(userInfo);
      })

      .catch(err => {
        console.error(err);
      });
  }

  populateUser(userInfo: any) {
    // Pass logged in user to the springboot API
    this.appService.addUser(userInfo).subscribe(data => {
      this.userDetails = data;

      this.appService.setUser(this.userDetails);
      console.log('my cookie ' + this.appService.user.id);

      // set cookie for logged in user id
      /// this.cookie = this.cookieService.put('userid', this.userDetails.id);

    });

  }

  signOut() {
    this.googlePlus.logout()
      .then(result => {
        this.isLoggedIn = false;

        this.router.navigateByUrl('/login');
    }).catch(error => {});
  }


}
