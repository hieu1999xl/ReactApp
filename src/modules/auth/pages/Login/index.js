import { injectIntl } from 'react-intl'
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import paths from '../../../../helper/pathRoutes'
import pathRoutes from '../../../../helper/pathRoutes'
import { login } from '../../redux'
import { Formik } from 'formik'
import * as Yup from 'yup'

function Login({ intl }) {
  const dispatch = useDispatch()

  const initialValues = () => {
    return {
      username: '',
      lrvPassword: ''
    }
  }

  const validationSchema = () => {
    return Yup.object().shape({
      username: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredEmail' })),
      // .matches(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ , 'メールが無効です'),
      lrvPassword: Yup.string()
        .trim()
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredPassword' })
        )
    })
  }

  const onSubmit = data => {
    dispatch(
      login({
        payload: data,
        onSuccess: () => {}
      })
    )
  }
  return (
    <div>
      <main className="o-login">
        <section className="l-container">
          <h1 className="a-section-title u-mb30pc u-mb20sp">ログイン</h1>
          <div className="u-mb40">
            <Formik
              enableReinitialize={true}
              initialValues={initialValues()}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {propsFormik => (
                <form onSubmit={propsFormik.handleSubmit}>
                  <div className="u-mb20">
                    <input
                      type="text"
                      name="username"
                      className={`a-input-text ${
                        propsFormik.touched.username &&
                        propsFormik.errors.username
                          ? `is-required`
                          : ``
                      }`}
                      placeholder="ログインID(登録メールアドレス)"
                      value={propsFormik.values.username}
                      onChange={propsFormik.handleChange}
                      onBlur={propsFormik.handleBlur}
                    />
                    {propsFormik.touched.username &&
                      propsFormik.errors.username && (
                        <span className="u-fwBold u-fz11 a-color--pink">
                          {propsFormik.errors.username}
                        </span>
                      )}
                  </div>
                  <div className="u-mb20">
                    <input
                      type="password"
                      name="lrvPassword"
                      className={`a-input-text ${
                        propsFormik.touched.lrvPassword &&
                        propsFormik.errors.lrvPassword
                          ? `is-required`
                          : ``
                      }`}
                      placeholder="パスワード"
                      value={propsFormik.values.lrvPassword}
                      onChange={propsFormik.handleChange}
                      onBlur={propsFormik.handleBlur}
                    />
                    {propsFormik.touched.lrvPassword &&
                      propsFormik.errors.lrvPassword && (
                        <span className="u-fwBold u-fz11 a-color--pink">
                          {propsFormik.errors.lrvPassword}
                        </span>
                      )}
                  </div>
                  <p className="a-color--light-gray u-mb20">
                    ログインIDは新規モニター登録の際にご自身で登録されたものです。ペット保険の「マイページ」のログインIDとは異なりますのでご注意ください。
                  </p>
                  <div className="u-mb20">
                    <button
                      type="submit"
                      className="a-button a-button--round a-button--green a-button--submit u-fz16 u-hover"
                      disabled={!(propsFormik.dirty && propsFormik.isValid)}
                    >
                      ログイン
                    </button>
                  </div>
                  <ul>
                    <li>
                      <a
                        href={paths.resetPassword}
                        className="a-color--green u-textDecoration u-fz16 u-hover"
                      >
                        ・パスワードを忘れた方はコチラ
                      </a>
                    </li>
                    <li>
                      <a
                        href={paths.forgetId}
                        className="a-color--green u-textDecoration u-fz16 u-hover"
                      >
                        ・ログインIDを忘れた方はコチラ
                      </a>
                    </li>
                  </ul>
                </form>
              )}
            </Formik>
          </div>
          <div className="a-button-wrap a-button-wrap--cartoon">
            <div className="a-button-wrap__img">
              <picture>
                <source
                  srcSet="../assets/img/login/img_monitor-btn-pc.png 1x,../assets/img/login/img_monitor-btn-pc@2x.png 2x"
                  media="(min-width:768px)"
                />
                <img
                  srcSet="../assets/img/login/img_monitor-btn-sp.png"
                  alt="ご利用ははじめてですか？"
                />
              </picture>
            </div>
            <a
              href={pathRoutes.provisionalEntry}
              className="a-button a-button--line-yellow a-button--yellow a-button--round u-hover"
            >
              新規モニター登録はこちら
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default memo(injectIntl(Login))
