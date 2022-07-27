import { HttpErrorResponse } from '@angular/common/http'
import { createAction, props } from '@ngrx/store'
import { ADSBExchangeAircraft } from 'src/app/models/ADSBExchangeAircraft.model'

//all map user interactions that trigger state changes
export const enter = createAction("[MAP] Entered")
export const pan = createAction("[MAP] Panned Map", props<{ mapCentre: { lat: number, lng: number } }>())
export const selectAircraft = createAction("[MAP] Select Aircraft", props<{ aircraft: ADSBExchangeAircraft }>())
export const deselectAircraft = createAction("[MAP] Deselect Aircraft")
export const loadCenter = createAction("[MAP] Load Center", props<{ mapCenter: { lat: number, lng: number } }>())

//api actions relating to map state
export const aircraftLoadedSuccess = createAction("[ADSB Service] Load Aircraft Success",
    props<{ aircraft: ADSBExchangeAircraft[] }>())
export const aircraftLoadedFailure = createAction("[ADSB Service] Load Aircraft Failure",
    props<{ httpError: HttpErrorResponse }>())
