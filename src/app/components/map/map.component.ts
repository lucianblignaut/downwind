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

    const map = L.map('map', { preferCanvas: true, zoomControl: false }).setView([51.505, -0.09], 13);
    L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

    console.log(L);
    for (var i = 0; i < 10000; i++) {
      let marker = L.canvasMarker([58.5578 + Math.random() * 1.8, 29.0087 + Math.random() * 3.6], {
        radius: 20,
        img: {
          url: 'assets/images/iconmonstr-github-1.svg',    //image link
          size: [20, 20],     //image size ( default [40, 40] )
          rotate: Math.random() * 90 + Math.random() * 20,         //image base rotate ( default 0 )
          offset: { x: 0, y: 0 }, //image offset ( default { x: 0, y: 0 } )
        },
      }).addTo(map)
    }
    // windyInit({ key: environment.WINDY_API_KEY, verbose: true }, (windyAPI: any) => {
    //   //-33.91, 18.42
    //   for (let index = 0; index < 100; index++) {
    //     // const element = array[index];
    //     // let marker = L.marker([-33.91, 18.42]).addTo(windyAPI.map)
    //     // var popup = L.popup()
    //     //   .setLatLng([-33.91, 18.42])
    //     //   .setContent('<p>Hello world!<br />This is a nice popup.</p>')
    //     //   .openOn(windyAPI.map);

    //   }
    //   this.map = windyAPI.map
    // });
  }

  ngOnInit(): void {
    // this.store.dispatch(MapActions.enter())
    // this.store.select(fromMapState.selectAircraftLoading).subscribe(il => this.isAircraftLoading = il)
  }
  ngAfterViewInit(): void {
    this.initMap()
  }
}


