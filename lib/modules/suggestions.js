'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CHANGE_SEARCH_TEXT = exports.CLEAR_SUGGESTIONS = exports.REMOVE_SUGGESTION = exports.ADD_SUGGESTION = exports.SET_SUGGESTIONS = undefined;
exports.setSuggestions = setSuggestions;
exports.addSuggestion = addSuggestion;
exports.removeSuggestion = removeSuggestion;
exports.clearSuggestions = clearSuggestions;
exports.changeSearchText = changeSearchText;
exports.default = reducer;
exports.getSuggestions = getSuggestions;
exports.getSuggestionsNoAccount = getSuggestionsNoAccount;

var _immutable = require('immutable');

var _superagentBluebirdPromise = require('superagent-bluebird-promise');

var _superagentBluebirdPromise2 = _interopRequireDefault(_superagentBluebirdPromise);

var _reactRouterRedux = require('react-router-redux');

var _global = require('./global');

var globalActions = _interopRequireWildcard(_global);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

// Actions
// -----------------------------------
var SET_SUGGESTIONS = exports.SET_SUGGESTIONS = 'SET_SUGGESTIONS';
var ADD_SUGGESTION = exports.ADD_SUGGESTION = 'ADD_SUGGESTION';
var REMOVE_SUGGESTION = exports.REMOVE_SUGGESTION = 'REMOVE_SUGGESTION';
var CLEAR_SUGGESTIONS = exports.CLEAR_SUGGESTIONS = 'CLEAR_SUGGESTIONS';
var CHANGE_SEARCH_TEXT = exports.CHANGE_SEARCH_TEXT = 'CHANGE_SEARCH_TEXT';

// Action Creators
// -----------------------------------
function setSuggestions(suggestions) {
    return {
        type: SET_SUGGESTIONS,
        suggestions: suggestions
    };
}

function addSuggestion(suggestion) {
    return {
        type: ADD_SUGGESTION,
        suggestion: suggestion
    };
}

function removeSuggestion(index) {
    return {
        type: REMOVE_SUGGESTION,
        index: index
    };
}

function clearSuggestions() {
    return {
        type: CLEAR_SUGGESTIONS
    };
}

function changeSearchText(text) {
    return {
        type: CHANGE_SEARCH_TEXT,
        text: text
    };
}

// Reducers
// -----------------------------------
var initialState = (0, _immutable.Map)({
    suggestions: (0, _immutable.List)(),
    searchText: ''
});

function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case SET_SUGGESTIONS:
            return state.set('suggestions', (0, _immutable.fromJS)(action.suggestions));

        case ADD_SUGGESTION:
            return state.update('suggestions', function (suggestions) {
                return suggestions.push((0, _immutable.fromJS)(action.suggestion));
            });

        case REMOVE_SUGGESTION:
            return state.update('suggestions', function (suggestions) {
                return suggestions.delete(action.index);
            });

        case CLEAR_SUGGESTIONS:
            return initialState;

        case CHANGE_SEARCH_TEXT:
            return initialState.set('searchText', action.text);

        default:
            return state;
    }
}

// Thunks
// -----------------------------------
var baseURL = 'http://ec2-54-186-80-121.us-west-2.compute.amazonaws.com:8000';

function getSuggestions() {
    var _this = this;

    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var _ref$random = _ref.random;
    var random = _ref$random === undefined ? false : _ref$random;

    return function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(dispatch, getState) {
            var preferences, query, res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;

                            dispatch(globalActions.setLoading(true));

                            preferences = getState().getIn(['user', 'preferences']).toJS();
                            query = random ? '' : getState().getIn(['suggestions', 'searchText']);
                            _context.next = 6;
                            return _superagentBluebirdPromise2.default.post(baseURL + '/suggestions').send({
                                preferences: preferences,
                                q: query
                            });

                        case 6:
                            res = _context.sent;


                            dispatch(setSuggestions(res.body));
                            dispatch(_reactRouterRedux.routerActions.push('/suggestions'));
                            _context.next = 14;
                            break;

                        case 11:
                            _context.prev = 11;
                            _context.t0 = _context['catch'](0);

                            dispatch(globalActions.setMessage('error', 'Something went wrong :( '));

                        case 14:

                            dispatch(globalActions.setLoading(false));

                        case 15:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 11]]);
        }));

        return function (_x3, _x4) {
            return ref.apply(this, arguments);
        };
    }();
}

function getSuggestionsNoAccount() {
    var _this2 = this;

    return function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var preferences, res;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;

                            dispatch(globalActions.setLoading(true));
                            preferences = getState().getIn(['user', 'preferences']).toJS();
                            _context2.next = 5;
                            return _superagentBluebirdPromise2.default.post(baseURL + '/suggestions').send({
                                preferences: preferences,
                                num_sugg: 3
                            });

                        case 5:
                            res = _context2.sent;


                            dispatch(setSuggestions(res.body));
                            dispatch(_reactRouterRedux.routerActions.push('/intro/suggestions'));
                            _context2.next = 13;
                            break;

                        case 10:
                            _context2.prev = 10;
                            _context2.t0 = _context2['catch'](0);

                            dispatch(globalActions.setMessage('error', 'Something went wrong :( '));

                        case 13:

                            dispatch(globalActions.setLoading(false));

                        case 14:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[0, 10]]);
        }));

        return function (_x5, _x6) {
            return ref.apply(this, arguments);
        };
    }();
}