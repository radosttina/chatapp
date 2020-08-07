import {SET_USER_NAME, SET_ROOM} from '../actions/types';

const initialState = {
    user: '',
    room: ''
}

export default function(state = initialState, action) {
    switch (action.type){
        case SET_USER_NAME:
            return {
                ...state,
                user: action.user
            }
        case SET_ROOM:
            return {
                ...state,
                room: action.room
            }
        default:
            return state;
    }
}