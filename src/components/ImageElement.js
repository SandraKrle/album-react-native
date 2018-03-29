import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Image, Text } from 'react-native';

class ImageElement extends Component {
  render() {
    return (
      <View>
        <Image
          source={{ uri: this.props.navigation.state.params.photo.url }}
          style={styles.image}
        />
        <Text>{this.props.navigation.state.params.photo.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
    alignSelf: 'stretch',
  },
});

ImageElement.propTypes = {
  photo: PropTypes.object,
};

export default ImageElement;
