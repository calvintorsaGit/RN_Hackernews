import React from 'react';
import renderer from 'react-test-renderer';
import Home from './Home.screen';
import { Provider } from "react-redux"
import fetch from "node-fetch";
import configureStore from "../../Redux/Store/configureStore";
const store = configureStore()
globalThis.fetch = fetch

const HomeWrapper = () => (
    <Provider store={store}>
        <Home/>
    </Provider>
);

test('renders correctly', () => {
    const tree = renderer.create(<HomeWrapper />).toJSON();
    expect(tree).toMatchSnapshot();
});
