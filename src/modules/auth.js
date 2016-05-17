// @flow
import { Map } from 'immutable';
import type { Action } from '../../flow/types';
import request from 'superagent-bluebird-promise';

import * as globalActions from './global';
import * as userActions from './user';

// Actions
// -----------------------------------
export const SET_IS_AUTHENTICATING = 'SET_IS_AUTHENTICATING';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';
export const SET_TOKEN = 'SET_TOKEN';


// Action Creators
// -----------------------------------
export function setIsAuthenticating(authenticating: bool): Action {
    return {
        type: SET_IS_AUTHENTICATING,
        authenticating
    };
}

export function setIsAuthenticated(authenticated: bool) {
    return {
        type: SET_IS_AUTHENTICATED,
        authenticated
    };
}

export function setToken(token) {
    return {
        type: SET_TOKEN,
        token
    };
}


// Reducers
// -----------------------------------
const initialState = Map({
    isAuthenticating: false,
    isAuthenticated: false,
    token: ''
});

type State = Map<string, any>
export default function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case SET_IS_AUTHENTICATING:
            return state.set('isAuthenticating', action.authenticating);

        case SET_IS_AUTHENTICATED:
            return state.set('isAuthenticated', action.authenticated);

        case SET_TOKEN:
            return state.set('token', action.token);

        default:
            return state;
    }
}


// Reducers
// -----------------------------------
const baseURL = 'http://ec2-54-186-80-121.us-west-2.compute.amazonaws.com:8000';
import { SubmissionError } from 'redux-form';

export function signUpUser() {
    return async (dispatch: () => void, getState: () => Object) => {
        try {
            // get user sign up values
            const preferences = getState().getIn(['user', 'preferences']).toJS();
            const formValues = getState().getIn(['form', 'SignUpForm', 'values']).toJS();
            const favorites = getState().getIn(['user', 'favorites']).toJS();

            // construct users
            const user = { ...formValues, preferences, favorites };

            const res = await request
                .post(`${baseURL}/user/signup`)
                .send(user);

            // localStorage.setItem('accessToken', res.headers)

            // dispatch(setToken(res.headers))
            dispatch(userActions.setUser(res.body));
            dispatch(setIsAuthenticated(true));
        } catch (error) {
            dispatch(globalActions.setMessage('error', 'Sign Up Failed!'));
            return SubmissionError({ _error: 'You dun goofed' });
        }
    };
}

export function signInUser() {
    return async (dispatch: () => void, getState: () => Object) => {
        try {
            const loginCredentials = getState().getIn(['form', 'SignInForm', 'values']).toJS();

            const res = await request
                .post(`${baseURL}/user/signin`)
                .send(loginCredentials);

            // localStorage.setItem('accessToken', res.headers)

            // dispatch(setToken(res.headers))
            dispatch(userActions.setUser(res.body));
            dispatch(setIsAuthenticated(true));
        } catch (error) {
            dispatch(globalActions.setMessage('error', 'Sign In Failed!'));
            return SubmissionError({ _error: 'You dun goofed' });
        }
    };
}
