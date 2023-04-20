import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { all, put, takeLatest, call } from 'redux-saga/effects'
import {
  preRegister,
  preRegisterSuccesss,
  preRegisterFailed,
  login,
  loginSucces,
  loginFailed,
  checkEmailByToken,
  checkEmailByTokenSuccess,
  checkEmailByTokenFailed,
  register,
  registerSuccess,
  registerFailed,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFailed,
  verifyResetPassword,
  verifyResetPasswordSuccess,
  verifyResetPasswordFailed,
  userProfileSuccess,
  userProfileFailed,
  userProfile,
  createAddressSuccess,
  createAddressFailed,
  createAddress,
  updateUserProfile,
  updateUserProfileSuccess,
  updateUserProfileFailed,
  listAddressByMember,
  listAddressByMemberSuccess,
  listAddressByMemberFailed,
  updateAddress,
  updateAddressFailed,
  updateAddressSuccess,
  createInquiry,
  createInquirySuccess,
  createInquiryFailed,
  closeAccount,
  closeAccountFailed,
  closeAccountSuccess,
  checkUserExist,
  checkUserExistFailed,
  checkUserExistSuccess,
  forgetId,
  forgetIdSuccess,
  forgetIdFailed,
  verifyRemindId,
  verifyRemindIdFailed,
  verifyRemindIdSuccess,
  checkUserAvaiable,
  checkUserAvaiableSuccess,
  checkUserAvaiableFailed,
  checkPasswordAvaiable,
  checkPasswordAvaiableSuccess,
  checkPasswordAvaiableFailed,
  uploadFileFailed,
  uploadFileSuccess,
  uploadFile,
  setNewPassword,
  setNewPasswordFailed,
  setNewPasswordSuccess,
  deleteAddressSuccess,
  deleteAddressFailed,
  deleteAddress,
  deleteImageUploaded,
  deleteImageUploadedFailed,
  deleteImageUploadedSuccess
} from './redux'
import httpServices from '../../core/http/apis'
import storage from '../../helper/storage'
import { toastify } from '../../helper/toast'
import { push } from 'connected-react-router'
import paths from '../../helper/pathRoutes'
import axios from 'axios'
import { RESTFUL_URL } from '../../helper/consts'
import { omit, omitBy } from 'lodash'

//pre register
function* preRegisterSaga(action) {
  const email = action.payload.payload
  try {
    yield put(showLoading())
    const resps = yield call(preRegisterReq, email)
    if (!resps?.result) {
      toastify({
        type: 'error',
        msg: resps?.message
      })
      yield put({ type: preRegisterFailed })
      return
    }
    yield put({ type: preRegisterSuccesss, payload: resps })
    if (action.payload?.onSuccess) {
      yield call(action?.payload?.onSuccess())
    }
  } catch (error) {
    yield put({ type: preRegisterFailed })
  } finally {
    yield put(hideLoading())
  }
}

const preRegisterReq = async email => {
  const res = await httpServices.post(`/api/member/pre-register`, email)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchPreRegister() {
  yield takeLatest(preRegister.type, preRegisterSaga)
}
//login
function* loginSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(loginReq, action.payload.payload)
    storage.setAccessToken(resps.token)
    yield put({ type: loginSucces, payload: resps })
    const useProfileRes = yield call(useProfileReq)
    yield put({ type: userProfileSuccess, payload: useProfileRes.data })
    yield put(push(paths.myPoint))
  } catch (error) {
    const errorMessage = error.response?.data?.message
    toastify({
      type: 'error',
      msg: errorMessage
    })
    yield put({ type: loginFailed })
    yield put({ type: userProfileFailed })
  } finally {
    yield put(hideLoading())
  }
}

const loginReq = async payload => {
  const res = await httpServices.login(`/api/member/login`, payload)
  if (!res || !res.data) {
    throw new Error('Opps')
  }
  return res.data
}

function* watchLogin() {
  yield takeLatest(login.toString(), loginSaga)
}

// useProfile
function* useProfileSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(useProfileReq)
    yield put({ type: userProfileSuccess, payload: resps.data })
    if (action?.payload?.onSuccess) {
      action?.payload?.onSuccess()
    }
  } catch (error) {
    yield put({ type: userProfileFailed })
  } finally {
    yield put(hideLoading())
  }
}

const useProfileReq = async payload => {
  const res = await httpServices.get(`/api/member/user-profile`)
  if (!res || !res.data) throw new Error('Opps')
  return res.data
}

function* watchUserProfile() {
  yield takeLatest(userProfile.toString(), useProfileSaga)
}

//check email by token
function* checkEmailTokenSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(checkEmailByTokenReq, action.payload)
    if (!resps.result) {
      yield put(push(paths.passwordExpired))
      return
    }
    if (resps.exists) {
      yield put(push(paths.userExist))
      return
    }
    yield put({ type: checkEmailByTokenSuccess, payload: resps })
  } catch (error) {
    yield put({ type: checkEmailByTokenFailed })
  } finally {
    yield put(hideLoading())
  }
}

const checkEmailByTokenReq = async payload => {
  const res = await httpServices.get(`/api/member/check-token/${payload}`)
  if (!res || !res.data) throw new Error('Opps')
  return res.data
}

function* watchCheckEmailByToken() {
  yield takeLatest(checkEmailByToken.toString(), checkEmailTokenSaga)
}
//register
function* registerSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(registerReq, action.payload)
    storage.setAccessToken(resps.token)
    yield put({ type: registerSuccess, payload: resps })
    yield put(push(paths.successRegister))
  } catch (error) {
    yield put({ type: registerFailed })
  } finally {
    yield put(hideLoading())
  }
}

const registerReq = async payload => {
  const res = await httpServices.post(`/api/member/register`, payload)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchRegister() {
  yield takeLatest(register.toString(), registerSaga)
}

// reset password
function* resetPasswordSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(resetPasswordReq, {
      email: action.payload
    })
    if (!resps?.result) {
      toastify({
        type: 'error',
        msg: resps?.message
      })
      yield put({ type: resetPasswordFailed })
      return
    }
    yield put({ type: resetPasswordSuccess, payload: resps })
    yield put(push(paths.confirmResetPassword))
  } catch (error) {
    yield put({ type: resetPasswordFailed })
  } finally {
    yield put(hideLoading())
  }
}

const resetPasswordReq = async payload => {
  const res = await httpServices.post(`/api/member/reset-password`, payload)
  if (!res || !res.data) {
    // toastify({
    //   type: 'error',
    //   msg: 'もう一度入力してください。'
    // })
    throw new Error('Opps')
  }
  return res.data
}

function* watchResetPassword() {
  yield takeLatest(resetPassword.toString(), resetPasswordSaga)
}

//verify reset password
function* verifyResetPasswordSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(verifyResetPasswordReq, action.payload)
    if (!resps.result) {
      toastify({
        type: 'error',
        msg: resps?.message
      })
      yield put({ type: verifyResetPasswordFailed })
      return
    }
    yield put({
      type: verifyResetPasswordSuccess,
      payload: resps?.reset_password_token || ''
    })
    yield put(push(paths.setNewPassword))
  } catch (error) {
    yield put({ type: verifyResetPasswordFailed })
  } finally {
    yield put(hideLoading())
  }
}

const verifyResetPasswordReq = async payload => {
  const res = await httpServices.post(`/api/member/reset`, payload)
  if (!res || !res.data) {
    // toastify({
    //   type: 'error',
    //   msg: 'もう一度入力してください。'
    // })
    throw new Error('Opps')
  }
  return res.data
}

function* watchVerifyResetPassword() {
  yield takeLatest(verifyResetPassword.toString(), verifyResetPasswordSaga)
}

// create address
function* createAddressSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(createAddressReq, action.payload.payload)
    yield put({ type: createAddressSuccess, payload: resps })
    toastify({
      type: 'success',
      msg: '住所・お届け先を正常に更新'
    })
    if (action.payload?.onSuccess) {
      yield call(action?.payload?.onSuccess())
    }
  } catch (error) {
    yield put({ type: createAddressFailed })
  } finally {
    yield put(hideLoading())
  }
}

const createAddressReq = async payload => {
  const res = await httpServices.post(`/api/member/address/create`, payload)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchCreateAddress() {
  yield takeLatest(createAddress.toString(), createAddressSaga)
}

// update profile
function* updateProfileSaga(action) {
  try {
    yield put(showLoading())
    // TODO check email exist
    const { email, isChangeProfile, isChangePassword, lrvPasswordCurrent } =
      action.payload
    // TODO check user if change
    // if (isChangeProfile) {
    //   const respsEmail = yield call(checkUserAvaiableReq, {
    //     email: email
    //   })
    //   if (!respsEmail.result) {
    //     toastify({
    //       type: 'error',
    //       msg: respsEmail.message
    //     })
    //     return
    //   }
    // }
    // TODO check password if change
    // if (isChangePassword) {
    //   const respPass = yield call(checkPasswordAvaiReq, {
    //     username: email,
    //     password: lrvPasswordCurrent
    //   })
    //   if (!respPass.result) {
    //     toastify({
    //       type: 'error',
    //       msg: respPass.message
    //     })
    //     return
    //   }
    // }
    // const body = omit(action.payload, ['isChangeProfile', 'lrvPasswordCurrent', 'isChangePassword'])
    const resps = yield call(updateProfileReq, action.payload)
    yield put({ type: updateUserProfileSuccess, payload: resps })
    yield put(push(paths.editProfileComplete))
  } catch (error) {
    yield put({ type: updateUserProfileFailed })
  } finally {
    yield put(hideLoading())
  }
}

const updateProfileReq = async payload => {
  const res = await httpServices.put(`/api/member/update`, payload)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchUpdateProfile() {
  yield takeLatest(updateUserProfile.toString(), updateProfileSaga)
}

// list address by member
function* listAddressByMemberSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(listAddressByMemberReq, action.payload)
    yield put({ type: listAddressByMemberSuccess, payload: resps?.data })
  } catch (error) {
    yield put({ type: listAddressByMemberFailed })
  } finally {
    yield put(hideLoading())
  }
}

const listAddressByMemberReq = async payload => {
  const res = await httpServices.get(`/api/member/address`, payload)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchListAddressByMember() {
  yield takeLatest(listAddressByMember.toString(), listAddressByMemberSaga)
}

// update address by member
function* updateAddressSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(updateAddressReq, action.payload?.payload)
    yield put({ type: updateAddressSuccess, payload: resps })
    toastify({
      type: 'success',
      msg: '住所・お届け先を正常に更新'
    })
    if (action.payload?.onSuccess) {
      yield call(action?.payload?.onSuccess())
    }
  } catch (error) {
    yield put({ type: updateAddressFailed })
  } finally {
    yield put(hideLoading())
  }
}

const updateAddressReq = async payload => {
  const { addressId, dataBody } = payload
  const res = await httpServices.post(
    `/api/member/address/${addressId}`,
    dataBody
  )
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchUpdateAddress() {
  yield takeLatest(updateAddress.toString(), updateAddressSaga)
}

// close Account
function* closeAccountSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(closeAccountReq, action.payload)
    if (!resps.result) {
      toastify({
        type: 'error',
        msg: resps.message
      })
      return
    }
    yield put({ type: closeAccountSuccess })
    yield put(push(paths.complete))
  } catch (error) {
    yield put({ type: closeAccountFailed })
  } finally {
    yield put(hideLoading())
  }
}

const closeAccountReq = async payload => {
  const res = await httpServices.post(`/api/member/close-account`, payload)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchCloseAccount() {
  yield takeLatest(closeAccount.toString(), closeAccountSaga)
}

// Check user exist
function* checkUserExistSaga(action) {
  try {
    yield put(showLoading())
    // TODO decode PRM
    const respDecodePRM = yield call(decodePRMReq, action.payload)
    if (!respDecodePRM.result && action.payload?.isRedirect) {
      yield put(push(paths.notFound))
      return
    }
    // TODO check exist PRM
    if (respDecodePRM.result) {
      const prmDecoded = respDecodePRM?.message
      const resps = yield call(checkUserExistReq, prmDecoded)
      if (!resps.result && action.payload?.isRedirect) {
        yield put(push(paths.userExist))
        return
      }
      yield put({ type: checkUserExistSuccess, payload: prmDecoded })
    }
  } catch (error) {
    yield put({ type: checkUserExistFailed })
  } finally {
    yield put(hideLoading())
  }
}

const checkUserExistReq = async payload => {
  const res = await httpServices.post(`/api/member/check-prm`, payload)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchCheckUserExist() {
  yield takeLatest(checkUserExist.toString(), checkUserExistSaga)
}

// TODO api call check avaiable
function* checkUserAvaiableSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(checkUserAvaiableReq, action.payload)
    if (!resps.result) {
      toastify({
        type: 'error',
        msg: resps.message
      })
      yield put({ type: checkUserAvaiableFailed, payload: false })
      return
    }
    yield put({ type: checkUserAvaiableSuccess, payload: true })
  } catch (error) {
    yield put({ type: checkUserAvaiableFailed, payload: false })
  } finally {
    yield put(hideLoading())
  }
}

const checkUserAvaiableReq = async payload => {
  const res = await httpServices.post(`/api/member/check-available`, payload)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchCheckUserAvaiable() {
  yield takeLatest(checkUserAvaiable.toString(), checkUserAvaiableSaga)
}

// TODO api call check password
function* checkPasswordAvaiSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(checkPasswordAvaiReq, action.payload)
    if (!resps.result) {
      toastify({
        type: 'error',
        msg: resps.message
      })
      yield put({ type: checkPasswordAvaiableFailed, payload: resps.result })
      return
    }
    yield put({ type: checkPasswordAvaiableSuccess, payload: true })
  } catch (error) {
    yield put({ type: checkPasswordAvaiableFailed, payload: false })
  } finally {
    yield put(hideLoading())
  }
}

const checkPasswordAvaiReq = async payload => {
  // TODO payload  {username: username, password: password}
  const res = await httpServices.post(`/api/member/check-password`, payload)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchCheckPasswordAvaiable() {
  yield takeLatest(checkPasswordAvaiable.toString(), checkPasswordAvaiSaga)
}

// TODO check remind id
function* forgetIdSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(forgetIdReq, action.payload)
    if (!resps.result) {
      toastify({
        type: 'error',
        msg: resps.message
      })
      return
    }
    yield put({ type: forgetIdSuccess, payload: action.payload })
    yield put(push(paths.confirmForgetId))
  } catch (error) {
    yield put({ type: forgetIdFailed })
  } finally {
    yield put(hideLoading())
  }
}

const forgetIdReq = async payload => {
  // TODO payload  {email:email}
  const res = await httpServices.post(`/api/remind_id_token`, payload)
  if (!res || !res.data) {
    toastify({
      type: 'error',
      msg: 'もう一度入力してください。'
    })
    throw new Error('Opps')
  }
  return res.data
}

function* watchForgetId() {
  yield takeLatest(forgetId.toString(), forgetIdSaga)
}

//verify remind id
function* verifyRemindIdSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(verifyRemindIdReq, action.payload)
    if (!resps.result) {
      toastify({
        type: 'error',
        msg: resps?.message
      })
      yield put({ type: verifyRemindIdFailed })
      return
    }
    yield put({ type: verifyRemindIdSuccess, payload: resps?.user_id || '' })
    yield put(push(paths.successForgetId))
  } catch (error) {
    yield put({ type: verifyRemindIdFailed })
  } finally {
    yield put(hideLoading())
  }
}

const verifyRemindIdReq = async payload => {
  const res = await httpServices.post(`/api/remind_user_id`, payload)
  if (!res || !res.data) {
    // toastify({
    //   type: 'error',
    //   msg: 'もう一度入力してください。'
    // })
    throw new Error('Opps')
  }
  return res.data
}

function* watchVerifyRemindId() {
  yield takeLatest(verifyRemindId.toString(), verifyRemindIdSaga)
}

// TODO decode PRM request
const decodePRMReq = async payload => {
  const res = await httpServices.get(`/api/decode`, {
    prm: payload?.prm
  })
  if (!res || !res.data) {
    // toastify({
    //   type: 'error',
    //   msg: 'もう一度入力してください。'
    // })
    throw new Error('Opps')
  }
  return res.data
}

// upload file
function* watchUploadFileSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(uploadFileReq, action.payload.payload)
    if (!resps.result) {
      toastify({
        type: 'error',
        msg: resps?.message
      })
      return
    }
    toastify({
      type: 'success',
      msg: '画像をアップロードしました。'
    })
    yield put({ type: uploadFileSuccess, payload: resps?.message })
    if (action.payload?.onSuccess) {
      action.payload?.onSuccess(resps?.message)
    }
  } catch (error) {
    yield put({ type: uploadFileFailed })
  } finally {
    yield put(hideLoading())
  }
}

const uploadFileReq = async payload => {
  const res = await httpServices.fileUpload(`/api/member/avatar`, payload)
  if (!res || !res.data) {
    // toastify({
    //   type: 'error',
    //   msg: 'もう一度入力してください。'
    // })
    throw new Error('Opps')
  }
  return res.data
}

function* watchUploadFile() {
  yield takeLatest(uploadFile.toString(), watchUploadFileSaga)
}

// set new pass
function* setNewPasswordSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(setNewPasswordReq, action.payload)
    if (!resps.result) {
      toastify({
        type: 'error',
        msg: resps?.message
      })
      return
    }
    yield put({ type: setNewPasswordSuccess })
    yield put(push(paths.successResetPassword))
  } catch (error) {
    yield put({ type: setNewPasswordFailed })
  } finally {
    yield put(hideLoading())
  }
}

const setNewPasswordReq = async payload => {
  const res = await httpServices.post(`/api/member/set-password`, payload)
  if (!res || !res.data) {
    // toastify({
    //   type: 'error',
    //   msg: 'もう一度入力してください。'
    // })
    throw new Error('Opps')
  }
  return res.data
}

function* watchSetNewPassword() {
  yield takeLatest(setNewPassword.toString(), setNewPasswordSaga)
}

// delete address
function* deleteAddressSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(deleteAddressReq, action.payload?.payload)
    if (!resps.result) {
      toastify({
        type: 'error',
        msg: resps?.message
      })
      yield put({ type: deleteAddressFailed })
      return
    }
    toastify({
      type: 'success',
      msg: '住所・お届け先を正常に更新'
    })
    yield put({ type: deleteAddressSuccess })
    if (action.payload?.onSuccess) {
      yield call(action?.payload?.onSuccess())
    }
    // Reload address List
  } catch (error) {
    yield put({ type: deleteAddressFailed })
  } finally {
    yield put(hideLoading())
  }
}

const deleteAddressReq = async payload => {
  const res = await httpServices.post(`/api/member/address/delete`, payload)
  if (!res || !res.data) {
    // toastify({
    //   type: 'error',
    //   msg: 'もう一度入力してください。'
    // })
    throw new Error('Opps')
  }
  return res.data
}

function* watchDeleteAddress() {
  yield takeLatest(deleteAddress.toString(), deleteAddressSaga)
}
// delete image uploaded
function* deleteImageUploadedSaga(action) {
  try {
    yield put(showLoading())
    const resps = yield call(deleteImageUploadedReq, action.payload?.payload)
    if (!resps.result) {
      toastify({
        type: 'error',
        msg: resps?.message
      })
      yield put({ type: deleteImageUploadedFailed })
      return
    }
    toastify({
      type: 'success',
      msg: '住所・お届け先を正常に更新'
    })
    yield put({ type: deleteImageUploadedSuccess })
    if (action.payload?.onSuccess) {
      yield call(action?.payload?.onSuccess())
    }
    // Reload address List
  } catch (error) {
    yield put({ type: deleteImageUploadedFailed })
  } finally {
    yield put(hideLoading())
  }
}

const deleteImageUploadedReq = async payload => {
  const res = await httpServices.post(`/api/member/delete-avatar`, payload)
  if (!res || !res.data) {
    // toastify({
    //   type: 'error',
    //   msg: 'もう一度入力してください。'
    // })
    throw new Error('Opps')
  }
  return res.data
}

function* watchDeleteImageUploaded() {
  yield takeLatest(deleteImageUploaded.toString(), deleteImageUploadedSaga)
}

export default function* authSaga() {
  yield all([
    watchPreRegister(),
    watchLogin(),
    watchCheckEmailByToken(),
    watchRegister(),
    watchResetPassword(),
    watchVerifyResetPassword(),
    watchUserProfile(),
    watchCreateAddress(),
    watchUpdateProfile(),
    watchListAddressByMember(),
    watchUpdateAddress(),
    watchCloseAccount(),
    watchCheckUserExist(),
    watchForgetId(),
    watchVerifyRemindId(),
    watchCheckUserAvaiable(),
    watchCheckPasswordAvaiable(),
    watchUploadFile(),
    watchSetNewPassword(),
    watchDeleteAddress(),
    watchDeleteImageUploaded()
  ])
}
