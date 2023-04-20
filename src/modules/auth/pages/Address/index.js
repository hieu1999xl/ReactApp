import { isEmpty } from 'lodash'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ShippingAddress } from '../../../../components/layouts/main/components'
import { selectListAddressByMember } from '../../redux'

function Address() {
  const location = useLocation()
  const [address, setAddress] = useState({})

  const listAddress = useSelector(selectListAddressByMember)

  // TODO get detail address
  useEffect(() => {
    if (!location.search) return
    const addressId =
      location.search && location.search.includes('address=')
        ? location.search.split('=')[1]
        : ''
    if (!addressId) {
      return
    }
    if (isEmpty(listAddress)) {
      return
    }
    if (addressId === 0 + '') {
      console.log('2333', listAddress[0])
      setAddress(listAddress[0])
    } else {
      const addressItem = listAddress.find(
        address => +address?.id === +addressId
      )
      if (addressItem) {
        setAddress(addressItem)
      }
    }
  }, [location, listAddress])

  const dataFrom = React.useMemo(() => {
    if (isEmpty(address)) return {}
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

    return {
      firstName: address?.name_kanji ? address?.name_kanji.split(' ')[0] : '',
      secondName: address?.name_kanji ? address?.name_kanji.split(' ')[1] : '',
      firstNameFurigana: address?.name_furigana
        ? address?.name_furigana.split(' ')[0]
        : '',
      secondNameFurigana: address?.name_furigana
        ? address?.name_furigana.split(' ')[1]
        : '',
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

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">モニター情報確認・変更</p>
        </div>
      </div>
      <div className="m-animal-header">
        <p className="m-animal-header__normal-title">
          {location.pathname == '/shipping-address' ? (
            <>お届け先を追加することができます。</>
          ) : (
            <>モニター情報を編集することができます。</>
          )}
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
      <div className="t-contents t-contents--bg-ivory">
        <div className="o-entry">
          <div className="o-entry__table">
            <ShippingAddress isDetail={!isEmpty(address)} dataForm={dataFrom} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Address)
