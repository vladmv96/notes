export const SAVE_NOTES_ACTION = 'SAVE_NOTES_ACTION'
export const SAVE_COLOR_ACTION = 'SAVE_COLOR_ACTION'


const initialState = {
    notes: [{ name: 'Name', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', editName: true, editText: true }],
    color: "#fcff75"
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