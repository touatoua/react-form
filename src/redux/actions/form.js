export const ADD_FORM = 'ADD_FORM'
export const DELETE_FORM = 'DELETE_FORM'
export const EDIT_FORM = 'EDIT_FORM'


export const setStateToAdd = () => ({
    type: ADD_FORM
})

export const setStateToDelete = () => ({
    type: DELETE_FORM
})

export const setStateToEdit = (payload) => ({
    type: EDIT_FORM,
    payload
})



export const onAdd = () => {
    return dispatch => {
        dispatch(setStateToAdd())
    }
}


export const onDelete = () => {
    return dispatch => {
        dispatch(setStateToDelete())
    }
}

export const onEdit = (payload) => {
    return dispatch => {
        dispatch(setStateToEdit(payload))
    }
}