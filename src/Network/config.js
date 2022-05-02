export const API_ENDOINT = 'https://hacker-news.firebaseio.com/v0/';

export const HN_SHOW_STORIES_ENDPOINT = API_ENDOINT+'showstories.json';

export const categoryEndPoint = category => {
  return API_ENDOINT + category + '.json';
};

export const itemEndPoint = id => {
  return API_ENDOINT + 'item/' + id + '.json';
};


