const initialState = {
    form: [
        { id: '2312', name: 'asdasd', price: 'asdasd' }
    ]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case 'typeName':
            return { ...state, ...payload }

        default:
            return state
    }
}
