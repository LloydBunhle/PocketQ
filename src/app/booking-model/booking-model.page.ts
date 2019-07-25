import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ContactPage } from '../contact/contact.page';
import { Router } from '@angular/router';
import { LaunchNavigator , LaunchNavigatorOptions} from '@ionic-native/launch-navigator/ngx';

import { AppService } from '../app.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseuiAngularLibraryService } from 'firebaseui-angular';
import { AuthService } from '../auth.service';

declare var google;
@Component({
  selector: 'app-booking-model',
  templateUrl: './booking-model.page.html',
  styleUrls: ['./booking-model.page.scss'],
})
export class BookingModelPage implements OnInit {
  modalTitle: any;
  modalAddress: any;
  modalPhone: any;
  latLng: any;


  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private router: Router,
    private launchNavigator: LaunchNavigator,
    private appService: AppService,
    public afAuth: AngularFireAuth,
    public firebaseuiAngularLibraryService: FirebaseuiAngularLibraryService,
    private authlogin: AuthService,

  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modalAddress = this.navParams.data.paramTitle;
    this.modalTitle = this.navParams.data.paramID;
    this.modalPhone = this.navParams.data.modelPhone;


    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location);
      this.latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      const mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

    });
  }

  async closeModal() {
    this.appService.closeModal();
  }

  async makeApp(modalTitle, modalAddress, modalPhone) {
    this.appService.closeModal();
    const modal = await this.modalController.create({
      component: ContactPage,
      componentProps: {
        'paramID': modalTitle = this.navParams.data.paramTitle,
        'paramTitle': modalAddress = this.navParams.data.paramID,
        'paramNumber': modalPhone = this.navParams.data.modelPhone,
      },
      cssClass: 'Mymodal'
    });

    return await modal.present();

  }

  directionl() {
    // let options: LaunchNavigatorOptions = {
    //   start: '' + this.latLng,
    //   app: LaunchNavigator.APPS
    // };
    // this.launchNavigator.navigate('' + this.modalAddress, options)
    //   .then(
    //     success => console.log('Launched navigator'),
    //     error => console.log('Error launching navigator', error)
    //   );
  }

  stats() {
    this.appService.closeModal();

    this.router.navigateByUrl('/statistics/' + this.modalTitle + '/' + this.modalAddress);
    // return  this.router.navigateByUrl('/statistics');
  }

  login() {
    this.appService.closeModal();
    this.router.navigateByUrl('/login');
  }

}