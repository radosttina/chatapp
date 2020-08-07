import {
  GET_LAST_MESSAGES,
  RECEIVE_MESSAGE,
  GET_ACTIVE_USERS,
  ADD_USER_ACTIVE,
  REMOVE_USER_ACTIVE,
} from "../actions/types";

const initialState = {
  messages: [],
  activeUsers: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LAST_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
      };
    case GET_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: action.activeUsers,
      };
    case ADD_USER_ACTIVE:
      return {
        ...state,
        activeUsers: [...state.activeUsers, action.user],
      };
    case REMOVE_USER_ACTIVE:
      return {
        ...state,
        activeUsers: state.activeUsers.filter((user) => user !== action.user),
      };
    default:
      return state;
  }
}
