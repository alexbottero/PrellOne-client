import demoData from '../components/demo-data'

const board = (state = demoData.boards, action) => {
    console.clear()
    console.log(action)
    console.log(state)
    switch (action.type) {

        case 'ADD_LIST':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    lists: [
                        ...state[action.id].lists,
                        action.list.id
                    ]
                }   
            }
        case 'TOGGLE_ADD_LIST':
            if (state.id !== action.id) {
                return state;
            } else {
                return {
                    ...state,
                    toggleAddList: !state.toggleAddList
                }
            }
        default:
            return state
    }
}

export default board