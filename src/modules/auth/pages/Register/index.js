import { injectIntl } from 'react-intl'
import React, {
  memo,
  Fragment,
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import {
  checkEmailByToken,
  selectEmailByToken,
  selectInfoRegister,
  setInfoRegister,
  setTokenRegister
} from '../../redux'
import {
  rangeStartToEnd,
  isValidPartentPassword,
  isValidTextKatakana,
  validatePhonenumber,
  validateFeatureDOB,
  patternPassword,
  listGender,
  listCity,
  validateDOBLatest18,
  validateScopeDay
} from '../../../../helper/utils'
import pathRoutes from '../../../../helper/pathRoutes'
import { isEmpty } from 'lodash'
import { toastify } from '../../../../helper/toast'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormPostCode } from '../../../../components/commons'

function Register({ intl }) {
  // c6c70520126d9ef384eec4499f21556faccfa6e4a370fe2ce42c252b4b4733fd
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const refContract = useRef(null)
  const [isReadedContract, setIsReadedContract] = useState(false)

  const onScroll = () => {
    if (refContract.current) {
      const { scrollTop, scrollHeight, clientHeight } = refContract.current
      if (Math.abs(scrollTop + clientHeight - scrollHeight) <= 50) {
        setIsReadedContract(true)
      } else {
        setIsReadedContract(false)
      }
    }
  }

  useEffect(() => {
    if (!location.search) return
    const token =
      location.search && location.search.includes('token=')
        ? location.search.split('=')[1]
        : ''
    if (!token) {
      history.push(pathRoutes.passwordExpired)
      return
    }
    dispatch(checkEmailByToken(token))
  }, [location])

  const infoRegister = useSelector(selectInfoRegister)
  const emailByToken = useSelector(selectEmailByToken)

  const [isSubmit, setIsSubmit] = useState(false)

  useEffect(() => {
    const returnRegister =
      location.search && location.search.includes('return=true')
    if (!isEmpty(infoRegister)) {
      if (returnRegister && !isSubmit) {
        setIsReadedContract(false)
        return
      } else {
        history.push(pathRoutes.verifyRegister)
      }
    }
  }, [infoRegister, location, isSubmit])

  const initialValues = () => {
    const init = {
      lrvPassword: '',
      lrvPasswordCof: '',
      firstName: '',
      secondName: '',
      firstNameFurigana: '',
      secondNameFurigana: '',
      gender: '',
      day: '',
      month: '',
      year: '',
      zipCode1: '',
      zipCode2: '',
      city: '',
      ward: '',
      streetAddress: '',
      apartment: '',
      phone1: '',
      phone2: '',
      phone3: ''
    }
    if (!isEmpty(infoRegister)) {
      return {
        lrvPassword: infoRegister.lrvPassword,
        lrvPasswordCof: infoRegister.lrvPasswordCof,
        firstName: infoRegister.firstName,
        secondName: infoRegister.secondName,
        firstNameFurigana: infoRegister.firstNameFurigana,
        secondNameFurigana: infoRegister.secondNameFurigana,
        gender: infoRegister.gender,
        day: infoRegister.day,
        month: infoRegister.month,
        year: infoRegister.year,
        zipCode1: infoRegister.zipCode1,
        zipCode2: infoRegister.zipCode2,
        city: infoRegister.city,
        ward: infoRegister.ward,
        streetAddress: infoRegister.streetAddress,
        apartment: infoRegister.apartment,
        phone1: infoRegister.phone1,
        phone2: infoRegister.phone2,
        phone3: infoRegister.phone3
      }
    }
    return init
  }
  const isInValidZipCode = propsFormik => {
    const { errors } = propsFormik
    return errors.zipCode1 || errors.zipCode2
  }
  const validationSchema = () => {
    return Yup.object().shape({
      lrvPassword: Yup.string()
        .trim()
        .matches(
          patternPassword,
          intl.formatMessage({ id: 'validation.passwordLength' })
        )
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredPassword' })
        ),
      lrvPasswordCof: Yup.string()
        .trim()
        .oneOf(
          [Yup.ref('lrvPassword'), null],
          intl.formatMessage({ id: 'validation.matchPassword' })
        )
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredPasswordConfirm' })
        ),
      firstName: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredName' })),
      secondName: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredName' })),
      firstNameFurigana: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredNameFurigana' })
        ),
      secondNameFurigana: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredNameFurigana' })
        ),
      gender: Yup.string().required(() =>
        intl.formatMessage({ id: 'validation.requiredGender' })
      ),
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
      zipCode1: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredAddressNumber' })
        ),
      zipCode2: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredAddressNumber' })
        ),
      city: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredAddress' })
        ),
      ward: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredAddress' })
        ),
      streetAddress: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredAddress' })
        ),
      dob: Yup.string().when(['day', 'month', 'year'], {
        is: (day, month, year) => validateFeatureDOB({ day, month, year }),
        then: Yup.string().required(
          intl.formatMessage({ id: 'validation.requiredBirthday' })
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
      }),
      nameFurigana: Yup.string().when(
        ['firstNameFurigana', 'secondNameFurigana'],
        {
          is: (firstNameFurigana, secondNameFurigana) =>
            firstNameFurigana && secondNameFurigana
              ? !isValidTextKatakana(
                  `${firstNameFurigana}${secondNameFurigana}`
                )
              : false,
          then: Yup.string().required(
            intl.formatMessage({ id: 'validation.isKatakana' })
          )
        }
      )
    })
  }

  const [agree, setAgree] = useState(false)
  const onChangeAgree = e => {
    setAgree(e.target.checked)
  }

  const onSubmit = data => {
    // show toast
    if (!agree) {
      toastify({
        type: 'error',
        msg: '個人情報保護方針への同意が必要です。'
      })
      return
    }
    const token =
      location.search && location.search.includes('token=')
        ? location.search.split('=')[1]
        : ''
    dispatch(setTokenRegister(token))
    setIsSubmit(true)
    dispatch(setInfoRegister(data))
  }

  const isInvalidName = propsFormik => {
    const { errors, values, touched } = propsFormik
    const { firstName, secondName } = values
    const isTouched = touched.firstName || touched.secondName
    return isTouched && (errors.firstName || errors.secondName)
  }

  const isInvalidNameFuri = propsFormik => {
    const { errors, values, touched } = propsFormik
    const { firstNameFurigana, secondNameFurigana } = values
    const isTouched = touched.firstNameFurigana || touched.secondNameFurigana
    if (!firstNameFurigana || !secondNameFurigana) {
      return (
        isTouched && (errors.firstNameFurigana || errors.secondNameFurigana)
      )
    }
    return !isValidTextKatakana(`${firstNameFurigana}${secondNameFurigana}`)
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

  const [isShowPassword, setIsShowPassword] = useState({
    lrvPassword: false,
    lrvPasswordCof: false
  })

  const isDisbaleSubmit = propsFormik => {
    const { dirty, isValid } = propsFormik
    if (!isEmpty(infoRegister) && isReadedContract) {
      return !isValid
    }
    if (isReadedContract) {
      return false
    }
    return true
  }

  const styleTextIndent = {
    textIndent: '-1em',
    paddingLeft: '1em'
  }

  const styleBox = {
    backgroundColor: '#fff',
    maxWidth: '1000px',
    margin: 'auto',
    border: 'solid 1px #D8D8D8',
    padding: '20px'
  }

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">
            モニター情報登録＜本登録＞
          </p>
        </div>
      </div>
      <div className="m-animal-header">
        <p className="m-animal-header__normal-title">
          モニター登録に必要な情報を入力してください
        </p>
        <div className="m-animal-header__animal-box">
          <div className="m-animal-header__animal-position">
            <img
              src="../assets/img/common/img_animals-image_1.png"
              className="m-animal-header__animal-image"
              alt=""
            />
          </div>
        </div>
      </div>
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
                <div className="o-entry__table o-entry__table--border-bottom">
                  <table className="m-table">
                    <tbody>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          ログインID（メールアドレス）
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__icon">
                            <p
                              style={{ fontSize: '18px', paddingBottom: '6px' }}
                            >
                              {emailByToken}
                            </p>
                          </div>
                          <span className={`u-fz11`}>
                            ※ログインID（メールアドレス）は変更できません。修正したい場合は、仮登録から入力し直してください。
                          </span>
                          <br></br>
                        </td>
                      </tr>
                      {/* ここにログインID（メールアドレス）の項目を追加 */}

                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          パスワード
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__icon">
                            <input
                              type={`${
                                isShowPassword.lrvPassword ? 'text' : 'password'
                              }`}
                              name="lrvPassword"
                              className={`a-input-text ${
                                propsFormik.touched.lrvPassword &&
                                propsFormik.errors.lrvPassword &&
                                propsFormik.submitCount != 0
                                  ? `is-required`
                                  : ``
                              }`}
                              value={propsFormik.values.lrvPassword}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                              autoFocus
                            />
                            <img
                              src={`../assets/img/icon/icon_password_${
                                isShowPassword.lrvPassword ? 'open' : 'close'
                              }.png`}
                              className="m-table__body__icon__image js-password"
                              alt=""
                              onClick={e =>
                                setIsShowPassword({
                                  ...isShowPassword,
                                  lrvPassword: !isShowPassword.lrvPassword
                                })
                              }
                            />
                          </div>
                          <span className={`u-fz11`}>
                            ※半角英数 8～16桁　※大文字・小文字は区別されます。
                          </span>
                          <br></br>
                          {propsFormik.touched.lrvPassword &&
                            propsFormik.errors.lrvPassword &&
                            propsFormik.submitCount != 0 && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.lrvPassword}
                              </span>
                            )}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          パスワード（確認用）
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__icon">
                            <input
                              type={`${
                                isShowPassword.lrvPasswordCof
                                  ? 'text'
                                  : 'password'
                              }`}
                              name="lrvPasswordCof"
                              className={`a-input-text ${
                                propsFormik.touched.lrvPasswordCof &&
                                propsFormik.errors.lrvPasswordCof &&
                                propsFormik.submitCount != 0
                                  ? `is-required`
                                  : ``
                              }`}
                              placeholder="確認のため、もう一度ご入力ください。"
                              value={propsFormik.values.lrvPasswordCof}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                            <img
                              src={`../assets/img/icon/icon_password_${
                                isShowPassword.lrvPasswordCof ? 'open' : 'close'
                              }.png`}
                              className="m-table__body__icon__image js-password"
                              alt=""
                              onClick={e =>
                                setIsShowPassword({
                                  ...isShowPassword,
                                  lrvPasswordCof: !isShowPassword.lrvPasswordCof
                                })
                              }
                            />
                          </div>
                          {propsFormik.touched.lrvPasswordCof &&
                            propsFormik.errors.lrvPasswordCof &&
                            propsFormik.submitCount != 0 && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.lrvPasswordCof}
                              </span>
                            )}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          お名前
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__2column">
                            <input
                              type="text"
                              name="firstName"
                              className={`a-input-text a-input-text--2column ${
                                isInvalidName(propsFormik) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              placeholder="例）安心"
                              value={propsFormik.values.firstName}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                            <input
                              type="text"
                              name="secondName"
                              className={`a-input-text a-input-text--2column ${
                                isInvalidName(propsFormik) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              placeholder="例）優子"
                              value={propsFormik.values.secondName}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {isInvalidName(propsFormik) &&
                            propsFormik.submitCount != 0 && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.firstName ||
                                  propsFormik.errors.secondName}
                              </span>
                            )}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          お名前（フリガナ）
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__2column">
                            <input
                              type="text"
                              name="firstNameFurigana"
                              className={`a-input-text a-input-text--2column ${
                                isInvalidNameFuri(propsFormik) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              placeholder="例）アンシン"
                              value={propsFormik.values.firstNameFurigana}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                            <input
                              type="text"
                              name="secondNameFurigana"
                              className={`a-input-text a-input-text--2column ${
                                isInvalidNameFuri(propsFormik) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              placeholder="例）ユウコ"
                              value={propsFormik.values.secondNameFurigana}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {isInvalidNameFuri(propsFormik) &&
                            propsFormik.submitCount != 0 && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.firstNameFurigana ||
                                  propsFormik.errors.secondNameFurigana ||
                                  propsFormik.errors.nameFurigana}
                              </span>
                            )}
                          {/* {isInvalidNameFuri && (
                            <span className="u-fwBold u-fz11 a-color--pink">
                              お名前（フリガナ）は必ず入力してください
                            </span>
                          )}
                          {isInValidKatakana && !isInvalidNameFuri && (
                            <span className="u-fwBold u-fz11 a-color--pink">
                              カタカナで入力してください。
                            </span>
                          )} */}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          性別
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__2column">
                            {listGender.map((gender, idx) => {
                              return (
                                <button
                                  key={idx}
                                  type="button"
                                  className={`a-button a-button--shadow3 a-button--round a-button--2column ${
                                    propsFormik.values.gender === gender.value
                                      ? 'a-button--green a-button--shadow-green-1'
                                      : 'a-button--yellow-green a-button--shadow-yellow-green-2'
                                  } ${
                                    [0, 1].includes(idx) ? 'u-mb10' : ''
                                  } u-fz16 js-gender-btn`}
                                  name="entry-gender-male"
                                  onClick={e => {
                                    propsFormik.setFieldValue(
                                      'gender',
                                      gender.value
                                    )
                                  }}
                                >
                                  {gender.label}
                                </button>
                              )
                            })}
                          </div>
                          {propsFormik.errors.gender &&
                            propsFormik.submitCount != 0 && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.gender}
                              </span>
                            )}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
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
                                <option key="year-0" value="">
                                  -
                                </option>
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
                                <option key="month-0" value="">
                                  -
                                </option>
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
                                <option key="day-0" value="">
                                  -
                                </option>
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
                          <span className="u-fz11">
                            ※パスワード忘れなどの際に、ご本人確認のために必要となります。
                          </span>
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
                    </tbody>
                  </table>
                </div>
                <div className="o-entry__table">
                  <table className="m-table">
                    <tbody>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          郵便番号
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <FormPostCode
                            propsFormik={propsFormik}
                            readOnly={false}
                          />
                          {isInValidZipCode(propsFormik) &&
                            propsFormik.submitCount != 0 && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.zipCode1 ||
                                  propsFormik.errors.zipCode2 ||
                                  propsFormik.errors.zipCode}
                              </span>
                            )}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          都道府県
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="a-input-select a-input-select--area">
                            <select
                              value={propsFormik.values.city}
                              onChange={propsFormik.handleChange}
                              className={`a-input-select__list ${
                                !propsFormik.values.city &&
                                propsFormik.errors.city &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              name="city"
                            >
                              <option value="" disabled="" selected="">
                                都道府県を選択
                              </option>
                              {listCity.map((city, idx) => {
                                return (
                                  <option key={idx} value={city}>
                                    {city}
                                  </option>
                                )
                              })}
                            </select>
                          </div>
                          {!propsFormik.values.city &&
                            propsFormik.errors.city &&
                            propsFormik.submitCount != 0 && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.city}
                              </span>
                            )}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          市区町村
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <input
                            value={propsFormik.values.ward}
                            onChange={propsFormik.handleChange}
                            onBlur={propsFormik.handleBlur}
                            type="text"
                            name="ward"
                            className={`a-input-text  ${
                              propsFormik.touched.ward &&
                              propsFormik.errors.ward &&
                              propsFormik.submitCount != 0
                                ? 'is-required'
                                : ''
                            }`}
                            placeholder="例）新宿区"
                          />
                          {propsFormik.touched.ward &&
                            propsFormik.errors.ward &&
                            propsFormik.submitCount != 0 && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.ward}
                              </span>
                            )}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          市区町村以下、番地
                        </th>
                        <td className="m-table__body">
                          <input
                            value={propsFormik.values.streetAddress}
                            onChange={propsFormik.handleChange}
                            onBlur={propsFormik.handleBlur}
                            type="text"
                            name="streetAddress"
                            className={`a-input-text  ${
                              propsFormik.touched.streetAddress &&
                              propsFormik.errors.streetAddress &&
                              propsFormik.submitCount != 0
                                ? 'is-required'
                                : ''
                            }`}
                            placeholder="例）西新宿8-17-1"
                          />
                          {propsFormik.touched.streetAddress &&
                            propsFormik.errors.streetAddress &&
                            propsFormik.submitCount != 0 && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.streetAddress}
                              </span>
                            )}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--optional">
                            任意
                          </span>
                          ビル・マンション名、部屋番号等
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <input
                            value={propsFormik.values.apartment}
                            type="text"
                            name="apartment"
                            className="a-input-text"
                            placeholder="例）住友不動産新宿グランドタワー39階"
                            onChange={propsFormik.handleChange}
                            onBlur={propsFormik.handleBlur}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          電話番号
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__flex-no-wrap">
                            <input
                              type="text"
                              name="phone1"
                              value={propsFormik.values.phone1}
                              onChange={
                                propsFormik.values.phone1.includes(' ') &&
                                (propsFormik.values.phone1 =
                                  propsFormik.values.phone1.trim())
                              }
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                              className={`a-input-text a-input-text--tel ${
                                isInVaildPhone(propsFormik) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                            />
                            <span className="u-ml5 u-mr5 a-color--green">
                              -
                            </span>
                            <input
                              type="text"
                              name="phone2"
                              value={propsFormik.values.phone2}
                              onChange={
                                propsFormik.values.phone2.includes(' ') &&
                                (propsFormik.values.phone2 =
                                  propsFormik.values.phone2.trim())
                              }
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                              className={`a-input-text a-input-text--tel ${
                                isInVaildPhone(propsFormik) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
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
                                propsFormik.values.phone3.includes(' ') &&
                                (propsFormik.values.phone3 =
                                  propsFormik.values.phone3.trim())
                              }
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          <span className="u-fz11">
                            パスワード忘れなどの際に、ご本人確認のために必要となります。
                          </span>
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
              <div className="u-mb20" style={styleBox}>
                <p className="u-fwBold u-mb5">【どうぶつさんの情報について】</p>
                <div className="u-mb20">
                  <ul>
                    <li style={styleTextIndent}>
                      ・ご契約中のどうぶつさん情報（どうぶつの種類、品種、年齢など）は、アニコム損保マイページの情報と自動的に連携します。アニボイス上でどうぶつさん情報を確認することはできません。
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="t-footer-contents">
              <div className="t-footer-contents__body">
                <p className="u-mb10">
                  本サイトの個人情報の利用目的をご確認ください。
                </p>
                {/* cssとjsの修正　START */}
                <div
                  onScroll={onScroll}
                  className="m-scroll-contens u-mb20 js-scroll-check"
                  ref={refContract}
                >
                  <p className="u-fwBold u-mb5">
                    【個人情報の利用目的について】
                    <br />
                    アニボイスでは以下の目的のために、個人情報を利用します。
                  </p>
                  <div className="u-mb10">
                    <ul>
                      <li style={styleTextIndent}>
                        ・当サイトにおけるモニターの登録・変更・削除等のモニター管理を行うため
                      </li>
                      <li style={styleTextIndent}>
                        ・モニターのアンケートの回答履歴やポイント履歴の管理を行うため
                      </li>
                      <li style={styleTextIndent}>
                        ・当サイトに対するお問い合わせ対応などのカスタマーサービス業務のため
                      </li>
                      <li style={styleTextIndent}>
                        ・アンケート調査等の実施、またはそれに関連する案件について、当社からモニターに連絡するため
                      </li>
                      <li style={styleTextIndent}>
                        ・アンケート調査等の関連資料・モニター商品・景品等を発送するため
                      </li>
                      <li style={styleTextIndent}>
                        ・アンケート調査等において回答情報を提供した報酬として、モニターへポイントを付与するため
                      </li>
                      <li style={styleTextIndent}>
                        ・アンケート調査等の関連資料・モニター商品、景品等の発送のために必要なモニター情報を業務委託先に提供するため
                      </li>
                      <li style={styleTextIndent}>
                        ・調査依頼事業者がアンケートデータの分析を行うために、匿名加工情報化したモニターの登録情報を、調査依頼事業者に提供するため
                      </li>
                    </ul>
                    <br />
                    <p>
                      当社は、モニターの登録情報、回答状況、回答内容等の情報を分析して以下の目的で利用します。
                    </p>
                    <ul>
                      <li style={styleTextIndent}>
                        ・当社およびアニコムグループ各社または調査依頼事業者が、市場調査や商品・サービスの開発を行うため
                      </li>
                      <li style={styleTextIndent}>
                        ・モニターに対して、当社およびアニコムグループ各社、または調査依頼事業者が取り扱う商品・サービスに関する情報を案内するため
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="u-mb30">
                  <p>
                    モニター参加にあたってモニター規約・プライバシーポリシーの内容に同意いただく必要があります。
                    <br />
                    ※個人情報の利用目的を最後までご確認（下までスクロールされた状態）されないと進むボタンが選択できないためご注意ください。
                  </p>
                </div>
                <div className="a-input-checkbox a-input-checkbox--center u-mb20">
                  <input
                    id="agree"
                    type="checkbox"
                    className="a-input-checkbox__check js-scroll-disabled"
                    name="agree"
                    value="同意します"
                    onChange={onChangeAgree}
                    disabled={isDisbaleSubmit(propsFormik)}
                  />
                  <label htmlFor="agree" className="a-input-checkbox__label">
                    <a
                      href={pathRoutes.terms}
                      target="blank"
                      className="is-underlined"
                    >
                      モニター規約
                    </a>
                    ・
                    <a
                      href="https://www.anicom-sompo.co.jp/privacypolicy/"
                      target="blank"
                      className="is-underlined"
                    >
                      プライバシーポリシー
                    </a>
                    に同意します
                  </label>
                </div>
                {/* cssとjsの修正　END */}
                <button
                  className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
                  type={'submit'}
                  onClick={() => (window.location.href = '#')}
                  disabled={!agree}
                >
                  入力確認画面に進む
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default memo(injectIntl(Register))
