export const reducer = (state, action) => {
    switch (action.type) {
        case 'addMeal':
            return;
        case 'addTest':
            return;
        case 'delete':
            return;
        case 'refresh':
            return;
        case 'setPage':
            return {...state, page: action.payload};
        default:
            throw new Error();
    }
}