import { Platform, ToastController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Geocoder,
  Marker,
  GeocoderResult,
  GoogleMapsAnimation,
  LocationService,
  MyLocation,
  LatLng,
  Spherical
} from "@ionic-native/google-maps";

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.page.html',
  styleUrls: ['./map-viewer.page.scss'],
})
export class MapViewerPage implements OnInit {

  map: GoogleMap;
  loading: any;
  persLocation: LatLng;
  constructor(private platform: Platform,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) { }

  async ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    
    await this.platform.ready();
    
    LocationService.getMyLocation().then((myLocation: MyLocation)=>{
      const options: GoogleMapOptions = {
        camera: {
          target: myLocation.latLng
        },
        zoom: 20,
        //tilt: 30
      }
      this.persLocation = myLocation.latLng;
      this.loadMap(options);
    });
  }

  loadMap(options: GoogleMapOptions) {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.persLocation.lat,
          lng: this.persLocation.lng
        },
        zoom: 17,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);
   
    let marker: Marker = this.map.addMarkerSync({
      title: 'Alberto',
      //icon: 'assets/imgs/AMarkerMini.png',
      animation: 'DROP',
      position: this.persLocation
    });
  }

  async onButtonClick(){
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: 'Loading'
    });
    await this.loading.present();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      this.loading.dismiss();
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });

      // add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: '@ionic-native/google-maps plugin!',
        snippet: 'This plugin is awesome!',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      // show the infoWindow
      marker.showInfoWindow();

      // If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });
    })
    .catch(err => {
      this.loading.dismiss();
      this.showToast(err.error_message);
    });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }

}
