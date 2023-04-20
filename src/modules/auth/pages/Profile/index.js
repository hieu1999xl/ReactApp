import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import {
  selectUserProfile,
  selectUserProfileEdit,
  setProfileEdit,
  listAddressByMember,
  selectListAddressByMember,
  checkUserAvaiable,
  checkPasswordAvaiable,
  selectIsAvaiableUser,
  selectIsAvaiablePassword,
  deleteImageUploaded,
  userProfile
} from '../../redux'
import {
  rangeStartToEnd,
  isValidTextKatakana,
  validatePhonenumber,
  validateFeatureDOB,
  validateDOBLatest18,
  validateScopeDay,
  validatePostCode,
  patternPassword
} from '../../../../helper/utils'
import { listGender, listCity, validateEmail } from '../../../../helper/utils'
import pathRoutes from '../../../../helper/pathRoutes'
import { isEmpty } from 'lodash'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FormProfileID from '../../../../components/layouts/main/components/FormProfileID'
import FormProfilePassword from '../../../../components/layouts/main/components/FormProfilePassword'
import { Modal } from '../../../../components/commons'
import useModal from '../../../../hook/useModal'
import {
  AddressInfo,
  ShippingAddress
} from '../../../../components/layouts/main/components'
import { FormPostCode } from '../../../../components/commons'
import { injectIntl } from 'react-intl'
import { UploadAvatar } from '../../../../components/commons'

function Profile({ intl }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const { isShowing, toggle } = useModal()

  const profile = useSelector(selectUserProfile)
  const profileEdit = useSelector(selectUserProfileEdit)
  const listAddress = useSelector(selectListAddressByMember)
  const isAvailableUser = useSelector(selectIsAvaiableUser)
  const isAvaiablePassword = useSelector(selectIsAvaiablePassword)

  const returnData = location.search && location.search.includes('return=true')

  useEffect(() => {
    dispatch(listAddressByMember())
  }, [])

  const userInfo = useMemo(() => {
    if (isEmpty(profile)) {
      return {}
    }
    if (isEmpty(profile.info)) return {}
    const parseInfo = JSON.parse(profile.info)
    const user = parseInfo.reduce(function (parseInfo, cur, i) {
      parseInfo[cur.name] = cur.value
      return parseInfo
    }, {})
    return user
  }, [profile])

  const initialValues = () => {
    const init = {
      lrvPassword: '',
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
      phone3: '',
      profileID: '0',
      profilePassword: '0',
      emailData: '',
      emailExtend: '',
      emailConfData: '',
      emailConfExtend: '',
      lrvPasswordCurrent: '',
      lrvPasswordNew: '',
      lrvPasswordNewCof: ''
    }
    if (!isEmpty(profileEdit) && returnData) {
      return {
        firstName: profileEdit?.firstName,
        secondName: profileEdit?.secondName,
        firstNameFurigana: profileEdit?.firstNameFurigana,
        secondNameFurigana: profileEdit?.secondNameFurigana,
        gender: profileEdit?.gender,
        day: profileEdit?.day,
        month: profileEdit?.month,
        year: profileEdit?.year,
        zipCode1: profileEdit?.zipCode1,
        zipCode2: profileEdit?.zipCode2,
        city: profileEdit?.city,
        ward: profileEdit?.ward,
        streetAddress: profileEdit?.streetAddress,
        apartment: profileEdit?.apartment,
        phone1: profileEdit?.phone1,
        phone2: profileEdit?.phone2,
        phone3: profileEdit?.phone3,
        profileID: profileEdit?.profileID,
        profilePassword: profileEdit?.profilePassword,
        emailData: profileEdit?.emailData,
        emailExtend: profileEdit?.emailExtend,
        emailConfData: profileEdit?.emailConfData,
        emailConfExtend: profileEdit?.emailConfExtend,
        lrvPasswordCurrent: profileEdit?.lrvPasswordCurrent,
        lrvPasswordNew: profileEdit?.lrvPasswordNew,
        lrvPasswordNewCof: profileEdit?.lrvPasswordNewCof
      }
    }
    if (!isEmpty(userInfo)) {
      // alert(userInfo.zipCode);
      return {
        firstName: userInfo.name ? userInfo.name.split(' ')[0] : '',
        secondName: userInfo.name ? userInfo.name.split(' ')[1] : '',
        firstNameFurigana: userInfo.nameFurigana.split(' ')[0],
        secondNameFurigana: userInfo.nameFurigana.split(' ')[1],
        gender: userInfo.gender ?? '',
        day: userInfo.dob ? userInfo.dob.split('/')[2] : '',
        month: userInfo.dob ? userInfo.dob.split('/')[1] : '',
        year: userInfo.dob ? userInfo.dob.split('/')[0] : '',
        zipCode1: userInfo.zipCode ? userInfo.zipCode.split('-')[0] : '',
        zipCode2: userInfo.zipCode ? userInfo.zipCode.split('-')[1] : '',
        city: userInfo.city ?? '',
        ward: userInfo.ward ?? '',
        streetAddress: userInfo.streetAddress ?? '',
        apartment: userInfo.apartment ?? '',
        phone1: userInfo.phoneNumber ? userInfo.phoneNumber.split('-')[0] : '',
        phone2: userInfo.phoneNumber ? userInfo.phoneNumber.split('-')[1] : '',
        phone3: userInfo.phoneNumber ? userInfo.phoneNumber.split('-')[2] : '',
        profileID: '0',
        profilePassword: '0'
      }
    }
    return init
  }

  const validationSchema = () => {
    return Yup.object().shape({
      // lrvPassword: Yup.string()
      //   .trim()
      //   .matches(patternPassword, "半角英数8文字〜16文字で入力してください。")
      //   .required(() => "パスワードが必要です"),
      lrvPasswordCof: Yup.string()
        .trim()
        .oneOf(
          [Yup.ref('lrvPasswordNewCof'), null],
          'パスワードが一致していません。'
        ),
      firstName: Yup.string()
        .trim()
        .required(() => 'お名前は必ず入力してください'),
      secondName: Yup.string()
        .trim()
        .required(() => 'お名前は必ず入力してください'),
      firstNameFurigana: Yup.string()
        .trim()
        .required(() => 'お名前（フリガナ）は必ず入力してください'),
      secondNameFurigana: Yup.string()
        .trim()
        .required(() => 'お名前（フリガナ）は必ず入力してください'),
      gender: Yup.string().required(() => '性別が必要です'),
      day: Yup.string()
        .trim()
        .required(() => '生年月日が必要です'),
      month: Yup.string()
        .trim()
        .required(() => '生年月日が必要です'),
      year: Yup.string()
        .trim()
        .required(() => '生年月日が必要です'),
      phone1: Yup.string()
        .trim()
        .required(() => '電話番号が必要です'),
      phone2: Yup.string()
        .trim()
        .required(() => '電話番号が必要です'),
      phone3: Yup.string()
        .trim()
        .required(() => '電話番号が必要です'),
      zipCode1: Yup.string()
        .trim()
        .required(() => '郵便番号を正しく入力してください。'),
      zipCode2: Yup.string()
        .trim()
        .required(() => '郵便番号を正しく入力してください。'),
      zipCode: Yup.string().when(['zipCode1', 'zipCode2'], {
        is: (zipCode1, zipCode2) =>
          zipCode1 && zipCode2
            ? !validatePostCode({ zipCode1, zipCode2 })
            : false,
        then: Yup.string().required(() =>
          intl.formatMessage({ id: 'validation.isAddressNumber' })
        )
      }),
      city: Yup.string()
        .trim()
        .required(() => '住所が必要です'),
      ward: Yup.string()
        .trim()
        .required(() => '住所が必要です'),
      streetAddress: Yup.string()
        .trim()
        .required(() => '住所が必要です'),
      dob: Yup.string().when(['day', 'month', 'year'], {
        is: (day, month, year) => validateFeatureDOB({ day, month, year }),
        then: Yup.string().required('日付を正しく入力してください。')
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
        then: Yup.string().required('電話番号を正しく入力してください。')
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
          then: Yup.string().required('カタカナで入力してください。')
        }
      ),
      emailData: Yup.string()
        .trim()
        .when(['profileID'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required('メールが必要です')
        }),
      emailConfData: Yup.string()
        .trim()
        .when(['profileID'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required('メールが必要です')
        }),
      email: Yup.string().when(['emailData', 'emailExtend'], {
        is: (emailData, emailExtend) =>
          emailData && emailExtend
            ? !validateEmail(`${emailData}@${emailExtend}`)
            : false,
        then: Yup.string().required('メールアドレスは無効になります')
      }),
      emailConfData: Yup.string()
        .trim()
        .when(['profileID'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required('メールによる確認が必要です')
        })
        .oneOf([Yup.ref('emailData'), null], 'メールで確認が一致しない'),
      emailConfExtend: Yup.string()
        .trim()
        .when(['profileID'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required('メールによる確認が必要です')
        })
        .oneOf([Yup.ref('emailExtend'), null], 'メールで確認が一致しない'),
      emailConf: Yup.string().when(
        ['emailConfData', 'emailConfExtend', 'profileID'],
        {
          is: (emailConfData, emailConfExtend, profileID) =>
            profileID !== '1'
              ? false
              : !validateEmail(`${emailConfData}@${emailConfExtend}`),
          then: Yup.string().required('メールアドレスは無効になります')
        }
      ),
      lrvPasswordCurrent: Yup.string()
        .trim()
        .when(['profilePassword'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required('現在のパスワードが必要です。')
        }),
      lrvPasswordNew: Yup.string()
        .trim()
        .matches(
          patternPassword,
          intl.formatMessage({ id: 'validation.passwordLength' })
        )
        .when(['profilePassword'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required('新しいパスワードを入力してください。')
        }),
      lrvPasswordNewCof: Yup.string()
        .trim()
        .matches(
          patternPassword,
          intl.formatMessage({ id: 'validation.passwordLength' })
        )
        .when(['profilePassword'], {
          is: profileID => (profileID === '1' ? true : false),
          then: Yup.string().required(
            '＜確認用＞新しいパスワードを入力してください。'
          )
        })
        .oneOf([Yup.ref('lrvPasswordNew'), null], 'パスワードが一致しません')
    })
  }

  const isDisableSubmit = useCallback(
    propsFormik => {
      const { profileID, profilePassword } = propsFormik.values
      if (profileID === '1' && !isAvailableUser) {
        return true
      }
      if (profilePassword === '1' && !isAvaiablePassword) {
        return true
      }
      return false
    },
    [isAvailableUser, isAvaiablePassword]
  )

  const onSubmit = data => {
    dispatch(
      setProfileEdit({
        ...data,
        email:
          data?.profileID === '0'
            ? profile?.email
            : `${data?.emailData}@${data?.emailExtend}`,
        avatarUrl: profile?.avatar_url
          ? profile?.avatar_url
          : '../assets/img/profile/user.png'
      })
    )
    history.push(pathRoutes.editProfileVerify)
  }

  const isInvalidName = propsFormik => {
    const { errors, values, touched } = propsFormik
    const { firstName, secondName } = values
    const isTouched = touched.firstName || touched.secondName
    return isTouched && (errors.firstName || errors.secondName)
  }

  const isInValidZipCode = propsFormik => {
    const { errors, values, touched } = propsFormik
    const isTouched = touched.zipCode1 || touched.zipCode2
    return isTouched && (errors.zipCode1 || errors.zipCode2)
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

  const onBlurCheckUserAvai = propsFormik => {
    const { emailConfData, emailConfExtend } = propsFormik.values
    if (propsFormik.errors.emailConfData || propsFormik.errors.emailConfData) {
      return
    }
    dispatch(
      checkUserAvaiable({
        email: `${emailConfData}@${emailConfExtend}`
      })
    )
  }

  const onBlurCheckPasswordAvai = propsFormik => {
    if (propsFormik?.errors.lrvPasswordCurrent) {
      return
    }
    dispatch(
      checkPasswordAvaiable({
        username: profile?.email,
        /*propsFormik?.values?.profileID === '0'
        ? profile?.email
        : `${propsFormik?.values?.emailData}@${propsFormik?.values?.emailExtend}`,*/
        password: propsFormik?.values?.lrvPasswordCurrent
      })
    )
  }

  const handleShippingAddress = () => {
    history.push(pathRoutes.shippingAddress)
  }

  const handleDeleteImageUpload = e => {
    e.preventDefault()
    dispatch(
      deleteImageUploaded({
        onSuccess: () => {
          dispatch(userProfile())
        }
      })
    )
  }

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">モニター情報確認・変更</p>
        </div>
      </div>
      <div className="m-animal-header">
        <p className="m-animal-header__normal-title">
          モニター情報を編集することができます。
        </p>
        <div className="m-animal-header__animal-box">
          <div className="m-animal-header__animal-position">
            <img
              src="../assets/img/common/img_animals-image_2.png"
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
          <>
            <form id="form" onSubmit={propsFormik.handleSubmit}>
              <div className="t-contents t-contents--bg-ivory">
                <div className="o-entry">
                  <div className="o-entry__table o-entry__table--border-bottom">
                    <table className="m-table">
                      <tbody>
                        <tr>
                          <th
                            className="m-table__head m-table__head--entry"
                            colSpan={2}
                          >
                            <div className="o-entry__notice">
                              ご契約中のどうぶつさん情報（どうぶつの種類、品種、年齢など）は、アニコム損保マイページの情報と自動的に連携しています。そのため、本サイトでモニターさまがどうぶつさんの情報を変更することはできません。
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            アニボイス <br />
                            トップアイコン
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}
                            >
                              <div
                                style={{ width: '50px', position: 'relative' }}
                              >
                                {profile?.avatar_url ? (
                                  <img
                                    src={profile?.avatar_url}
                                    style={{ width: '100%' }}
                                    alt=""
                                  />
                                ) : (
                                  <img
                                    src="../assets/img/profile/user.png"
                                    style={{ width: '100%' }}
                                    alt=""
                                  />
                                )}
                                <UploadAvatar />
                              </div>
                              <div style={{ marginLeft: '20px' }}>
                                {profile?.avatar_url && (
                                  <button
                                    style={{ padding: '10px 20px' }}
                                    className="a-button a-button--submit a-button--round u-fz16"
                                    onClick={handleDeleteImageUpload}
                                  >
                                    画像を削除
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            ログインID（メールアドレス）
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <div className="m-table__body__icon">
                              <p style={{ fontSize: '16px' }}>
                                {profile.email}
                              </p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th className="m-table__head m-table__head--entry"></th>
                          <td className="m-table__body m-table__body--entry">
                            <select
                              name="profileID"
                              className="a-input-select__list"
                              value={propsFormik.values.profileID}
                              onChange={propsFormik.handleChange}
                              selected=""
                            >
                              <option value="0">ログインIDを変更しない</option>
                              <option value="1">ログインIDを変更する</option>
                            </select>
                          </td>
                        </tr>
                        {propsFormik.values.profileID === '1' && (
                          <FormProfileID
                            propsFormik={propsFormik}
                            onBlurCheckUserAvai={onBlurCheckUserAvai}
                          />
                        )}
                        <tr>
                          <th className="m-table__head m-table__head--entry">
                            パスワード
                          </th>
                          <td className="m-table__body m-table__body--entry">
                            <select
                              className="a-input-select__list"
                              name="profilePassword"
                              value={propsFormik.values.profilePassword}
                              onChange={propsFormik.handleChange}
                              selected=""
                            >
                              <option value="0">パスワードを変更しない</option>
                              <option value="1">パスワードを変更する</option>
                            </select>
                          </td>
                        </tr>
                        {propsFormik.values.profilePassword === '1' && (
                          <FormProfilePassword
                            propsFormik={propsFormik}
                            onBlurCheckPasswordAvai={onBlurCheckPasswordAvai}
                          />
                        )}
                        <tr>
                          <th
                            className="m-table__head m-table__head--entry"
                            colSpan={2}
                          >
                            <div className="o-entry__notice">
                              <ul className="m-dots-list">
                                <li>
                                  ドメイン指定受信を設定されている方は「ani-com.com」を追加してください。
                                </li>
                                <li>
                                  メール指定受信を設定されている方は「anivoice_noreply@ani-com.com」を追加してください。
                                </li>
                              </ul>
                            </div>
                          </th>
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
                                  {rangeStartToEnd(1, 13, 1).map(
                                    (month, idx) => {
                                      return (
                                        <option key={idx} value={month}>
                                          {month}
                                        </option>
                                      )
                                    }
                                  )}
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
                            {isInValidZipCode(propsFormik) && (
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
                        <tr>
                          <th
                            className="m-table__head m-table__head--entry"
                            colSpan={2}
                          >
                            <div className="o-entry__notice">
                              <ul className="m-dots-list">
                                <li>
                                  ポイント交換商品の発送先を、「住所」以外に設定したい場合、「お届け先を追加する」から新規お届け先を登録してください。
                                </li>
                              </ul>
                            </div>
                          </th>
                        </tr>
                        <tr>
                          <th
                            className="m-table__head m-table__head--entry"
                            colSpan={2}
                          >
                            <button
                              type="button"
                              style={{ width: '200px', margin: 0 }}
                              // onClick={toggle}
                              onClick={handleShippingAddress}
                              className="a-button a-button--post-btn a-button--shadow2 a-button--round a-button--yellow-green a-button--shadow-yellow-green-2 u-fz16"
                            >
                              お届け先を追加する
                            </button>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                    {!isEmpty(listAddress) &&
                      listAddress.map((address, idx) => {
                        return (
                          <AddressInfo
                            invisibleDefault={true}
                            onToggle={toggle}
                            key={idx}
                            idx={idx}
                            address={{
                              ...address,
                              firstName: propsFormik.values.firstName,
                              secondName: propsFormik.values.secondName,
                              firstNameFurigana:
                                propsFormik.values.firstNameFurigana,
                              secondNameFurigana:
                                propsFormik.values.secondNameFurigana
                            }}
                          />
                        )
                      })}
                  </div>
                </div>
              </div>
              <div className="t-footer-contents">
                <div className="t-footer-contents__body">
                  <button
                    className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
                    type="submit"
                    onClick={() => (window.location.href = '#')}
                    disabled={isDisableSubmit(propsFormik)}
                  >
                    入力確認画面に進む
                  </button>
                </div>
              </div>
            </form>
            {/* <Modal
              isShowing={isShowing}
              hide={toggle}
              content={<ShippingAddress
                dataForm={propsFormik?.values}
                onToggle={toggle}
              />}
            /> */}
          </>
        )}
      </Formik>
    </div>
  )
}

export default memo(injectIntl(Profile))
