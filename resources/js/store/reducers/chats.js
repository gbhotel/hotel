import {addChatAC, ADD_CHAT, REMOVE_CHAT} from '../actions/chatsActions';


const initinalState = [
    {
        id: 1,
        title: 'jon',
        message: 'What the fuck?'
    },
    {
        id: 2,
        title: 'jon',
        message: 'Go fuck yourself!'
    },
    {
        id: 3,
        title: 'Ben',
        message: 'Give me the money, asshole!'
    },
];

export const chatsReducer = (state = initinalState, action) => {
    switch (actoin.type){
        case ADD_CHAT:{
            return [...state, action.payload]
        }
        case REMOVE_CHAT: {
            return [...state.filter((e,i)=> i < state.length - 1)]
        }
        default: return state
    }
}
