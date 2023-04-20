import React, { memo, Fragment, useState } from 'react'
import pathRoutes from '../../../../helper/pathRoutes'
import { Formik, FieldArray } from 'formik'
import * as Yup from 'yup'
import { injectIntl } from 'react-intl'
import { closeAccount } from '../../redux'
import { useDispatch } from 'react-redux'

function CloseAccount({ intl }) {
  const dispatch = useDispatch()
  const initialValues = () => {
    return {
      reason: [],
      otherReason: ''
    }
  }

  const validationSchema = () => {
    return Yup.object().shape({
      reason: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'requiredEmail' }))
    })
  }

  const onSubmit = data => {
    dispatch(closeAccount(data))
  }

  const listReason = [
    'アンケートが少ない',
    'アンケートが多い',
    'アンケート内容がわかりにくい',
    'アンケート内容がつまらない',
    '質問数が多い',
    'ポイントが少ない',
    '忙しくてアンケートに参加できない',
    '興味がなくなった',
    'アニコム損保を解約した／解約予定のため',
    'その他'
  ]

  const [agree, setAgree] = useState(false)

  const handleAgree = () => {
    setAgree(!agree)
  }

  return (
    <div>
      {/* <div className="m-pager-title">
				<div className="m-pager-title__inner">
					<p className="m-pager-title__inner__title">モニター情報確認・変更</p>
				</div>
			</div> */}
      <Formik
        enableReinitialize={true}
        initialValues={initialValues()}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {propsFormik => (
          <form id="form" onSubmit={propsFormik.handleSubmit}>
            <FieldArray
              name="reason"
              render={arrayHelpers => (
                <div className="t-contents t-contents--bg-ivory">
                  <div className="o-entry">
                    <div
                      className="o-entry__table o-entry__table--provisional-entry"
                      style={{ marginBottom: 0 }}
                    >
                      <div className=".o-close__account_title">
                        <div
                          className="o-home__about__points__point__flex__title"
                          style={{ textAlign: 'center' }}
                        >
                          モニターを退会される理由を選択してください。
                        </div>
                      </div>
                      <div className="o-close__account_reason">
                        <div className="o-section">
                          {listReason.map((reason, idx) => {
                            return (
                              <div className="a-input-checkbox a-input-checkbox--center u-mb20">
                                <input
                                  id={`reason-${idx}`}
                                  type="checkbox"
                                  className="a-input-checkbox__check js-scroll-disabled"
                                  name="reason"
                                  checked={propsFormik.values.reason.includes(
                                    reason
                                  )}
                                  onChange={() =>
                                    !propsFormik.values.reason.includes(reason)
                                      ? arrayHelpers.push(reason)
                                      : arrayHelpers.remove(
                                          propsFormik.values.reason.indexOf(
                                            reason
                                          )
                                        )
                                  }
                                />
                                <label
                                  for={`reason-${idx}`}
                                  className="a-input-checkbox__label"
                                >
                                  {reason}
                                </label>
                              </div>
                            )
                          })}
                        </div>
                        <textarea
                          rows="9"
                          cols="70"
                          name="otherReason"
                          placeholder="理由を入力してください"
                          className={`a-input-text ${
                            !propsFormik.values.reason.includes('その他')
                              ? `is-hidden`
                              : ``
                          }`}
                          value={propsFormik.values.otherReason}
                          onChange={propsFormik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="o-entry__notice">
                      <p className="o-entry__notice__title u-mb20pc u-mb10sp o-close-quote--accout">
                        【注意事項】
                      </p>
                      <ul
                        className="m-dots-list"
                        style={{ listStyle: 'none', paddingLeft: 0 }}
                      >
                        <li>
                          ・退会されますと、これまで貯めたポイントは無効となり、ご利用いただくことができませんので、ご注意ください。
                        </li>
                      </ul>
                    </div>
                    <div className="o-close__footer">
                      <p className="u-textLeft u-mb20">
                        退会に関する注意事項を確認しましたか？
                      </p>
                      <div
                        className="a-input-checkbox a-input-checkbox--center u-mb30"
                        style={{ justifyContent: 'left' }}
                      >
                        <input
                          id="agree"
                          type="checkbox"
                          className="a-input-checkbox__check js-scroll-disabled"
                          name="agree"
                          onChange={handleAgree}
                          disabled={propsFormik.values.reason.length == 0}
                        />
                        <label for="agree" className="a-input-checkbox__label">
                          確認しました。
                        </label>
                      </div>
                      <button
                        type={'submit'}
                        disabled={
                          !agree ||
                          propsFormik.values.reason.length == 0 ||
                          (propsFormik.values.reason.includes('その他') &&
                            !propsFormik.values.otherReason)
                        }
                        className="a-button a-button--green a-button--shadow-green-2 a-button--pc-w330 a-button--round u-fz16 u-mb10sp a-button--submit"
                      >
                        退会する
                      </button>
                    </div>
                  </div>
                </div>
              )}
            />
          </form>
        )}
      </Formik>
    </div>
  )
}

export default memo(injectIntl(CloseAccount))
