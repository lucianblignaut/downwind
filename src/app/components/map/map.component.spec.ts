import { DebugElement } from "@angular/core"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { MapComponent } from "./map.component"
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { MapState } from "./state/map.reducer"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { HttpClientModule } from "@angular/common/http"
import * as L from 'leaflet'
import * as mapActions from './state/map.actions'
import { AdsbService } from "src/app/services/adsb-exchange/adsb-service.service"
import { of } from "rxjs"

describe('MapComponent', () => {
    let component: MapComponent
    let fixture: ComponentFixture<MapComponent>
    let de: DebugElement
    let mockStore: MockStore<MapState>
    let adsbService: AdsbService

    const initialState: MapState = {
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
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [MapComponent],
            imports: [
                HttpClientTestingModule,
                HttpClientModule
            ],
            providers: [
                provideMockStore({ initialState }),
                AdsbService
            ]
        })
        mockStore = TestBed.inject(MockStore)
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(MapComponent)
        component = fixture.componentInstance
        de = fixture.debugElement
        window.L = L
        fixture.detectChanges()
        adsbService = de.injector.get(AdsbService)
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should get the center of the map after initialization', () => {
        let spy = spyOn(adsbService, 'loadCenter').and.returnValue(of({ lat: 30, lng: 10 }))
        component['_initMap'](() => {
            expect(spy).toHaveBeenCalled()
        })
    })

    it('should dispatch action to load airports after map initialization', () => {
        let spy = spyOn(mockStore, 'dispatch').and.callThrough()
        component['_initMap'](() => {
            component['_dispatchLoadAirports']
            expect(spy).toHaveBeenCalledWith(mapActions.loadAirports)
        })
    })

})