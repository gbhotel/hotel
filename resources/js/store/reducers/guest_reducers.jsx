
const initialState = {
    RoomInfoForGuest: null,
};

const setRoomInfoForGuestReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setRoomInfoForGuest':
            return {
                ...state,
                RoomInfoForGuest: action.payload,
            };
        default:
            return state;
    }
};

export default setRoomInfoForGuestReducer;
