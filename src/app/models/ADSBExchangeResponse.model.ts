import { ADSBExchangeAircraft } from "./ADSBExchangeAircraft.model";

export interface ADSBExchangeResponse {
    ac: ADSBExchangeAircraft[]
    ctime: number
    msg: string
    now: number
    ptime: number
    total: number
}