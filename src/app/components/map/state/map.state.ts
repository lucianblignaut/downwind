import { NgModule } from "@angular/core";
import { StoreModule, ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromMap from './map.reducer'

const featureName = 'MapFeatureModule'

export interface MapFeatureState {
    map: fromMap.MapState
}

export const reducers: ActionReducerMap<MapFeatureState> = {
    map: fromMap.reducer
}
export const metaReducers: MetaReducer<MapFeatureState>[] = []

@NgModule({
    imports: [StoreModule.forFeature(featureName, reducers, { metaReducers })]
})
export class MapStateFeatureModule { }

//feature state selectors
const selectFeatureState = createFeatureSelector(featureName)
const selectMapState = createSelector(selectFeatureState, (state: MapFeatureState) => state.map)

//global store selectors called in components
export const selectAircraft = createSelector(selectMapState, fromMap.aircraft)
export const selectActiveAircraft = createSelector(selectMapState, fromMap.activeAircraft)
export const selectAircraftLoading = createSelector(selectMapState, fromMap.aircraftLoading)
export const selectMapCenter = createSelector(selectMapState, fromMap.mapCenter)
export const selectAircraftError = createSelector(selectMapState, fromMap.apiError)
export const selectMapBounds = createSelector(selectMapState, fromMap.mapBounds)
