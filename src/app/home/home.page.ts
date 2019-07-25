import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  refno;
  returnData: any;
  deleteStatus: string;

  // public appointments: A;
  constructor(
    public storage: Storage,
    private menu: MenuController,
    private cookieService: CookieService,
    public alertController: AlertController,
    private router: Router,
    private appoService: AppService
    ) {
  }


  // toggle the menu when clicking the profile icon
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  // cancel the appointment pop up
  async cancel() {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'Are you sure you want to cancel your appointment ?',
      buttons: [
        {
          text: 'YES',
          role: 'cancel',
          handler: (blah) => {
            /* this.storage.remove('refNo').then((val) => {
              this.refno = val;
            }); */
            this.CancelApp();
           }
        }, {
          text: 'NO',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
});

    await alert.present();
  }

  // cancel appointment method
  CancelApp() {

    this.appoService.cancelAppointment(

      this.appoService.appointment.appointmentid,
      this.appoService.user.id,
      ).subscribe( data => {
      if (data === true) {

        this.ionViewWillEnter();
        console.log('Appointment cancelled');
        this.storage.remove('refNo').then((val) => {
          this.refno = val;

        });
      } else {
        console.log('Server: Something went wrong when cancelling');
      }
      // console.log(this.deleteStatus);

    });
  }

  ionViewWillEnter() {

    this.storage.get('refNo').then((val) => {
      this.refno = val;
    });

  //   setTimeout(() => {
  //     //call this method after 9 hours
  //     this.refno =  this.cookieService.remove('refId');
  //   }, 3000);
  }

  OpenMap() {
    
    this.router.navigateByUrl('tabs/tabs/maps');

  }

}
