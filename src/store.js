import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userService } from './services/userService';
import { flightService } from './services/flightService';
import { authService } from './services/authService';

export const store = configureStore({
  reducer: {
    [userService.reducerPath]: userService.reducer,
    [flightService.reducerPath]: flightService.reducer,
    [authService.reducerPath]: authService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userService.middleware,
      flightService.middleware,
      authService.middleware
    ),
});

setupListeners(store.dispatch);
