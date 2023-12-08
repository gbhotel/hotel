const initialState = {
     Tasks: null,
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setTasks':
            return {
                ...state,
                Tasks: action.payload,
            };

        default:
            return state;
    }
};

export default tasksReducer;
