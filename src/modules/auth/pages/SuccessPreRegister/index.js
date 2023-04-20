import React, { memo, Fragment, useState, useRef } from 'react'
import { rangeStartToEnd } from '../../../../helper/utils'
import paths from '../../../../helper/pathRoutes'
import { selectRespResetPasswod } from '../../redux'
import { useSelector } from 'react-redux'
import { isEmpty } from 'lodash'

function SuccessPreRegister() {
  const respVerifyResetPassword = useSelector(selectRespResetPasswod)

  return (
    <div>
      {/* <form id="form" action="#" method="post"> */}
      <div className="t-contents t-contents--bg-ivory">
        <div className="o-entry">
          <p
            className="m-animal-header__normal-title u-mb15"
            style={{ textAlign: 'center', color: '#333' }}
          >
            「【ani voice】本登録お手続きのお願い」の
          </p>
          <p
            className="m-animal-header__normal-title u-mb15"
            style={{ textAlign: 'center', color: '#333' }}
          >
            メールを送信しました。
          </p>
          <p
            className="m-animal-header__normal-title u-mb15"
            style={{ textAlign: 'center', color: '#333' }}
          >
            メールに記載のURLから
          </p>
          <p
            className="m-animal-header__normal-title u-mb15"
            style={{ textAlign: 'center', color: '#333' }}
          >
            24時間以内に登録のお手続きをしてください
          </p>
          <div className="o-entry__notice" style={{ marginTop: 20 }}>
            <ul className="m-dots-list list-verify-register">
              <li>メールが届かない場合</li>
              <li>
                メールが届かない場合には、迷惑メールフォルダに入っていないかご確認ください。上記があてはまらない場合、モニターさまの
              </li>
              <li>メールアドレスが違っている可能性があります。</li>
              <li>
                その場合にはお手数ですが、
                <a href={paths.provisionalEntry}>
                  「新規モニター登録はこちら」
                </a>
                から、もう一度お手続きを行ってください。
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* </form> */}
    </div>
  )
}

export default memo(SuccessPreRegister)
