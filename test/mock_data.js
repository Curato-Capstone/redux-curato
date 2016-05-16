import { List, Map } from 'immutable';

export const place1 = {
    formatted_address: '1234 Blah St., Seattle, WA, 98105 United States',
    opening_hours: { weekday_text: [
        'Monday: 10:00 AM - 5:00 PM',
        'Tuesday: 10:00 AM - 5:00 PM',
        'Wednesday: 10:00 AM - 5:00 PM',
        'Thursday: 10:00 AM - 5:00 PM',
        'Friday: 10:00 AM - 5:00 PM',
        'Saturday: 10:00 AM - 5:00 PM',
        'Sunday: 10:00 AM - 5:00 PM'
    ] },
    website: 'www.website.com',
    tags: ['cool', 'fun', 'gay'],
    name: 'Test',
    geometry: {
        location: {
            lat: 47.6214824,
            lng: -122.3481245
        }
    },
    formatted_phone_number: '(206) 123-4567'
};

export const place2 = {
    formatted_address: '1234 Blah St., Seattle, WA, 98105 United States',
    opening_hours: { weekday_text: [
        'Monday: 10:00 AM - 5:00 PM',
        'Tuesday: 10:00 AM - 5:00 PM',
        'Wednesday: 10:00 AM - 5:00 PM',
        'Thursday: 10:00 AM - 5:00 PM',
        'Friday: 10:00 AM - 5:00 PM',
        'Saturday: 10:00 AM - 5:00 PM',
        'Sunday: 10:00 AM - 5:00 PM'
    ]},
    website: 'www.website.com',
    tags: ['cool', 'fun', 'gay'],
    name: 'Test',
    geometry: {
        location: {
            lat: 47.6214824,
            lng: -122.3481245
        }
    },
    formatted_phone_number: '(206) 123-4567'
};

export const preferences = Map({
    price         : 3,
    culture       : 2,
    food          : 5,
    outdoors       : 2,
    entertainment : 1,
    relaxation    : 3,
    shopping      : 4,
    sports        : 5
});

export const noUserState = Map({
    email       : '',
    name        : '',
    age         : null,
    gender      : '',
    ethnicity   : '',
    favorites   : List(),
    preferences : Map()
});

export const yesUserState = Map({
    email       : 'mister-pie@hotmail.com',
    name        : 'Brandon Barron',
    age         : 22,
    gender      : 'Male',
    ethnicity   : 'White',
    favorites   : List([place1, place2]),
    preferences
});

export const user1 = Map({
    email       : 'mister-pie@hotmail.com',
    name        : 'Brandon Barron',
    age         : 22,
    gender      : 'Male',
    ethnicity   : 'White',
    favorites   : List([place1, place2]),
    preferences
});
