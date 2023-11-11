import { GETUSERFAILURE, GETUSERREQUEST, GETUSERSUCCESS } from "./actionType"
import { User } from "./reducer";

export const getUserRequest = () => {
    return {type: GETUSERREQUEST};
}

export const getUserFailure = () => {
    return {type: GETUSERFAILURE}
}

export const getUserSuccess = (payload:User) => {
    return {type: GETUSERSUCCESS, payload: payload}
} 
