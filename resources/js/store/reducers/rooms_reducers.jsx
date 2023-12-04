const initialState = {
     Rooms: null,
};

const roomsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setRooms':
            return {
                ...state,
                Rooms: action.payload,
            };

        default:
            return state;
    }
};

export default roomsReducer;
