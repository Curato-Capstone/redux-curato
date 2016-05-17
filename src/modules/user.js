import { fromJS, Map, List } from 'immutable';
import type { Place, Preferences, User, Action } from '../../types/index';
import request from 'superagent-bluebird-promise';

import * as globalActions from './global';
import * as authActions from './auth';

// Actions
// -----------------------------------
export const SET_USER = 'SET_USER';
export const SET_EMAIL = 'SET_EMAIL';
export const SET_NAME = 'SET_NAME';
export const SET_AGE = 'SET_AGE';
export const SET_GENDER = 'SET_GENDER';
export const SET_ETHNICITY = 'SET_ETHNICITY';

export const SET_FAVORITES = 'SET_FAVORITES';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export const SET_PREFERENCES = 'SET_PREFERENCES';
export const CHANGE_PREFERENCE = 'CHANGE_PREFERENCE';


// Action Creators
// -----------------------------------
export function setUser(user: User): Action {
    return {
        type: SET_USER,
        user
    };
}

export function setEmail(email: string): Action {
    return {
        type: SET_EMAIL,
        email
    };
}

export function setName(name: string): Action {
    return {
        type: SET_NAME,
        name
    };
}

export function setAge(age: number): Action {
    return {
        type: SET_AGE,
        age
    };
}

export function setGender(gender: string): Action {
    return {
        type: SET_GENDER,
        gender
    };
}

export function setEthnicity(ethnicity: string): Action {
    return {
        type: SET_ETHNICITY,
        ethnicity
    };
}

export function setFavorites(favorites: Array<Place>): Action {
    return {
        type: SET_FAVORITES,
        favorites
    };
}

export function setPreferences(preferences: Preferences): Action {
    return {
        type: SET_PREFERENCES,
        preferences
    };
}

export function addFavorite(favorite: Place): Action {
    return {
        type: ADD_FAVORITE,
        favorite
    };
}

export function removeFavorite(index: number): Action {
    return {
        type: REMOVE_FAVORITE,
        index
    };
}

export function changePreference(preferenceName: string, value: number): Action {
    return {
        type: CHANGE_PREFERENCE,
        preferenceName,
        value
    };
}


// Reducers
// -----------------------------------
const initialState = Map({
    email       : 'mister-pie@hotmail.com',
    name        : 'Mister Pie',
    age         : 25,
    gender      : 'male',
    ethnicity   : 'white',
    favorites   : List(),
    id          : '123456789',
    preferences : Map({
        art           : 1,
        history       : 1,
        food          : 1,
        outdoors      : 1,
        entertainment : 1,
        relaxation    : 1,
        shopping      : 1,
        sports        : 1
    })
});

type State = Map<string, any>
export default function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case SET_USER:
            return fromJS(action.user);

        case SET_EMAIL:
            return state.set('email', action.email);

        case SET_NAME:
            return state.set('name', action.name);

        case SET_AGE:
            return state.set('age', action.age);

        case SET_GENDER:
            return state.set('gender', action.gender);

        case SET_ETHNICITY:
            return state.set('ethnicity', action.ethnicity);

        case SET_FAVORITES:
        case ADD_FAVORITE:
        case REMOVE_FAVORITE:
            return state.set('favorites', favoritesReducer(state.get('favorites'), action));

        case SET_PREFERENCES:
        case CHANGE_PREFERENCE:
            return state.set('preferences', preferencesReducer(state.get('preferences'), action));

        default:
            return state;
    }
}

function favoritesReducer(state: List<Place>, action: Action): List<Place>  {
    switch (action.type) {
        case SET_FAVORITES:
            return fromJS(action.favorites);

        case ADD_FAVORITE:
            return state.push(fromJS(action.favorite));

        case REMOVE_FAVORITE:
            return state.delete(action.index);

        default:
            return state;
    }
}

function preferencesReducer(state: Map<string, number>, action: Action): Map<string, number>  {
    switch (action.type) {
        case SET_PREFERENCES:
            return Map(action.preferences);

        case CHANGE_PREFERENCE:
            return state.set(action.preferenceName, action.value);

        default:
            return state;
    }
}

// Thunks
// -----------------------------------
const baseURL = 'http://ec2-54-186-80-121.us-west-2.compute.amazonaws.com:8000';

// called when page is first loaded
export function getUserData() {
    return async (dispatch) => {
        try {
            dispatch(authActions.setIsAuthenticating(true));

            const res = await request.get(`${baseURL}/user`);

            dispatch(setUser(res.body));
            dispatch(authActions.setIsAuthenticated(true));
        } catch (error) {
            console.log(error);
        }
        dispatch(authActions.setIsAuthenticating(false));
    };
}

// called when user is updating account on /account
export function updateAccount() {
    return async (dispatch, getState) => {
        try {
            dispatch(globalActions.setLoading(true));
            const accountValues = getState().getIn(['form', 'AccountForm', 'values']).toJS();

            request
                .put(`${baseURL}/user/`)
                .send(accountValues);

            dispatch(globalActions.setMessage('success', 'Successfully Updated Account!'));
        } catch (error) {
            dispatch(globalActions.setMessage('error', 'Update failed, blame Brandon'));
        }

        dispatch(globalActions.setLoading(false));
    };
}

// called when user is updating preferences on /preferences
export function updatePreferences() {
    return async (dispatch, getState) => {
        try {
            dispatch(globalActions.setLoading(true));
            const preferences = getState().getIn(['user', 'preferences']).toJS();

            await request
                .put(`${baseURL}/user/`)
                .send({ preferences });

            dispatch(globalActions.setMessage('success', 'Successfully Updated Preferences!'));
        } catch (error) {
            dispatch(globalActions.setMessage('error', 'Update failed, blame Brandon'));
        }

        dispatch(globalActions.setLoading(false));
    };
}

// called on /favorites and /suggestions
export function addFavoriteThunk(place) {
    return async (dispatch, getState) => {
        try {
            dispatch(globalActions.setLoading(true));

            await request
                .post(`${baseURL}/place/favorites/add`)
                .send({ id: place.id });

            dispatch(addFavorite(place));
        } catch (error) {
            dispatch(globalActions.setMessage('error', 'Unable to add favorite, blame Brandon'));
        }

        dispatch(globalActions.setLoading(false));
    };
}

// called on /favorites and /suggestions
export function removeFavoriteThunk(place) {
    return async (dispatch, getState) => {
        try {
            dispatch(globalActions.setLoading(true));

            await request
                .post(`${baseURL}/place/favorites/remove`)
                .send({ id: place.id });

            const favorites = getState().getIn(['user', 'favorites']).toJS();

            let index;
            for (let i = 0; i < favorites.length; i++) {
                if (favorites[i].id === place.id) {
                    index = i;
                }
            }

            dispatch(removeFavorite(index));
        } catch (error) {
            dispatch(globalActions.setMessage('error', 'Unable to remove favorite'));
        }

        dispatch(globalActions.setLoading(false));
    };
}

export function dislikePlace(id) {
    return async () => {
        try {
            await request
                .post(`${baseURL}/place/dislike`)
                .send({ id });
        } catch (error) {
            // don't need to do anything I think
        }
    };
}
