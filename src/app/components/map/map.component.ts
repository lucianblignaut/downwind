import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { LatLngBounds, LatLngLiteral, LayerGroup } from 'leaflet';
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
  public mapCenter$ = this.store.select(fromMap.selectMapCenter)
  public mapBounds$ = this.store.select(fromMap.selectMapBounds)

  //the airport markers layerGroup
  private airportMarkers: LayerGroup<any> = L.layerGroup()
  //the last known largest bounds of the map
  private largestMapBounds !: LatLngBounds

  private _initMap(successCallback: () => void): void {
    this.adsb.loadCenter().subscribe((center) => {
      const map = L.map('map', { preferCanvas: true, zoomControl: false })
      //assign to local reference for later use
      this._leafletMap = map
      //event handlers for leaflet
      this._leafletEventHandlers()
      //set the initial view
      this._leafletMap.setView([center.lat, center.lng], 8);
      //add the tile layer
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
      //subscribe to airports from store
      this._listenForAirports()
      //subscribe to map bounds from store
      this._listenForBounds()
      //once map is instantiated, fetch the airports
      this._dispatchLoadAirports(true)
    })
  }

  /**
   * Dispatch an action to load airports from the store
   */
  private _dispatchLoadAirports(initial: boolean): void {
    //before reaching out to the server, first determine if 
    //the view has moved out of the previous request's bounds
    //to save resources and API requests
    const center = { lat: this._leafletMap.getCenter().lat, lng: this._leafletMap.getCenter().lng }
    const corner = { lat: this._leafletMap.getBounds().getNorthWest().lat, lng: this._leafletMap.getBounds().getNorthWest().lng }
    if (this._leafletMap.getZoom() >= 7 && initial) {
      this.store.dispatch(MapActions.loadAirports({ radius: this.adsb.calculateRadiusToSearch({ center, corner }, Units.KM), center }))
    } else if (this._leafletMap.getZoom() >= 7 && !initial && this.largestMapBounds) {
      if (this._hasLeftBounds(this.largestMapBounds, this._leafletMap.getBounds()).amount > 0) {
        this.store.dispatch(MapActions.loadAirports({ radius: this.adsb.calculateRadiusToSearch({ center, corner }, Units.KM), center }))
      }
    }
  }

  /**
   * Initialise event listeners on the leaflet map for user events
   */
  private _leafletEventHandlers(): void {
    //drag events
    this._leafletMap.on('dragend', () => {
      this._getMapCoords()
      this._dispatchLoadAirports(false)
    })
    //load event
    this._leafletMap.on('load', () => {
      this._getMapCoords()
    })
    //zoom events
    this._leafletMap.on('zoomend', () => {
      if (this._leafletMap.getZoom() <= 6) {
        this._leafletMap.removeLayer(this.airportMarkers);
      } else {
        this._leafletMap.addLayer(this.airportMarkers)
      }
      this._getMapCoords()
      this._dispatchLoadAirports(false)
    })
  }

  /**
   * Subscribe to map bounds observable in the store
   */
  private _listenForBounds(): void {
    this.mapBounds$.subscribe(bounds => {
      //initialize to always be the last bounds on initial load
      if (!this.largestMapBounds) this.largestMapBounds = bounds
      //when all 4 points have moved out of the previous largest bounds, update 
      //the largest bounds to the newly received bounds
      if (this._hasLeftBounds(this.largestMapBounds, bounds).amount === 4) {
        this.largestMapBounds = bounds
      }
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
              size: [28, 28],     //image size ( default [40, 40] )
              rotate: 0,         //image base rotate ( default 0 )
              offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
            },
          }).on('click', (e) => {
            console.log('clicked', airport);
          })
        )
      })
      //finally add the layerGroup to the map
      this._leafletMap.addLayer(this.airportMarkers)
    })
  }

  /**
   * Dispatch an action to load the map viewport bounds
   */
  private _dispatchMapBounds(): void {
    this.store.dispatch(MapActions.loadBounds({ bounds: this._leafletMap.getBounds() }))
  }

  /**
   * Dispatch an action to load the map center coordinates
   */
  private _dispatchMapCenter(): void {
    this.store.dispatch(MapActions.loadCenter({ mapCenter: this._leafletMap.getCenter() }))
  }

  /**
   * Helper method
   */
  private _getMapCoords(): void {
    this._dispatchMapBounds()
    this._dispatchMapCenter()
  }

  /**
   * Used to determine whether the viewport bounds have left the previous
   * largest bounding box, therefore giving us a signal to fetch new data
   * to populate the map
   * @param lastBounds 
   * @param currentBounds 
   * @returns 
   */
  private _hasLeftBounds(lastBounds: LatLngBounds, currentBounds: LatLngBounds): { result: boolean, amount: number } {
    let coords = {
      1: currentBounds.getSouthWest(), 2: currentBounds.getNorthEast(),
      3: currentBounds.getNorthWest(), 4: currentBounds.getSouthEast()
    }
    let oldSw = lastBounds.getSouthWest()
    let oldNe = lastBounds.getNorthEast()

    let pointsOut = []

    for (let index = 1; index <= 4; index++) {
      if (!this._inBounds({ lat: oldSw.lat, lng: oldSw.lng },
        { lat: oldNe.lat, lng: oldNe.lng }, { lat: coords[`${index}`].lat, lng: coords[`${index}`].lng })) {
        pointsOut.push(coords[`${index}`])
      }
    }

    return { result: pointsOut.length > 0, amount: pointsOut.length }
  }

  /**
   * Used to determine whether a given point is in a given lat/long box
   * @param bottomLeft 
   * @param topRight 
   * @param point 
   * @returns {boolean}
   */
  private _inBounds(bottomLeft: LatLngLiteral, topRight: LatLngLiteral, point: LatLngLiteral): boolean {
    let isLongInRange = point.lng >= bottomLeft.lng && point.lng <= topRight.lng
    let isLatInRange = point.lat >= bottomLeft.lat && point.lat <= topRight.lat
    return isLatInRange && isLongInRange
  }

  ngAfterViewInit(): void {
  }
}


