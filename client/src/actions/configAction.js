import { SET_ROOM, SET_USER_NAME } from './types';

export const setRoom = (room) => dispatch => {
    dispatch({
        type: SET_ROOM,
        room
    })
}

export const setUserName = (user) => dispatch => {
    dispatch({
        type: SET_USER_NAME,
        user
    })
}