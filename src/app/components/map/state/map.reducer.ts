import { ADSBExchangeAircraft } from "src/app/models/ADSBExchangeAircraft.model";
import { createReducer, on } from '@ngrx/store'
import { HttpErrorResponse } from "@angular/common/http";
import * as MapActions from './map.actions'
import { LatLngLiteral, LatLngBounds } from "leaflet";
import { ADSBExchangeAirport } from "src/app/models/airportDataResponse.model";
import * as _ from 'lodash'

export interface MapState {
    aircraft: ADSBExchangeAircraft[],
    airports: ADSBExchangeAirport[]
    activeAircraft: ADSBExchangeAircraft | null,
    activeAirport: ADSBExchangeAirport | null
    aircraftLoading: boolean,
    airportsLoading: boolean,
    mapCenter: LatLngLiteral | null,
    mapBounds: LatLngBounds | null,
    adsbApiError: HttpErrorResponse
}

//helper functions
const loadAircraft = (state: MapState, aircraft: ADSBExchangeAircraft[]) => {
    return {
        ...state,
        aircraft: aircraft.filter(x => state.aircraft.indexOf(x) === -1),
        aircraftLoading: false
    }
}
const loadAirports = (state: MapState, airports: ADSBExchangeAirport[]) => {
    return {
        ...state,
        airports: _.uniqWith([...state.airports, ...airports], _.isEqual),
        airportsLoading: false
    }
}

const initState: MapState = {
    aircraft: [],
    airports: [],
    activeAircraft: null,
    aircraftLoading: false,
    mapCenter: null,
    mapBounds: null,
    adsbApiError: null,
    activeAirport: null,
    airportsLoading: false
}

export const reducer = createReducer(
    initState,
    on(MapActions.enter, (state) => ({ ...state, aircraftLoading: true, airportsLoading: true })),
    on(MapActions.deselectAircraft, (state) => ({ ...state, activeAircraft: null })),
    on(MapActions.deselectAirport, (state => ({ ...state, activeAirport: null }))),
    on(MapActions.loadCenter, (state, action) => ({ ...state, mapCenter: action.mapCenter })),
    on(MapActions.loadAirports, (state, action) => ({ ...state, airportsLoading: true })),
    on(MapActions.selectAircraft, (state, action) => ({ ...state, activeAircraft: action.aircraft })),
    on(MapActions.selectAirport, (state, action) => ({ ...state, activeAirport: action.airport })),
    on(MapActions.pan, (state, action) => ({ ...state, mapCenter: action.mapCentre })),
    on(MapActions.aircraftLoadedSuccess, (state, action) => loadAircraft(state, action.aircraft)),
    on(MapActions.aircraftLoadedFailure, (state, action) => ({ ...state, adsbApiError: action.httpError, aircraftLoading: false })),
    on(MapActions.airportsLoadedSuccess, (state, action) => loadAirports(state, action.airports)),
    on(MapActions.airportsLoadedFailure, (state, action) => ({ ...state, adsbApiError: action.httpError, airportsLoading: false })),
    on(MapActions.loadBounds, (state, action) => ({ ...state, mapBounds: action.bounds }))
)

//local reducer state selectors
export const aircraft = (state: MapState) => state.aircraft
export const airports = (state: MapState) => state.airports
export const activeAirport = (state: MapState) => state.activeAirport
export const activeAircraft = (state: MapState) => state.activeAircraft
export const aircraftLoading = (state: MapState) => state.aircraftLoading
export const airportsLoading = (state: MapState) => state.airportsLoading
export const mapCenter = (state: MapState) => state.mapCenter
export const mapBounds = (state: MapState) => state.mapBounds
export const apiError = (state: MapState) => state.adsbApiError