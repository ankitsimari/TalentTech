import { GETUSERFAILURE, GETUSERREQUEST, GETUSERSUCCESS } from "./actionType";

type Score = {
    Subject_Matter: number;
    Communication: number;
};

export type User = {
    username: string;
    email: string;
    password: string;
    scores: Score[];
};

export type InitState = {
    isLoading: boolean;
    isError: boolean;
    user: User;
};

const initState: InitState = {
    isLoading: false,
    isError: false,
    user: {
        username: "",
        email: "",
        password: "",
        scores: [],
    },
};

type Action = {
    type: string;
    payload: User;
};

export const reducer = (state = initState, { type, payload }: Action) => {
    switch(type) {
        case GETUSERREQUEST: 
            return {...state, isLodading: true};
            break;
        case GETUSERFAILURE:
            return {...state, isLoading: false, isError:true};
            break;
        case GETUSERSUCCESS:
            return {...state, isLoading: false, isError: false, user: {...payload}}
            break;
        default:
            return {...state};
    }
}
