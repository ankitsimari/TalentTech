import { ADD_INTERRACTION_FAILURE, ADD_INTERRACTION_REQUEST, ADD_INTERRACTION_SUCCESS, SET_INITIAL_PROMPT_FAILURE, SET_INITIAL_PROMPT_REQUEST, SET_INITIAL_PROMPT_SUCCESS } from "./actionType";

export type Interaction = {
    role: string;
    content: string;
}
export type InitialPrompt = {
    techStack: string;
    options: string[];
};

export type InitState = {
    isLoading: boolean;
    isError: boolean;
    initialPrompt: InitialPrompt,
    conversation: Interaction[]
};

const initState:InitState = {
    isLoading: false,
    isError: false,
    initialPrompt: {
        techStack: "",
        options: []
    },
    conversation: []
}

type Action = {
    type: string;
    payload: InitialPrompt | Interaction;
};

export const reducer = (state = initState, { type, payload }: Action) => {
    switch(type) {

        case SET_INITIAL_PROMPT_REQUEST:
            return {...state, isLoading: false};
            break;
        case SET_INITIAL_PROMPT_FAILURE:
            return {...state, isLoading: false, isError: true};
            break;
        case SET_INITIAL_PROMPT_SUCCESS:
            return {...state, isLoading: true, isError:false, initialPrompt: {...payload}}
            break;
        case ADD_INTERRACTION_REQUEST:
            return {...state, isLoading: false};
            break;
        case ADD_INTERRACTION_FAILURE:
            return {...state, isLoading: false, isError: true};
            break;
        case ADD_INTERRACTION_SUCCESS:
            return {...state, isLoading: false, isError: false, conversation: [...state.conversation, payload]}
        default:
            return {...state};
    }
}
