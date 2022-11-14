import { GET_DETAILS, GET_DETAILS_USER, DELETE_OPTION_DETAILS } from "../type";

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
        case GET_DETAILS_USER:
            return {
                ...state,
                userDetails: action.payload,
            };
        case DELETE_OPTION_DETAILS:
            return {
                ...state,
                deleteOption: action.payload,
            };
        default:
            return state;
    }
};

export default Reducer;