export const authReducer=(state=null,actions)=>{
    switch (actions.type) {
        case 'AUTH':
            localStorage.setItem('Profile',JSON.stringify({...actions.data}))
            return {...state,data:actions.data}
        default:
            return state
    }
}