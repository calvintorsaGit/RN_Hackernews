import {useState} from "react";

const commentHooks = () => {
    const [comments, setComments] = useState([]);
    const [kids, setKids] = useState([]);

    return {
        comments,
        setComments,
        kids,
        setKids
    };
};

export default commentHooks;
