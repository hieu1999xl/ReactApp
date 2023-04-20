import React, { memo, Fragment } from 'react'
import pathRoutes from '../../../../helper/pathRoutes'

function Complete() {
  return (
    <div>
      {/* <div className="m-pager-title">
				<div className="m-pager-title__inner">
					<p className="m-pager-title__inner__title">モニター情報確認・変更</p>
				</div>
			</div> */}
      <form id="form" action={pathRoutes.home} method="get">
        <div className="t-contents t-contents--bg-ivory">
          <div
            className="o-entry"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <div className="o-home__about__points__point__flex__title">
              <p className="u-fz20 u-fwBold u-textCenter u-mb30">
                モニターの退会が完了しました。<br></br>
                <br></br>
                退会手続き完了のメールをお送りしましたので、<br></br>
                内容をご確認ください。<br></br>
                ご利用ありがとうございました。<br></br>
              </p>
            </div>
            <div className="t-footer-contents__body">
              <button
                type="submit"
                className="a-button a-button--green a-button--shadow-green-2 a-button--pc-w330 a-button--round u-fz16 u-mb10sp"
              >
                サイトトップに戻る
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default memo(Complete)
