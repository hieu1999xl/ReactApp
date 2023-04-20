import { injectIntl } from 'react-intl'
import React, { memo, Fragment, useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory } from 'react-router'
import paths from '../../../../helper/pathRoutes'
import { toastify } from '../../../../helper/toast'
import { validateEmail } from '../../../../helper/utils'
import { makeQuestion } from '../../redux'
import { isEmpty } from 'lodash'
import { Formik } from 'formik'
import * as Yup from 'yup'

function MakeQuestion({ intl }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const { questionFAQ } = useSelector(state => ({
    questionFAQ: state.myPoint.questionFAQ
  }))

  const initialValues = () => {
    return {
      userName: '',
      email: '',
      typeQuestion: '',
      question: ''
    }
  }

  const validationSchema = () => {
    return Yup.object().shape({
      userName: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredName' })),
      email: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredEmail' })),
      typeQuestion: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredQuestionType' })
        ),
      question: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredQuestion' })
        )
    })
  }

  const [isSubmit, setIsSubmit] = useState(false)

  // useEffect(() => {
  // 	const returnMakeQues = location.search && location.search.includes('return=true')
  // 	if (!isEmpty(questionFAQ)) {
  // 		if (returnMakeQues && !isSubmit) {
  // 			return;
  // 		} else {
  // 			history.push(paths.verifyInquiry)
  // 		}
  // 	}
  // }, [questionFAQ, location, isSubmit])

  const [agree, setAgree] = useState(false)
  const onChangeAgree = e => {
    setAgree(e.target.checked)
  }

  const onSubmit = data => {
    // show toast
    if (!agree) {
      toastify({
        type: 'error',
        msg: '個人情報保護方針への同意が必要です。'
      })
      return
    }
    setIsSubmit(true)
    dispatch(makeQuestion(data))
    history.push(paths.verifyInquiry)
  }

  const handleChange = (e, propsFormik) => {
    propsFormik.setFieldValue('typeQuestion', e.target.value)
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
      <Formik
        enableReinitialize={true}
        initialValues={initialValues()}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {propsFormik => (
          <form id="form" onSubmit={propsFormik.handleSubmit}>
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
                  style={{
                    color: '#333',
                    fontWeight: 'normal',
                    fontSize: '16px'
                  }}
                >
                  お問い合わせの内容をご入力いただき、
                </p>
                <p
                  className="m-animal-header__normal-title u-mb5"
                  style={{
                    color: '#333',
                    fontWeight: 'normal',
                    fontSize: '16px'
                  }}
                >
                  「次へ」をクリックしてください。
                </p>
                <p className="has-text-centered">
                  お問い合わせいただく前にお知りになりたい情報が、よくある質問にないかご確認ください。
                  <br />
                  内容によっては回答を差し上げるのにお時間をいただくことがございます。
                </p>
              </div>
              <div className="o-entry" style={{ marginTop: 20 }}>
                <a
                  style={{ cursor: 'pointer' }}
                  className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16"
                  href={paths.faq}
                >
                  よくある質問はこちら
                </a>
              </div>
              <div className="o-entry" style={{ marginTop: 30 }}>
                <div className="o-entry__table">
                  <table className="m-table">
                    <tbody>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          お名前（氏名)
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__icon">
                            <input
                              className={`a-input-text ${
                                propsFormik.touched.userName &&
                                propsFormik.errors.userName
                                  ? `is-required`
                                  : ``
                              }`}
                              type={'text'}
                              name="userName"
                              value={propsFormik.values.userName}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {propsFormik.touched.userName &&
                            propsFormik.errors.userName && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.userName}
                              </span>
                            )}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          連絡先メールアドレス
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__icon">
                            <input
                              type={'email'}
                              className={`a-input-text ${
                                propsFormik.touched.email &&
                                propsFormik.errors.email
                                  ? `is-required`
                                  : ``
                              }`}
                              name="email"
                              value={propsFormik.values.email}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {propsFormik.touched.email &&
                            propsFormik.errors.email && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.email}
                              </span>
                            )}
                          {/* {isInvaildEmail && <span className="u-fwBold u-fz11 a-color--pink">メールが必要です</span>} */}
                          {/* {isInvaildEmailPattern && <span className="u-fwBold u-fz11 a-color--pink">メールが無効です</span>} */}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          お問い合わせの種類
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div
                            className="a-input-select a-input-select--area"
                            style={{ width: '100%' }}
                          >
                            <select
                              value={propsFormik.values.typeQuestion}
                              onChange={e => {
                                handleChange(e, propsFormik)
                              }}
                              className={`a-input-select__list ${
                                propsFormik.touched.typeQuestion &&
                                propsFormik.errors.typeQuestion
                                  ? `is-required`
                                  : ``
                              }`}
                              name="typeQuestion"
                            >
                              <option value="" disabled="" selected="">
                                お問い合わせ種類
                              </option>
                              <option value="1">・モニター登録について</option>
                              <option value="2">・ログインについて</option>
                              <option value="3">
                                ・アンケート内容について
                              </option>
                              <option value="4">・ポイントについて</option>
                              <option value="5">
                                ・登録情報の確認・変更について
                              </option>
                              <option value="6">・その他</option>
                            </select>
                          </div>
                          {propsFormik.touched.typeQuestion &&
                            propsFormik.errors.typeQuestion && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.typeQuestion}
                              </span>
                            )}
                          {/* {isInvaildTypeQues && <span className="u-fwBold u-fz11 a-color--pink">タイプの質問が必要です</span>} */}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--entry">
                          <span className="m-table__head__label m-table__head__label--required">
                            必須
                          </span>
                          お問い合わせ内容
                        </th>
                        <td className="m-table__body m-table__body--entry">
                          <div className="m-table__body__icon">
                            <textarea
                              rows="9"
                              cols="70"
                              className={`a-input-text ${
                                propsFormik.touched.question &&
                                propsFormik.errors.question
                                  ? `is-required`
                                  : ``
                              }`}
                              name={'question'}
                              value={propsFormik.values.question}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {propsFormik.touched.question &&
                            propsFormik.errors.question && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.question}
                              </span>
                            )}
                          {/* {isInvaildQuestion && <span className="u-fwBold u-fz11 a-color--pink">質問が必要です</span>} */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="o-entry" style={{ marginTop: 30 }}>
                <div className="u-mb20">
                  <ul
                    className="m-dots-list"
                    style={{ listStyle: 'none', paddingLeft: 0 }}
                  >
                    <li className="m-dots-list__item">
                      弊社の
                      <a
                        href="https://www.anicom-sompo.co.jp/privacypolicy/"
                        style={{ fontWeight: 'bold' }}
                      >
                        プライバシーポリシー
                      </a>
                      をご確認の上、同意いただける場合は「同意する」にチェックを入れて確認画面に進んでください。
                    </li>
                  </ul>
                </div>
                <div
                  className="a-input-checkbox a-input-checkbox--center u-mb20"
                  style={{ justifyContent: 'left' }}
                >
                  <input
                    id="agree"
                    type="checkbox"
                    className="a-input-checkbox__check js-scroll-disabled"
                    name="agree"
                    value="□ 同意する"
                    onChange={onChangeAgree}
                    disabled={!(propsFormik.dirty && propsFormik.isValid)}
                  />
                  <label htmlFor="agree" className="a-input-checkbox__label">
                    同意する
                  </label>
                </div>
                <button
                  className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16"
                  type={'submit'}
                  disabled={!agree}
                  style={{ width: '200px' }}
                >
                  次へ
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default memo(injectIntl(MakeQuestion))
