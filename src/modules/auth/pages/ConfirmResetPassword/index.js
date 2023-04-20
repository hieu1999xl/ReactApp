import React, { memo, Fragment, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectEmailResetPassword } from '../../redux'
import paths from '../../../../helper/pathRoutes'

function ConfirmResetPassword() {
  const emailResetPassword = useSelector(selectEmailResetPassword)

  return (
    <div>
      <form id="form" action="#" method="post">
        <div className="t-contents t-contents--bg-ivory">
          <div className="o-entry">
            <div className="o-entry__table o-entry__table--provisional-entry">
              <table className="m-table">
                <tbody>
                  <tr>
                    {/* <th className="m-table__head m-table__head--provisional-entry">メールアドレス</th> */}
                    <td className="m-table__body m-table__body--provisional-entry">
                      <div
                        className="m-table__body__2column"
                        style={{ justifyContent: 'center' }}
                      >
                        <span
                          className="a-color--green"
                          style={{ fontWeight: 'bold', fontSize: '18px' }}
                        >
                          {emailResetPassword
                            ? emailResetPassword.split('@')[0]
                            : ''}
                        </span>
                        <span
                          className="a-color--green"
                          style={{ fontWeight: 'bold', fontSize: '18px' }}
                        >
                          @
                        </span>
                        <span
                          className="a-color--green"
                          style={{ fontWeight: 'bold', fontSize: '18px' }}
                        >
                          {emailResetPassword
                            ? emailResetPassword.split('@')[1]
                            : ''}
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="m-table__body m-table__body--provisional-entry">
                      <div
                        className="m-table__body__2column"
                        style={{ justifyContent: 'center' }}
                      >
                        <p
                          className="m-animal-header__normal-title u-mb15"
                          style={{ color: '#333' }}
                        >
                          にパスワード確認用URLをお送りしました。
                        </p>
                        <p
                          className="m-animal-header__normal-title u-mb15"
                          style={{ color: '#333' }}
                        >
                          ※確認用URLは60分間のみ有効です
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="o-entry__notice">
              <ul
                className="m-dots-list"
                style={{ textAlign: 'center', listStyle: 'none' }}
              >
                <li>
                  メールが届かない場合
                  <br />
                  <br />
                </li>
                <li>
                  メールが届かない場合には、迷惑メールフォルダに入っていないかご確認ください。
                </li>
                <li>
                  上記があてはまらない場合、モニターさまのメールアドレスが間違っている可能性があります。
                </li>
                <li>
                  その場合にはお手数ですが、
                  <a href="/reset-password">「パスワードをお忘れの方」</a>
                  から、もう一度お手続きを行ってください。
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="t-footer-contents">
          <div className="t-footer-contents__body">
            <a
              className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
              href={paths.home}
            >
              トップに戻る
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default memo(ConfirmResetPassword)
