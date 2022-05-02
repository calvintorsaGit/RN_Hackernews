/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/Screen/Home/Home.screen'
import Comments from './src/Screen/Comments/Comments.screen'
import configureStore from  './src/Redux/Store/configureStore'
import { Provider } from 'react-redux';
const store = configureStore()
const Stack = createStackNavigator();

const App: () => Node = () => {
    return (
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={homeOption}/>
                <Stack.Screen name="Comments" component={Comments} options={commentsOption}/>
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    );
};

const baseOption = {
    headerStyle: {
        backgroundColor: '#FF8C00',
    },
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}

const homeOption = {
    title: 'Hacker News',
    ...baseOption
}

const commentsOption = {
    title: 'Comments',
    ...baseOption
}

export default App;
