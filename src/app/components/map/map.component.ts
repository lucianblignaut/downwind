import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { AdsbService } from 'src/app/services/adsb-exchange/adsb-service.service';

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
  constructor(private store: Store, private adsb: AdsbService) { }

  private windyMap: any;

  private initMap(): void {
    this.adsb.loadCenter().subscribe((center) => {
      const map = L.map('map', { preferCanvas: true, zoomControl: false }).setView([center.lat, center.lng], 8);
      L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }).addTo(map);
    })
  }

  ngOnInit(): void {
    this.initMap()
  }
  ngAfterViewInit(): void {
  }
}


