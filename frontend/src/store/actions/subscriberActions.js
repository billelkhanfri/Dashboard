// src/store/actions/subscriberActions.js

import axios from "axios";
import { deleteSubscriberSuccess, deleteSubscriberFailure } from "./types";

export const deleteSubscriber = (subscriberId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:3000/tecmoled/subscriber/${subscriberId}`
    );
    dispatch(deleteSubscriberSuccess(subscriberId));
  } catch (error) {
    dispatch(deleteSubscriberFailure(error));
  }
};
