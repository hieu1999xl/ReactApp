import React, { memo, Fragment, useState, useEffect } from 'react'
import { patternPassword } from '../../../../helper/utils'
import paths from '../../../../helper/pathRoutes'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useHistory, useLocation } from 'react-router'
import {
  selectRespResetPasswod,
  verifyResetPassword,
  checkEmailByToken,
  setNewPassword
} from '../../redux'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import { injectIntl } from 'react-intl'

function SetNewPassword({ intl }) {
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  const respVerifyResetPassword = useSelector(selectRespResetPasswod)

  useEffect(() => {
    if (isEmpty(respVerifyResetPassword)) return
    history.push(paths.setNewPassword)
  }, [respVerifyResetPassword])

  const initialValues = () => {
    return {
      lrvPassword: '',
      lrvPasswordCof: ''
    }
  }

  // useEffect(() => {
  //   if (!location.search) return;
  //   const token =
  //     location.search && location.search.includes("token=")
  //       ? location.search.split("=")[1]
  //       : "";
  // 	if (!token) {
  // 		history.push(paths.passwordExpired)
  // 		return;
  // 	};
  //   dispatch(checkEmailByToken(token));
  //   setTokenUser(token)
  // }, [location]);

  const validationSchema = () => {
    return Yup.object().shape({
      lrvPasswordNew: Yup.string()
        .trim()
        .matches(
          patternPassword,
          intl.formatMessage({ id: 'validation.passwordLength' })
        )
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredPassword' })
        ),
      lrvPasswordNewCof: Yup.string()
        .trim()
        .oneOf(
          [Yup.ref('lrvPasswordNew'), null],
          intl.formatMessage({ id: 'validation.matchPassword' })
        )
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredPasswordConfirm' })
        )
    })
  }

  const onSubmit = data => {
    // TODO submit data then dispatch API
    const { lrvPasswordNew } = data
    const payload = {
      reset_password_token: respVerifyResetPassword,
      password: lrvPasswordNew
    }
    dispatch(setNewPassword(payload))
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
                <div className="o-entry__notice">
                  <ul
                    className="m-dots-list"
                    style={{ listStyle: 'none', paddingLeft: 0 }}
                  >
                    <li>パスワードを再設定してください。</li>
                  </ul>
                </div>
                <div className="o-entry__table" style={{ marginTop: 20 }}>
                  <table className="m-table">
                    <tbody>
                      <tr>
                        <th className="m-table__head m-table__head--provisional-entry">
                          新しいパスワード
                        </th>
                        <td className="m-table__body m-table__body--provisional-entry">
                          <div className="m-table__body__2column">
                            <input
                              type="password"
                              name="lrvPasswordNew"
                              className={`a-input-text
																${
                                  propsFormik.errors.lrvPasswordNew &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                              value={propsFormik.values.lrvPasswordNew}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {propsFormik.errors.lrvPasswordNew &&
                            propsFormik.submitCount != 0 && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.lrvPasswordNew}
                              </span>
                            )}
                        </td>
                      </tr>

                      <tr>
                        <th className="m-table__head m-table__head--provisional-entry">
                          ＜確認用＞新しいパスワード
                        </th>
                        <td className="m-table__body m-table__body--provisional-entry">
                          <div className="m-table__body__2column">
                            <input
                              type="password"
                              name="lrvPasswordNewCof"
                              className={`a-input-text
																${
                                  propsFormik.errors.lrvPasswordNewCof &&
                                  propsFormik.submitCount != 0
                                    ? 'is-required'
                                    : ''
                                }`}
                              value={propsFormik.values.lrvPasswordNewCof}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {propsFormik.errors.lrvPasswordNewCof &&
                            propsFormik.submitCount != 0 && (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.lrvPasswordNewCof}
                              </span>
                            )}
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
                  className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
                  type="submit"
                  disabled={
                    !(propsFormik.isValid && propsFormik.dirty) &&
                    propsFormik.submitCount != 0
                  }
                >
                  パスワードを再設定する
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default memo(injectIntl(SetNewPassword))
