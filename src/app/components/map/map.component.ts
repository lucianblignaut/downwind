import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store'
import { environment } from 'src/environments/environment';

//the windyInit function used by the Windy API to setup the leaflet map
declare function windyInit(options, callback): void;
//assuming that an import to leaflet exists already to avoid type errors
declare let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(private store: Store) { }

  private map: any;

  private initMap(): void {
    windyInit({ key: environment.WINDY_API_KEY, verbose: true }, (windyAPI: any) => {
      this.map = windyAPI.map
    });
  }

  ngOnInit(): void {
    // this.store.dispatch(MapActions.enter())
    // this.store.select(fromMapState.selectAircraftLoading).subscribe(il => this.isAircraftLoading = il)
  }
  ngAfterViewInit(): void {
    this.initMap()
  }
}


