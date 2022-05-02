import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchIdStories,
    fetchMoreStories,
} from '../../Redux/Action/ItemListAction';

import {actions} from '../../Redux/Reducer/ItemListReducer'

const homeHooks = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [reload, setReload] = useState(true);
    const [listIndex, setListIndex] = useState(20);
    // const [idStories, setIdStories] = useState([]);
    const itemListReducer = useSelector(state => state.itemListReducer);
    const idStories = itemListReducer.idStories;
    const stories = itemListReducer.stories;

    const dispatch = useDispatch();
    const refreshStories = () => dispatch(actions.clearRefreshStories())
    const getIdStories = () => dispatch(fetchIdStories('topstories'));
    const getMoreStories = (ids) => dispatch(fetchMoreStories(ids, 'topstories'));

    return {
        stories,
        refreshing,
        setRefreshing,
        listIndex,
        setListIndex,
        idStories,
        getIdStories,
        getMoreStories,
        refreshStories,
        reload,
        setReload
    };
};

export default homeHooks;
