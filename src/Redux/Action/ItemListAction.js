import {
    FETCH_STORIES_SUCCESS,
    FETCH_MORE_STORIES_SUCCESS
} from './actionType';

import { getItem, getNews } from '../../Network/api';

export function fetchIdStoriesSuccess(category, idStories) {
    return {
        type: FETCH_STORIES_SUCCESS,
        payload: idStories
    };
}

export function fetchMoreStoriesSuccess(stories, category) {
    return {
        type: FETCH_MORE_STORIES_SUCCESS,
        payload: stories,
        category
    };
}

export function fetchIdStories(category) {
    return dispatch => {
        return getNews(category)
            .then(idStories => dispatch(fetchIdStoriesSuccess(category, idStories)))
            .catch(() => {});
    };
}

export function fetchMoreStories(ids, category) {
    return dispatch => {
        return Promise.all(ids.map(getItem))
            .then(stories => dispatch(fetchMoreStoriesSuccess(stories, category)))
            .catch(() => {});
    };
}
