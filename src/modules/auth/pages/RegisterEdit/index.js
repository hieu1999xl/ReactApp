import { injectIntl } from 'react-intl'
import React, {
  memo,
  Fragment,
  useState,
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { checkEmailByToken, register, setInfoRegister } from '../../redux'
import {
  rangeStartToEnd,
  isValidPartentPassword,
  isValidTextKatakana,
  validatePhonenumber
} from '../../../../helper/utils'
import pathRoutes from '../../../../helper/pathRoutes'
import { isEmpty } from 'lodash'
import { toastify } from '../../../../helper/toast'

function RegisterEdit({ intl }) {
  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">モニター情報確認・変更</p>
        </div>
      </div>
      <form id="form" action="#" method="post">
        <div className="t-contents t-contents--bg-ivory">
          <div className="o-entry">
            <div className="o-entry__table">
              <table className="m-table">
                <tbody>
                  <tr className="m-table__row">
                    <th className="m-table__head m-table__head--entry">
                      <span className="m-table__head__label m-table__head__label--required">
                        必須
                      </span>
                      お名前
                    </th>
                    <td className="m-table__body m-table__body--entry">
                      <div className="m-table__body__2column">
                        <input
                          type="text"
                          name="entry-name-sei"
                          className="a-input-text a-input-text--2column"
                          placeholder="例）安心"
                        />
                        <input
                          type="text"
                          name="entry-name-mei"
                          className="a-input-text a-input-text--2column"
                          placeholder="例）優子"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="m-table__row">
                    <th className="m-table__head m-table__head--entry">
                      <span className="m-table__head__label m-table__head__label--required">
                        必須
                      </span>
                      お名前（フリガナ）
                    </th>
                    <td className="m-table__body m-table__body--entry">
                      <div className="m-table__body__2column">
                        <input
                          type="text"
                          name="entry-name-furigana-sei"
                          className="a-input-text a-input-text--2column"
                          placeholder="例）アンシン"
                        />
                        <input
                          type="text"
                          name="entry-name-furigana-mei"
                          className="a-input-text a-input-text--2column"
                          placeholder="例）ユウコ"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr className="m-table__row">
                    <th className="m-table__head m-table__head--entry">
                      <span className="m-table__head__label m-table__head__label--required">
                        必須
                      </span>
                      郵便番号
                    </th>
                    <td className="m-table__body m-table__body--entry">
                      <div className="m-table__body__flex-no-wrap">
                        <input
                          type="text"
                          name="entry-post-1"
                          className="a-input-text a-input-text--post"
                        />
                        <span className="u-ml5 u-mr5 a-color--green">-</span>
                        <input
                          type="text"
                          name="entry-post-2"
                          className="a-input-text a-input-text--post"
                        />
                        <button
                          type="button"
                          className="a-button a-button--post-btn a-button--shadow2 a-button--round a-button--yellow-green a-button--shadow-yellow-green-2 u-fz16 js-post-auto"
                        >
                          郵便番号から自動入力
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="m-table__row">
                    <th className="m-table__head m-table__head--entry">
                      <span className="m-table__head__label m-table__head__label--required">
                        必須
                      </span>
                      都道府県
                    </th>
                    <td className="m-table__body m-table__body--entry">
                      <div className="a-input-select a-input-select--area">
                        <select
                          className="a-input-select__list"
                          name="entry-area"
                        >
                          <option value="" disabled="" selected="">
                            都道府県を選択
                          </option>
                          <option value="北海道">北海道</option>
                          <option value="青森県">青森県</option>
                          <option value="岩手県">岩手県</option>
                          <option value="宮城県">宮城県</option>
                          <option value="秋田県">秋田県</option>
                          <option value="山形県">山形県</option>
                          <option value="福島県">福島県</option>
                          <option value="茨城県">茨城県</option>
                          <option value="栃木県">栃木県</option>
                          <option value="群馬県">群馬県</option>
                          <option value="埼玉県">埼玉県</option>
                          <option value="千葉県">千葉県</option>
                          <option value="東京都">東京都</option>
                          <option value="神奈川県">神奈川県</option>
                          <option value="新潟県">新潟県</option>
                          <option value="富山県">富山県</option>
                          <option value="石川県">石川県</option>
                          <option value="福井県">福井県</option>
                          <option value="山梨県">山梨県</option>
                          <option value="長野県">長野県</option>
                          <option value="岐阜県">岐阜県</option>
                          <option value="静岡県">静岡県</option>
                          <option value="愛知県">愛知県</option>
                          <option value="三重県">三重県</option>
                          <option value="滋賀県">滋賀県</option>
                          <option value="京都府">京都府</option>
                          <option value="大阪府">大阪府</option>
                          <option value="兵庫県">兵庫県</option>
                          <option value="奈良県">奈良県</option>
                          <option value="和歌山県">和歌山県</option>
                          <option value="鳥取県">鳥取県</option>
                          <option value="島根県">島根県</option>
                          <option value="岡山県">岡山県</option>
                          <option value="広島県">広島県</option>
                          <option value="山口県">山口県</option>
                          <option value="徳島県">徳島県</option>
                          <option value="香川県">香川県</option>
                          <option value="愛媛県">愛媛県</option>
                          <option value="高知県">高知県</option>
                          <option value="福岡県">福岡県</option>
                          <option value="佐賀県">佐賀県</option>
                          <option value="長崎県">長崎県</option>
                          <option value="熊本県">熊本県</option>
                          <option value="大分県">大分県</option>
                          <option value="宮崎県">宮崎県</option>
                          <option value="鹿児島県">鹿児島県</option>
                          <option value="沖縄県">沖縄県</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  <tr className="m-table__row">
                    <th className="m-table__head m-table__head--entry">
                      <span className="m-table__head__label m-table__head__label--required">
                        必須
                      </span>
                      市区町村
                    </th>
                    <td className="m-table__body m-table__body--entry">
                      <input
                        type="text"
                        name="entry-municipalities"
                        className="a-input-text"
                        placeholder="例）新宿区"
                      />
                    </td>
                  </tr>
                  <tr className="m-table__row">
                    <th className="m-table__head">
                      <span className="m-table__head__label m-table__head__label--required">
                        必須
                      </span>
                      市区町村以下、番地
                    </th>
                    <td className="m-table__body">
                      <input
                        type="text"
                        name="entry-block-number"
                        className="a-input-text"
                        placeholder="例）西新宿8-17-1"
                      />
                    </td>
                  </tr>
                  <tr className="m-table__row">
                    <th className="m-table__head m-table__head--entry">
                      <span className="m-table__head__label m-table__head__label--optional">
                        任意
                      </span>
                      ビル・マンション名、部屋番号等
                    </th>
                    <td className="m-table__body m-table__body--entry">
                      <input
                        type="text"
                        name="entry-municipalities"
                        className="a-input-text"
                        placeholder="例）住友不動産新宿グランドタワー39階"
                      />
                    </td>
                  </tr>
                  <tr className="m-table__row">
                    <th className="m-table__head m-table__head--entry">
                      <span className="m-table__head__label m-table__head__label--required">
                        必須
                      </span>
                      電話番号
                    </th>
                    <td className="m-table__body m-table__body--entry">
                      <div className="m-table__body__flex-no-wrap">
                        <input
                          type="text"
                          name="entry-tel-1"
                          className="a-input-text a-input-text--tel"
                        />
                        <span className="u-ml5 u-mr5 a-color--green">-</span>
                        <input
                          type="text"
                          name="entry-tel-2"
                          className="a-input-text a-input-text--tel"
                        />
                        <span className="u-ml5 u-mr5 a-color--green">-</span>
                        <input
                          type="text"
                          name="entry-tel-3"
                          className="a-input-text a-input-text--tel"
                        />
                      </div>
                      <span className="u-fz11">
                        パスワード忘れなどの際に、ご本人確認のために必要となります。
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="t-footer-contents">
          <div className="t-footer-contents__body">
            <button
              type="submit"
              className="a-button a-button--green a-button--shadow-green-2 a-button--pc-w330 a-button--round u-fz16 u-mb10sp"
            >
              編集内容を保存する
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default memo(injectIntl(RegisterEdit))
