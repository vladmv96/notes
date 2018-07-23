import { SAVE_NOTES_ACTION } from '../reducers/notes';

export function saveNotes(notes) {
    return { type: SAVE_NOTES_ACTION, notes }
}

