'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SET_IS_AUTHENTICATED = exports.SET_IS_AUTHENTICATING = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.setIsAuthenticating = setIsAuthenticating;
exports.setIsAuthenticated = setIsAuthenticated;
exports.default = reducer;
exports.signUpUser = signUpUser;
exports.signInUser = signInUser;

var _immutable = require('immutable');

var _superagentBluebirdPromise = require('superagent-bluebird-promise');

var _superagentBluebirdPromise2 = _interopRequireDefault(_superagentBluebirdPromise);

var _reactRouterRedux = require('react-router-redux');

var _global = require('./global');

var globalActions = _interopRequireWildcard(_global);

var _user = require('./user');

var userActions = _interopRequireWildcard(_user);

var _reduxForm = require('redux-form');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

// Actions
// -----------------------------------
var SET_IS_AUTHENTICATING = exports.SET_IS_AUTHENTICATING = 'SET_IS_AUTHENTICATING';
var SET_IS_AUTHENTICATED = exports.SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED';

// Action Creators
// -----------------------------------
function setIsAuthenticating(authenticating) {
    return {
        type: SET_IS_AUTHENTICATING,
        authenticating: authenticating
    };
}

function setIsAuthenticated(authenticated) {
    return {
        type: SET_IS_AUTHENTICATED,
        authenticated: authenticated
    };
}

// Reducers
// -----------------------------------
var initialState = (0, _immutable.Map)({
    isAuthenticating: false,
    isAuthenticated: false
});

function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

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
var baseURL = 'http://ec2-54-186-80-121.us-west-2.compute.amazonaws.com:8000';
function signUpUser() {
    var _this = this;

    return function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var preferences, formValues, favorites, user, res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            preferences = getState().getIn(['user', 'preferences']).toJS();
                            formValues = getState().getIn(['form', 'SignUpForm', 'values']).toJS();
                            favorites = getState().getIn(['user', 'favorites']).toJS();
                            user = _extends({}, formValues, { preferences: preferences });
                            _context.next = 7;
                            return _superagentBluebirdPromise2.default.post(baseURL + '/user/signup').send(user);

                        case 7:
                            res = _context.sent;

                            res.body.favorites = favorites;
                            dispatch(userActions.setUser(res.body));
                            dispatch(setIsAuthenticated(true));

                            dispatch(_reactRouterRedux.routerActions.push('/'));
                            _context.next = 18;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context['catch'](0);

                            dispatch(globalActions.setMessage('error', 'Sign Up Failed!'));
                            return _context.abrupt('return', (0, _reduxForm.SubmissionError)({ _error: 'You dun goofed' }));

                        case 18:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 14]]);
        }));

        return function (_x2, _x3) {
            return ref.apply(this, arguments);
        };
    }();
}

function signInUser() {
    var _this2 = this;

    return function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var loginCredentials, res;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            loginCredentials = getState().getIn(['form', 'SignInForm', 'values']).toJS();
                            _context2.next = 4;
                            return _superagentBluebirdPromise2.default.post(baseURL + '/user/signin').send(loginCredentials);

                        case 4:
                            res = _context2.sent;


                            dispatch(userActions.setUser(res.body));
                            dispatch(setIsAuthenticated(true));

                            dispatch(_reactRouterRedux.routerActions.push('/'));
                            _context2.next = 14;
                            break;

                        case 10:
                            _context2.prev = 10;
                            _context2.t0 = _context2['catch'](0);

                            dispatch(globalActions.setMessage('error', 'Sign In Failed!'));
                            return _context2.abrupt('return', (0, _reduxForm.SubmissionError)({ _error: 'You dun goofed' }));

                        case 14:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[0, 10]]);
        }));

        return function (_x4, _x5) {
            return ref.apply(this, arguments);
        };
    }();
}