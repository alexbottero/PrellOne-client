const cardPrello = (state = {}, action) => {
    switch (action.type) {
        case 'BOARD_FETCHED':
            console.log(action)
            var allCards = [];
            action.payload.lists.map((list) => {
                allCards = [...allCards, ...list.cards]
                return list
            });
            return allCards.reduce((map, card) => {
                map[card.id] = card;
                return map;
            }, {});

        case 'ADD_CARD':
            return {
                ...state,
                [action.card.id]: action.card
            }

        case 'ADD_MEMBER':
            if (state.id !== action.id) {
                return state;
            } else {
                return {
                    ...state,
                    members: [...state.members, action.member]
                };
            }

        case 'REMOVE_MEMBER':
            if (state.id !== action.id) {
                return state
            } else {
                return {
                    ...state,
                    members: [...state.members.slice(0, action.indexMember), ...state.members.slice(action.indexMember + 1)]
                }
            }

        case 'ADD_COMMENT':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    comments: [
                        ...state[action.id].comments,
                        action.comment
                    ]
                }

            }

        case 'ADD_LABEL':
            if (state.id !== action.id) {
                return state
            } else {
                return {
                    ...state,
                    labels: [...state.members.slice(0, action.index), action.label]
                }
            }
            
        case 'REMOVE_LABEL':
            if (state.id !== action.id) {
                return state
            } else {
                return {
                    ...state,
                    labels: [...state.labels.slice(0, action.index), ...state.labels.slice(action.index + 1)]
                }
            }

        case 'UPDATE_CARD_ATTRIBUTE':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    [action.attributeName]: action.value
                }
            }

        case 'TOGGLE_DONE':
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    done: !state[action.id].done
                }
            }
        default:
            return state
    }
}

export default cardPrello