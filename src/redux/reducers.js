import { AppReducerType } from './types'
import myPointReducer from '../modules/myPoint/redux'
import { connectRouter } from 'connected-react-router'
import authReducer from '../modules/auth/redux'
import { combineReducers } from 'redux'
import languageRecuder from '../languages/redux'
import history from '../helper/history'
import Storage from '../helper/storage'
// import { loadingBarReducer } from 'react-redux-loading-bar';

const rootReducer = (state, action) => {
  /* if you are using RTK, you can import your action and use it's type property instead of the literal definition of the action  */
  if (action.type === 'authSlice/logout') {
    Storage.clearAll()
    return appReducer(undefined, { type: undefined })
  }

  return appReducer(state, action)
}

const appReducer = combineReducers({
  [AppReducerType.ROUTER]: connectRouter(history),
  [AppReducerType.LANGUAGE]: languageRecuder,
  [AppReducerType.MY_POINT]: myPointReducer,
  [AppReducerType.AUTH]: authReducer
})

export default rootReducer
