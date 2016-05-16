// @flow

// Models
//-------------------
export type Place = {
    name                   : string,
    id                     : string,
    categories : Array<Object>,
    url: string,
    image: string,
    contact?: {
        formattedPhone: string,
        phone: string
    },
    location?: {
        address: string,
        city: string,
        distance: number,
        // street address, city/state/zip, country,
        formattedAddress: Array<string>,
        lat: number,
        lng: number,
        postalCode: number,
        state: string
    },
};

export type Preferences = {
    price         : number,
    culture       : number,
    food          : number,
    outdoors      : number,
    entertainment : number,
    relaxation    : number,
    shopping      : number,
    sports        : number
};

export type User = {
    email       : string,
    name        : string,
    age         : number,
    gender      : string,
    ethnicity   : string,
    favorites   : Array<Place>,
    preferences : Preferences
};


// Redux
//--------------------------
export type Action = Object;
