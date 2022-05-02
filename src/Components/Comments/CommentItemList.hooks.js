import React, {useState} from 'react';
import {useWindowDimensions} from "react-native";

const commentItemListHooks = () => {
    const [repliesShown, setRepliesShown] = useState(false)
    const { width } = useWindowDimensions();
    const [kids, setKids] = useState([]);

    return {
        repliesShown,
        setRepliesShown,
        width,
        kids,
        setKids
    }
}

export default commentItemListHooks
