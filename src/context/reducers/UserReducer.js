const UserReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.users ,
                numberOfUsers: action.users.length
            }
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUserId: action.id ,
                currentUserEmail: action.email
            }
        case 'DELETE_CURRENT_USER':
            return {
                ...state,
                currentUserId: null ,
                currentUserEmail: null
            }

        default:
            return state
    }
}

export default UserReducer