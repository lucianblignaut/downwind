import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { AdsbService } from 'src/app/services/adsb-exchange/adsb-service.service';
import { BreakpointService } from 'src/app/services/breakpoint/breakpoint.service';
import * as L from 'leaflet'
//the windyInit function used by the Windy API to setup the leaflet map
declare function windyInit(options, callback): void;

const leafletTileset: string = 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(private store: Store, private adsb: AdsbService, private observer: BreakpointService) { }

  private _leafletMap: L.Map
  private _windyMap: any;

  public isHandset$ = this.observer.handset$

  private _initMap(successCallback: () => void): void {
    this.adsb.loadCenter().subscribe((center) => {
      const map = L.map('map', { preferCanvas: true, zoomControl: false }).setView([center.lat, center.lng], 8);
      //assign to local reference for later use
      this._leafletMap = map
      L.tileLayer(leafletTileset, {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }).addTo(map);
      //bind the component this to the callback function and execute it
      successCallback.bind(this)()
    })
  }

  ngOnInit(): void {
    this._initMap(() => {
      console.log('map initialized');
    })
  }
  ngAfterViewInit(): void {
  }
}


