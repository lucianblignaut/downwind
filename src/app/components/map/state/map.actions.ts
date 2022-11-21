import { HttpErrorResponse } from '@angular/common/http'
import { createAction, props } from '@ngrx/store'
import { ADSBExchangeAircraft } from 'src/app/models/ADSBExchangeAircraft.model'
import { LatLngBounds, LatLngLiteral } from 'leaflet'
import { ADSBExchangeAirport } from 'src/app/models/airportDataResponse.model'

//all map user interactions that trigger state changes
export const enter = createAction("[MAP] Entered")
export const pan = createAction("[MAP] Panned Map", props<{ mapCentre: LatLngLiteral, neCorner: LatLngLiteral }>())
export const selectAircraft = createAction("[MAP] Select Aircraft", props<{ aircraft: ADSBExchangeAircraft }>())
export const selectAirport = createAction("[MAP] Select Airport", props<{ airport: ADSBExchangeAirport }>())
export const deselectAircraft = createAction("[MAP] Deselect Aircraft")
export const deselectAirport = createAction("[MAP] Deselect Airport")
export const loadCenter = createAction("[MAP] Load Center", props<{ mapCenter: LatLngLiteral }>())
export const loadBounds = createAction("[MAP] Load Map Bounds", props<{ bounds: LatLngBounds }>())
export const loadAirports = createAction("[MAP] Load Airports", props<{ radius: number, center: LatLngLiteral }>())

//api actions relating to map state
export const aircraftLoadedSuccess = createAction("[ADSB Service] Load Aircraft Success",
    props<{ aircraft: ADSBExchangeAircraft[] }>())
export const aircraftLoadedFailure = createAction("[ADSB Service] Load Aircraft Failure",
    props<{ httpError: HttpErrorResponse }>())
export const airportsLoadedSuccess = createAction("[ADSB Service] Load Airports Success",
    props<{ airports: ADSBExchangeAirport[] }>())
export const airportsLoadedFailure = createAction("[ADSB Service] Load Airports Failure",
    props<{ httpError: HttpErrorResponse }>())
