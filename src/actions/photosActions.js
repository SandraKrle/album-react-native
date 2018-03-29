import * as allActions from './allActions';

export function receivePhotos(data) {
  return { type: allActions.RECEIVE_PHOTOS, photos: data };
}

export function fetchPhotos() {
  return dispatch => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response =>
        response.json().then(data => ({
          data: data,
          status: response.status,
        })),
      )
      .then(response => {
        if (response.status === 200) {
          dispatch(receivePhotos(response.data));
        } else {
          const flash = {
            type: 'error',
            title: 'Error getting photos',
            content: 'There was an error getting the photos. Please try again.',
          };
          dispatch({ type: 'DISPLAY_FLASH', data: flash });
        }
      });
  };
}
