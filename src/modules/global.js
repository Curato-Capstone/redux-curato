// @flow
import { Map } from 'immutable';
import type { Action } from '../../flow/types';

// Actions
// -----------------------------------
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';


// Action Creators
// -----------------------------------
export function setLoading(loading: bool): Action {
    return {
        type: SET_LOADING,
        loading
    };
}

export function setErrorMessage(errorMessage: string): Action {
    return {
        type: SET_ERROR_MESSAGE,
        errorMessage
    };
}

export function setSuccessMessage(successMessage: string): Action {
    return {
        type: SET_SUCCESS_MESSAGE,
        successMessage
    };
}

export function clearMessages(): Action {
    return {
        type: CLEAR_MESSAGES
    };
}


// Reducers
// -----------------------------------
const initialState = Map({
    loading: false,
    successMessage: '',
    errorMessage: ''
});

type State = Map<string, any>
export default function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
        case SET_LOADING:
            return state.set('loading', action.loading);

        case SET_ERROR_MESSAGE:
            return state.set('errorMessage', action.errorMessage);

        case SET_SUCCESS_MESSAGE:
            return state.set('successMessage', action.successMessage);

        case CLEAR_MESSAGES:
            return initialState;

        default:
            return state;
    }
}
export function setMessage(type: 'success'|'error', message: string, persistent: bool = false) {
    return (dispatch: () => void) => {
        type === 'success' ?
            dispatch(setSuccessMessage(message)) :
            dispatch(setErrorMessage(message));

        if (!persistent) {
            setTimeout(() => dispatch(clearMessages()), 3000);
        }
    };
}
