import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { AdsbService } from "src/app/services/adsb-exchange/adsb-service.service";
import * as MapActions from './map.actions'

@Injectable()
export class MapEffects {
    constructor(private actions$: Actions, private adsb: AdsbService) { }

    $loadAircraft = createEffect(() => {
        return this.actions$.pipe(ofType(MapActions.enter), mergeMap(() => {
            return this.adsb.loadMockAircraft().pipe(map((ac) => MapActions.aircraftLoadedSuccess({ aircraft: ac })));
        }));
    })

    $loadAirports = createEffect(() => {
        return this.actions$.pipe(ofType(MapActions.loadAirports), mergeMap((action) => {
            return this.adsb.getAirportsWithin(action.radius, action.center).pipe(map(airports => MapActions.airportsLoadedSuccess({ airports })))
        }));
    })

    $loadCenter = createEffect(() => {
        return this.actions$.pipe(ofType(MapActions.enter), mergeMap(() => {
            return this.adsb.loadCenter().pipe(map(center => MapActions.loadCenter({ mapCenter: center })))
        }))
    })

}