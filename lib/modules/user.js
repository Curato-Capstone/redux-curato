'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CHANGE_PREFERENCE = exports.SET_PREFERENCES = exports.REMOVE_FAVORITE = exports.ADD_FAVORITE = exports.SET_FAVORITES = exports.SET_ETHNICITY = exports.SET_GENDER = exports.SET_AGE = exports.SET_NAME = exports.SET_EMAIL = exports.SET_USER = undefined;
exports.setUser = setUser;
exports.setEmail = setEmail;
exports.setName = setName;
exports.setAge = setAge;
exports.setGender = setGender;
exports.setEthnicity = setEthnicity;
exports.setFavorites = setFavorites;
exports.setPreferences = setPreferences;
exports.addFavorite = addFavorite;
exports.removeFavorite = removeFavorite;
exports.changePreference = changePreference;
exports.default = reducer;
exports.getUserData = getUserData;
exports.updateAccount = updateAccount;
exports.updatePreferences = updatePreferences;
exports.addFavoriteThunk = addFavoriteThunk;
exports.removeFavoriteThunk = removeFavoriteThunk;
exports.dislikePlace = dislikePlace;

var _immutable = require('immutable');

var _superagentBluebirdPromise = require('superagent-bluebird-promise');

var _superagentBluebirdPromise2 = _interopRequireDefault(_superagentBluebirdPromise);

var _reactRouterRedux = require('react-router-redux');

var _global = require('./global');

var globalActions = _interopRequireWildcard(_global);

var _auth = require('./auth');

var authActions = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

// Actions
// -----------------------------------
var SET_USER = exports.SET_USER = 'SET_USER';
var SET_EMAIL = exports.SET_EMAIL = 'SET_EMAIL';
var SET_NAME = exports.SET_NAME = 'SET_NAME';
var SET_AGE = exports.SET_AGE = 'SET_AGE';
var SET_GENDER = exports.SET_GENDER = 'SET_GENDER';
var SET_ETHNICITY = exports.SET_ETHNICITY = 'SET_ETHNICITY';

var SET_FAVORITES = exports.SET_FAVORITES = 'SET_FAVORITES';
var ADD_FAVORITE = exports.ADD_FAVORITE = 'ADD_FAVORITE';
var REMOVE_FAVORITE = exports.REMOVE_FAVORITE = 'REMOVE_FAVORITE';

var SET_PREFERENCES = exports.SET_PREFERENCES = 'SET_PREFERENCES';
var CHANGE_PREFERENCE = exports.CHANGE_PREFERENCE = 'CHANGE_PREFERENCE';

// Action Creators
// -----------------------------------
function setUser(user) {
    return {
        type: SET_USER,
        user: user
    };
}

function setEmail(email) {
    return {
        type: SET_EMAIL,
        email: email
    };
}

function setName(name) {
    return {
        type: SET_NAME,
        name: name
    };
}

function setAge(age) {
    return {
        type: SET_AGE,
        age: age
    };
}

function setGender(gender) {
    return {
        type: SET_GENDER,
        gender: gender
    };
}

function setEthnicity(ethnicity) {
    return {
        type: SET_ETHNICITY,
        ethnicity: ethnicity
    };
}

function setFavorites(favorites) {
    return {
        type: SET_FAVORITES,
        favorites: favorites
    };
}

function setPreferences(preferences) {
    return {
        type: SET_PREFERENCES,
        preferences: preferences
    };
}

function addFavorite(favorite) {
    return {
        type: ADD_FAVORITE,
        favorite: favorite
    };
}

function removeFavorite(index) {
    return {
        type: REMOVE_FAVORITE,
        index: index
    };
}

function changePreference(preferenceName, value) {
    return {
        type: CHANGE_PREFERENCE,
        preferenceName: preferenceName,
        value: value
    };
}

// Reducers
// -----------------------------------
var initialState = (0, _immutable.Map)({
    email: 'mister-pie@hotmail.com',
    name: 'Mister Pie',
    age: 25,
    gender: 'male',
    ethnicity: 'white',
    favorites: (0, _immutable.List)(),
    id: '123456789',
    preferences: (0, _immutable.Map)({
        price: 3,
        culture: 1,
        food: 4,
        outdoors: 3,
        entertainment: 2,
        relaxation: 5,
        shopping: 3,
        sports: 2
    })
});

function reducer() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    switch (action.type) {
        case SET_USER:
            return (0, _immutable.fromJS)(action.user);

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

function favoritesReducer(state, action) {
    switch (action.type) {
        case SET_FAVORITES:
            return (0, _immutable.fromJS)(action.favorites);

        case ADD_FAVORITE:
            return state.push((0, _immutable.fromJS)(action.favorite));

        case REMOVE_FAVORITE:
            return state.delete(action.index);

        default:
            return state;
    }
}

function preferencesReducer(state, action) {
    switch (action.type) {
        case SET_PREFERENCES:
            return (0, _immutable.Map)(action.preferences);

        case CHANGE_PREFERENCE:
            return state.set(action.preferenceName, action.value);

        default:
            return state;
    }
}

// Thunks
// -----------------------------------
var baseURL = 'http://ec2-54-186-80-121.us-west-2.compute.amazonaws.com:8000';
var sleep = function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            return resolve();
        }, ms);
    });
};

var user = {
    email: 'mister-pie@hotmail.com',
    name: 'Mister Pie',
    age: 25,
    gender: 'male',
    ethnicity: 'white',
    favorites: [],
    id: '123456789',
    preferences: {
        price: 3,
        culture: 1,
        food: 4,
        outdoors: 3,
        entertainment: 2,
        relaxation: 5,
        shopping: 3,
        sports: 2
    }
};
// called when page is first loaded
function getUserData() {
    var _this = this;

    return function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(dispatch) {
            var res;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;

                            dispatch(authActions.setIsAuthenticating(true));

                            _context.next = 4;
                            return _superagentBluebirdPromise2.default.get(baseURL + '/user');

                        case 4:
                            res = _context.sent;

                            // const res = {};
                            // res.body = await new Promise((resolve) => {
                            //     setTimeout(() => resolve(user), 2000)
                            // });

                            dispatch(setUser(res.body));
                            dispatch(authActions.setIsAuthenticated(true));
                            _context.next = 12;
                            break;

                        case 9:
                            _context.prev = 9;
                            _context.t0 = _context['catch'](0);

                            console.log(_context.t0);

                        case 12:
                            dispatch(authActions.setIsAuthenticating(false));

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 9]]);
        }));

        return function (_x2) {
            return ref.apply(this, arguments);
        };
    }();
}

// called when user is updating account on /account
function updateAccount() {
    var _this2 = this;

    return function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(dispatch, getState) {
            var accountValues;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;

                            dispatch(globalActions.setLoading(true));
                            accountValues = getState().getIn(['form', 'AccountForm', 'values']).toJS();

                            // console.log(accountValues);

                            _context2.next = 5;
                            return sleep(1200);

                        case 5:

                            dispatch(globalActions.setMessage('success', 'Successfully Updated Account!'));
                            _context2.next = 11;
                            break;

                        case 8:
                            _context2.prev = 8;
                            _context2.t0 = _context2['catch'](0);

                            dispatch(globalActions.setMessage('error', 'Update failed, blame Brandon'));

                        case 11:

                            dispatch(globalActions.setLoading(false));

                        case 12:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2, [[0, 8]]);
        }));

        return function (_x3, _x4) {
            return ref.apply(this, arguments);
        };
    }();
}

// called when user is updating preferences on /preferences
function updatePreferences() {
    var _this3 = this;

    return function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(dispatch, getState) {
            var preferences;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.prev = 0;

                            dispatch(globalActions.setLoading(true));
                            preferences = getState().getIn(['user', 'preferences']).toJS();

                            // await request
                            //     .put(`${baseURL}/user/`)
                            //     .send({ preferences });

                            _context3.next = 5;
                            return sleep(1200);

                        case 5:

                            dispatch(globalActions.setMessage('success', 'Successfully Updated Preferences!'));
                            _context3.next = 11;
                            break;

                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3['catch'](0);

                            dispatch(globalActions.setMessage('error', 'Update failed, blame Brandon'));

                        case 11:

                            dispatch(globalActions.setLoading(false));

                        case 12:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3, [[0, 8]]);
        }));

        return function (_x5, _x6) {
            return ref.apply(this, arguments);
        };
    }();
}

// called on /favorites and /suggestions
function addFavoriteThunk(place) {
    var _this4 = this;

    return function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(dispatch, getState) {
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.prev = 0;

                            dispatch(globalActions.setLoading(true));

                            // await request
                            //     .post(`${baseURL}/place/favorites/add`)
                            //     .send({ id: place.id });
                            _context4.next = 4;
                            return sleep(300);

                        case 4:

                            dispatch(addFavorite(place));
                            _context4.next = 10;
                            break;

                        case 7:
                            _context4.prev = 7;
                            _context4.t0 = _context4['catch'](0);

                            dispatch(globalActions.setMessage('error', 'Unable to add favorite, blame Brandon'));

                        case 10:

                            dispatch(globalActions.setLoading(false));

                        case 11:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4, [[0, 7]]);
        }));

        return function (_x7, _x8) {
            return ref.apply(this, arguments);
        };
    }();
}

// called on /favorites and /suggestions
function removeFavoriteThunk(place) {
    var _this5 = this;

    return function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(dispatch, getState) {
            var favorites, index, i;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.prev = 0;

                            dispatch(globalActions.setLoading(true));

                            // await request
                            //     .post(`${baseURL}/place/favorites/remove`)
                            //     .send({ id: place.id });

                            _context5.next = 4;
                            return sleep(300);

                        case 4:
                            favorites = getState().getIn(['user', 'favorites']).toJS();
                            index = void 0;

                            for (i = 0; i < favorites.length; i++) {
                                if (favorites[i].id === place.id) {
                                    index = i;
                                }
                            }

                            dispatch(removeFavorite(index));
                            _context5.next = 13;
                            break;

                        case 10:
                            _context5.prev = 10;
                            _context5.t0 = _context5['catch'](0);

                            dispatch(globalActions.setMessage('error', 'Unable to remove favorite'));

                        case 13:

                            dispatch(globalActions.setLoading(false));

                        case 14:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5, [[0, 10]]);
        }));

        return function (_x9, _x10) {
            return ref.apply(this, arguments);
        };
    }();
}

function dislikePlace(id) {
    var _this6 = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        _context6.next = 3;
                        return _superagentBluebirdPromise2.default.post(baseURL + '/place/dislike').send({ id: id });

                    case 3:
                        _context6.next = 7;
                        break;

                    case 5:
                        _context6.prev = 5;
                        _context6.t0 = _context6['catch'](0);

                    case 7:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, _this6, [[0, 5]]);
    }));
}