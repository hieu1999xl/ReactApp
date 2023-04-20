import React, { memo, useMemo } from 'react'
import { ShippingAddress } from '../../components'
import { Modal } from '../../../../commons'
import useModal from '../../../../../hook/useModal'
import { isEmpty } from 'lodash'
import pathsRoutes from '../../../../../helper/pathRoutes'
import { useHistory } from 'react-router-dom'

function AddressInfo({
  address,
  idx,
  invisibleDefault = false,
  handleSelectedAddressShipping,
  selectedAddressShipping,
  invisibleCheckBox = false,
  onToggle,
  t_slider_table = 't-slider-table'
}) {
  const history = useHistory()
  const {
    label = 1,
    name_kanji = '',
    tel = '',
    post_code = '',
    address_1 = '',
    address_2 = '',
    address_3 = '',
    address_4 = '',
    is_default = 0,
    ...restAddress
  } = address

  const dataFrom = useMemo(() => {
    if (isEmpty(address)) return {}
    return {
      zipCode1: post_code ? post_code.split('-')[0] : '',
      zipCode2: post_code ? post_code.split('-')[1] : '',
      city: address_1,
      ward: address_2,
      streetAddress: address_3,
      apartment: address_4,
      phone1: tel ? tel.split('-')[0] : '',
      phone2: tel ? tel.split('-')[1] : '',
      phone3: tel ? tel.split('-')[2] : '',
      is_default: is_default,
      ...restAddress
    }
  }, [address])

  const { isShowing, toggle, onClose } = useModal()

  const fullPostCode = useMemo(() => {
    if (!post_code && !address_1 && !address_2 && !address_3) return ''
    const strPostCode = post_code ? '〒' + `${post_code}` : ''
    return strPostCode
  }, [post_code])

  const fullAddress = useMemo(() => {
    if (!post_code && !address_1 && !address_2 && !address_3) return ''
    const strAddress1 = address_1 ? ` ${address_1}` : ''
    const strAddress2 = address_2 ? ` ${address_2}` : ''
    const strAddress3 = address_3 ? ` ${address_3}` : ''
    const strAddress4 = address_4 ? ` ${address_4}` : ''

    return `${strAddress1}${strAddress2}${strAddress3}${strAddress4}`
  }, [address_1, address_2, address_3, address_4, post_code])

  const onDetailShipping = () => {
    history.push(
      `${pathsRoutes.shippingAddress}?address=${address?.id ? address?.id : 0}`
    )
  }

  return (
    <div className={t_slider_table} key={idx}>
      <div className="t-u-table">
        <div className="t-header">
          <div className="t-header-left">
            <div className="a-input-checkbox a-input-checkbox--center">
              <input
                id={`label_${idx}`}
                type="checkbox"
                className="a-input-checkbox__check"
                checked={
                  !invisibleCheckBox
                    ? address?.is_default === 1
                      ? true
                      : false
                    : !isEmpty(selectedAddressShipping)
                    ? selectedAddressShipping?.id === address?.id
                    : false
                }
                name="label"
                onChange={e => {
                  if (handleSelectedAddressShipping) {
                    handleSelectedAddressShipping(address)
                  }
                }}
                onRender={e => {
                  if (address?.is_default === 1) {
                    this.checked = true
                  }
                }}
              />
              <label
                htmlFor={`label_${idx}`}
                className={
                  'a-input-checkbox__label ' +
                  (window.location.pathname == '/profile'
                    ? 'a-input-checkbox__none'
                    : '')
                }
              >
                {label || `住所 ${idx + 1}`}
              </label>
            </div>
          </div>
          <div className="t-header-right" onClick={() => onDetailShipping()}>
            <div>
              <img src="../assets/img/icon/pencil.png" className="" alt="" />
            </div>
            <div className="t-header-right-title">編集</div>
          </div>
        </div>
        <div className="t-body">
          <table className="m-table m-table--keep-point">
            <tbody>
              <tr className="m-table-border">
                <th className="m-table__head m-table__head--keep-point-date bold table-is-vertical">
                  宛名
                </th>
                <th className="m-table__head m-table__head--keep-point-date table-is-vertical">
                  {name_kanji}
                </th>
              </tr>
              <tr className="m-table-border">
                <th className="m-table__head m-table__head--keep-point-date bold table-is-vertical">
                  住所
                </th>
                <th className="m-table__head m-table__head--keep-point-date table-is-vertical">
                  <p>
                    {fullPostCode} <br></br>
                    {fullAddress}
                  </p>
                </th>
              </tr>
              <tr className="m-table-border">
                <th className="m-table__head m-table__head--keep-point-date bold table-is-vertical">
                  電話番号
                </th>
                <th className="m-table__head m-table__head--keep-point-date table-is-vertical">
                  {tel}
                </th>
              </tr>
            </tbody>
          </table>
          {/* <Modal
						isShowing={isShowing}
						hide={toggle}
						content={
							<ShippingAddress
								dataForm={dataFrom}
								isDetail={true}
								invisibleDefault={invisibleDefault}
								onToggle={onClose}
							/>
						}
					/> */}
        </div>
      </div>
    </div>
  )
}

export default memo(AddressInfo)
