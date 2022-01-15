const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification;
        default:
            return state;
    }
};

export const setNotification = (notification, seconds) => {
    return (dispatch) => {
        const milliseconds = seconds * 1000;
        dispatch({
            type: 'SET_NOTIFICATION',
            notification,
        });
        // ? do i need to add await? is set TimeOut async?
        setTimeout(
            () =>
                dispatch({
                    type: 'SET_NOTIFICATION',
                    notification: '',
                }),
            milliseconds
        );
    };
};

export default notificationReducer;
