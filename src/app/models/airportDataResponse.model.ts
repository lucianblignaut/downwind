export interface HeIls {
    freq: number;
    course: number;
}

export interface LeIls {
    freq: number;
    course: number;
}

export interface Runway {
    id: string;
    airport_ref: string;
    airport_ident: string;
    length_ft: string;
    width_ft: string;
    surface: string;
    lighted: string;
    closed: string;
    le_ident: string;
    le_latitude_deg: string;
    le_longitude_deg: string;
    le_elevation_ft: string;
    le_heading_degT: string;
    le_displaced_threshold_ft: string;
    he_ident: string;
    he_latitude_deg: string;
    he_longitude_deg: string;
    he_elevation_ft: string;
    he_heading_degT: string;
    he_displaced_threshold_ft: string;
    he_ils: HeIls;
    le_ils: LeIls;
}

export interface Freq {
    id: string;
    airport_ref: string;
    airport_ident: string;
    type: string;
    description: string;
    frequency_mhz: string;
}

export interface Country {
    id: string;
    code: string;
    name: string;
    continent: string;
    wikipedia_link: string;
    keywords: string;
}

export interface Region {
    id: string;
    code: string;
    local_code: string;
    name: string;
    continent: string;
    iso_country: string;
    wikipedia_link: string;
    keywords: string;
}

export interface Navaid {
    id: string;
    filename: string;
    ident: string;
    name: string;
    type: string;
    frequency_khz: string;
    latitude_deg: string;
    longitude_deg: string;
    elevation_ft: string;
    iso_country: string;
    dme_frequency_khz: string;
    dme_channel: string;
    dme_latitude_deg: string;
    dme_longitude_deg: string;
    dme_elevation_ft: string;
    slaved_variation_deg: string;
    magnetic_variation_deg: string;
    usageType: string;
    power: string;
    associated_airport: string;
}

export interface Station {
    icao_code: string;
    distance: number;
}

export interface AirportDataResponse {
    ident: string;
    type: string;
    name: string;
    latitude_deg: number;
    longitude_deg: number;
    elevation_ft: string;
    continent: string;
    iso_country: string;
    iso_region: string;
    municipality: string;
    scheduled_service: string;
    gps_code: string;
    iata_code: string;
    local_code: string;
    home_link: string;
    wikipedia_link: string;
    keywords: string;
    icao_code: string;
    runways: Runway[];
    freqs: Freq[];
    country: Country;
    region: Region;
    navaids: Navaid[];
    station: Station;
}

export interface ADSBExchangeAirport {
    iataCode: string;
    icaoCode: string;
    name: string;
    alpha2countryCode: string;
    latitude: number;
    longitude: number;
}
