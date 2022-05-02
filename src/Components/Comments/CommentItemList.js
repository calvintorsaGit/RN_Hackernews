import React, {Fragment} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import get from 'lodash/get';
import RenderHtml from 'react-native-render-html';
import commentItemListHooks from './CommentItemList.hooks'

const _renderItemView = (props) => {
    const timestamp = get(props, 'item.time', 0);
    const kidsComment = get(props, 'item.kids', []);
    const date = new Date(timestamp * 1000);
    const hooks = commentItemListHooks();

    return <View style={styles.SectionContainer}>
        <View style={styles.titleContainer}>
            <Text>by {get(props, 'item.by', '')} | </Text>
            <Text>{date.getDay()}-{date.getMonth()}-{date.getFullYear()}</Text>
        </View>
        <RenderHtml
            contentWidth={hooks.width}
            source={{html: get(props, 'item.text', '')}}
        />
        {kidsComment.length > 0 ? _renderButtonReplies(props, hooks) : null}
    </View>
}

const _renderItem = ({item}) => {
    return <CommentItemList item={item}/>
}

const _renderCommentLayer1 = (props) => {
    const kidsComment = get(props, 'item.kids', [])
    return <FlatList
        data={kidsComment}
        renderItem={_renderItem}
    />
}

const _renderButtonReplies = (props, hooks) => (
    <View>
        <TouchableOpacity style={styles.buttonViewReplies} onPress={() => hooks.setRepliesShown(!hooks.repliesShown)}>
            <Text style={styles.commentText}>{hooks.repliesShown ? 'Hide replies' : 'View replies'}</Text>
        </TouchableOpacity>
        {hooks.repliesShown && _renderCommentLayer1(props)}
    </View>
)

const CommentItemList = (props) => (
    <View style={styles.viewContainer}>
        {_renderItemView(props)}
    </View>
)

const styles = StyleSheet.create({
    viewContainer: {
        marginVertical: 4,
        marginHorizontal: 12
    },
    titleContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    SectionContainer: {
        padding: 4,
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 4,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    commentText: {
        color: '#FF8C00',
        fontWeight: 'bold'
    },
    buttonViewReplies: {
        marginVertical: 8
    },
});

export default CommentItemList;
