import { GET_LAST_MESSAGES, RECEIVE_MESSAGE, ADD_USER_ACTIVE, REMOVE_USER_ACTIVE , GET_ACTIVE_USERS } from './types';
import axios from 'axios';

export const getMessages = (room, limit) => dispatch => {
    axios.get(`/get?room=${room}&limit=${limit}`)
        .then(res => dispatch({
            type: GET_LAST_MESSAGES,
            messages: res.data
        }))
}

export const receiveMessage = (msg) => dispatch => {
    dispatch({
        type: RECEIVE_MESSAGE,
        newMessage: msg
    })
}

export const getActiveUsers = (room) => dispatch => {
    axios.get(`/getUsersInRoom?room=${room}`)
    .then(res => dispatch({
        type: GET_ACTIVE_USERS,
        activeUsers: res.data
    }))
}

export const addUserToActive = (user) => dispatch => {
    dispatch({
        type: ADD_USER_ACTIVE,
        user: user
    })
} 

export const removeUserFromActive = (user) => dispatch => {
    dispatch({
        type: REMOVE_USER_ACTIVE,
        user: user
    })
}