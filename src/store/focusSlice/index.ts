import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FocusState<T> {
    isInFocus: boolean;
    focusTasks: T[];
    currentTask: T;
}

const initialState: FocusState<string | number> = {
    isInFocus: false,
    focusTasks: [],
    currentTask: '',
};

const focusSlice = createSlice({
    name: 'focus',
    initialState,
    reducers: {
        start: (state) => {
            state.isInFocus = true;
        },
        stop: (state) => {
            state.isInFocus = false;
        },
        addFocus: (state, action: PayloadAction<string | number>) => {
            state.focusTasks.push(action.payload);
        },
        addCurrentTask: (state, action: PayloadAction<string | number>) => {
            state.currentTask = action.payload;
        },
    },
});

export const { start, stop, addFocus, addCurrentTask } = focusSlice.actions;

export default focusSlice.reducer;
