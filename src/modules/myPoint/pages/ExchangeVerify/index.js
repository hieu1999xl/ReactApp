import React, { memo, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import pathRoutes from '../../../../helper/pathRoutes'
import { selectExchanged } from '../../redux'
import { BASE_URL_IMAGE } from '../../../../helper/consts'
import { finishPointExchanged, finishPointDonated } from '../../redux'
import { isEmpty } from 'lodash'

function ExchangeVerify() {
  const pointExchanged = useSelector(selectExchanged)
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const [agree, setAgree] = useState(false)
  const donate = location.state.donate
  const onSubmit = () => {
    const {
      detailProductExchange,
      selectedAddressShipping,
      totalPointExchange
    } = pointExchanged
    const payload = {
      address_id: !isEmpty(selectedAddressShipping)
        ? selectedAddressShipping?.id
        : '',
      product_id: !isEmpty(detailProductExchange)
        ? detailProductExchange?.id
        : '',
      points:
        totalPointExchange ||
        (!isEmpty(detailProductExchange) ? detailProductExchange?.points : 0)
    }
    if (location.state.donate == 1) {
      dispatch(finishPointDonated(payload))
    } else {
      dispatch(finishPointExchanged(payload))
    }
  }

  const imageProductURL = useMemo(() => {
    const urlImage = `${BASE_URL_IMAGE}/${pointExchanged?.detailProductExchange?.thumbnail}`
    const linkImage = isEmpty(pointExchanged?.detailProductExchange?.images)
      ? urlImage
      : `${BASE_URL_IMAGE}/${pointExchanged?.detailProductExchange?.images[0].image}`
    return linkImage
  }, [pointExchanged?.detailProductExchange])

  return (
    <div id="point-exchange">
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">ポイント交換＞確認画面</p>
        </div>
      </div>
      <div
        className="t-contents t-contents--bg-ivory"
        style={{ background: '#fff', paddingBottom: '0px' }}
      >
        <div className="t-contents__body">
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
                  {pointExchanged?.detailProductExchange?.name}
                </div>
                <div className="t-slider-table shipping-u">
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
                              {pointExchanged?.detailProductExchange?.points}
                            </span>
                            P
                          </p>
                        </th>
                        <th
                          className="m-table__head table-border"
                          style={{ textAlign: 'center' }}
                        >
                          <p
                            className="o-exchange-item__box__must-point"
                            style={{ textAlign: 'center', padding: 0 }}
                          >
                            {pointExchanged?.cNumber}
                          </p>
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
                              {pointExchanged?.totalPointExchange}
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
          <div className="o-point">
            <div className="t-slider-table">
              <div className="t-u-table">
                <div className="t-header" style={{ paddingLeft: '50px' }}>
                  <div
                    className="t-header-left"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <p
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '18px'
                      }}
                    >
                      お届け先
                    </p>
                  </div>
                </div>
                <div className="t-body">
                  <table className="m-table m-table--keep-point">
                    <tbody>
                      {/*}
                  <tr className="m-table-border">

                    <th
                      className="m-table__head"
                      style={{ textAlign: "left", paddingRight: "20px" }}
                    >
                      <p
                        className="o-exchange-item__box__must-point"
                        style={{ padding: 0 ,textAlign:"left"}}
                      >
                        <span className="o-exchange-item__box__must-point__count">
                          {pointExchanged?.labelAddress}
                        </span>
                      </p>
                    </th>
                  </tr>
  */}
                      <tr className="m-table-border">
                        <th className="m-table__head m-table__head--keep-point-datebold table-is-vertical">
                          宛名
                        </th>
                        <th
                          className="m-table__head m-table__head--keep-point-date table-is-vertical"
                          style={{ textAlign: 'left', paddingRight: '20px' }}
                        >
                          {pointExchanged?.userName}
                          {/* <p
                        className="o-exchange-item__box__must-point"
                        style={{ padding: 0 }}
                      >
                        <span className="o-exchange-item__box__must-point__count">

                        </span>
                     </p>*/}
                        </th>
                      </tr>
                      <tr className="m-table-border">
                        <th className="m-table__head m-table__head--keep-point-datebold table-is-vertical">
                          お届け先住所
                        </th>
                        <th
                          className="m-table__head m-table__head--keep-point-date table-is-vertical"
                          style={{ textAlign: 'left', paddingRight: '20px' }}
                        >
                          {
                            //{pointExchanged?.address}
                          }
                          {pointExchanged?.postCode}
                          <br />
                          {pointExchanged?.shortAddress}
                          {/*  <p
                        className="o-exchange-item__box__must-point"
                        style={{ padding: 0 }}
                      >

                    </p>*/}
                        </th>
                      </tr>
                      <tr className="m-table-border">
                        <th className="m-table__head m-table__head--keep-point-datebold table-is-vertical">
                          電話番号
                        </th>
                        <th
                          className="m-table__head m-table__head--keep-point-date table-is-vertical"
                          style={{ textAlign: 'left', paddingRight: '20px' }}
                        >
                          {pointExchanged?.phoneNumber}
                          {/*<p
                        className="o-exchange-item__box__must-point"
                        style={{ padding: 0 }}
                      >
                        <span
                          className="o-exchange-item__box__must-point__count"
                        >

                        </span>
                      </p>*/}
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="t-slider-table">
              {/* <h2 id="slider" className="u--label-point-used">
                アンケート一覧
              </h2> */}
            </div>
            <div
              className="t-slider-table point-used-u"
              style={{ marginTop: '20px' }}
            >
              <table className="m-table m-table--keep-point">
                <tbody>
                  <tr className="m-table-border">
                    <th className="m-table__head m-table__head--keep-point-date table-border">
                      利用ポイント
                    </th>
                    <th
                      className="m-table__head table-border"
                      style={{ textAlign: 'left', paddingRight: '20px' }}
                    >
                      <p className="o-exchange-item__box__must-point point-used">
                        {pointExchanged?.totalPointExchange} ポイント
                      </p>
                    </th>
                  </tr>
                  <tr className="m-table-border">
                    <th className="m-table__head m-table__head--keep-point-date table-border">
                      残ポイント
                    </th>

                    <th
                      className="m-table__head table-border"
                      style={{ textAlign: 'center' }}
                    >
                      <p className="o-exchange-item__box__must-point point-used ">
                        {pointExchanged?.restPointExchanged} ポイント
                      </p>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className="t-contents t-contents--bg-ivory"
        style={{ background: '#fff', paddingBottom: '0px' }}
      >
        <div className="t-contents__body">
          <div className="o-point">
            <div className="u-total" style={{ maxWidth: '500px' }}>
              <p className="u-textCenter u-mb20">
                上記の内容で、ポイント交換することを確認しましたか？
              </p>
              <div className="a-input-checkbox a-input-checkbox--center u-mb20">
                <input
                  id="agree"
                  type="checkbox"
                  className="a-input-checkbox__check js-scroll-disabled"
                  name="agree"
                  value="確認した。"
                  onChange={() => setAgree(prev => !prev)}
                />
                <label htmlFor="agree" className="a-input-checkbox__label">
                  確認した。
                </label>
              </div>
            </div>
          </div>
        </div>

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
            style={{ width: '150px', margin: 'unset', marginRight: '2px' }}
            onClick={e => {
              history.push(
                `${pathRoutes.exchangeDetail}?return=true&donate=${donate}`
              )
            }}
          >
            戻る
          </button>
          <button
            onClick={e => onSubmit()}
            disabled={!agree}
            style={{ width: '150px', margin: 'unset', marginLeft: '2px' }}
            className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
          >
            交換する
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(ExchangeVerify)
