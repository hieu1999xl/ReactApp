import { injectIntl } from 'react-intl'
import React, { memo, Fragment, useState, useEffect } from 'react'
import {
  rangeStartToEnd,
  validatePhonenumber,
  validateFeatureDOB,
  validateDOBLatest18,
  validateScopeDay
} from '../../../../helper/utils'
import paths from '../../../../helper/pathRoutes'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useHistory, useLocation } from 'react-router'
import {
  selectRespResetPasswod,
  verifyResetPassword,
  checkEmailByToken
} from '../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty, set } from 'lodash'

function VerifyResetPassword({ intl }) {
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const [tokenUser, setTokenUser] = useState()

  const respVerifyResetPassword = useSelector(selectRespResetPasswod)

  useEffect(() => {
    if (isEmpty(respVerifyResetPassword)) return
    history.push(paths.setNewPassword)
  }, [respVerifyResetPassword])

  const initialValues = () => {
    return {
      day: '1',
      month: '1',
      year: '1960',
      phone1: '',
      phone2: '',
      phone3: '',
      dob: '',
      phoneNumber: ''
    }
  }

  useEffect(() => {
    if (!location.search) return
    const token =
      location.search && location.search.includes('token=')
        ? location.search.split('=')[1]
        : ''
    if (!token) {
      history.push(paths.passwordExpired)
      return
    }
    setTokenUser(token)
    dispatch(checkEmailByToken(token))
  }, [location])

  const validationSchema = () => {
    return Yup.object().shape({
      day: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredBirthday' })
        ),
      month: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredBirthday' })
        ),
      year: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredBirthday' })
        ),
      phone1: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredPhoneNumber' })
        ),
      phone2: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredPhoneNumber' })
        ),
      phone3: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredPhoneNumber' })
        ),
      dob: Yup.string().when(['day', 'month', 'year'], {
        is: (day, month, year) => validateFeatureDOB({ day, month, year }),
        then: Yup.string().required(
          intl.formatMessage({ id: 'validation.isDate' })
        )
      }),
      dobLatest18: Yup.string().when(['day', 'month', 'year'], {
        is: (day, month, year) => validateDOBLatest18({ day, month, year }),
        then: Yup.string().required(
          intl.formatMessage({ id: 'validation.checkAdult' })
        )
      }),
      dobScopeDay: Yup.string().when(['day', 'month'], {
        is: (day, month) => validateScopeDay({ day, month }),
        then: Yup.string().required(
          intl.formatMessage({ id: 'validation.isDate' })
        )
      }),
      phoneNumber: Yup.string().when(['phone1', 'phone2', 'phone3'], {
        is: (phone1, phone2, phone3) =>
          phone1 && phone2 && phone3
            ? !validatePhonenumber(`${phone1}-${phone2}-${phone3}`)
            : false,
        then: Yup.string().required(
          intl.formatMessage({ id: 'validation.isPhoneNumber' })
        )
      })
    })
  }

  const onSubmit = data => {
    // TODO submit data then dispatch API
    const { day, month, year, phone1, phone2, phone3 } = data
    const payload = {
      token: tokenUser,
      tel: `${phone1}-${phone2}-${phone3}`,
      birthday: `${year}/${month}/${day}`
    }
    dispatch(verifyResetPassword(payload))
  }

  const isInvaildDOB = propsFormik => {
    const { errors, values, touched } = propsFormik
    const { day, month, year } = values
    if (
      errors.day ||
      errors.month ||
      errors.year ||
      errors.dobLatest18 ||
      errors.dobScopeDay
    ) {
      return true
    }
    return (
      validateDOBLatest18(day, month, year) ||
      validateScopeDay({ day, month }) ||
      validateFeatureDOB({ day, month, year })
    )
  }

  const isInVaildPhone = propsFormik => {
    const { errors, values, touched } = propsFormik
    const { phone1, phone2, phone3 } = values
    if (errors.phone1 || errors.phone2 || errors.phone3) {
      return true
    }
    if (!phone1 || !phone2 || !phone3) {
      return false
    }
    return !validatePhonenumber(`${phone1}-${phone2}-${phone3}`)
  }

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues()}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {propsFormik => (
          <form id="form" onSubmit={propsFormik.handleSubmit}>
            <div className="t-contents t-contents--bg-ivory">
              <div className="o-entry">
                <div className="o-entry__notice">
                  <ul
                    className="m-dots-list"
                    style={{ listStyle: 'none', paddingLeft: 0 }}
                  >
                    <li>ご本人確認のためモニター情報に登録した</li>
                    <li>生年月日と電話番号を入力してください。</li>
                  </ul>
                </div>
                <div className="o-entry__table" style={{ marginTop: 20 }}>
                  <table className="m-table">
                    <tbody>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          生年月日
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__flex-no-wrap">
                            <div className="a-input-select a-input-select--year">
                              <select
                                className={`a-input-select__list ${
                                  isInvaildDOB(propsFormik) &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                                name="year"
                                value={propsFormik.values.year}
                                onChange={propsFormik.handleChange}
                              >
                                {rangeStartToEnd(
                                  1960,
                                  new Date().getFullYear() + 1,
                                  1
                                ).map((year, idx) => {
                                  return (
                                    <option key={idx} value={year}>
                                      {year}
                                    </option>
                                  )
                                })}
                              </select>
                            </div>
                            <span className="a-color--green u-fwBold u-ml5 u-mr5">
                              年
                            </span>
                            <div className="a-input-select a-input-select--month">
                              <select
                                className={`a-input-select__list ${
                                  isInvaildDOB(propsFormik) &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                                name="month"
                                value={propsFormik.values.month}
                                onChange={propsFormik.handleChange}
                              >
                                {rangeStartToEnd(1, 13, 1).map((month, idx) => {
                                  return (
                                    <option key={idx} value={month}>
                                      {month}
                                    </option>
                                  )
                                })}
                              </select>
                            </div>
                            <span className="a-color--green u-fwBold u-ml5 u-mr5">
                              月
                            </span>
                            <div className="a-input-select a-input-select--day">
                              <select
                                className={`a-input-select__list ${
                                  isInvaildDOB(propsFormik) &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                                name="day"
                                value={propsFormik.values.day}
                                onChange={propsFormik.handleChange}
                              >
                                {rangeStartToEnd(1, 32, 1).map((day, idx) => {
                                  return (
                                    <option key={idx} value={day}>
                                      {day}
                                    </option>
                                  )
                                })}
                              </select>
                            </div>
                            <span className="a-color--green u-fwBold u-ml5">
                              日
                            </span>
                          </div>
                          <br />
                          {isInvaildDOB(propsFormik) &&
                            propsFormik.submitCount != 0 && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.month ||
                                  propsFormik.errors.day ||
                                  propsFormik.errors.year ||
                                  propsFormik.errors.dob ||
                                  propsFormik.errors.dobLatest18 ||
                                  propsFormik.errors.dobScopeDay}
                              </span>
                            )}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          電話番号
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__flex-no-wrap">
                            <input
                              type="text"
                              name="phone1"
                              className={`a-input-text a-input-text--tel ${
                                isInVaildPhone(propsFormik) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              value={propsFormik.values.phone1}
                              onChange={
                                (propsFormik.values.phone1 =
                                  propsFormik.values.phone1.trim())
                              }
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                            <span className="u-ml5 u-mr5 a-color--green">
                              -
                            </span>
                            <input
                              type="text"
                              name="phone2"
                              className={`a-input-text a-input-text--tel ${
                                isInVaildPhone(propsFormik) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              value={propsFormik.values.phone2}
                              onChange={
                                (propsFormik.values.phone2 =
                                  propsFormik.values.phone2.trim())
                              }
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                            <span className="u-ml5 u-mr5 a-color--green">
                              -
                            </span>
                            <input
                              type="text"
                              name="phone3"
                              className={`a-input-text a-input-text--tel ${
                                isInVaildPhone(propsFormik) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              value={propsFormik.values.phone3}
                              onChange={
                                (propsFormik.values.phone3 =
                                  propsFormik.values.phone3.trim())
                              }
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          <br></br>
                          {isInVaildPhone(propsFormik) &&
                          propsFormik.submitCount != 0 ? (
                            <span className="u-fwBold u-fz11 a-color--pink">
                              {propsFormik.errors.phone1 ||
                                propsFormik.errors.phone2 ||
                                propsFormik.errors.phone3 ||
                                propsFormik.errors.phoneNumber}
                            </span>
                          ) : null}
                          <br />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="t-footer-contents">
              <div className="t-footer-contents__body">
                <button
                  className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
                  type="submit"
                  disabled={
                    !(propsFormik.isValid && propsFormik.dirty) &&
                    propsFormik.submitCount != 0
                  }
                >
                  送信
                </button>
                <a
                  href={paths.inquiry}
                  className="a-color--green u-textDecoration u-fz16 u-hover"
                >
                  お問い合わせ
                </a>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default memo(injectIntl(VerifyResetPassword))
