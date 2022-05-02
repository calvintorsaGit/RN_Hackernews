import { createAction } from 'redux-actions';
import typeToReducer from 'type-to-reducer';
import {
    FETCH_STORIES_SUCCESS,
    FETCH_MORE_STORIES_SUCCESS,
    CLEAR_REFRESH_STORIES
} from '../Action/actionType';

// Actions
const fetchStoriesSucess = createAction(FETCH_STORIES_SUCCESS);
const fetchMoreStoriesSucess = createAction(FETCH_MORE_STORIES_SUCCESS);
const clearRefreshStories = createAction(CLEAR_REFRESH_STORIES);

export const actions = {
    fetchStoriesSucess,
    fetchMoreStoriesSucess,
    clearRefreshStories
};

// Reducer
export const initialState = {
    idStories: [],
    stories: []
};

const setIdStories = (state, action) => ({
    ...state,
    idStories: action.payload
});

const setStories = (state, action) => ({
    ...state,
    stories: state.stories.concat(action.payload)
});

const refreshStories = (state, action) => ({
    ...state,
    stories: [],
    idStories: []
});

export default typeToReducer({
    [FETCH_STORIES_SUCCESS]: setIdStories,
    [FETCH_MORE_STORIES_SUCCESS]: setStories,
    [CLEAR_REFRESH_STORIES]: refreshStories,
}, initialState);
