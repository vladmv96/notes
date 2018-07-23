import { SAVE_NOTES_ACTION, SAVE_COLOR_ACTION } from '../reducers/notes';

export function saveNotes(notes) {
    return { type: SAVE_NOTES_ACTION, notes }
}

export function saveColor(color) {
    return { type: SAVE_COLOR_ACTION, color }
}

