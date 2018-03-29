import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as photosActions from '../actions/photosActions';
import { Container, Content, Text } from 'native-base';
import {
  FlatList,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const equalWidth = width / 2;

class AlbumsScreen extends Component {
  static navigationOptions = {
    title: 'Albums',
  };

  constructor(props) {
    super(props);

    this.getAlbums = this.getAlbums.bind(this);
    this.renderAlbumItem = this.renderAlbumItem.bind(this);
  }

  componentDidMount() {
    this.props.photosActions.fetchPhotos();
  }

  getAlbums() {
    const albums = [];
    this.props.photos.filter(album => {
      const i = albums.findIndex(x => x.albumId === album.albumId);
      if (i <= -1) {
        albums.push({
          albumId: album.albumId,
          thumbnailUrl: album.thumbnailUrl,
        });
      }
      return null;
    });
    return albums;
  }

  renderAlbumItem(itemData) {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('ImagesScreen', { albumId: itemData.item.albumId, photos: this.props.photos })
        }
      >
        <View>
          <Image
            style={{ height: 150, width: equalWidth }}
            source={{ uri: itemData.item.thumbnailUrl }}
            resizeMode="cover"
          />
          <Text>Album: {itemData.item.albumId}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container>
        <Content padder>
          <View style={{ flex: 1, paddingTop: 20 }}>
            <View>
              <FlatList
                data={this.getAlbums()}
                numColumns={2}
                keyExtractor={(item, index) => index}
                renderItem={this.renderAlbumItem}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

AlbumsScreen.propTypes = {
  photosActions: PropTypes.object,
  photos: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    photos: state.photos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    photosActions: bindActionCreators(photosActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsScreen);
