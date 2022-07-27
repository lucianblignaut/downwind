import { ADSBExchangeAircraft } from "src/app/models/ADSBExchangeAircraft.model";
import { createReducer, on } from '@ngrx/store'
import { HttpErrorResponse } from "@angular/common/http";
import * as MapActions from './map.actions'


export interface MapState {
    aircraft: ADSBExchangeAircraft[],
    activeAircraft: ADSBExchangeAircraft | null,
    aircraftLoading: boolean,
    mapCenter: { lat: number, lng: number } | null,
    adsbApiError: HttpErrorResponse
}

//helper functions
const loadAircraft = (state: MapState, aircraft: ADSBExchangeAircraft[]) => {
    return {
        ...state,
        aircraft: [...state.aircraft, ...aircraft],
        aircraftLoading: false
    }
}

const initState: MapState = {
    aircraft: [],
    activeAircraft: null,
    aircraftLoading: false,
    mapCenter: null,
    adsbApiError: null
}

export const reducer = createReducer(
    initState,
    on(MapActions.enter, (state, action) => ({ ...state, aircraftLoading: true })),
    on(MapActions.deselectAircraft, (state) => ({ ...state, activeAircraft: null })),
    on(MapActions.loadCenter, (state, action) => ({ ...state, mapCenter: action.mapCenter })),
    on(MapActions.selectAircraft, (state, action) => ({ ...state, activeAircraft: action.aircraft })),
    on(MapActions.pan, (state, action) => ({ ...state, mapCenter: action.mapCentre })),
    on(MapActions.aircraftLoadedSuccess, (state, action) => loadAircraft(state, action.aircraft)),
    on(MapActions.aircraftLoadedFailure, (state, action) => ({ ...state, adsbApiError: action.httpError, aircraftLoading: false }))
)

//local reducer state selectors
export const aircraft = (state: MapState) => state.aircraft
export const activeAircraft = (state: MapState) => state.activeAircraft
export const aircraftLoading = (state: MapState) => state.aircraftLoading
export const mapCenter = (state: MapState) => state.mapCenter
export const apiError = (state: MapState) => state.adsbApiError