// store/form/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    location: '',
    cropType: '',
    soilType: '',
    growthStage: '',
  },
  reducers: {
    setFormData(state, action) {
      const { location, cropType, soilType, growthStage } = action.payload;
      state.location = location;
      state.cropType = cropType;
      state.soilType = soilType;
      state.growthStage = growthStage;
    },
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;
