'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CLEAR_MESSAGES = exports.SET_SUCCESS_MESSAGE = exports.SET_ERROR_MESSAGE = exports.SET_LOADING = undefined;
exports.setLoading = setLoading;
exports.setErrorMessage = setErrorMessage;
exports.setSuccessMessage = setSuccessMessage;
exports.clearMessages = clearMessages;
exports.default = reducer;
exports.setMessage = setMessage;

var _immutable = require('immutable');

// Actions
// -----------------------------------
var SET_LOADING = exports.SET_LOADING = 'SET_LOADING';
var SET_ERROR_MESSAGE = exports.SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
var SET_SUCCESS_MESSAGE = exports.SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
var CLEAR_MESSAGES = exports.CLEAR_MESSAGES = 'CLEAR_MESSAGES';

// Action Creators
// -----------------------------------
function setLoading(loading) {
    return {
        type: SET_LOADING,
        loading: loading
    };
}

function setErrorMessage(errorMessage) {
    return {
        type: SET_ERROR_MESSAGE,
        errorMessage: errorMessage
    };
}

function setSuccessMessage(successMessage) {
    return {
        type: SET_SUCCESS_MESSAGE,
        successMessage: successMessage
    };
}

function clearMessages() {
    return {
        type: CLEAR_MESSAGES
    };
}

// Reducers
// -----------------------------------
var initialState = (0, _immutable.Map)({
    loading: false,
    successMessage: '',
    errorMessage: ''
});

function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

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
function setMessage(type, message) {
    var persistent = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    return function (dispatch) {
        type === 'success' ? dispatch(setSuccessMessage(message)) : dispatch(setErrorMessage(message));

        if (!persistent) {
            setTimeout(function () {
                return dispatch(clearMessages());
            }, 3000);
        }
    };
}