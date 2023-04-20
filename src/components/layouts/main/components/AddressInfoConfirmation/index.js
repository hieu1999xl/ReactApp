import React, { memo, useMemo } from 'react'
import { ShippingAddress } from '../../components'
import { Modal } from '../../../../commons'
import useModal from '../../../../../hook/useModal'
import { isEmpty } from 'lodash'

function AddressInfoConfirmation({
  address,
  idx,
  invisibleDefault = false,
  handleSelectedAddressShipping,
  selectedAddressShipping,
  invisibleCheckBox = false,
  onToggle
}) {
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

  const fullAddress = useMemo(() => {
    if (!post_code && !address_1 && !address_2 && !address_3) return ''
    const dataAddress4 = address_4 ? `, ${address_4}` : ''
    return `${post_code}, ${address_1}, ${address_2}, ${address_3}${dataAddress4}`
  }, [address_1, address_2, address_3, address_4, post_code])

  return (
    <div className="t-slider-table" key={idx}>
      <div className="t-u-table">
        <div className="o-entry__delivery">{label || `住所 ${idx + 1}`}</div>
        <div className="t-body">
          <table className="m-table m-table--keep-point">
            <tbody>
              <tr className="m-table-border">
                <th className="m-table__head m-table__head--keep-point-date bold">
                  宛名
                </th>
                <th className="m-table__head m-table__head--keep-point-date">
                  {name_kanji}
                </th>
              </tr>
              <tr className="m-table-border">
                <th className="m-table__head m-table__head--keep-point-date bold">
                  住所
                </th>
                <th className="m-table__head m-table__head--keep-point-date">
                  <p>{fullAddress}</p>
                </th>
              </tr>
              <tr className="m-table-border">
                <th className="m-table__head m-table__head--keep-point-date bold">
                  電話番号
                </th>
                <th className="m-table__head m-table__head--keep-point-date">
                  {tel}
                </th>
              </tr>
            </tbody>
          </table>
          <Modal
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
          />
        </div>
      </div>
    </div>
  )
}

export default memo(AddressInfoConfirmation)
