import React, { memo, Fragment, useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router'
import paths from '../../../../helper/pathRoutes'

function PointExchangeComplete() {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const onSubmit = e => {
    // TODO if send question success -> /success-inquiry
    // dispatch(makeQuestion(setDataQues))
    history.push(paths.successInquiry)
  }
  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">ポイント交換</p>
        </div>
      </div>
      {/* <form id="form" action="#" method="post"> */}
      <div className="t-contents t-contents--bg-ivory">
        <div className="o-entry">
          <div
            className="m-animal-header__normal-title u-mb20"
            style={{ color: '#333' }}
          >
            <div className="section--dynamic-exchange-completed">
              <canvas
                style={{
                  backgroundImage:
                    "url('../assets/img/exchange/banner-exchange-complete.png')"
                }}
              ></canvas>
            </div>

            {/* <img
							src="../assets/img/exchange/banner-exchange-complete.png"
							style={{width: '100%', marginBottom: 30}}
							alt=""
						/> */}
          </div>
          <p
            className="m-animal-header__normal-title u-mb5"
            style={{ color: '#333', fontWeight: 'normal', fontSize: '16px' }}
          >
            お申込みありがとうございます。<br></br>
            商品はお申込みから２週間〜１ヶ月を目安にお届けいたしますので、到着までしばらくお待ちください。
            <br />
            なお商品の在庫状況により、到着が遅れる可能性があります。<br></br>
            あらかじめご了承ください。
          </p>
        </div>
      </div>
      {/* </form> */}
    </div>
  )
}

export default memo(PointExchangeComplete)
