import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    isLoading: false,
    error: null,
    notes: [],
  },
  reducers: {
    notesPending: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    notesSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.notes = action.payload;
    },
    notesError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addNote: (state, action) => {
      state.notes = [...state.notes, action.payload];
    },
    editNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    }
  },
});

export const { notesPending, notesSuccess, notesError, addNote, editNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
