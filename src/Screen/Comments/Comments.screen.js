import React, {useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import get from 'lodash/get'
import {getComment} from "../../Network/api";
import commentHooks from './Comments.hooks'
import CommentItemList from '../../Components/Comments/CommentItemList'

const getComments = (hooks, kids) => {
    Promise.all(kids.map(getComment))
        .then(comments => {
            console.log(comments);
            hooks.setComments(comments);
        })
}

const initiateData = (hooks, props) => {
    const kids = get(props, 'route.params.kids', []);
    useEffect(() => {
        hooks.setKids(kids);
        getComments(hooks, kids);
    }, []);
}

const _renderItem = ({item}) => {
    return <CommentItemList item={item}/>
}

const Comments = (props) => {
    const hooks = commentHooks()
    initiateData(hooks, props)

    return (
        <SafeAreaView style={styles.backgroundStyle}>
            <Text style={styles.titleText}>{get(props, 'route.params.title')}</Text>
            <FlatList
                data={hooks.comments}
                renderItem={_renderItem}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backgroundStyle : {
        flex: 1,
        backgroundColor: '#f8f4ec',
    },
    titleText:{
        margin: 4,
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default Comments
