import React, { memo, Fragment, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectDetailProductExchance, selectTotalPoints } from '../../redux'
import { BASE_URL_IMAGE } from '../../../../helper/consts'
import { MarkDown } from '../../../../components/layouts/main/components'
import paths from '../../../../helper/pathRoutes'
import { useHistory } from 'react-router'
import { isEmpty } from 'lodash'
import Slider from 'react-slick'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

function PointExchangeItem() {
  const detailProductExchange = useSelector(selectDetailProductExchance)
  const totalPoints = useSelector(selectTotalPoints)
  const history = useHistory()

  const isDisabledExchange = useMemo(() => {
    return totalPoints < detailProductExchange?.points
  }, [totalPoints, detailProductExchange?.points])

  const fetchAction = useMemo(() => {
    return (
      <>
        <button
          onClick={() =>
            detailProductExchange.exchange_button_label.includes('寄付')
              ? history.push({
                  pathname: paths.exchangeDetail,
                  state: { donate: 1 }
                })
              : history.push({
                  pathname: paths.exchangeDetail,
                  state: { donate: 0 }
                })
          }
          className={`a-button a-button--round a-button--2column-pc-only a-button--sp-adjust u-mb20sp ${
            isDisabledExchange
              ? 'a-button--gray'
              : 'a-button--exchange a-button--shadow-pink-2'
          }`}
          disabled={isDisabledExchange}
        >
          {detailProductExchange?.exchange_button_label || ''}
        </button>
        {detailProductExchange?.url && (
          <a
            target="_blank"
            href={detailProductExchange?.url}
            className="a-button a-button--round a-button--yellow-green a-button--shadow-yellow-green-2 a-button--2column-pc-only a-button--sp-adjust"
          >
            {detailProductExchange?.url_button_label || ''}
          </a>
        )}
      </>
    )
  }, [detailProductExchange])

  const fetchImage = useMemo(() => {
    if (isEmpty(detailProductExchange.images)) {
      return (
        <div className="o-item-detail-slider__item">
          <div className="o-item-detail-slider__item__image-frame">
            <img
              src={`${BASE_URL_IMAGE}/${detailProductExchange?.thumbnail}`}
              className="o-item-detail-slider__item__image-frame__image"
              alt=""
            />
          </div>
        </div>
      )
    }
    return (
      <Slider {...settings}>
        {detailProductExchange.images.map((image, idx) => (
          <div className="o-item-detail-slider__item" key={idx}>
            <div className="o-item-detail-slider__item__image-frame">
              <img
                src={`${BASE_URL_IMAGE}/${image?.image}`}
                className="o-item-detail-slider__item__image-frame__image"
                alt=""
              />
            </div>
          </div>
        ))}
      </Slider>
    )
  }, [detailProductExchange])

  return (
    <>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">商品詳細</p>
        </div>
      </div>
      <div className="t-contents t-contents--sp-no-side-padding">
        <div className="t-contents__body">
          <div className="o-item-detail">
            {/* js-item-slider */}
            <div className="o-item-detail-slider">{fetchImage}</div>
            <div className="o-item-detail__header">
              <p className="o-item-detail__header__item-name">
                <MarkDown
                  content={detailProductExchange?.name}
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    wordBreak: 'break-all'
                  }}
                />
                {/* {detailProductExchange?.name} */}
              </p>
              <div className="o-item-detail__header__flex">
                <div className="o-item-detail__header__flex__left-point">
                  必要ポイント
                  <span className="a-color--green u-fwBold u-pl5sp u-fz30">
                    {detailProductExchange?.points}
                  </span>
                  <span className="u-fwBold u-fz22">ポイント</span>
                </div>
                <div className="o-item-detail__header__flex__right-point">
                  保有ポイント
                  <span className="a-color--green u-pl5sp u-fz18">
                    {totalPoints}
                  </span>
                  ポイント
                </div>
              </div>
              <div className="o-item-detail__header__flex">{fetchAction}</div>
            </div>
            <div className="o-item-detail__body">
              <div className="u-mb20">
                <MarkDown
                  content={detailProductExchange.details}
                  style={{ wordBreak: 'break-all' }}
                />
              </div>
              {/* <img
                src="../../assets/img/point/img_exchange_item_detail_2.png"
                alt=""
                className="o-item-detail__body__image"
              />
              <p className="u-mb20">
                このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。このテキストはあたりです。
              </p> */}
            </div>
            <div className="o-item-detail__footer">{fetchAction}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(PointExchangeItem)
