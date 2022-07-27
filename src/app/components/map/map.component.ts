import { Component, OnInit } from '@angular/core';
import { ADSBExchangeAircraft } from 'src/app/models/ADSBExchangeAircraft.model';
import { AdsbService } from 'src/app/services/adsb-exchange/adsb-service.service';
import { MapStyles } from '../../../google-maps-style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  aircraft: ADSBExchangeAircraft[] = []

  center: google.maps.LatLngLiteral = { lat: -28.6082440450656, lng: 24.345254527347915 }

  options: google.maps.MapOptions = {
    zoom: 5,
    center: this.center,
    zoomControl: false,
    disableDefaultUI: true,
    minZoom: 4,
  }

  constructor(private adsb: AdsbService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })

    this.adsb.loadMockAircraft().subscribe(res => {
      this.aircraft = [...res]
      console.log(this.aircraft);
    })
  }

}
