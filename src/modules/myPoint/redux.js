import { createSlice } from '@reduxjs/toolkit'
import { ReduxState } from '../../redux/types'

const initialState = {
  status: ReduxState.INIT,
  questionFAQ: {},
  listProducts: [],
  listSurveys: [],
  pointHistories: [],
  totalPoints: 0,
  listNotifications: [],
  listExchaceHistory: [],
  detailProductExchance: {},
  exchanged: {}
}

const myPointSlice = createSlice({
  name: 'myPointSlice',
  initialState,
  reducers: {
    makeQuestion: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.questionFAQ = action.payload
    },
    listProducts: (state, action) => {
      state.status = ReduxState.INIT
    },
    listProductsSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.listProducts = action.payload
    },
    listProductsFailed: state => {
      state.listProducts = []
      state.status = ReduxState.ERROR
    },
    listSurveyByMember: (state, action) => {
      state.status = ReduxState.INIT
    },
    listSurveyByMemberSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.listSurveys = action.payload
    },
    listSurveyByMemberFailed: state => {
      state.status = ReduxState.ERROR
      state.listSurveys = []
    },
    pointHistoryByMember: (state, action) => {
      state.status = ReduxState.INIT
    },
    pointHistoryByMemberSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.pointHistories = action.payload.point_histories
      state.totalPoints = action.payload.total_points
    },
    pointHistoryByMemberFailed: state => {
      state.pointHistories = []
      state.totalPoints = 0
      state.status = ReduxState.ERROR
    },
    listNotificationByMember: (state, action) => {
      state.status = ReduxState.INIT
    },
    listNotificationByMemberSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.listNotifications = action.payload
    },
    listNotificationByMemberFailed: state => {
      state.listNotifications = []
      state.status = ReduxState.ERROR
    },
    listExchanceHistory: (state, action) => {
      state.status = ReduxState.INIT
    },
    listExchanceHistorySuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.listExchaceHistory = action.payload
    },
    listExchanceHistoryFailed: state => {
      state.listExchaceHistory = []
      state.status = ReduxState.ERROR
    },
    fetchDetailProduct: (state, action) => {
      state.detailProductExchance = action.payload
      state.status = ReduxState.SUCCESS
    },
    pointExchanged: (state, action) => {
      state.exchanged = action.payload
      state.status = ReduxState.SUCCESS
    },
    finishPointExchanged: (state, action) => {
      state.status = ReduxState.INIT
    },
    finishPointExchangedSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.exchanged = {}
      state.detailProductExchance = {}
    },
    finishPointExchangedFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    finishPointDonated: (state, action) => {
      state.status = ReduxState.INIT
    },
    finishPointDonatedSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.exchanged = {}
      state.detailProductExchance = {}
    },
    finishPointDonatedFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    createInquiry: (state, action) => {
      state.status = ReduxState.INIT
    },
    createInquirySuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.questionFAQ = {}
    },
    createInquiryFailed: (state, action) => {
      state.status = ReduxState.ERROR
    }
  }
})

export const {
  makeQuestion,
  listProducts,
  listProductsSuccess,
  listProductsFailed,
  listSurveyByMember,
  listSurveyByMemberSuccess,
  listSurveyByMemberFailed,
  pointHistoryByMember,
  pointHistoryByMemberSuccess,
  pointHistoryByMemberFailed,
  listNotificationByMember,
  listNotificationByMemberSuccess,
  listNotificationByMemberFailed,
  listExchanceHistory,
  listExchanceHistoryFailed,
  listExchanceHistorySuccess,
  fetchDetailProduct,
  pointExchanged,
  finishPointExchanged,
  finishPointExchangedFailed,
  finishPointExchangedSuccess,
  finishPointDonated,
  finishPointDonatedFailed,
  finishPointDonatedSuccess,
  createInquiry,
  createInquiryFailed,
  createInquirySuccess
} = myPointSlice.actions

// selector
export const selectListProducts = state => state.myPoint.listProducts
export const selectListNotifications = state => state.myPoint.listNotifications
export const selectPointHistories = state => state.myPoint.pointHistories
export const selectTotalPoints = state => state.myPoint.totalPoints
export const selectListSurveys = state => state.myPoint.listSurveys
export const selectListExchances = state => state.myPoint.listExchaceHistory
export const selectDetailProductExchance = state =>
  state.myPoint.detailProductExchance
export const selectExchanged = state => state.myPoint.exchanged

export default myPointSlice.reducer
