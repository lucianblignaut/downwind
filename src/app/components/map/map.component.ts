import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { LayerGroup } from 'leaflet';
import { AdsbService, Units } from 'src/app/services/adsb-exchange/adsb-service.service';
import { BreakpointService } from 'src/app/services/breakpoint/breakpoint.service';
import * as MapActions from './state/map.actions'
import * as fromMap from './state/map.state'
// import * as L from 'leaflet'
declare let L: any
//the windyInit function used by the Windy API to setup the leaflet map
declare function windyInit(options, callback): void;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(private store: Store, private adsb: AdsbService, private observer: BreakpointService) { }
  //the leaflet map instance
  private _leafletMap: L.Map
  private _windyMap: any;

  //observables
  public isHandset$ = this.observer.handset$
  public airports$ = this.store.select(fromMap.selectAirports)

  //the airport markers layerGroup
  private airportMarkers: LayerGroup<any> = L.layerGroup()

  private _initMap(successCallback: () => void): void {
    this.adsb.loadCenter().subscribe((center) => {
      const map = L.map('map', { preferCanvas: true, zoomControl: false }).setView([center.lat, center.lng], 8);
      //assign to local reference for later use
      this._leafletMap = map
      L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }).addTo(this._leafletMap);
      //bind the component this to the callback function and execute it
      successCallback.bind(this)()
    })
  }

  ngOnInit(): void {
    this._initMap(() => {
      console.log('map initialized');
      //once map is instantiated, fetch the airports
      this._dispatchLoadAirports()
      //event handlers for leaflet
      this._leafletEventHandlers()
      //subscribe to airports from store
      this._listenForAirports()
    })
  }

  /**
   * Dispatch an action to load airports from the store
   */
  private _dispatchLoadAirports(): void {
    if (this._leafletMap.getZoom() >= 7) {
      const center = { lat: this._leafletMap.getCenter().lat, lng: this._leafletMap.getCenter().lng }
      const corner = { lat: this._leafletMap.getBounds().getNorthEast().lat, lng: this._leafletMap.getBounds().getNorthEast().lng }
      this.store.dispatch(MapActions.loadAirports({ radius: this.adsb.calculateRadiusToSearch({ center, corner }, Units.KM), center }))
    }
  }

  /**
   * Initialise event listeners on the leaflet map for user events
   */
  private _leafletEventHandlers(): void {
    this._leafletMap.on('dragend', () => {
      this._dispatchLoadAirports()
    })
    this._leafletMap.on('zoomend', () => {
      if (this._leafletMap.getZoom() <= 7) {
        this._leafletMap.removeLayer(this.airportMarkers);
      } else {
        this._leafletMap.addLayer(this.airportMarkers)
      }
      this._dispatchLoadAirports()
    })
  }

  /**
   * Subscribe to the airports observable from the store
   */
  private _listenForAirports(): void {
    this.airports$.subscribe(airports => {
      //clear the layergroup for redrawing
      if (this._leafletMap.hasLayer(this.airportMarkers)) {
        this._leafletMap.removeLayer(this.airportMarkers);
        this.airportMarkers.clearLayers();
      }
      //iterate through the airports and draw a marker in its position
      airports.forEach(airport => {
        this.airportMarkers.addLayer(
          L.canvasMarker(L.latLng(airport.latitude, airport.longitude), {
            radius: 20,
            img: {
              url: 'assets/images/location2.png',    //image link
              size: [25, 25],     //image size ( default [40, 40] )
              rotate: 0,         //image base rotate ( default 0 )
              offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
            },
          })
        )
      })
      //finally add the layerGroup to the map
      this._leafletMap.addLayer(this.airportMarkers)
    })
  }

  ngAfterViewInit(): void {
  }
}


