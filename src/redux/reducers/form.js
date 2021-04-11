import { ADD_FORM } from '../actions/form'

const initialState = {
    form: localStorage.getItem('form') ? JSON.parse(localStorage.getItem('form')) : []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case ADD_FORM:
            state.form.push(payload)
            localStorage.setItem('form', JSON.stringify(state.form))
            return { ...state }

        default:
            return state
    }
}
