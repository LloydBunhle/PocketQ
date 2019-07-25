import { Component, OnInit, ViewChild , } from '@angular/core';

import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { CookieService,  } from 'angular2-cookie/core';
import { Observable } from 'rxjs';
import { NavController, ToastController } from '@ionic/angular';


@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.page.html',
    styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {
    data: Observable<any[]>;
   // public barChart = [];
    modelAddress: any;
    modalTitle: any;
    stats = [];
    // const arr: Array<{id: number, text: string}> = [... ] ;

    hour = [
        {value: 1, name: '8:30am'},
        {value: 1, name: '10:30am'},
        {value: 1, name: '12:30am'},
        {value: 1, name: '14:30am'},
        {value: 1, name: '15:30am'},
        // {value: 1, name: '13:00pm'},
        // {value: 1, name: '14:00ppm'},
        // {value: 1, name: '15:00pm'},
        // {value: 1, name: '16:00pm'},
    ];
    @ViewChild('valueBarsCanvas') valueBarsCanvas;
    valueBarsChart: any;
    days: any[][];
    chartData = null;
    name: any;
    filterweekdayshwise: String;



       // Bar chart:
       public barChart = new Chart('barChart');


    constructor(
        private actRoute: ActivatedRoute,
        public afAuth: AngularFireAuth,
        private appService: AppService,
        private router: Router,
        private cookieService: CookieService,
        public navCtrl: NavController,
        private toastCtrl: ToastController
        // private navParams: NavParams,
        // private modalController: ModalController
        ) {

        }

    ngOnInit() {
        this. theChart() ;
        // details for a chosen location
        this.modalTitle = this.actRoute.snapshot.params.title;
        this.modelAddress = this.actRoute.snapshot.params.address;

        // this.modalTitle = this.appService.branchInfo.branchName;
        // this.modelAddress = this.appService.branchInfo.branchName;


        this.appService.getStatistics(
            // this.cookieService.get('branchid')
            '10').subscribe(data => {
                this.stats = data;
                this.days = this.stats;
                console.log(this.stats);
        });

        // console.log(this.cookieService.get('branchid'));
    }

    theChart() {
        // Bar chart:
        this.barChart = new Chart('barChart', {
            type: 'line',
            data: {
                labels:  Object.keys(this.hour).map(a => this.hour[a].name),
                datasets: [{
                    label: '# 1',
                    data: [],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                        '#000000',
                        '#000000',
                        '#000000',
                        '#000000',
                        '#000000',
                        '#000000',
                        '#000000',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    text: '',
                    display: true
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    login() {
        this.appService.closeModal();
        this.router.navigateByUrl('/login');
    }

    async callBookingPage() {

        this.router.navigateByUrl('/contact/' + this. modalTitle + '/' + this.modelAddress);
    }
    weekfilter(filterweekwise) {
        // for (var i in this.days){
        //   if(this.days[i][0]===dayname){
        //    console.log(this.days[i][0]);
        //    return dayArr[1];


        // console.log(filterweekwise) ; // show nothing
        // }
        let e: any ;
        this.days.forEach( element => {

            if ( element[0] === filterweekwise ) {

               e = element ;
            } else {

             }
        });

        this.barChart.data.datasets[0].data = [];
        for ( let x = 1 ; x < e.length ; x++ ) {

            this.barChart.data.datasets[0].data.push(e[x]) ;
            this.barChart.update() ;

        }
        console.log(this.barChart.data.datasets[0]);
    }
}