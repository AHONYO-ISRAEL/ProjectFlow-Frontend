import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getInProgress: (state, action) => {
      return action.payload; // Update the state to be the payload (an array of project objects)
    },
resetProjects:()=>{
    return initialState
}

  },
});

export const { getInProgress , resetProjects} = projectSlice.actions;

export default projectSlice.reducer;
