import Reducer from "./reducer";
import { combineReducers } from "redux";
import authSlice from "./authSlice";

const RootReducer = combineReducers({
  reducer: Reducer,
  authSlice,
});

export default RootReducer;
