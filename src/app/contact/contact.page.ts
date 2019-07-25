import { Component, OnInit } from '@angular/core';
import {  NavParams, Events } from '@ionic/angular';
import { Appointment } from '../appointment.model';
import { CookieService } from 'angular2-cookie/core';
import { AppService } from '../app.service';
import { Branch } from '../branch.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';





@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})

export class ContactPage implements OnInit {

  public appointmentDetails: Appointment;
  public appoTime: any;
  private hr: string;
  private min: string;
  private date: string;
  modelTitle: any;
  modelAddress: any;
  modelPhone: any;
  branch: Branch;
  appointment: Appointment;

  stoRef;
   // modelAddress: any;
    modalTitle: any;

  constructor(
    public storage: Storage,
    private navParams: NavParams,
    private cookieService: CookieService,
    private appService: AppService,
    private router: Router,
    private actRoute: ActivatedRoute,
    public events: Events ) { }

  ngOnInit(): void {
    this.modelAddress = this.navParams.data.paramTitle;
    this.modelTitle = this.navParams.data.paramID;
    this.modelPhone = this.navParams.data.modelPhone;

    const branchInfo = new Branch();
    branchInfo.branchAddress = this.modelTitle;
    branchInfo.branchName = this.modelAddress;
    branchInfo.openingTime = '08:00';
    branchInfo.closingTime = '17:00';

    // Pass logged in user to the springboot API
    this.appService.addBranch(branchInfo).subscribe(data => {
      this.branch = data;
      this.storage.set('branchid', this.branch.id);

      // this.cookieService.put('branchid', this.branch.id);
    });

  }

  // check if the has been made before,if not continue with appointment process

async makeAppointment(refNum) {

  this.storage.get('refNo').then((val) => {
    if (val) {
      this.appService.alertBlock(
        'Notification',
        '',
        'You recently made an appointment refNo :' + val,
        'OK'
      );
      this.appService.closeModal();
    } else {
      this.getAppointment();
    }
});

    // if ( this.getref) {
    //   refNum = this.getAppointment();

    // } else {
    //   this.appService.alertBlock(
    //     'Notification',
    //     '',
    //     'You recently made an appointment refNo :' + this.stoRef,
    //     'OK'
    //   );
    //   this.appService.closeModal();
    // }

  }

  // split datetime object into date and time
   timeSplit() {

      /* const time = this.appoTime;
      const time2 = time.toString();
      this.hr = time2.substr(11, 2);
      this.min = time2.substr(14, 2);
      const finalTime = (this.hr + this.min).toString();
      this.date = time2.substr(0, 10);
      return finalTime; */

    /** Datetime MMM DD, HH mm */
    const timex = this.appoTime.toString();
    const timey = timex.substr(0, 16);

    /** Time , HH mm */
    this.hr = timex.substr(11, 2);
    this.min = timex.substr(14, 2);

    /** date , MMM DD */
    this.date = timex.substr(0, 10);

    return timey;

  }

  // check the connection to the server, if not throw an error message
  async getAppointment() {
    console.log('READING');

    if (!this.appoTime) {
      this.timeNot();
    } else {
      try {
      this.appService.addAppointment( this.appService.user.id,
                                      this.branch.id,
                                      this.timeSplit(),
                                      ).subscribe( data => {
          this.appointmentDetails = data;
          this.presentAlert();
          console.log(this.appointmentDetails);

          this.appService.setAppointment(this.appointmentDetails);
           // store the refno in a cookie
          this.storage.set('refNo', this.appointmentDetails.appointmentRef);
          this.storage.set('appId', this.appointmentDetails.appointmentid);

          this.cookieService.put('refNo', this.appointmentDetails.appointmentRef);
          this.cookieService.put('appId', this.appointmentDetails.appointmentid);
          console.log(this.appoTime);
          });
      } catch (e) {
         console.log(e);
        // error message pop up
        // this.appService.alertBlock(
        //   'Error !',
        //   'Couldnt connect to server.',
        //   'Oops your connection seems OFF.',
        //   'OK'
        // );

      }
    }
   // show the refNo if theres no error
  }

  // pop up message that show the appointment refNo.
  async presentAlert() {

    this.appService.alertBlock('You have made an Appointment at',
    'Branch: ' + this.modelTitle,
    'Date: \b' + this.date + 'Time: \n\n' + (this.hr + ':' + this.min) + '\b ref: \n\n' + this.appointmentDetails.appointmentRef,
    'close'
    );
    this.router.navigateByUrl('tabs/tabs/home');
    this.appService.closeModal();

  }

  // error message for not selecting a time
  async timeNot() {
    this.appService.alertBlock(
      'Error !',
      'Time not selected.',
      'Select time to make appointment',
      'OK'
    );
  }

  closeModal() {
    this.appService.closeModal();
  }
}
