import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADSBExchangeAircraft } from 'src/app/models/ADSBExchangeAircraft.model';
import { ADSBExchangeResponse } from 'src/app/models/ADSBExchangeResponse.model';

export interface CalculateRadiusParams {
  leftCoords: {
    lat: number
    long: number
  }
  rightCoords: {
    lat: number
    long: number
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdsbServiceService {

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
   * Calculates the distance (in Km) between two coordinates and the resulting radius (in NM) to search
   * using Haversine formula
   * @param coords the coordinate pairs to calculate the distance between
   */
  calculateRadiusToSearch(coords: CalculateRadiusParams): string {
    //1. find the distance between the two coordinates
    const leftLatRadians = coords.leftCoords.lat / (180 / Math.PI)
    const leftLongRadians = coords.leftCoords.long / (180 / Math.PI)
    const rightLatRadians = coords.rightCoords.lat / (180 / Math.PI)
    const rightLongRadians = coords.rightCoords.long / (180 / Math.PI)

    const earthRadiusInKm = 6378

    const distanceInKm = earthRadiusInKm * Math.acos((Math.sin(leftLatRadians) * Math.sin(rightLatRadians)) +
      Math.cos(leftLatRadians) * Math.cos(rightLatRadians) * Math.cos(rightLongRadians - leftLongRadians))

    //2. convert to Nautical Miles
    let distanceInNm = distanceInKm * 0.539957

    //3. add 30% buffer to the distance
    distanceInNm = distanceInNm * (1.3)
    //4. return distance over 2 for the radius
    return (distanceInNm / 2).toFixed(0)
  }

  loadMockAircraft() {
    return this.http.get<ADSBExchangeAircraft[]>('assets/data/mockAircraft.json')
  }

}
