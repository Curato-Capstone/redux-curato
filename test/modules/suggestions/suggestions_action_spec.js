import { expect } from 'chai';
import { List, Map } from 'immutable';
import reducer, * as suggestions from '../../../src/modules/suggestions';
import { place1, place2 } from '../../mock_data';

describe('suggestions actions', () => {
    it('should create an action to set current suggestions', () => {
        const sampleSuggestion = place1;

        const expectedAction = {
            type: suggestions.SET_SUGGESTIONS,
            suggestions: sampleSuggestion
        };

        expect(suggestions.setSuggestions(sampleSuggestion)).to.deep.equal(expectedAction);
    });

    it('should create an action to add a suggestion to current suggestions', () => {
        const sampleSuggestion = place1;

        const expectedAction = {
            type: suggestions.ADD_SUGGESTION,
            suggestion: sampleSuggestion
        };

        expect(suggestions.addSuggestion(sampleSuggestion)).to.deep.equal(expectedAction);
    });

    it('should create an action to remove a suggestion from current suggestions', () => {
        const index = 1;

        const expectedAction = {
            type: suggestions.REMOVE_SUGGESTION,
            index
        };

        expect(suggestions.removeSuggestion(index)).to.deep.equal(expectedAction);
    });

    it('should create an action to clear current suggestions', () => {
        const expectedAction = {
            type: suggestions.CLEAR_SUGGESTIONS,
        };

        expect(suggestions.clearSuggestions()).to.deep.equal(expectedAction);
    });
});
