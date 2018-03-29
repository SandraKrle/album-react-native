import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback, FlatList, Image, Dimensions, } from 'react-native';
import ImageElement from './ImageElement';

const { width, height } = Dimensions.get('window');

const equalWidth = width / 3;

class ImagesScreen extends Component {
  constructor() {
    super();
    this.renderImageElement = this.renderImageElement.bind(this);
  }
  static navigationOptions = {
    title: 'Photos',
  };

  renderImageElement(itemData) {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.props.navigation.navigate('ImageElement', {
            photo: itemData.item,
          })
        }
      >
        <View>
          <Image
            style={{ height: 150, width: equalWidth }}
            source={{ uri: itemData.item.thumbnailUrl }}
            resizeMode="cover"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { params } = this.props.navigation.state;
    const albumId = params ? params.albumId : null;
    const photos = params ? params.photos : null;

    const albumPhotos = photos.filter(photo => {
      return photo.albumId === albumId;
    });

    return (
      <View>
        <FlatList
          data={albumPhotos}
          numColumns={4}
          keyExtractor={(item, index) => index}
          renderItem={this.renderImageElement}
        />
      </View>
    );
  }
}

ImagesScreen.propTypes = {
  photos: PropTypes.array,
};

export default ImagesScreen;
