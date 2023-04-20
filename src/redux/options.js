import { AppReducerType } from './types'
import storage from 'redux-persist/lib/storage'
// import storage from 'redux-persist/lib/storage/session';
// import { createTransform } from "redux-persist";
// import {ReduxState} from './types'

// const Transform = createTransform(
//   (inboundState, key) => {
//     if (key === AppReducerType.AUTH) {
//       return {
//         status: ReduxState.INIT,
//         ...inboundState,
//       };
//     }
//     return inboundState;
//   },
//   (outBoundState, key) => {
//     return outBoundState;
//   }
// );

export const persistConfig = {
  timeout: process.env.NODE_ENV === 'development' ? 0 : 30000,
  key: 'root',
  storage,
  whitelist: [
    AppReducerType.AUTH,
    AppReducerType.LANGUAGE,
    AppReducerType.MY_POINT
    // AppReducerType.LOADING_BAR,
  ]
  // transforms: [Transform],
}
