// @flow
import { Map } from 'immutable';
import type { Action } from '../../flow/types';
import request from 'superagent-bluebird-promise';

import { routerActions } from 'react-router-redux';
import * as globalActions from './global';
import * as userActions from './user';

// Actions
// -----------------------------------
export const SET_IS_AUTHENTICATING = 'SET_IS_AUTHENTICATING';
export const SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';


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


// Reducers
// -----------------------------------
const initialState = Map({
    isAuthenticating: false,
    isAuthenticated: false
});

type State = Map<string, any>
export default function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case SET_IS_AUTHENTICATING:
            return state.set('isAuthenticating', action.authenticating);

        case SET_IS_AUTHENTICATED:
            return state.set('isAuthenticated', action.authenticated);

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
            const preferences = getState().getIn(['user', 'preferences']).toJS();
            const formValues = getState().getIn(['form', 'SignUpForm', 'values']).toJS();
            const favorites = getState().getIn(['user', 'favorites']).toJS();

            const user = { ...formValues, preferences };

            const res = await request
                .post(`${baseURL}/user/signup`)
                .send(user);
            res.body.favorites = favorites;
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

            dispatch(userActions.setUser(res.body));
            dispatch(setIsAuthenticated(true));
        } catch (error) {
            dispatch(globalActions.setMessage('error', 'Sign In Failed!'));
            return SubmissionError({ _error: 'You dun goofed' });
        }
    };
}
