import { Injectable } from '@angular/core';
import { HttpClient  , HttpParams, HttpErrorResponse } from '@angular/common/http';
import { SERVER_URL } from './app.constants';
import { Observable, throwError } from 'rxjs';
import { User } from './user.model';
import { Branch } from './branch.model';
import { catchError } from 'rxjs/operators';
import { AlertController, ModalController } from '@ionic/angular';
import { Appointment } from './appointment.model';

@Injectable()
export class AppService {

    constructor(
        private http: HttpClient,
        public alertController: AlertController,
        private modalController: ModalController
        ) {}

        user: User;
        appointment: Appointment;


        setUser(userpbj: User) {
            this.user = userpbj;
        }

        setAppointment(appointment: Appointment) {
            this.appointment = appointment;
        }

    // ***User related***

    // Add to or get user from springboot API
    addUser(userinfo: User): Observable<any> {
        return this.http.post((SERVER_URL + 'user/addUser/'), userinfo).pipe(catchError(this.handleError));
    }

    // ***Appointment related***

    // Pass appointment details to springboot API
    addAppointment(uid: string, bid: string, appTime: string): Observable<any> {
       const param1 = new HttpParams()
        .set('UserId', uid)
        .set('BranchId', bid)
        .set('ParamBookingTime', appTime);

       return this.http.post((SERVER_URL + 'appointment/AddAppointments/?'), [], {
            params: param1
        }).pipe(catchError(this.handleError)) ;
    }

    // Cancel appointment
    cancelAppointment(AppoID: any, UserID): Observable<any> {
        const param = new HttpParams()
        .set('ParamAppointmentId', AppoID)
        .set('UserId', UserID);

        return this.http.delete(
            (SERVER_URL  + 'appointment/RemoveAppointments/?') , {
                params: param
            }).pipe(catchError(this.handleError));
    }

    // ***Branch related***
    // Add to or get branch from springboot API
    addBranch(branch: Branch): Observable<any> {
        return this.http.post((SERVER_URL + 'branch/addBranch/'), branch).pipe(catchError(this.handleError));
    }
    // ***Stats related***
    getStatistics(branchid: string): Observable<any> {
        const param = new HttpParams()
        .set('branchid', branchid);

        return this.http.post(
            (SERVER_URL + 'statistic/popularTimes/?'), [], {
            params: param
        }).pipe(catchError(this.handleError));
    }

    // Error handling
    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client side error', errorResponse.error.message);

        } else {
            console.error('Server side error. Status: ', errorResponse.status);
        }

        return throwError('There is a problem with the service. We are notified and are working on it');
    }

    async alertBlock(myHeader: any, mysubheader: any, myMmessage: any, buttonT: any) {
        const alert = await this.alertController.create({
            header: myHeader,
            subHeader: mysubheader,
            message: myMmessage,
            buttons: [buttonT]
          });
        await alert.present();
    }

    async closeModal() {
        const onClosedData = 'Wrapped Up!';
        await this.modalController.dismiss(onClosedData);
    }
}
