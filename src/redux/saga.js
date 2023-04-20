import { all } from 'redux-saga/effects'
import authSaga from '../modules/auth/saga'
import myPointSaga from '../modules/myPoint/saga'

export default function* rootSaga() {
  yield all([authSaga(), myPointSaga()])
}
