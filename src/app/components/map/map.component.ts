import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { MapStyles } from '../../../google-maps-style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map: google.maps.Map

  constructor() { }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyCCGkw6KXi5L0zABcEk00I3al4YqrO2sco'
    })

    loader.load().then(() => {
      console.log('loaded map')
      const location = { lat: -30.5595, lng: 22.9375 }
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 6,
        minZoom: 6,
        styles: MapStyles[0],
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      })
    })
  }

}
