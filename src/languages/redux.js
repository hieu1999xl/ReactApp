import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const LanguageType = {
  EN: 'EN',
  JA: 'JA'
}

export const Language = {
  [LanguageType.EN]: 'en',
  [LanguageType.JA]: 'ja'
}

const initialState = {
  lang: Language[LanguageType.JA],
  type: LanguageType.JA
}

const languageSlice = createSlice({
  name: 'languageSlice',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.type = action.payload
      state.lang = Language[action.payload]
    }
  }
})

export const { changeLanguage } = languageSlice.actions
export default languageSlice.reducer
