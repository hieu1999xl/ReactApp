import { persistReducer, persistStore } from 'redux-persist'
import sagaMiddleware, { setupMiddleware } from './middleware'
import { routerMiddleware } from 'connected-react-router'

import { configureStore } from '@reduxjs/toolkit'
import { persistConfig } from './options'
import rootReducer from './reducers'
import history from '../helper/history'

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware, routerMiddleware(history))
})

setupMiddleware()

let persistor = persistStore(store)

export { store, persistor }
