import React, { memo, useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectDetailProductExchance,
  selectTotalPoints,
  pointExchanged,
  selectExchanged
} from '../../redux'
import {
  listAddressByMember,
  selectListAddressByMember,
  selectUserProfile
} from '../../../../modules/auth/redux'
import { Modal } from '../../../../components/commons'
import useModal from '../../../../hook/useModal'
import {
  AddressInfo,
  ShippingAddress,
  MarkDown
} from '../../../../components/layouts/main/components'
import { BASE_URL_IMAGE } from '../../../../helper/consts'
import { cloneDeep, isEmpty, isUndefined } from 'lodash-es'
import { useHistory, useLocation } from 'react-router'
import paths from '../../../../helper/pathRoutes'

function PointExchange() {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const { isShowing, toggle, onClose } = useModal()

  useEffect(() => {
    dispatch(
      listAddressByMember({
        is_exchange: 1
      })
    )
  }, [])
  const detailProductExchange = useSelector(selectDetailProductExchance)
  const listAddress = useSelector(selectListAddressByMember)

  const [selectedAddressShipping, setSelectedAddressShipping] = useState({})
  const [isChangeSelectBox, setIsChangeSelectBox] = useState(false)

  useEffect(() => {
    if (isEmpty(listAddress)) return
    const addressDefault =
      cloneDeep(listAddress.find(a => a.is_default === 1)) || {}
    setSelectedAddressShipping(addressDefault)
  }, [listAddress])

  const pointExchangedState = useSelector(selectExchanged)
  const profile = useSelector(selectUserProfile)
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

  const dataFrom = useMemo(() => {
    return {
      firstName: userInfo.name.split(' ')[0],
      secondName: userInfo.name.split(' ')[1],
      firstNameFurigana: userInfo.nameFurigana.split(' ')[0],
      secondNameFurigana: userInfo.nameFurigana.split(' ')[1]
    }
  }, [userInfo])
  const [cNumber, setCNumber] = useState(
    !isEmpty(pointExchangedState) ? pointExchangedState?.cNumber : 1
  )
  const handleMinus = () => {
    if (cNumber === 1) return
    setCNumber(i => --i)
  }
  const handleAdd = () => {
    setCNumber(i => ++i)
  }
  const totalPointExchange = useMemo(() => {
    if (isEmpty(detailProductExchange)) return cNumber
    return detailProductExchange?.points * cNumber
  }, [detailProductExchange, cNumber])

  const totalPoints = useSelector(selectTotalPoints)

  const restPointExchanged = useMemo(() => {
    return totalPoints - totalPointExchange < 1
      ? 0
      : totalPoints - totalPointExchange
  }, [totalPoints, totalPointExchange])
  const handleSelectedAddressShipping = payload => {
    setSelectedAddressShipping(payload)
    setIsChangeSelectBox(true)
  }

  const onSubmit = () => {
    const {
      post_code,
      tel,
      name_kanji,
      address_1,
      address_2,
      address_3,
      address_4,
      label
    } = selectedAddressShipping
    const strPostCode = post_code ? `${post_code} ` : ''
    const strAddress1 = address_1 ? ` ${address_1} ` : ''
    const strAddress2 = address_2 ? ` ${address_2} ` : ''
    const strAddress3 = address_3 ? ` ${address_3} ` : ''
    const strAddress4 = address_4 ? ` ${address_4}` : ''

    const payload = {
      totalPoints: totalPoints,
      cNumber: cNumber,
      totalPointExchange: totalPointExchange,
      restPointExchanged: restPointExchanged,
      labelAddress: label,
      userName: name_kanji,
      address: `${strPostCode}${strAddress1}${strAddress2}${strAddress3}${strAddress4}`,
      phoneNumber: tel,
      detailProductExchange: detailProductExchange,
      selectedAddressShipping: selectedAddressShipping,
      postCode: strPostCode,
      shortAddress: `${strAddress1}${strAddress2}${strAddress3}${strAddress4}`
    }
    const donateQuery = new URLSearchParams(location.search).get('donate')
    const donate = (location?.state && location?.state.donate) || donateQuery

    dispatch(pointExchanged(payload))
    history.push({ pathname: paths.exchangeVerify, state: { donate: donate } })
  }

  const imageProductURL = useMemo(() => {
    const urlImage = `${BASE_URL_IMAGE}/${detailProductExchange?.thumbnail}`
    const linkImage = isEmpty(detailProductExchange?.images)
      ? urlImage
      : `${BASE_URL_IMAGE}/${detailProductExchange?.images[0].image}`
    return linkImage
  }, [detailProductExchange])

  const handleShippingAddress = () => {
    history.push(paths.shippingAddress)
  }

  return (
    <div id="point-exchange">
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">ポイント交換</p>
        </div>
      </div>
      <div
        className="t-contents t-contents--bg-ivory"
        style={{ background: '#fff', paddingBottom: '0px' }}
      >
        <div className="t-contents__body">
          <div className="o-point">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 30
              }}
            >
              <div
                className="o-mypage-point-data"
                style={{ marginLeft: 'inherit' }}
              >
                <div className="o-mypage-point-data__detail">
                  <div className="o-mypage-point-data__detail__text">
                    <span className="o-mypage-point-data__detail__text__have-point">
                      保有ポイント
                    </span>
                    <p className="o-mypage-point-data__detail__text__count">
                      {totalPoints}
                      <span className="o-mypage-point-data__detail__text__count__point-text">
                        ポイント
                      </span>
                    </p>
                  </div>
                  {/*
                  <a
                    href="#"
                    className="o-mypage-point-data__detail__history u-hover"
                  >
                    獲得ポイント履歴を確認する
                    <img
                      src="../assets/img/icon/icon_arrow-right.png"
                      className="o-mypage-point-data__detail__history__history-arrow"
                      alt=""
                    />
                  </a>
                  */}
                </div>
              </div>
            </div>
          </div>
          <div className="o-point">
            <div className="u-item-exchange">
              <div className="o-exchange-item__box" style={{ width: '100%' }}>
                <div
                  className="o-exchange-item__box__image-frame"
                  style={{ maxWidth: 'unset' }}
                >
                  <img
                    src={imageProductURL}
                    className="o-exchange-item__box__image-frame__image"
                    alt=""
                  />
                </div>
                <div className="o-exchange-item__box__title">
                  <MarkDown
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      wordBreak: 'break-all'
                    }}
                    content={detailProductExchange?.name}
                  />
                  {/* {detailProductExchange?.name} */}
                </div>
                <div className="t-slider-table">
                  <table className="m-table m-table--keep-point">
                    <tbody>
                      <tr className="m-table-border">
                        <th
                          className="m-table__head m-table__head--keep-point-date"
                          style={{ textAlign: 'center' }}
                        >
                          必要ポイント
                        </th>
                        <th
                          className="m-table__head m-table__head--keep-point-date table-border"
                          style={{ textAlign: 'center' }}
                        >
                          交換数
                        </th>
                        <th
                          className="m-table__head m-table__head--keep-point-date"
                          style={{ textAlign: 'center' }}
                        >
                          小計
                        </th>
                      </tr>
                      <tr className="m-table-border">
                        <th
                          className="m-table__head"
                          style={{ textAlign: 'right' }}
                        >
                          <p
                            className="o-exchange-item__box__must-point"
                            style={{ textAlign: 'center', padding: 0 }}
                          >
                            <span className="o-exchange-item__box__must-point__count">
                              {detailProductExchange?.points}
                            </span>
                            P
                          </p>
                        </th>
                        <th
                          className="m-table__head table-border"
                          style={{ textAlign: 'center' }}
                        >
                          <div
                            className="u--couter-exchange"
                            style={{ fontSize: '18px', paddingTop: '13px' }}
                          >
                            <button
                              className="action"
                              onClick={() => handleMinus()}
                            >
                              <img
                                src="../assets/img/icon/minus-icon.png"
                                className="o-mypage-point-data__detail__history__history-arrow"
                                alt=""
                              />
                            </button>
                            <div className="c-number">{cNumber}</div>
                            <button
                              className="action"
                              disabled={
                                totalPointExchange +
                                  detailProductExchange?.points >
                                totalPoints
                              }
                              onClick={() => handleAdd()}
                            >
                              <img
                                src="../assets/img/icon/plus-icon.png"
                                className="o-mypage-point-data__detail__history__history-arrow"
                                alt=""
                              />
                            </button>
                          </div>
                        </th>
                        <th
                          className="m-table__head"
                          style={{ textAlign: 'right' }}
                        >
                          <p
                            className="o-exchange-item__box__must-point"
                            style={{ textAlign: 'center', padding: 0 }}
                          >
                            <span
                              className="o-exchange-item__box__must-point__count"
                              style={{ color: '#E56C5E' }}
                            >
                              {totalPointExchange}
                            </span>
                            P
                          </p>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="t-contents t-contents--bg-ivory"
        style={{ paddingTop: '20px' }}
      >
        <div className="t-contents__body">
          <p className="address-advice">お届け先を設定してください。</p>
          <div className="o-point">
            {!isEmpty(listAddress) &&
              listAddress.map((address, idx) => {
                return (
                  <AddressInfo
                    t_slider_table={
                      idx == 0
                        ? 't-slider-table-margin-change'
                        : 't-slider-table'
                    }
                    invisibleDefault={true}
                    idx={idx}
                    address={{
                      ...address,
                      firstName: dataFrom?.firstName,
                      secondName: dataFrom?.secondName,
                      firstNameFurigana: dataFrom?.firstNameFurigana,
                      secondNameFurigana: dataFrom?.secondNameFurigana
                    }}
                    handleSelectedAddressShipping={
                      handleSelectedAddressShipping
                    }
                    selectedAddressShipping={selectedAddressShipping}
                    invisibleCheckBox={isChangeSelectBox}
                    onToggle={onClose}
                  />
                )
              })}
            <div
              style={{
                /*
              display: 'flex',
              borderLeft: '10px solid yellow',
              */ paddingLeft: '20px',
                marginTop: '20px'
              }}
            >
              ポイント寄付いただく場合も、御礼ハガキ送付のためにお届け先を設定頂きます。
              <br></br>
              ※御礼ハガキは寄付受領証ではありませんので、予め了承ください。
            </div>
            <div className="o-home__mv__buttons">
              <button
                type="button"
                onClick={handleShippingAddress}
                className="o-home__mv__buttons__button a-button a-button--light-green u-hover"
              >
                ＋お届け先を追加する
              </button>
            </div>
            {/* <Modal
              isShowing={isShowing}
              hide={toggle}
              content={
                <ShippingAddress
                  dataForm={dataFrom}
                  onToggle={onClose}
                />
              }
            /> */}
          </div>
        </div>
      </div>
      <div
        className="t-contents t-contents--bg-ivory"
        style={{ background: '#fff', paddingBottom: '0px' }}
      >
        <div className="t-contents__body">
          <div className="o-point">
            <div className="u-total">
              <p
                className="m-animal-header__normal-title"
                style={{
                  textAlign: 'left',
                  color: '#333',
                  marginBottom: '20px'
                }}
              >
                交換内容
              </p>
              <div className="u-fee">
                <div>利用ポイント</div>
                <div>
                  <span className="o-exchange-item__box__must-point__count">
                    {totalPointExchange}
                  </span>
                  P
                </div>
              </div>
              <div className="u-fee">
                <div>残ポイント</div>
                <div>
                  <span className="o-exchange-item__box__must-point__count">
                    {`${restPointExchanged}`}
                  </span>
                  P
                </div>
              </div>
              <div className="o-home__mv__buttons">
                <button
                  onClick={() => onSubmit()}
                  disabled={isEmpty(selectedAddressShipping)}
                  className="o-home__mv__buttons__button a-button a-button--line-green a-button--green u-hover"
                  style={
                    isEmpty(selectedAddressShipping)
                      ? { background: '#dbdbdb', borderColor: '#dbdbdb' }
                      : {}
                  }
                >
                  確認画面に進む
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(PointExchange)
