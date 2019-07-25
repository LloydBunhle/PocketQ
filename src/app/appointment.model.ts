import { Branch } from './branch.model';
import { User } from './user.model';

export class Appointment {

    currentTime: string;
    appointmentTime: string;
    appointmentExpiryTime: string;
    appointmentActiveTime: string;
    AppointmentActiveState: boolean;
    appointmentRef: string;
    branch: Branch;
    user: User;
    quePosition: string;
    appointmentid: any;
}