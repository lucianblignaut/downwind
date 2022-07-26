import { Component, OnInit } from '@angular/core';
import { MapStyles } from '../../../google-maps-style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  center: google.maps.LatLngLiteral = { lat: -28.6082440450656, lng: 24.345254527347915 }

  options: google.maps.MapOptions = {
    zoom: 5,
    center: this.center,
    zoomControl: false,
    disableDefaultUI: true,
    minZoom: 5,
  }

  constructor() { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

}
