export const ADD_FORM = 'ADD_FORM'
export const DELETE_FORM = 'DELETE_FORM'
export const EDIT_FORM = 'EDIT_FORM'


export const setStateToAdd = (payload) => ({
    type: ADD_FORM,
    payload: payload
})

export const setStateToDelete = () => ({
    type: DELETE_FORM
})

export const setStateToEdit = (payload) => ({
    type: EDIT_FORM,
    payload
})



export const onAdd = (payload) => {
    return dispatch => {
        dispatch(
            setStateToAdd(payload))

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