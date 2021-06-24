import {
    SHOW_ALERT,
    HIDE_ALERT
}
from  '../types'

export function showAlertAction(alert){
    return(dispatch) =>{
        dispatch({
            type:SHOW_ALERT,
            payload: alert
        })
    }
}


export function hideAlertAction(){
    return(dispatch) =>{
        dispatch({
            type:HIDE_ALERT,
        })
    }
}