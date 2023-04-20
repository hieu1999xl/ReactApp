import React, { memo } from 'react'
import pathRoutes from '../../../../helper/pathRoutes'

function EditProfileComplete() {
  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">モニター情報確認・変更</p>
        </div>
      </div>
      <div className="t-contents t-contents--bg-ivory">
        <div className="o-entry">
          <p
            className="m-animal-header__normal-title u-mb20"
            style={{ color: '#333' }}
          >
            モニター情報の変更が完了しました
          </p>
          <div className="">
            <div className="t-footer-contents__body">
              <a
                className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
                href={pathRoutes.myPoint}
              >
                マイページトップに戻る
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(EditProfileComplete)
