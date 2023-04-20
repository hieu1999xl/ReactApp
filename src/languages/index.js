import { Language, LanguageType } from './redux'
import { IntlProvider, createIntl } from 'react-intl'
import React from 'react'
import { store, RootState } from '../redux/store'
import translate from './translate'
import { useSelector } from 'react-redux'

const IntlController = ({ children }) => {
  const { lang } = useSelector(state => state.language)
  return (
    <IntlProvider
      messages={translate[lang]}
      locale={lang || Language[LanguageType.JA]}
    >
      {children}
    </IntlProvider>
  )
}
const getCurrentLanguage = () => store.getState().language.lang
const intl = createIntl({
  messages: translate[getCurrentLanguage()],
  locale: getCurrentLanguage() || Language[LanguageType.JA]
})

export { intl }

export default IntlController
