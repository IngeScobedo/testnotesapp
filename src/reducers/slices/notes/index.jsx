import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    isLoading: false,
    error: null,
    notes: [
      {
        id: 1,
        title: "Note 1",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        user: "Andrés Murillo",
      },
      {
        id: 2,
        title: "Note 2",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        user: "Mártin Alcalá"
      },
    ],
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
