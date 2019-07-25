import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { BookingModelPage } from '../booking-model/booking-model.page';
import { AppService } from '../app.service';


declare var google;
let map: any;
let infowindow: any;
const options = {
 enableHighAccuracy: true,
 maximumAge: 0
};


@Component({
 selector: 'app-maps',
 templateUrl: './maps.page.html',
 styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  constructor(
   public toastController: ToastController,
   public modalController: ModalController,
   private m: NgZone,
   public platform: Platform,
   private appService: AppService) {
  // this.generatefilterData();
  this.initMap();
  this.details = this.filterData;


 }
  details = [];
  filterData = [];
  data: any;

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('search') public searchElement: ElementRef;
  names: string;
  section: string;
  searchTerm: any = '';

  public onSearch = false;
  searchBox: any;
  autocomplete: any;


  isType: any = '';
  latLng: any;
  isSearchbarOpened: string;
  queryText: any;
  iteams: any[];
  FilterData: [];
  Data: string[];
  topics: any[];
  setObj: Object;

  ngOnInit() {
  this.platform.ready().then(() => {
    this.initMap();
    this.section = 'map';
  });
  }

 // initialising the map
  initMap() {
    navigator.geolocation.getCurrentPosition((location) => {
      // console.log(location);
      this.latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
      const mapOptions = {
        center: this.latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      infowindow = new google.maps.InfoWindow();

      // creating a service for filtering
      const service = new google.maps.places.PlacesService(map);

      const request = {
        location: this.latLng,
        radius: 400,
        keyword: ['absa'],
        type: ['bank']
      };
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            this.createMarker(results[i]);
            this.addMarker(map);


            // this.mapSearch(results[i]);
          }
        }
      });
    }, (error) => {
      // console.log(error);
    }, options);

  }

 // creating marker for every places located
  createMarker(places) {

    this.latLng = places.geometry.location;
    const marker = new google.maps.Marker({
      map,
      position: this.latLng,
      icon: { url: '../assets/logo.png', scaledSize: new google.maps.Size(40, 35) }
    });
    // getting the details of a selected location


    google.maps.event.addListener(marker, 'click', () => {

      infowindow.setContent(
        // tslint:disable-next-line:max-line-length
        '<div><strong>' + places.name + '</strong><br>' + places.vicinity + '<br>' + places.formatted_phone_number + '</div>'
      );
      this.presentModal(title, address, phoneNumber);
      infowindow.open(map, marker);
    });

    // parsing data to array
    let title, address, phoneNumber;
    title = places.name;
    address = places.vicinity;
    phoneNumber = places.formatted_phone_number;

    const join = {
      title,
      address
    };

    this.details.push(join);
  }
 // putting the users marker
 // tslint:disable-next-line:no-shadowed-variable
  addMarker(map: any) {

    const marker = new google.maps.Marker({
      map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter()
    });

  }

 // parsing place title and address to a modal
  async presentModal(title, address, phoneNumber) {

    const modal = await this.modalController.create({
      component: BookingModelPage,
      componentProps: {
        paramID: title,
        paramTitle: address,
        paramNumber: phoneNumber
      }
    });
    this.section = 'map';
    return await modal.present();
  }
  
setFilteredLocations() {
  this.details  = this.filterData.filter((location) => {
    return location.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
  });
}

}
