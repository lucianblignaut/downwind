import { Component, OnInit, ViewChild } from '@angular/core';
import { ADSBExchangeAircraft } from 'src/app/models/ADSBExchangeAircraft.model';
import { Store } from '@ngrx/store'
import * as MapActions from './state/map.actions'
import * as fromMapState from './state/map.state'
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('map') map: google.maps.Map
  aircraft$: Observable<ADSBExchangeAircraft[]> = this.store.select(fromMapState.selectAircraft)
  center$: Observable<google.maps.LatLngLiteral> = this.store.select(fromMapState.selectMapCenter)
  isAircraftLoading: boolean

  //options for the Maps API
  options: google.maps.MapOptions = {
    zoom: 5,
    zoomControl: false,
    disableDefaultUI: true,
    minZoom: 4,
  }

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(MapActions.enter())
    this.store.select(fromMapState.selectAircraftLoading).subscribe(il => this.isAircraftLoading = il)
  }

  onTilesLoaded() {
    this.dispatchLoadBounds()
  }

  onMarkerClick(ac) {
    this.store.dispatch(MapActions.selectAircraft({ aircraft: ac }))
  }

  onMapClick() {
    //deselect aircraft if one has been selected already
    this.store.select(fromMapState.selectActiveAircraft).pipe(take(1)).subscribe(aircraft => {
      if (aircraft) {
        this.store.dispatch(MapActions.deselectAircraft())
      }
    })
  }

  onDragEnd() {
    this.dispatchLoadCenter()
    this.dispatchLoadBounds()
  }

  dispatchLoadBounds() {
    const ne = this.map.getBounds()?.getNorthEast()
    const sw = this.map.getBounds()?.getSouthWest()

    this.store.dispatch(MapActions.loadBounds({
      bounds: {
        NE: { lat: ne.lat(), lng: ne.lng() },
        SW: { lat: sw.lat(), lng: sw.lng() }
      }
    }))
  }

  dispatchLoadCenter() {
    this.store.dispatch(MapActions.loadCenter({
      mapCenter: {
        lat: this.map.getCenter().lat(),
        lng: this.map.getCenter().lng()
      }
    }))
  }

}
