import React, { memo, useLayoutEffect, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import paths from '../../../../helper/pathRoutes'
import { isEmpty } from 'lodash'
import {
  listProducts,
  selectListProducts,
  fetchDetailProduct,
  selectTotalPoints
} from '../../redux'
import { MarkDown } from '../../../../components/layouts/main/components'
import { BASE_URL_IMAGE } from '../../../../helper/consts'
import { useHistory } from 'react-router'

function PointExchangeList(props) {
  const dispatch = useDispatch()
  const history = useHistory()

  const listProductsData = useSelector(selectListProducts)
  const totalPoints = useSelector(selectTotalPoints)

  useLayoutEffect(() => {
    handleFetchData()
    window.onpopstate = () => {
      handleFetchData(listProductsData.current_page)
    }
  }, [])

  const handleDetailProductExchance = data => {
    dispatch(fetchDetailProduct(data))
    if (data.exchange_button_label.includes('寄付')) {
      history.push({ pathname: paths.exchangeDetail, state: { donate: 1 } })
    } else {
      history.push({ pathname: paths.exchangeDetail, state: { donate: 0 } })
    }
  }

  const handleExchangeDetailItem = data => {
    dispatch(fetchDetailProduct(data))
    history.push(paths.itemExchangeDetail)
  }

  const handleFetchData = (page = 1) => {
    dispatch(listProducts(page))
  }

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">ポイント交換商品一覧</p>
        </div>
      </div>
      <div className="t-contents t-contents--bg-ivory">
        <div className="t-contents__body t-contents__body--slider">
          {isEmpty(listProductsData.data) ? (
            <p
              className="o-mypage-survey-slider__margin__wrap__box__title"
              style={{ textAlign: 'center' }}
              id="loadMessage"
            >
              {listProductsData.data === undefined
                ? '読み込み中...'
                : 'データが見つかりません'}
            </p>
          ) : (
            <div className="u-mb60pc u-mb25sp js-slider">
              <div className="t-slider-margin">
                <div className="o-exchange-item">
                  {listProductsData.data.map((prod, idx) => {
                    const urlImage = `${BASE_URL_IMAGE}/${prod.thumbnail}`
                    const linkImage = isEmpty(prod?.images)
                      ? urlImage
                      : `${BASE_URL_IMAGE}/${prod?.images[0].image}`
                    return (
                      <div className="o-exchange-item__box" key={idx}>
                        <div className="o-exchange-item__box__image-frame">
                          {/* ../assets/img/point/img_exchange-item_1.png */}
                          <img
                            src={linkImage}
                            className="o-exchange-item__box__image-frame__image"
                            alt=""
                          />
                        </div>
                        <div className="o-exchange-item__box__title">
                          <MarkDown
                            style={{
                              fontSize: '16px',
                              fontWeight: 'bold',
                              wordBreak: 'break-all'
                            }}
                            content={prod.name}
                          />
                          {/* {prod.name} */}
                        </div>
                        <p className="o-exchange-item__box__must-point">
                          必要ポイント
                          <span className="o-exchange-item__box__must-point__count">
                            {prod.points}
                          </span>
                          P
                        </p>
                        <button
                          onClick={e => handleExchangeDetailItem(prod)}
                          className="a-button a-button--detail a-button--shadow-yellow-green-2 a-button--round a-button--2column"
                        >
                          詳細を見る
                        </button>
                        <button
                          disabled={totalPoints < prod?.points}
                          onClick={e => handleDetailProductExchance(prod)}
                          className={`a-button ${
                            totalPoints < prod?.points
                              ? 'a-button--gray'
                              : 'a-button--exchange a-button--shadow-pink-2'
                          }  a-button--round a-button--2column`}
                        >
                          {prod?.exchange_button_label || 'ポイントを交換'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
          {!isEmpty(listProductsData.data) && (
            <div className="m-slick-arrow m-slick-arrow--sp-side-margin">
              <button
                type="button"
                className="m-slick-arrow__button m-slick-arrow--left"
                disabled={listProductsData.current_page === 1 ? true : false}
                onClick={() =>
                  handleFetchData(listProductsData.current_page - 1)
                }
              >
                <img
                  src="../assets/img/icon/icon_arrow-left-green.png"
                  className="m-slick-arrow__image"
                  alt=""
                />
              </button>
              <div className="m-slick-arrow__count">{`${listProductsData.current_page} / ${listProductsData.last_page}`}</div>
              <button
                type="button"
                className="m-slick-arrow__button m-slick-arrow--right"
                disabled={
                  listProductsData.current_page === listProductsData.last_page
                    ? true
                    : false
                }
                onClick={() =>
                  handleFetchData(listProductsData.current_page + 1)
                }
              >
                <img
                  src="../assets/img/icon/icon_arrow-right-green.png"
                  className="m-slick-arrow__image"
                  alt=""
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(PointExchangeList)
