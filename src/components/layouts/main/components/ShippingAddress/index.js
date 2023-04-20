import React, { memo, useEffect } from 'react'
import {
  listCity,
  isValidTextKatakana,
  validatePhonenumber,
  validatePostCode
} from '../../../../../helper/utils'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  createAddress,
  deleteAddress,
  listAddressByMember,
  selectCreateAddressSelected,
  updateAddress
} from '../../../../../modules/auth/redux'
import { isEmpty } from 'lodash-es'
import { FormPostCode } from '../../../../commons'
import { toastify } from '../../../../../helper/toast'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'

function ShippingAddress({
  dataForm,
  isDetail,
  invisibleDefault,
  onToggle,
  intl
}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const addressCreated = useSelector(selectCreateAddressSelected)

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

  const initialValues = () => {
    const init = {
      firstName: '',
      secondName: '',
      firstNameFurigana: '',
      secondNameFurigana: '',
      zipCode1: '',
      zipCode2: '',
      city: '',
      ward: '',
      streetAddress: '',
      apartment: '',
      phone1: '',
      phone2: '',
      phone3: '',
      is_default: false
    }
    if (isDetail) {
      return {
        firstName: dataForm?.firstName ?? '',
        secondName: dataForm?.secondName ?? '',
        firstNameFurigana: dataForm?.firstNameFurigana ?? '',
        secondNameFurigana: dataForm?.secondNameFurigana ?? '',
        zipCode1: dataForm?.zipCode1 ?? '',
        zipCode2: dataForm?.zipCode2 ?? '',
        city: dataForm?.city ?? '',
        ward: dataForm?.ward ?? '',
        streetAddress: dataForm?.streetAddress ?? '',
        apartment: dataForm?.apartment ?? '',
        phone1: dataForm?.phone1 ?? '',
        phone2: dataForm?.phone2 ?? '',
        phone3: dataForm?.phone3 ?? '',
        is_default: dataForm?.is_default === 0 ? false : true
      }
    }
    return init
  }
  const validationSchema = () => {
    return Yup.object().shape({
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
      zipCode1: Yup.string()
        .trim()
        .required(() => '郵便番号が必要です'),
      zipCode2: Yup.string()
        .trim()
        .required(() => '郵便番号が必要です'),
      zipCode: Yup.string().when(['zipCode1', 'zipCode2'], {
        is: (zipCode1, zipCode2) =>
          zipCode1 && zipCode2
            ? !validatePostCode({ zipCode1, zipCode2 })
            : false,
        then: Yup.string().required(() =>
          intl.formatMessage({ id: 'validation.isAddressNumber' })
        )
      }),
      phone1: Yup.string()
        .trim()
        .required(() => '電話番号が必要です'),
      phone2: Yup.string()
        .trim()
        .required(() => '電話番号が必要です'),
      phone3: Yup.string()
        .trim()
        .required(() => '電話番号が必要です'),
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

  const handleSuccessSubmited = () => {
    setTimeout(() => {
      history.goBack()
    }, 1500)
  }
  const onSubmit = data => {
    const {
      city,
      ward,
      streetAddress,
      apartment,
      phone1,
      phone2,
      phone3,
      zipCode1,
      zipCode2
    } = data
    const phoneNumber = `${phone1}-${phone2}-${phone3}`
    const payload = {
      post_code: `${zipCode1}-${zipCode2}`,
      name_kanji: `${data?.firstName} ${data?.secondName}`,
      name_furigana: `${data?.firstNameFurigana} ${data?.secondNameFurigana}`,
      address_1: city,
      address_2: ward,
      address_3: streetAddress,
      tel: phoneNumber,
      address_4: apartment,
      is_default: data?.is_default ? 1 : 0
    }
    // TODO create address
    if (!isDetail) {
      dispatch(
        createAddress({
          payload: payload,
          onSuccess: () => handleSuccessSubmited()
        })
      )
    } else {
      // TODO update address
      dispatch(
        updateAddress({
          payload: {
            addressId: dataForm?.id ? dataForm?.id : 0,
            dataBody: payload
          },
          onSuccess: () => handleSuccessSubmited()
        })
      )
    }
  }

  const handleDeleteAddress = () => {
    dispatch(
      deleteAddress({
        payload: {
          address_id: dataForm?.id ? dataForm?.id : 0
        },
        onSuccess: () => handleSuccessSubmited()
      })
    )
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
            <div className="t-contents" style={{ padding: '30px' }}>
              <div className="o-entry" style={{ maxWidth: 'inherit' }}>
                <div className="o-entry__table" style={{ paddingBottom: '0' }}>
                  <table className="m-table">
                    <tbody>
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
                        </td>
                      </tr>
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
                                propsFormik.submitCount != 0 &&
                                propsFormik.errors.city
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
                      {!invisibleDefault && (
                        <tr>
                          <th className="m-table__head"></th>
                          <td
                            className="m-table__body"
                            style={{ display: 'none' }}
                          >
                            <input
                              style={{ display: 'none' }}
                              id="is_default"
                              type="checkbox"
                              className="a-input-checkbox__check js-scroll-disabled"
                              name="is_default"
                              checked={propsFormik.values.is_default}
                              onChange={propsFormik.handleChange}
                            />
                            <label
                              htmlFor="is_default"
                              className="a-input-checkbox__label"
                            >
                              デフォルトの住所
                            </label>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: `${isDetail ? 'space-evenly' : 'center'}`,
                    alignItems: 'center'
                  }}
                >
                  {isDetail && (
                    <button
                      onClick={() => handleDeleteAddress()}
                      type="button"
                      className="a-button a-button--post-btn a-button--shadow2 a-button--round a-button--yellow-green a-button--shadow-yellow-green-2 u-fz16"
                      style={{
                        background: '#fff',
                        width: 200,
                        boxShadow: '0 2px 0 0 #53AA32',
                        color: '#53AA32'
                      }}
                    >
                      このお届け先を削除する
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={
                      !propsFormik?.dirty ||
                      (!propsFormik?.isValid && propsFormik.submitCount != 0)
                    }
                    className="a-button a-button--post-btn a-button--shadow2 a-button--round a-button--yellow-green a-button--shadow-yellow-green-2 u-fz16"
                    style={
                      !propsFormik?.dirty ||
                      (!propsFormik?.isValid && propsFormik.submitCount != 0)
                        ? {
                            background: '#ccc',
                            width: 200,
                            boxShadow: '0 2px 0 0 #ccc'
                          }
                        : { width: 200 }
                    }
                  >
                    {isDetail ? '編集内容を保存する' : 'お届け先を追加する'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default memo(injectIntl(ShippingAddress))
