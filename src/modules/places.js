// @flow
import { Map, fromJS } from 'immutable';
import type { Action } from '../../flow/types';
import request from 'superagent-bluebird-promise';

// Actions
// -----------------------------------
export const SET_PLACES = 'SET_PLACES';
export const ADD_PLACES = 'ADD_PLACES';

// Action Creators
// -----------------------------------
export function setPlaces(places: Array<Object>) {
    return {
        type: SET_PLACES,
        places
    }
}

export function addPlaces(places: Array<Object>) {
    return {
        type: ADD_PLACES,
        places
    }
}


// Reducers
// -----------------------------------
const initialState = Map();

type State = Map<string, Object>
export default function reducer(state: State = initialState, action: Action): State {
    const places = {};

    switch (action.type) {
        case SET_PLACES:
            for (let place of action.places) {
                places[place.id] = fromJS(place);
            }

            return fromJS(places);

        case ADD_PLACES:
            for (let place of action.places) {
                places[place.id] = fromJS(place);
            }

            return state.merge(places);

        default:
            return state;
    }
}
