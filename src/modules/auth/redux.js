import { createSlice } from '@reduxjs/toolkit'
import { ReduxState } from '../../redux/types'

const initialState = {
  status: ReduxState.INIT,
  userInfo: {},
  isLogged: false,
  isRegistered: false,
  emailByToken: '',
  prmByToken: '',
  infoRegister: {},
  emailResetPassword: '',
  forgetEmail: '',
  respResetPassword: '',
  useProfile: {},
  profileEdit: {},
  addressCreated: {},
  isUpdatedProfile: false,
  listAddress: [],
  tokenByRegister: '',
  respRemindId: '',
  isAvaiableUser: false,
  isAvaiablePassword: false,
  prmDecoded: '',
  prevRouter: ''
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    preRegister: (state, action) => {
      state.status = ReduxState.LOADING
      state.infoRegister = {}
      state.isRegistered = false
    },
    preRegisterSuccesss: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.prmDecoded = ''
    },
    preRegisterFailed: (state, action) => {
      state = { ...initialState, status: ReduxState.ERROR }
    },
    login: (state, action) => {
      state.status = ReduxState.LOADING
      state.isRegistered = false
      state.infoRegister = {}
      state.respResetPassword = ''
      state.forgetEmail = ''
      state.respRemindId = ''
    },
    loginSucces: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.isLogged = true
      state.userInfo = action.payload
    },
    loginFailed: (state, action) => {
      state = { ...initialState, status: ReduxState.ERROR }
    },
    checkEmailByToken: (state, action) => {
      state.status = ReduxState.LOADING
    },
    checkEmailByTokenSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.emailByToken = action.payload.email
      state.prmByToken = action.payload.prm
    },
    checkEmailByTokenFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    register: (state, action) => {
      state.status = ReduxState.LOADING
    },
    registerSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.isLogged = true
      state.isRegistered = true
      state.infoRegister = {}
      state.tokenByRegister = ''
    },
    registerFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    setInfoRegister: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.infoRegister = action.payload
    },
    forgetId: (state, action) => {
      state.status = ReduxState.LOADING
    },
    forgetIdSuccess: (state, action) => {
      state.forgetEmail = action.payload
      state.status = ReduxState.SUCCESS
    },
    forgetIdFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    resetPassword: (state, action) => {
      state.emailResetPassword = action.payload
      state.status = ReduxState.LOADING
    },
    resetPasswordSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
    },
    resetPasswordFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    verifyResetPassword: state => {
      state.status = ReduxState.LOADING
      state.respResetPassword = ''
    },
    verifyResetPasswordSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.respResetPassword = action.payload
    },
    verifyResetPasswordFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    userProfile: (state, action) => {
      state.status = ReduxState.LOADING
    },
    userProfileSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.useProfile = action.payload
    },
    userProfileFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    setProfileEdit: (state, action) => {
      state.profileEdit = action.payload
      state.status = ReduxState.SUCCESS
    },
    createAddress: (state, action) => {
      state.status = ReduxState.LOADING
      state.addressCreated = {}
    },
    createAddressSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.addressCreated = action.payload
    },
    createAddressFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    updateUserProfile: (state, action) => {
      state.status = ReduxState.LOADING
    },
    updateUserProfileSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.isUpdatedProfile = action.payload
      state.profileEdit = {}
      state.addressCreated = {}
    },
    updateUserProfileFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    logout: (state, action) => {
      state = { ...initialState, status: ReduxState.SUCCESS }
    },
    listAddressByMember: (state, action) => {
      state.status = ReduxState.INIT
      state.listAddress = []
    },
    listAddressByMemberSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.listAddress = action.payload
    },
    listAddressByMemberFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    updateAddress: (state, action) => {
      state.status = ReduxState.INIT
    },
    updateAddressSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
    },
    updateAddressFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    setTokenRegister: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.tokenByRegister = action.payload
    },
    closeAccount: (state, action) => {
      state.status = ReduxState.LOADING
    },
    closeAccountSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
    },
    closeAccountFailed: (state, action) => {
      state = { ...initialState, status: ReduxState.ERROR }
    },
    checkUserExist: (state, action) => {
      state.status = ReduxState.LOADING
    },
    checkUserExistSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.prmDecoded = action.payload
    },
    checkUserExistFailed: (state, action) => {
      state = { ...initialState, status: ReduxState.ERROR }
    },
    verifyRemindId: state => {
      state.status = ReduxState.LOADING
      state.respRemindId = ''
    },
    verifyRemindIdSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.respRemindId = action.payload
    },
    verifyRemindIdFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    checkUserAvaiable: (state, action) => {
      state.status = ReduxState.LOADING
      state.isAvaiableUser = false
    },
    checkUserAvaiableSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.isAvaiableUser = action.payload
    },
    checkUserAvaiableFailed: (state, action) => {
      state.status = ReduxState.ERROR
      state.isAvaiableUser = action.payload
    },
    checkPasswordAvaiable: (state, action) => {
      state.status = ReduxState.LOADING
      state.isAvaiablePassword = false
    },
    checkPasswordAvaiableSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.isAvaiablePassword = action.payload
    },
    checkPasswordAvaiableFailed: (state, action) => {
      state.status = ReduxState.ERROR
      state.isAvaiablePassword = action.payload
    },
    uploadFile: (state, action) => {
      state.status = ReduxState.LOADING
    },
    uploadFileSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
    },
    uploadFileFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    setNewPassword: (state, action) => {
      state.status = ReduxState.LOADING
    },
    setNewPasswordSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
      state.respResetPassword = ''
      state.emailByToken = ''
    },
    setNewPasswordFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    deleteAddress: (state, action) => {
      state.status = ReduxState.LOADING
    },
    deleteAddressSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
    },
    deleteAddressFailed: (state, action) => {
      state.status = ReduxState.ERROR
    },
    deleteImageUploaded: (state, action) => {
      state.status = ReduxState.LOADING
    },
    deleteImageUploadedSuccess: (state, action) => {
      state.status = ReduxState.SUCCESS
    },
    deleteImageUploadedFailed: (state, action) => {
      state.status = ReduxState.ERROR
    }
  }
})

export const {
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
  setInfoRegister,
  resetPassword,
  resetPasswordFailed,
  resetPasswordSuccess,
  verifyResetPassword,
  verifyResetPasswordSuccess,
  verifyResetPasswordFailed,
  userProfileSuccess,
  userProfileFailed,
  userProfile,
  setProfileEdit,
  createAddressFailed,
  createAddress,
  createAddressSuccess,
  updateUserProfileSuccess,
  updateUserProfile,
  updateUserProfileFailed,
  logout,
  listAddressByMember,
  listAddressByMemberFailed,
  listAddressByMemberSuccess,
  updateAddress,
  updateAddressFailed,
  updateAddressSuccess,
  setTokenRegister,
  closeAccount,
  closeAccountSuccess,
  closeAccountFailed,
  checkUserExist,
  checkUserExistSuccess,
  checkUserExistFailed,
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
  checkPasswordAvaiableFailed,
  checkPasswordAvaiableSuccess,
  uploadFile,
  uploadFileFailed,
  uploadFileSuccess,
  setNewPassword,
  setNewPasswordSuccess,
  setNewPasswordFailed,
  deleteAddress,
  deleteAddressFailed,
  deleteAddressSuccess,
  deleteImageUploaded,
  deleteImageUploadedFailed,
  deleteImageUploadedSuccess
} = authSlice.actions

//selector

export const selectEmailResetPassword = state => state.auth.emailResetPassword
export const selectUserInfo = state => state.auth.userInfo
export const selectInfoRegister = state => state.auth.infoRegister
export const selectRespResetPasswod = state => state.auth.respResetPassword
export const selectUserProfile = state => state.auth.useProfile
export const selectIsLogged = state => state.auth.isLogged
export const selectUserProfileEdit = state => state.auth.profileEdit
export const selectCreateAddressSelected = state => state.auth.addressCreated
export const selectIsUpdatedProfile = state => state.auth.isUpdatedProfile
export const selectListAddressByMember = state => state.auth.listAddress
export const selectEmailByToken = state => state.auth.emailByToken
export const selectTokenByRegister = state => state.auth.tokenByRegister
export const selectForgetEmail = state => state.auth.forgetEmail
export const selectRespRemindId = state => state.auth.respRemindId
export const selectIsAvaiableUser = state => state.auth.isAvaiableUser
export const selectIsAvaiablePassword = state => state.auth.isAvaiablePassword
export const selectPrmDecoded = state => state.auth.prmDecoded

export default authSlice.reducer
