import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import configureStore from './src/store/confiqureStore';
import AlbumsScreen from './src/components/AlbumsScreen';
import ImagesScreen from './src/components/ImagesScreen';
import ImageElement from './src/components/ImageElement';

const store = configureStore();

const RootNav = StackNavigator(
  {
    AlbumsScreen: { screen: AlbumsScreen },
    ImagesScreen: { screen: ImagesScreen },
    ImageElement: { screen: ImageElement },
  },
  {
    initialRouteName: 'AlbumsScreen',
  },
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNav />
      </Provider>
    );
  }
}
