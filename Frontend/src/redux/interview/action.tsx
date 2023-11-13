import { ADD_INTERRACTION_FAILURE, ADD_INTERRACTION_REQUEST, ADD_INTERRACTION_SUCCESS, SET_INITIAL_PROMPT_FAILURE, SET_INITIAL_PROMPT_REQUEST, SET_INITIAL_PROMPT_SUCCESS } from "./actionType"
import { InitialPrompt, Interaction } from "./reducer";

// export const setInitialPromptRequest = () => {
//     return {type: SET_INITIAL_PROMPT_REQUEST};
// }

// export const setInitialPromptFailure = () => {
//     return {type: SET_INITIAL_PROMPT_FAILURE}
// }

export const setInitialPromptSuccess = (payload:InitialPrompt) => {
    return {type: SET_INITIAL_PROMPT_SUCCESS, payload: payload}
} 

export const addInteractionRequest = () => {
    return {type: ADD_INTERRACTION_REQUEST};
}

export const addInteractionFailure = () => {
    return {type: ADD_INTERRACTION_FAILURE};
}

export const addInteractionSuccess = (payload: any) => {
    return {type: ADD_INTERRACTION_SUCCESS, payload: payload};
}