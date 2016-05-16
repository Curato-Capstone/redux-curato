import { expect } from 'chai';
import * as user from '../../../src/modules/user'
import { place1, place2, user1, preferences } from '../../mock_data'

describe('user actions', () => {
    it('should create an action to set the current user', () => {
        const expectedAction = {
            type: user.SET_USER,
            user: user1
        };

        expect(user.setUser(user1)).to.deep.equal(expectedAction);
    });

    it('should create an action to set the user\'s email', () => {
        const email = 'mister-pie@hotmail.com';

        const expectedAction = {
            type: user.SET_EMAIL,
            email
        };

        expect(user.setEmail(email)).to.deep.equal(expectedAction);
    });

    it('should create an action to set the user\'s name', () => {
        const name = 'Mister Pie';

        const expectedAction = {
            type: user.SET_NAME,
            name
        };

        expect(user.setName(name)).to.deep.equal(expectedAction);
    });

    it('should create an action to set the user\'s age', () => {
        const age = '21';

        const expectedAction = {
            type: user.SET_AGE,
            age
        };

        expect(user.setAge(age)).to.deep.equal(expectedAction);
    });

    it('should create an action to set the user\'s gender', () => {
        const gender = 'male';

        const expectedAction = {
            type: user.SET_GENDER,
            gender
        };

        expect(user.setGender(gender)).to.deep.equal(expectedAction);
    });

    it('should create an action to set the user\'s ethnicity', () => {
        const ethnicity = 'White';

        const expectedAction = {
            type: user.SET_ETHNICITY,
            ethnicity
        };

        expect(user.setEthnicity(ethnicity)).to.deep.equal(expectedAction);
    });

    it('should create an action to set the user\'s favorites', () => {
        const favorites = [place1, place2];

        const expectedAction = {
            type: user.SET_FAVORITES,
            favorites
        };

        expect(user.setFavorites(favorites)).to.deep.equal(expectedAction);
    });

    it('should create an action to set the user\'s preferences', () => {
        const expectedAction = {
            type: user.SET_PREFERENCES,
            preferences
        };

        expect(user.setPreferences(preferences)).to.deep.equal(expectedAction);
    });

    it('should create an action to add to the user\'s favorites', () => {
        const favorite = place1;

        const expectedAction = {
            type: user.ADD_FAVORITE,
            favorite
        };

        expect(user.addFavorite(favorite)).to.deep.equal(expectedAction);
    });

    it('should create an action to remove a favorite from the user\'s favorites', () => {
        const index = 3;

        const expectedAction = {
            type: user.REMOVE_FAVORITE,
            index
        };

        expect(user.removeFavorite(index)).to.deep.equal(expectedAction);
    });

    it('should create an action to change a user\'s preference', () => {
        const preferenceName = 'art';
        const value = 3;

        const expectedAction = {
            type: user.CHANGE_PREFERENCE,
            preferenceName,
            value
        };

        expect(user.changePreference(preferenceName, value)).to.deep.equal(expectedAction);
    });
});
