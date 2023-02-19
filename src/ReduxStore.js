import { configureStore } from '@reduxjs/toolkit'
import HomeState from './components/Home/components/js/HomeState';


export const store = configureStore({
  reducer: {
    HomeState
  },
})