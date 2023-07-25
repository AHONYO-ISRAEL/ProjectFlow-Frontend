import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const selectedProjectSlice = createSlice({
  name: 'selectedProject',
  initialState,
  reducers: {
    getSelectedProject: (state, action) => {
      return action.payload; 
    },
resetSelectedProjects:()=>{
    return initialState
},

  },
});

export const { getSelectedProject , resetSelectedProjects, } = selectedProjectSlice.actions;

export default selectedProjectSlice.reducer;
