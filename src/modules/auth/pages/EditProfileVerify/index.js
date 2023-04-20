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
  selectUserProfile,
  selectInfoRegister,
  selectUserProfileEdit,
  updateUserProfile,
  selectIsUpdatedProfile,
  listAddressByMember,
  selectListAddressByMember
} from '../../redux'
import { rangeStartToEnd } from '../../../../helper/utils'
import { listGender, listCity } from '../../../../helper/utils'
import pathRoutes from '../../../../helper/pathRoutes'
import { isEmpty } from 'lodash'
import { Formik } from 'formik'
import { FormPostCode } from '../../../../components/commons'
import {
  AddressInfoConfirmation,
  ShippingAddress
} from '../../../../components/layouts/main/components'

function EditProfileVerify() {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const refRegion = useRef(null)
  const refWard = useRef(null)
  const refStreetAddress = useRef(null)
  const refExtendAddress = useRef(null)

  const userInfoEdit = useSelector(selectUserProfileEdit)
  const isUpdatedProfile = useSelector(selectIsUpdatedProfile)
  const listAddress = useSelector(selectListAddressByMember)

  useEffect(() => {
    dispatch(listAddressByMember())
  }, [])
  // useEffect(() => {
  //   if (isUpdatedProfile) {
  //     history.push(pathRoutes.editProfileComplete)
  //   }
  // }, [isUpdatedProfile]);

  const initialValues = () => {
    const init = {
      email: '',
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
      lrvPasswordCurrent: ''
    }
    if (!isEmpty(userInfoEdit)) {
      return {
        email: userInfoEdit?.email ?? '',
        lrvPassword: userInfoEdit?.lrvPasswordNew ?? '',
        lrvPasswordCurrent: userInfoEdit?.lrvPasswordCurrent ?? '',
        firstName: userInfoEdit?.firstName ?? '',
        secondName: userInfoEdit?.secondName ?? '',
        firstNameFurigana: userInfoEdit?.firstNameFurigana ?? '',
        secondNameFurigana: userInfoEdit?.secondNameFurigana ?? '',
        gender: userInfoEdit?.gender ?? '',
        day: userInfoEdit?.day ?? '',
        month: userInfoEdit?.month ?? '',
        year: userInfoEdit?.year ?? '',
        zipCode1: userInfoEdit?.zipCode1 ?? '',
        zipCode2: userInfoEdit?.zipCode2 ?? '',
        city: userInfoEdit?.city ?? '',
        ward: userInfoEdit?.ward ?? '',
        streetAddress: userInfoEdit?.streetAddress ?? '',
        apartment: userInfoEdit?.apartment ?? '',
        phone1: userInfoEdit?.phone1 ?? '',
        phone2: userInfoEdit?.phone2 ?? '',
        phone3: userInfoEdit?.phone3 ?? '',
        profileID: userInfoEdit?.profileID ?? '',
        profilePassword: userInfoEdit?.profilePassword ?? '',
        avatarUrl: userInfoEdit?.avatarUrl ?? ''
      }
    }
    return init
  }

  const onSubmit = data => {
    const {
      lrvPassword,
      phone1,
      phone2,
      phone3,
      firstName,
      secondName,
      firstNameFurigana,
      secondNameFurigana,
      day,
      month,
      year,
      gender,
      city,
      ward,
      streetAddress,
      apartment,
      zipCode1,
      zipCode2,
      profileID,
      profilePassword
    } = data
    console.log('data', data)
    const phoneNumber = `${phone1}-${phone2}-${phone3}`
    const name = `${firstName} ${secondName}`
    const nameFurigana = `${firstNameFurigana} ${secondNameFurigana}`
    const dob = `${year}/${month}/${day}`
    let payload = {
      email: data?.email || '',
      segments: [
        { name: 'name', value: name },
        { name: 'nameFurigana', value: nameFurigana },
        { name: 'dob', value: dob },
        { name: 'gender', value: gender },
        { name: 'city', value: city },
        { name: 'ward', value: ward },
        { name: 'streetAddress', value: streetAddress },
        { name: 'zipCode', value: `${zipCode1}-${zipCode2}` },
        { name: 'apartment', value: apartment },
        { name: 'phoneNumber', value: phoneNumber }
      ]
      // isChangeProfile: profileID === '1' ? true : false,
      // isChangePassword: profilePassword === '1' ? true : false,
      // lrvPasswordCurrent: data?.lrvPasswordCurrent
    }
    if (profilePassword === '1') {
      payload = {
        ...payload,
        lrvPassword: data?.lrvPassword
      }
    }
    dispatch(updateUserProfile(payload))
  }

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">
            モニター情報確認・変更＞変更確認画面{' '}
          </p>
        </div>
      </div>
      <div className="m-animal-header">
        <p className="m-animal-header__normal-title u-fz16">
          以下の内容でモニター情報を登録します。
          <br />
          ご確認の上「変更を保存する」を押してください。
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
                          アニボイス <br />
                          トップアイコン
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div style={{ width: '50px' }}>
                            <img
                              src={propsFormik.values.avatarUrl}
                              style={{ width: '100%' }}
                              alt=""
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          ログインID (電子メールアドレス)
                        </th>
                        <td className="m-table__body m-table__body--entry u-fz16">
                          {propsFormik.values.email}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          パスワード
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          ●●●●●●●●●
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          お名前
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__2column u-fz16">
                            {propsFormik.values.firstName}　
                            {propsFormik.values.secondName}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          お名前（フリガナ）
                        </th>
                        <td className="m-table__body m-table__body--entry u-fz16">
                          {propsFormik.values.firstNameFurigana}　
                          {propsFormik.values.secondNameFurigana}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          性別
                        </th>
                        <td className="m-table__body m-table__body--entry u-fz16">
                          {listGender.find(
                            gender =>
                              gender?.value === propsFormik?.values?.gender
                          )?.label || '男性'}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          生年月日
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__flex-no-wrap u-fz16">
                            {propsFormik.values.year}年
                            {propsFormik.values.month}月{propsFormik.values.day}
                            日
                          </div>
                        </td>
                      </tr>
                      {/*</tbody>
                  </table>
                </div>
                <div className="o-entry__table">
                  <table className="m-table">
                    <tbody>*/}
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          郵便番号
                        </th>
                        <td className="m-table__body m-table__body--entry u-fz16">
                          {propsFormik.values.zipCode1}-
                          {propsFormik.values.zipCode2}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          都道府県
                        </th>
                        <td className="m-table__body m-table__body--entry u-fz16">
                          {propsFormik.values.city}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          市区町村
                        </th>
                        <td className="m-table__body m-table__body--entry u-fz16">
                          {propsFormik.values.ward}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head">市区町村以下、番地</th>
                        <td className="m-table__body u-fz16">
                          {propsFormik.values.streetAddress}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          ビル・マンション名、部屋番号等
                        </th>
                        <td className="m-table__body m-table__body--entry u-fz16">
                          {propsFormik.values.apartment}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          電話番号
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__flex-no-wrap u-fz16">
                            {propsFormik.values.phone1}-
                            {propsFormik.values.phone2}-
                            {propsFormik.values.phone3}
                          </div>
                          <span className="u-fz11">
                            パスワード忘れなどの際に、ご本人確認のために必要となります。
                          </span>
                          <br></br>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="o-entry__table">
                  {!isEmpty(listAddress) &&
                    listAddress.map((address, idx) => {
                      return (
                        <AddressInfoConfirmation
                          invisibleDefault={true}
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
              <div
                className="t-footer-contents__body"
                style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center'
                }}
              >
                <button
                  className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
                  style={{ width: '150px', margin: 'unset' }}
                  onClick={e => {
                    history.push(`${pathRoutes.userProfile}?return=true`)
                  }}
                >
                  戻る
                </button>
                <button
                  type="submit"
                  className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
                  style={{ width: '150px', margin: 'unset' }}
                >
                  変更を保存する
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default memo(EditProfileVerify)
