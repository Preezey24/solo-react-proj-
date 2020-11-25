import * as commentActions from './comment';
// import { fetch } from './csrf';

const ADD_PHOTOS = 'photos/addPhotos'
const ADD_PHOTO = 'photos/addPhoto'

const addPhotos = (photos) => {
    return {
        type: ADD_PHOTOS, 
        payload: photos, 
    };
};

const addPhoto = (photo) => {
    return {
        type: ADD_PHOTO, 
        payload: photo, 
    }
}

export const getPhotos = () => async (dispatch) => {
    const response = await fetch('/api/photos');
    const data = await response.json();   
    dispatch(addPhotos(data));
    return data; 
};

export const getSinglePhoto = (photoId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}`);
    const photo = await response.json(); 
    dispatch(addPhoto(photo)); 
    dispatch(commentActions.getComments(photo.comments));
    return photo; 
}

const initialState = {};

const photoReducer = (state = initialState, action) => {
    let newState; 
    switch (action.type) {
        case ADD_PHOTOS: 
            return action.payload; 
        case ADD_PHOTO: 
            return action.payload; 
        default:
            return state; 
    }
}; 

export default photoReducer; 