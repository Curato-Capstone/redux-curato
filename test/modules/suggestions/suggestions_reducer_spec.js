import { expect } from 'chai';
import { fromJS, List, Map } from 'immutable';
import reducer, * as suggestions from '../../../src/modules/suggestions';
import { place1, place2 } from '../../mock_data';

describe('suggestions reducer', () => {
    it('should return the initial state', () => {
        const initialState = Map({
            suggestions : List(),
            searchText  : ''
        });

        expect(reducer(undefined, {})).to.deep.equal(initialState);
    });

    it('should handle SET_SUGGESTION', () => {
        const initialState = Map({
            suggestions : List(),
            searchText  : ''
        });

        const expectedState = Map({
            suggestions : fromJS([place1, place2]),
            searchText  : ''
        });

        expect(
            reducer(initialState, {
                type: suggestions.SET_SUGGESTIONS,
                suggestions: [place1, place2]
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle ADD_SUGGESTION', () => {
        const initialState = Map({
            suggestions : List(),
            searchText  : ''
        });

        const expectedState = Map({
            suggestions : fromJS([place1]),
            searchText  : ''
        });

        expect(
            reducer(initialState, {
                type: suggestions.ADD_SUGGESTION,
                suggestion: place1
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle REMOVE_SUGGESTION', () => {
        const initialState = Map({
            suggestions : List([place1]),
            searchText  : ''
        });

        const expectedState = Map({
            suggestions : List(),
            searchText  : ''
        });

        expect(
            reducer(initialState, {
                type: suggestions.REMOVE_SUGGESTION,
                index: 0
            })
        ).to.deep.equal(expectedState);
    });

    it('should handle CLEAR_SUGGESTIONS', () => {
        const initialState = Map({
            suggestions : List([place1, place2]),
            searchText  : ''
        });

        const expectedState = Map({
            suggestions : List(),
            searchText  : '' 
        });

        expect(
            reducer(initialState, {
                type: suggestions.CLEAR_SUGGESTIONS
            })
        ).to.deep.equal(expectedState);
    });
});
