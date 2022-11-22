import {
  GET_DETAILS,
  POST_VOTE_DETAILS,
  GET_DETAILS_USER,
  DELETE_OPTION_DETAILS,
  GET_DETAILS_REQUEST,
  GET_DETAILS_USER_REQUEST,
} from "../type";

const initialState = {
  details: [],
  detailsById: [],
  userDetails: [],
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case GET_DETAILS_REQUEST:
      return {
        ...state,
        details: [],
        loading: true,
      };
    case GET_DETAILS_USER:
      return {
        ...state,
        userDetails: action.payload,
      };
    case GET_DETAILS_USER_REQUEST:
      return {
        ...state,
        userDetails: [],
        loading: true,
      };
    case DELETE_OPTION_DETAILS:
      return {
        ...state,
        deleteOption: action.payload,
      };

    case POST_VOTE_DETAILS: {
      const currentPoll = state.details.findIndex(
        (poll) => poll._id === action.payload.id
      );
      const currentVote = state.details[currentPoll].options.findIndex(
        (vote) => vote.option === action.payload.option
      );
      state.details[currentPoll].options[currentVote].vote += 1;
      const updatedState = {
        ...state,
        details: [...state.details],
      };

      console.log(updatedState);
      return updatedState;
    }
    default:
      return state;
  }
};

export default Reducer;
