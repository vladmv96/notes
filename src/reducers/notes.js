export const SAVE_NOTES_ACTION = 'SAVE_NOTES_ACTION'
export const SAVE_COLOR_ACTION = 'SAVE_COLOR_ACTION'


const initialState = {
    notes: [],
    color: "#8A4DAB"
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SAVE_NOTES_ACTION:
            return { ...state, notes: action.notes }
        case SAVE_COLOR_ACTION:
            return { ...state, color: action.color}
        default:
            return state
    }
}