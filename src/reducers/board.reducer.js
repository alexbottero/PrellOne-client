const board = (state = {}, action) => {
    switch (action.type) {
        case 'BOARDS_LOADED':
            console.log(action)
            return action.boards.reduce((map, board) => {
                map[board.id] = board;
                return map;
            }, {});

        case 'BOARDS_LOAD_FAILED':
            return state
        
        case 'BOARD_FETCHED':
            console.log(action)
            return { 
                ...state,
                [action.payload.id]: action.payload 
            }
            
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

        case 'ADD_BOARD' :
            return {
                ...state,
                [action.board.id] : action.board
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