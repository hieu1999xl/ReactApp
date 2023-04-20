import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import paths from '../../../../helper/pathRoutes'
import { toastify } from '../../../../helper/toast'
import { createInquiry } from '../../redux'

function VerifyQuestion() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [isSubmit, setIsSubmit] = useState(false)

  const { questionFAQ } = useSelector(state => ({
    questionFAQ: state.myPoint.questionFAQ
  }))
  const onSubmit = e => {
    // TODO if send question success -> /success-inquiry
    setIsSubmit(true)
    const dataBody = {
      name: questionFAQ?.userName,
      email: questionFAQ?.email,
      question_contents: JSON.stringify({
        type: questionFAQ?.typeQuestion,
        content: questionFAQ?.question
      })
    }
    dispatch(
      createInquiry({
        payload: dataBody,
        onSuccess: () => {
          history.push(paths.successInquiry)
        }
      })
    )
  }

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">
            お問合せ＞お問合せフォーム
          </p>
        </div>
      </div>
      {/* <form id="form" action="#" method="post"> */}
      <div className="t-contents t-contents--bg-ivory">
        <div className="o-entry">
          <p
            className="m-animal-header__normal-title u-mb5"
            style={{ color: '#333' }}
          >
            お問い合わせフォーム
          </p>
          <p
            className="m-animal-header__normal-title u-mb5"
            style={{ color: '#333', fontWeight: 'normal', fontSize: '16px' }}
          >
            以下の内容でよろしければ「送信」
          </p>
          <p
            className="m-animal-header__normal-title u-mb5"
            style={{ color: '#333', fontWeight: 'normal', fontSize: '16px' }}
          >
            をクリックしてください。
          </p>
        </div>
        <div className="o-entry" style={{ marginTop: 30 }}>
          <div className="o-entry__table">
            <table className="m-table">
              <tbody>
                <tr>
                  <th className="m-table__head m-table__head--entry">
                    お名前（氏名)
                  </th>
                  <td className="m-table__body m-table__body--entry">
                    <div className="m-table__body__icon">
                      <input
                        type={'text'}
                        name="user-name"
                        className={`a-input-text`}
                        value={questionFAQ.userName}
                        readOnly
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="m-table__head m-table__head--entry">
                    連絡先メールアドレス
                  </th>
                  <td className="m-table__body m-table__body--entry">
                    <div className="m-table__body__icon">
                      <input
                        type={'email'}
                        name="user-name"
                        className={`a-input-text`}
                        value={questionFAQ.email}
                        readOnly
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="m-table__head m-table__head--entry">
                    お問い合わせの種類
                  </th>
                  <td className="m-table__body m-table__body--entry">
                    <div
                      className="a-input-select a-input-select--area"
                      style={{ width: '100%' }}
                    >
                      <select
                        value={questionFAQ.typeQuestion}
                        className={`a-input-select__list`}
                        readOnly
                        disabled
                        name="entry-type-question"
                      >
                        <option value="" disabled="" selected="">
                          お問い合わせ種類
                        </option>
                        <option value="1">・モニター登録について</option>
                        <option value="2">・ログインについて</option>
                        <option value="3">・アンケート内容について</option>
                        <option value="4">・ポイントについて</option>
                        <option value="5">
                          ・登録情報の確認・変更について
                        </option>
                        <option value="6">・その他</option>
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="m-table__head m-table__head--entry">
                    お問い合わせ内容
                  </th>
                  <td className="m-table__body m-table__body--entry">
                    <div className="m-table__body__icon">
                      <textarea
                        name="question"
                        rows="9"
                        cols="70"
                        className={`a-input-text`}
                        value={questionFAQ.question}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="m-table__head m-table__head--entry">
                    プライバシーポリシーへの同意
                  </th>
                  <td className="m-table__body m-table__body--entry">
                    <div className="m-table__body__icon">
                      <input
                        type={'email'}
                        name="user-name"
                        className={`a-input-text`}
                        value={'同意する'}
                        readOnly
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="o-entry" style={{ marginTop: 30 }}>
          <button
            className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
            onClick={onSubmit}
            disabled={isSubmit}
            style={{ width: '200px' }}
          >
            送信
          </button>
        </div>
      </div>
      {/* </form> */}
    </div>
  )
}

export default memo(VerifyQuestion)
