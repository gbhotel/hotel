const initialState = {
    Staff: null,
};

const staffReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setStaff':
            return {
                ...state,
                Staff: action.payload,
            };

        default:
            return state;
    }
};

export default staffReducer;
