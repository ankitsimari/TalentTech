import { combineReducers, legacy_createStore } from "redux";
import {reducer as authReducer} from "./auth/reducer";
import {reducer as interviewReducer} from "./interview/reducer";

const rootReducer = combineReducers({  
    authReducer,
    interviewReducer
})
export const store = legacy_createStore(rootReducer);