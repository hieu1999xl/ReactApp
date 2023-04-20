import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { all, put, takeLatest, call } from 'redux-saga/effects'
import {
  listProducts,
  listProductsFailed,
  listProductsSuccess,
  listSurveyByMember,
  listSurveyByMemberSuccess,
  listSurveyByMemberFailed,
  pointHistoryByMember,
  pointHistoryByMemberSuccess,
  pointHistoryByMemberFailed,
  listNotificationByMember,
  listNotificationByMemberFailed,
  listNotificationByMemberSuccess,
  listExchanceHistorySuccess,
  listExchanceHistoryFailed,
  listExchanceHistory,
  finishPointExchanged,
  finishPointExchangedSuccess,
  finishPointExchangedFailed,
  finishPointDonated,
  finishPointDonatedSuccess,
  finishPointDonatedFailed,
  createInquiry,
  createInquiryFailed,
  createInquirySuccess
} from './redux'
import httpServices from '../../core/http/apis'
import { toastify } from '../../helper/toast'
import { push } from 'connected-react-router'
import paths from '../../helper/pathRoutes'

//list products
function* listProductsSaga(action) {
  const page = action.payload
  try {
    yield put(showLoading())
    const resps = yield call(listProductsReq, page)
    yield put({ type: listProductsSuccess, payload: resps.data })
  } catch (error) {
    yield put({ type: listProductsFailed })
  } finally {
    yield put(hideLoading())
  }
}

const listProductsReq = async page => {
  const res = await httpServices.get(`/api/products/get`, {
    page: page
  })
  if (!res || !res.data) throw new Error('Opps')
  return res.data
}

function* watchListProducts() {
  yield takeLatest(listProducts.toString(), listProductsSaga)
}

//list survey by member
function* listSurveyByMemberSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(listSurveyByMemberReq, action.payload)
    yield put({ type: listSurveyByMemberSuccess, payload: resps })
  } catch (error) {
    yield put({ type: listSurveyByMemberFailed })
  } finally {
    yield put(hideLoading())
  }
}

const listSurveyByMemberReq = async payload => {
  const res = await httpServices.get(`/api/member/surveys`, payload)
  if (!res || !res.data) throw new Error('Opps')
  return res.data
}

function* watchListSurveyByMember() {
  yield takeLatest(listSurveyByMember.toString(), listSurveyByMemberSaga)
}

//point history by member
function* pointHistoryByMemberSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(pointHistoryByMemberReq, action.payload)
    yield put({ type: pointHistoryByMemberSuccess, payload: resps.data })
  } catch (error) {
    yield put({ type: pointHistoryByMemberFailed })
  } finally {
    yield put(hideLoading())
  }
}

const pointHistoryByMemberReq = async page => {
  const res = await httpServices.get(`/api/member/point-histories`, {
    page: page
  })
  if (!res || !res.data) throw new Error('Opps')
  return res.data
}

function* watchPointHistoryByMember() {
  yield takeLatest(pointHistoryByMember.toString(), pointHistoryByMemberSaga)
}

//list notification
function* listNotificationByMemberSaga() {
  try {
    yield put(showLoading())
    const resps = yield call(listNotificationByMemberReq)
    yield put({ type: listNotificationByMemberSuccess, payload: resps.data })
  } catch (error) {
    yield put({ type: listNotificationByMemberFailed })
  } finally {
    yield put(hideLoading())
  }
}

const listNotificationByMemberReq = async () => {
  const res = await httpServices.get(`/api/notifications`)
  if (!res || !res.data) throw new Error('Opps')
  return res.data
}

function* watchListNotificationByMember() {
  yield takeLatest(
    listNotificationByMember.toString(),
    listNotificationByMemberSaga
  )
}

// exchace history
function* listExchanceHistorySaga() {
  try {
    yield put(showLoading())
    const resps = yield call(listExchanceHistoryReq)
    yield put({ type: listExchanceHistorySuccess, payload: resps.data })
  } catch (error) {
    yield put({ type: listExchanceHistoryFailed })
  } finally {
    yield put(hideLoading())
  }
}

const listExchanceHistoryReq = async () => {
  const res = await httpServices.get(`/api/member/exchange_history`)
  if (!res || !res.data) throw new Error('Opps')
  return res.data
}

function* watchListExchanceHistory() {
  yield takeLatest(listExchanceHistory.toString(), listExchanceHistorySaga)
}

// finish point exchanged
function* finishPointExchangedSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(finishPointExchangedReq, action.payload)
    if (!resps.result) {
      toastify({
        type: 'error',
        msg: resps?.message
      })
      yield put({ type: finishPointExchangedFailed })
      return
    }
    yield put({ type: finishPointExchangedSuccess, payload: resps })
    // toastify({
    //   type: 'success',
    //   msg: 'ポイント交換に成功'
    // })
    yield put(push(paths.exchangeComplete))
  } catch (error) {
    yield put({ type: finishPointExchangedFailed })
  } finally {
    yield put(hideLoading())
  }
}

const finishPointExchangedReq = async payload => {
  const res = await httpServices.post(`/api/exchange`, payload)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchFinishPointExchanged() {
  yield takeLatest(finishPointExchanged.toString(), finishPointExchangedSaga)
}

// finish point exchanged
function* finishPointDonatedSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(finishPointDonatedReq, action.payload)
    if (!resps.result) {
      toastify({
        type: 'error',
        msg: resps?.message
      })
      yield put({ type: finishPointDonatedFailed })
      return
    }
    yield put({ type: finishPointDonatedSuccess, payload: resps })
    // toastify({
    //   type: 'success',
    //   msg: 'ポイント交換に成功'
    // })
    yield put(push(paths.donateComplete))
  } catch (error) {
    yield put({ type: finishPointDonatedFailed })
  } finally {
    yield put(hideLoading())
  }
}

const finishPointDonatedReq = async payload => {
  const res = await httpServices.post(`/api/exchange`, payload)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchFinishPointDonated() {
  yield takeLatest(finishPointDonated.toString(), finishPointDonatedSaga)
}

// create inquiry
function* createInquirySaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(createInquiryReq, action.payload?.payload)
    yield put({ type: createInquirySuccess, payload: resps })
    if (action.payload?.onSuccess) {
      yield call(action?.payload?.onSuccess())
    }
  } catch (error) {
    yield put({ type: createInquiryFailed })
  } finally {
    yield put(hideLoading())
  }
}

const createInquiryReq = async payload => {
  const res = await httpServices.post(`/api/inquiries/create`, payload)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchCreateInquiry() {
  yield takeLatest(createInquiry.toString(), createInquirySaga)
}

export default function* myPointSaga() {
  yield all([
    watchListProducts(),
    watchListSurveyByMember(),
    watchPointHistoryByMember(),
    watchListNotificationByMember(),
    watchListExchanceHistory(),
    watchFinishPointExchanged(),
    watchFinishPointDonated(),
    watchCreateInquiry()
  ])
}
