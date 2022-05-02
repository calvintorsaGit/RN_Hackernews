import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {navigateToComments} from '../../Utils/Navigation'
import get from 'lodash/get'
import {useNavigation} from "@react-navigation/native";

const topSection = (props) => (
    <View style={styles.textContainer}>
        <Text style={styles.titleText}>{props.item.title}</Text>
    </View>
)

const bottomSection = (props) => {
    const navigation = useNavigation();
    const totalComments = get(props, 'item.kids', [])
    return <View style={styles.SectionContainer}>
        <Text>{props.item.score} points by {props.item.by} | </Text>
        <TouchableOpacity onPress={navigateToComments.bind(this, navigation, props.item)}>
            <Text style={styles.commentText}>{totalComments.length} comments</Text>
        </TouchableOpacity>
    </View>
}

const _renderItemView = (props) => (
    <View style={styles.parentContainer}>
        <Text style={styles.numberText}>{props.index}.</Text>
        <View>
            {topSection(props)}
            {bottomSection(props)}
        </View>
    </View>
)

const HomeItemList = (props) => (
    <View style={styles.viewContainer}>
        {_renderItemView(props)}
    </View>
)

const styles = StyleSheet.create({
    viewContainer : {
        marginVertical: 4,
        marginHorizontal: 8
    },
    parentContainer: {
        flexDirection: 'row',
        paddingRight: 32
    },
    textContainer:{
        flex:1
    },
    SectionContainer: {
        marginVertical: 4,
        flexDirection: 'row'
    },
    titleText:{
      fontWeight: 'bold',
      fontSize: 16
    },
    numberText: {
        marginRight: 4,
        fontSize: 20,
        fontWeight: 'bold'
    },
    commentText: {
        color: '#FF8C00',
        fontWeight: 'bold'
    },
});

export default HomeItemList;
