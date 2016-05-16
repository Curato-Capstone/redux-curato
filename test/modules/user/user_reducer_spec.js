import { expect } from 'chai';
import { fromJS, List, Map } from 'immutable';
import reducer, * as user from '../../../src/modules/user'
import { place1, place2, user1, preferences, noUserState, yesUserState } from '../../mock_data'

describe('user reducer', () => {
    it('should return the initial state', () => {
        const initialState = noUserState;

        expect(reducer(undefined, {})).to.deep.equal(initialState)
    });

    it('should handle SET_USER', () => {
        const initialState = noUserState;
        const expectedState = yesUserState;

        expect(
            reducer(initialState, {
                type: user.SET_USER,
                user: user1
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle SET_EMAIL', () => {
        const email = 'miss-pie@hotmail.com';
        const initialState = yesUserState;
        const expectedState = yesUserState.set('email', email);

        expect(
            reducer(initialState, {
                type: user.SET_EMAIL,
                email
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle SET_NAME', () => {
        const name = 'Gina';
        const initialState = yesUserState;
        const expectedState = yesUserState.set('name', name);

        expect(
            reducer(initialState, {
                type: user.SET_NAME,
                name
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle SET_AGE', () => {
        const age = 21;
        const initialState = yesUserState;
        const expectedState = yesUserState.set('age', age);

        expect(
            reducer(initialState, {
                type: user.SET_AGE,
                age
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle SET_AGE', () => {
        const age = 21;
        const initialState = yesUserState;
        const expectedState = yesUserState.set('age', age);

        expect(
            reducer(initialState, {
                type: user.SET_AGE,
                age
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle SET_GENDER', () => {
        const gender = 'male';
        const initialState = yesUserState;
        const expectedState = yesUserState.set('gender', gender);

        expect(
            reducer(initialState, {
                type: user.SET_GENDER,
                gender
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle SET_FAVORITES', () => {
        const favorites = [place2, place1];
        const initialState = yesUserState;
        const expectedState = yesUserState.set('favorites', fromJS(favorites));

        expect(
            reducer(initialState, {
                type: user.SET_FAVORITES,
                favorites
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle ADD_FAVORITE', () => {
        const favorite = place2;
        const initialState = yesUserState.set('favorites', List());
        const expectedState = initialState.update('favorites', (favorites) => favorites.push(fromJS(favorite)));

        expect(
            reducer(initialState, {
                type: user.ADD_FAVORITE,
                favorite
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle REMOVE_FAVORITE', () => {
        const favorite = place2;
        const initialState = yesUserState.set('favorites', fromJS([favorite]));
        const expectedState = yesUserState.set('favorites', List());

        expect(
            reducer(initialState, {
                type: user.REMOVE_FAVORITE,
                index: 0
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle SET_PREFERENCES', () => {
        const initialState = yesUserState.set('preferences', null);
        const expectedState = yesUserState.set('preferences', Map(preferences));

        expect(
            reducer(initialState, {
                type: user.SET_PREFERENCES,
                preferences
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle CHANGE_PREFERENCE', () => {
        const initialPreferences = preferences;
        const expectedPreferences = preferences.set('shopping', 5);

        const initialState = yesUserState.set('preferences', initialPreferences);
        const expectedState = yesUserState.set('preferences', expectedPreferences);

        expect(
            reducer(initialState, {
                type: user.CHANGE_PREFERENCE,
                preferenceName: 'shopping',
                value: 5
            })
        ).to.deep.equal(expectedState);
    });
});
