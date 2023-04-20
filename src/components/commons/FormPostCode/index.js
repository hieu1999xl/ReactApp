import { isEmpty } from 'lodash'
import React, { memo, useLayoutEffect, useState } from 'react'
import { toastify } from '../../../helper/toast'
import { getPostCodeJA } from '../../../helper/jpPostCode'

function FormPostCode({ propsFormik, readOnly }) {
  const [postCode, setPostCode] = useState({})

  useLayoutEffect(() => {
    setPostCode({
      ...postCode,
      postCodeH: propsFormik?.values?.zipCode1,
      postCodeF: propsFormik?.values?.zipCode2
    })
  }, [propsFormik?.values])

  const handleChange = e => {
    setPostCode({
      ...postCode,
      [e.target.name]: e.target.value
    })
    const nameField = e.target.name === 'postCodeH' ? 'zipCode1' : 'zipCode2'
    propsFormik.setFieldValue(nameField, e.target.value)
  }

  const onBlurZipcode = async () => {
    if (isEmpty(postCode) || !postCode?.postCodeF || !postCode?.postCodeH) {
      toastify({
        type: 'error',
        msg: '郵便番号を正しく入力してください。'
      })
      return
    }
    const { setFieldValue, values } = propsFormik
    const zipCode = `${postCode?.postCodeH}${postCode?.postCodeF}`
    if (zipCode.length !== 7) {
      toastify({
        type: 'error',
        msg: '郵便番号は7文字である必要があります'
      })
      return
    }
    getPostCodeJA(postCode?.postCodeH, postCode?.postCodeF, address => {
      if (isEmpty(address)) {
        toastify({
          type: 'error',
          msg: '郵便番号を正しく入力してください。'
        })
        setFieldValue('city', '')
        setFieldValue('ward', '')
        setFieldValue('streetAddress', '')
      } else {
        setFieldValue('zipCode1', postCode?.postCodeH)
        setFieldValue('zipCode2', postCode?.postCodeF)
        setFieldValue('city', address.prefecture)
        setFieldValue('ward', address.city)
        setFieldValue('streetAddress', address.area)
      }
    })
  }

  return (
    <>
      <div className="m-table__body__flex-no-wrap">
        <input
          type="text"
          name="postCodeH"
          className={`a-input-text a-input-text--post p-postal-code ${
            ((!propsFormik.values.zipCode1 && propsFormik.errors.zipCode1) ||
              propsFormik.errors.zipCode) &&
            propsFormik.submitCount != 0
              ? 'is-required'
              : ''
          }`}
          size="3"
          maxLength="3"
          readOnly={readOnly}
          value={postCode.postCodeH}
          onChange={e => handleChange(e)}
        />
        <span className="u-ml5 u-mr5 a-color--green">-</span>
        <input
          type="text"
          name="postCodeF"
          className={`a-input-text a-input-text--post p-postal-code ${
            ((!propsFormik.values.zipCode2 && propsFormik.errors.zipCode2) ||
              propsFormik.errors.zipCode) &&
            propsFormik.submitCount != 0
              ? 'is-required'
              : ''
          }`}
          size="4"
          value={postCode.postCodeF}
          maxLength="4"
          readOnly={readOnly}
          onChange={e => handleChange(e)}
          // onKeyUp={complementAddress}
        />
        {!readOnly && (
          <button
            type="button"
            onClick={() => onBlurZipcode()}
            className="a-button a-button--post-btn a-button--shadow2 a-button--round a-button--yellow-green a-button--shadow-yellow-green-2 u-fz16 js-post-auto a-button--fillAutoAddress"
          >
            郵便番号から自動入力
          </button>
        )}
        {/* <input
					name="address1"
					id="address1"
					onChange={e => handleChange(e)}
					style={{display: 'none'}}
			/>
			<input
					name="address2"
					id="address2"
					style={{display: 'none'}}
					onChange={e => handleChange(e)}
			/>
			<input
					name="address3"
					id="address3"
					onChange={e => handleChange(e)}
					style={{display: 'none'}}
			/> */}
      </div>
      {/*<div className="u-fwBold u-fz11 a-color--pink" style={{marginTop: 5}}>
				{
					((!propsFormik.values.zipCode1 && propsFormik.errors.zipCode1)
					|| (!propsFormik.values.zipCode2 && propsFormik.errors.zipCode2)
					|| propsFormik.errors.zipCode) && propsFormik.submitCount!=0
					&& <span className="u-fwBold u-fz11 a-color--pink">{propsFormik.errors.zipCode1 || propsFormik.errors.zipCode2 || propsFormik.errors.zipCode}</span>
				}
			</div>*/}
    </>
  )
}
export default memo(FormPostCode)
