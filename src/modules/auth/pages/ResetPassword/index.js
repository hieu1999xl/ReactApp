import React, { memo, Fragment, useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import paths from '../../../../helper/pathRoutes'
import { resetPassword, selectEmailResetPassword } from '../../redux'
import { validateEmail } from '../../../../helper/utils'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { injectIntl } from 'react-intl'

function ResetPassword({ intl }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const emailResetPassword = useSelector(selectEmailResetPassword)

  // useEffect(()=> {
  // 	if (!emailResetPassword) return
  // 	history.push(paths.confirmResetPassword)
  // }, [emailResetPassword])

  const initialValues = () => {
    return {
      emailFirst: '',
      emailSecond: ''
    }
  }

  const validationSchema = () => {
    return Yup.object().shape({
      emailFirst: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredEmail' })),
      emailSecond: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredEmail' })),
      email: Yup.string().when(['emailFirst', 'emailSecond'], {
        is: (emailFirst, emailSecond) =>
          emailFirst && emailSecond
            ? !validateEmail(`${emailFirst}@${emailSecond}`)
            : false,
        then: Yup.string().required(() =>
          intl.formatMessage({ id: 'validation.isEmail' })
        )
      })
    })
  }

  const isInValidEmail = propsFormik => {
    const { errors, values, touched } = propsFormik
    const isTouched = touched.emailFirst || touched.emailSecond
    if (
      !errors.emailData &&
      !errors.emailSecond &&
      values.emailFirst &&
      values.emailSecond
    ) {
      return !validateEmail(`${values.emailFirst}@${values.emailSecond}`)
    }
    return isTouched && (errors.emailFirst || errors.emailSecond)
  }

  const onSubmit = data => {
    const email = `${data.emailFirst}@${data.emailSecond}`
    // TODO: call API send mail
    dispatch(resetPassword(email))
  }
  return (
    <div>
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
                  className="m-animal-header__normal-title u-mb15"
                  style={{ textAlign: 'left', color: '#333' }}
                >
                  パスワードを忘れた方
                </p>
                <div className="o-entry__notice">
                  <ul className="m-dots-list">
                    「パスワードを忘れた方」はパスワードを再設定します。
                    <br />
                    下の入力欄にログインID（メールアドレス）を入力してください。
                    <br />
                    ログインID（メールアドレス）宛に認証用URLをお送りしますので、アクセスしてください。
                  </ul>
                </div>
                <div className="o-entry__table o-entry__table--provisional-entry">
                  <table className="m-table">
                    <tbody>
                      <tr>
                        {/* <th className="m-table__head m-table__head--provisional-entry">メールアドレス</th> */}
                        <td className="m-table__body m-table__body--provisional-entry">
                          <div className="m-table__body__2column">
                            <input
                              type="text"
                              name="emailFirst"
                              className={`a-input-text a-input-text--2column ${
                                isInValidEmail(propsFormik) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              value={propsFormik.values.emailFirst}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                            <span className="a-color--green">@</span>
                            <input
                              type="text"
                              name="emailSecond"
                              className={`a-input-text a-input-text--2column ${
                                isInValidEmail(propsFormik) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              value={propsFormik.values.emailSecond}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {isInValidEmail(propsFormik) &&
                          propsFormik.submitCount != 0 ? (
                            <span className="u-fwBold u-fz11 a-color--pink">
                              {propsFormik.errors.emailFirst ||
                                propsFormik.errors.emailSecond ||
                                propsFormik.errors.email}
                            </span>
                          ) : (
                            ''
                          )}
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
                    <li>ドメイン指定受信を設定されている方は</li>
                    <li>「ani-com.com」、</li>
                    <li>メール指定受信を設定されている方は</li>
                    <li>
                      「anivoice_noreply@ani-com.com」を追加してください。
                    </li>
                  </ul>
                </div>
                <div
                  className="m-table__body__2column"
                  style={{ marginTop: '20px' }}
                >
                  <a
                    type="button"
                    href={paths.faq}
                    className="a-button a-button--shadow3 a-button--round a-button--2column a-button--yellow-green a-button--shadow-yellow-green-2 u-mb10 u-fz16 js-gender-btn"
                  >
                    よくあるご質問
                  </a>
                  <a
                    type="button"
                    className="a-button a-button--shadow3 a-button--round a-button--2column a-button--yellow-green a-button--shadow-yellow-green-2 u-mb10 u-fz16 js-gender-btn"
                    href={paths.inquiry}
                  >
                    お問合せ
                  </a>
                </div>
              </div>
            </div>
            <div className="t-footer-contents">
              <div className="t-footer-contents__body">
                <button
                  className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
                  disabled={
                    !propsFormik.values.emailFirst ||
                    !propsFormik.values.emailSecond ||
                    (!propsFormik.isValid && propsFormik.submitCount != 0)
                  }
                  type="submit"
                >
                  送信
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default memo(injectIntl(ResetPassword))
