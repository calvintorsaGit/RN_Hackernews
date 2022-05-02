import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import HomeItemList from '../../Components/Home/HomeItemList'
import homeHooks from "./Home.hooks";

const initateData = (hooks) => {
    useEffect(() => {
        hooks.getIdStories();
    }, [hooks.idStories]);

    if (hooks.idStories.length > 0 && hooks.reload) {
        hooks.setReload(false);
        const selectedStory = hooks.idStories.slice(0, 15);
        hooks.getMoreStories(selectedStory)
        hooks.setRefreshing(false);
    }
}

const _renderItem = ({item, index}) => {
    return <HomeItemList item={item} index={index + 1}/>
}

export const _onRefresh = (hooks) => {
    hooks.setRefreshing(true)
    hooks.setReload(true);
    hooks.refreshStories();
}

export const _onLoadMore = (hooks) => {
    const selectedStory = hooks.idStories.slice(hooks.listIndex + 1, hooks.listIndex + 10);
    hooks.setListIndex(hooks.listIndex + 10);
    hooks.getMoreStories(selectedStory)
}

const Home = () => {
    const hooks = homeHooks()
    initateData(hooks)

    return (
        <SafeAreaView style={styles.backgroundStyle}>
            <FlatList
                data={hooks.stories}
                renderItem={_renderItem}
                onRefresh={() => _onRefresh(hooks)}
                refreshing={hooks.refreshing}
                onEndReachedThreshold={0.4}
                onEndReached={() => _onLoadMore(hooks)}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        backgroundColor: '#f8f4ec',
    }
});

export default Home
