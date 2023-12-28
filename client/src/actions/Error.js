export const showError =(data)=>async(dispatch)=>{
    await dispatch({type:"ERROR", payload:data})
    setTimeout(()=>
    {
        dispatch(clrError())
    },3000)
}
export const clrError =()=>{
    return{
        type:"CLEAR",
    }
}

export const loader=(stateL)=>async(dispatch)=>{
    await dispatch({type:'LOAD',payload:stateL})
}

export const showMessage =(data)=>async(dispatch)=>{
    await dispatch({type:"MESSAGE", payload:data})
    setTimeout(()=>
    {
        dispatch(clrError())
    },3000)
}
