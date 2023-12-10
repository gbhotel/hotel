const initialState = {
     Tasks: [],
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setTasks':
            return {
                ...state,
                Tasks: action.payload,
            };
        case 'updateTasks' :
            return {

            }

        default:
            return state;
    }
};

export default tasksReducer;
