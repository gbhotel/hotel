const initialState = {
     TasksName : null,
};

const tasksNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setTasksName':
            return {
                ...state,
                TasksName: action.payload,
            };

        default:
            return state;
    }
};

export default tasksNameReducer;
