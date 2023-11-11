import { GETUSERFAILURE, GETUSERREQUEST, GETUSERSUCCESS } from "./actionType"

export const getUserRequest = () => {
    return {type: GETUSERREQUEST};
}