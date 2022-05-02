import {_onRefresh, _onLoadMore} from './Home.screen'
import React from 'react'

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
jest.mock('../../Network/api', () => ({
    getItem: jest.fn(),
    getNews: jest.fn(() => Promise.resolve())
}))

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: mockedNavigate,
        }),
    };
});

const idStories = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]

describe('Home Screen Test', () => {
    const initalHooks = {
        stories: [{dummy: 1}],
        setStories: jest.fn(),
        setReload: jest.fn(),
        refreshStories: jest.fn(),
        getMoreStories: jest.fn(),
        refreshing: undefined,
        setRefreshing: jest.fn(),
        listIndex: 10,
        setListIndex: jest.fn(),
        idStories: idStories,
        setIdStories: jest.fn(),
    }

    describe('_onRefresh', () => {
        beforeEach(jest.clearAllMocks);

        it('should call setRefreshing, setReload, refreshStories', () => {
            _onRefresh(initalHooks)
            expect(initalHooks.setRefreshing).toHaveBeenCalledWith(true)
            expect(initalHooks.setReload).toHaveBeenCalledWith(true)
            expect(initalHooks.refreshStories).toBeCalled()
        });
    });

    describe('_onLoadMore', () => {
        beforeEach(jest.clearAllMocks);

        it('should call setListIndex with param listIndex + 10, refreshStories', () => {
            _onLoadMore(initalHooks)
            expect(initalHooks.setListIndex).toHaveBeenCalledWith(initalHooks.listIndex + 10)
            expect(initalHooks.getMoreStories)
                .toHaveBeenCalledWith(idStories.slice(initalHooks.listIndex + 1, initalHooks.listIndex + 10))
        });
    });
})
