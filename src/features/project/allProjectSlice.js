import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const allProjectSlice = createSlice({
  name: 'allProjects',
  initialState,
  reducers: {
resetAllProjects:()=>{
    return initialState
},
getAllProjects:(state, action)=>{
  return action.payload
}
  },
});

export const { resetAllProjects, getAllProjects} = allProjectSlice.actions;

export default allProjectSlice.reducer;
