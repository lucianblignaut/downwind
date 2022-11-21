import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';
import { ADSBExchangeAircraft } from 'src/app/models/ADSBExchangeAircraft.model';
import { ADSBExchangeResponse } from 'src/app/models/ADSBExchangeResponse.model';
import { ADSBExchangeAirport } from 'src/app/models/airportDataResponse.model';

export interface CalculateRadiusParams {
  center: LatLngLiteral
  corner: LatLngLiteral
}

export enum Units {
  KM = 'km',
  NM = 'nm',
  MI = 'mi'
}

@Injectable({
  providedIn: 'root'
})
export class AdsbService {

  constructor(private http: HttpClient) { }
  /**
   * Loads all aircraft within a specified radius from the coordinates provided
   * @param lat latitude
   * @param long longitude
   * @param radius radius
   */
  loadFrom(lat: number, long: number, radius: string): Observable<ADSBExchangeResponse> {
    const endpoint = `https://adsbexchange-com1.p.rapidapi.com/v2/lat/${lat}/lon/${long}/dist/${radius}/`;
    const headers = new HttpHeaders()
      .set(
        'X-RapidAPI-Key',
        '631de2d043msh66c91cd60275f57p149956jsnb0fc2616d5be'
      )
      .set('X-RapidAPI-Host', 'adsbexchange-com1.p.rapidapi.com');
    const params = new HttpParams().set('lon', long).set('lat', lat)
    const options = {
      headers: headers,
      params: params
    }

    return this.http.get<ADSBExchangeResponse>(endpoint, options)
  }

  /**
   * Calculates the distance (in Km or Nm) between two coordinates and the resulting radius to search
    * using Haversine formula
   * @param coords 
   * @param unit 
   * @returns 
   */
  calculateRadiusToSearch(coords: CalculateRadiusParams, unit: Units.KM | Units.NM | Units.MI): number {
    // //1. find the distance between the two coordinates
    const leftLatRadians = coords.center.lat / (180 / Math.PI)
    const leftLongRadians = coords.center.lng / (180 / Math.PI)
    const rightLatRadians = coords.corner.lat / (180 / Math.PI)
    const rightLongRadians = coords.corner.lng / (180 / Math.PI)

    const earthRadiusInKm = 6378
    const distanceInKm = earthRadiusInKm * Math.acos((Math.sin(leftLatRadians) * Math.sin(rightLatRadians)) +
      Math.cos(leftLatRadians) * Math.cos(rightLatRadians) * Math.cos(rightLongRadians - leftLongRadians)) + 100

    if (unit === Units.NM) {
      // //2. convert to Nautical Miles
      let distanceInNm = distanceInKm * 0.539957
      return distanceInNm
    } else if (unit = Units.MI) {
      let distanceInMi = distanceInKm * 0.62
      return distanceInMi
    }
    return distanceInKm
  }

  /**
   * Used to get the location of the browser and detect where the map center is.
   * @returns center of the map in a latitude and longitude pair [lat, lng]
   */
  loadCenter(): Observable<{ lat: number, lng: number }> {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        observer.next(center)
        observer.complete()
      })
    })
  }

  loadMockAircraft() {
    return this.http.get<ADSBExchangeAircraft[]>('assets/data/mockAircraft.json')
  }

  /**
   * Get all airports within a specified radius in Km from a set of latitude/longitude pairs
   * @param radius 
   * @param coords 
   * @returns 
   */
  public getAirportsWithin(radius: number, coords: LatLngLiteral): Observable<ADSBExchangeAirport[]> {
    const endpoint = `https://aviation-reference-data.p.rapidapi.com/airports/search`;
    const params = new HttpParams().set("lat", coords.lat).set("lon", coords.lng).set("radius", radius.toFixed(0))
    const headers = new HttpHeaders()
      .set(
        'X-RapidAPI-Key',
        'f6eca72b2bmsh29a933c62b5d362p172e8cjsn525762457a67'
      )
      .set('X-RapidAPI-Host', 'aviation-reference-data.p.rapidapi.com');

    return this.http.get<ADSBExchangeAirport[]>(endpoint, { headers, params })
    // return this.http.get<ADSBExchangeAirport[]>('assets/data/mockAirports.json')
  }

}
