import React, { memo, Fragment, useState, useRef } from 'react'
import { rangeStartToEnd } from '../../../../helper/utils'
import paths from '../../../../helper/pathRoutes'
import { selectRespRemindId } from '../../redux'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

function SuccessForgetId() {
  const respRemindId = useSelector(selectRespRemindId)

  return (
    <div>
      <div className="m-animal-header">
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

      <form id="form" action="#" method="post">
        <div
          className="t-contents t-contents--bg-ivory"
          style={{ paddingTop: 60 }}
        >
          <div className="o-entry">
            {/* <p
							className="m-animal-header__normal-title u-mb5"
							style={{ color: "#333" }}
						>
							モニターへの登録が完了しました。
						</p> */}
            <p
              className="m-animal-header__normal-title u-mb5"
              style={{ color: '#333' }}
            >
              アニボイスのログインID(メールアドレス）は以下のとおりです。
            </p>
            <p className="m-animal-header__normal-title u-mb5">
              {respRemindId || ''}
            </p>
          </div>
          <div className="o-entry" style={{ marginTop: 50 }}>
            <a
              style={{ borderRadius: '50px', cursor: 'pointer' }}
              className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
              href={paths.login}
            >
              ani voiceへログインする
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default memo(SuccessForgetId)
