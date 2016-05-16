'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.global = exports.auth = exports.suggestions = exports.user = exports.globalReducer = exports.authReducer = exports.suggestionsReducer = exports.userReducer = undefined;

var _user = require('./modules/user');

var user = _interopRequireWildcard(_user);

var _suggestions = require('./modules/suggestions');

var suggestions = _interopRequireWildcard(_suggestions);

var _auth = require('./modules/auth');

var auth = _interopRequireWildcard(_auth);

var _global = require('./modules/global');

var global = _interopRequireWildcard(_global);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.userReducer = user.default;
exports.suggestionsReducer = suggestions.default;
exports.authReducer = auth.default;
exports.globalReducer = global.default;
exports.user = user;
exports.suggestions = suggestions;
exports.auth = auth;
exports.global = global;