import {
    fetchMoreStories,
    fetchIdStories
} from '../Redux/Action/ItemListAction';
import * as types from '../../src/Redux/Action/actionType';

import { expect } from 'chai';
import nock from 'nock';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

import { API_ENDOINT } from '../Network/config';

describe('API Story Actions', () => {
    let store;

    beforeEach(() => store = mockStore({}));

    afterAll(() => nock.cleanAll());

    it('should dispatch FETCH_STORIES_SUCCESS when fetching stories for a category has been done', () => {
        global.fetch = jest.fn().mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve([1,2,3]),
            })
        )

        nock(API_ENDOINT).get('/topstories.json').reply(200, [1, 2, 3]);

        const expectedActions = [
            {
                payload: [1, 2, 3],
                type: types.FETCH_STORIES_SUCCESS,
            }
        ];

        const actions = store.getActions();

        return store
            .dispatch(fetchIdStories('topstories'))
            .then(() => expect(actions).to.eql(expectedActions));
    });

    it('should dispatch FETCH_MORE_STORIES_SUCCESS when fetching individual stories for a category has been done', () => {
        const story = {
            by: 'burgessct',
            descendants: 0,
            id: 15527605,
            score: 2,
            time: 1508690353,
            title: 'GPS Smartwatch for your Grandchild? Many are flawed',
            type: 'story',
            url: 'https://www.senioronlinesafety.com/gps-smartwatch-grandchild-many-flawed/'
        };

        nock(API_ENDOINT).get('/item/15527605.json').reply(200, story);

        global.fetch = jest.fn().mockImplementationOnce(() =>
            Promise.resolve({
                status: 200,
                json: () => Promise.resolve(story),
            })
        )

        const expectedActions = [
            {
                type: types.FETCH_MORE_STORIES_SUCCESS,
                payload: [story],
                category: 'newstories'
            }
        ];

        const actions = store.getActions();

        return store
            .dispatch(fetchMoreStories([15527605], 'newstories'))
            .then(() => expect(actions).to.eql(expectedActions));
    });
});
