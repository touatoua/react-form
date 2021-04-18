import { ADD_FORM,DELETE_FORM } from '../actions/form'

const initialState = {
    form: localStorage.getItem('form') ? JSON.parse(localStorage.getItem('form')) : []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case ADD_FORM:
            let id = state.form.length ? state.form[state.form.length - 1].id + 1 : 1
            state.form.push({ ...payload, id })
            localStorage.setItem('form', JSON.stringify(state.form))
            return { ...state }

            case DELETE_FORM:
            localStorage.setItem('form', JSON.stringify(payload))

            return {...state}

        default:
            return state
    }
}
