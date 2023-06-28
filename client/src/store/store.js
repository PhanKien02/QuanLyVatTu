import { configureStore } from "@reduxjs/toolkit";
import rootReducer from '../pages/reducer/index';

const store = configureStore({
    reducer: rootReducer,
  });
export default store;
