const UserReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: action.users ,
                numberOfUsers: action.users.length
            }
        case 'ADD_USER':
            return {
                ...state,
                users: [...state.users , action.user] ,
                numberOfUsers: state.numberOfUsers +1
            }
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUserId: action.id ,
                currentUserEmail: action.email
            }
        case 'SET_CURRENT_USER_ROLE':
            return {
                ...state,
                currentUserRole: action.role
            }
        case 'DELETE_CURRENT_USER':
            return {
                ...state,
                currentUserId: null ,
                currentUserEmail: null
            }
        case 'TOGGLE_TRANSPARENT':
            return {
                ...state,
                transparent: !state.transparent 
            }

        default:
            return state
    }
}

export default UserReducer