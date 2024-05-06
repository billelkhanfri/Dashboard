// src/store/reducers/subscriberReducer.js

import {
  DELETE_SUBSCRIBER_SUCCESS,
  DELETE_SUBSCRIBER_FAILURE,
} from "../actions/types";

const initialState = {
  subscribers: [],
  loading: false,
  error: null,
};

const subscriberReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_SUBSCRIBER_SUCCESS:
      return {
        ...state,
        subscribers: state.subscribers.filter(
          (subscriber) => subscriber.id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case DELETE_SUBSCRIBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default subscriberReducer;
