import React, { memo, Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { validateEmail } from '../../../../helper/utils'
import { preRegister, selectPrmDecoded } from '../../../auth/redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import paths from '../../../../helper/pathRoutes'
import { injectIntl } from 'react-intl'
import { WithPrm } from '../../../../hoc'

function PreRegister({ intl }) {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()

  const initialValues = () => {
    return {
      emailData: '',
      emailExtend: '',
      emailConfData: '',
      emailConfExtend: '',
      email: '',
      emailConf: ''
    }
  }

  const validationSchema = () => {
    return Yup.object().shape({
      emailData: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredEmail' })),
      emailExtend: Yup.string()
        .trim()
        .required(() => intl.formatMessage({ id: 'validation.requiredEmail' })),
      email: Yup.string().when(['emailData', 'emailExtend'], {
        is: (emailData, emailExtend) =>
          emailData && emailExtend
            ? !validateEmail(`${emailData}@${emailExtend}`)
            : false,
        then: Yup.string().required(() =>
          intl.formatMessage({ id: 'validation.isEmail' })
        )
      }),
      emailConfData: Yup.string()
        .trim()
        .oneOf(
          [Yup.ref('emailData'), null],
          intl.formatMessage({ id: 'validation.matchEmail' })
        )
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredEmailConfirm' })
        ),
      emailConfExtend: Yup.string()
        .trim()
        .oneOf(
          [Yup.ref('emailExtend'), null],
          intl.formatMessage({ id: 'validation.matchEmail' })
        )
        .required(() =>
          intl.formatMessage({ id: 'validation.requiredEmailConfirm' })
        ),
      emailConf: Yup.string().when(['emailConfData', 'emailConfExtend'], {
        is: (emailConfData, emailConfExtend) =>
          !validateEmail(`${emailConfData}@${emailConfExtend}`),
        then: Yup.string().required(() =>
          intl.formatMessage({ id: 'validation.isEmail' })
        )
      })
    })
  }

  const [agree, setAgree] = useState(false)
  // const [prm, setPrm] = useState('')
  const prm = useSelector(selectPrmDecoded)

  // useEffect(() => {
  //   if (prm) {
  //     return;
  //   }
  //   const prmEncode = location.search && location.search.includes('prm=') ? location.search.split('=')[1] : '';
  //   if (!location.search || !prmEncode) {
  //     history.push(paths.notFound)
  //     return
  //   }
  //   dispatch(checkUserExist({prm: prmEncode}))
  //   // setPrm(prmEncode)
  // }, [location, prm])

  const onChangeAgree = e => {
    setAgree(e.target.checked)
  }

  const onSubmit = data => {
    const payload = {
      email: `${data['emailData']}@${data['emailExtend']}`,
      prm: prm
    }
    dispatch(
      preRegister({
        payload: payload,
        onSuccess: () => {
          history.push(paths.provisionalEntrySuccess)
        }
      })
    )
  }

  const isInValidEmail = propsFormik => {
    const { errors, values, touched } = propsFormik
    const isTouched = touched.emailData || touched.emailConfData
    if (
      !errors.emailData &&
      !errors.emailExtend &&
      values.emailData &&
      values.emailExtend
    ) {
      return !validateEmail(`${values.emailData}@${values.emailExtend}`)
    }
    return isTouched && (errors.emailData || errors.emailExtend)
  }

  const isInValidEmailConf = propsFormik => {
    const { errors, values, touched } = propsFormik
    const isTouched = touched.emailConfData || touched.emailConfExtend
    if (
      !errors.emailConfData &&
      !errors.emailConfExtend &&
      values.emailConfData &&
      values.emailConfExtend
    ) {
      return !validateEmail(`${values.emailConfData}@${values.emailConfExtend}`)
    }
    return isTouched && (errors.emailConfExtend || errors.emailConfExtend)
  }

  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">
            新規モニター登録＜仮登録＞
          </p>
        </div>
      </div>
      <div className="m-animal-header">
        <p className="m-animal-header__normal-title u-mb15">
          メールアドレスを入力してください。<br></br>
          入力いただいたメールアドレス宛に、本登録のご案内メールをお送りします。
        </p>
        <div className="m-animal-header__block">
          <p className="m-animal-header__sub-title m-animal-header__sub-title--pink">
            メールアドレスがログインIDになります。
          </p>
          {/* cssとjsの修正　START */}
          <ul className="m-dots-list m-animal-header__text">
            <li>すでに登録済のメールアドレスは登録できません。</li>
            <li>
              登録できるモニターは保険契約者または被保険者いずれか1名です。
            </li>
            <li>未成年の方はモニター登録できません。</li>
          </ul>
        </div>
        {/* cssとjsの修正　END */}
        <div className="m-animal-header__animal-box">
          <div className="m-animal-header__animal-position">
            <img
              src="../assets/img/common/img_animals-image_4.png"
              className="m-animal-header__animal-image"
              alt=""
            />
          </div>
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
                <div className="o-entry__table o-entry__table--provisional-entry">
                  <table className="m-table">
                    <tbody>
                      <tr>
                        <th className="m-table__head m-table__head--provisional-entry">
                          メールアドレス
                        </th>
                        <td className="m-table__body m-table__body--provisional-entry">
                          <div className="m-table__body__2column">
                            <input
                              type="text"
                              name="emailData"
                              className={`a-input-text a-input-text--2column ${
                                (isInValidEmail(propsFormik) ||
                                  propsFormik.errors.emailData ||
                                  propsFormik.errors.emailExtend) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              value={propsFormik.values.emailData}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                            <span className="a-color--green">@</span>
                            <input
                              type="text"
                              name="emailExtend"
                              className={`a-input-text a-input-text--2column ${
                                (isInValidEmail(propsFormik) ||
                                  propsFormik.errors.emailData ||
                                  propsFormik.errors.emailExtend) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              value={propsFormik.values.emailExtend}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                          </div>
                          {(isInValidEmail(propsFormik) ||
                            propsFormik.errors.emailData ||
                            propsFormik.errors.emailExtend) &&
                          propsFormik.submitCount != 0 ? (
                            <span className="u-fwBold u-fz11 a-color--pink">
                              {propsFormik.errors.emailData ||
                                propsFormik.errors.emailExtend ||
                                propsFormik.errors.email}
                            </span>
                          ) : (
                            <></>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <th className="m-table__head m-table__head--provisional-entry">
                          メールアドレス（確認用）
                        </th>
                        <td className="m-table__body m-table__body--provisional-entry">
                          <div className="m-table__body__2column">
                            <input
                              type="text"
                              name="emailConfData"
                              className={`a-input-text a-input-text--2column ${
                                (isInValidEmailConf(propsFormik) ||
                                  propsFormik.errors.emailConfData ||
                                  propsFormik.errors.emailConfExtend) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              value={propsFormik.values.emailConfData}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                            <span className="a-color--green">@</span>
                            <input
                              type="text"
                              name="emailConfExtend"
                              className={`a-input-text a-input-text--2column ${
                                (isInValidEmailConf(propsFormik) ||
                                  propsFormik.errors.emailConfData ||
                                  propsFormik.errors.emailConfExtend) &&
                                propsFormik.submitCount != 0
                                  ? 'is-required'
                                  : ''
                              }`}
                              value={propsFormik.values.emailConfExtend}
                              onChange={propsFormik.handleChange}
                              onBlur={propsFormik.handleBlur}
                            />
                            {(isInValidEmailConf(propsFormik) ||
                              propsFormik.errors.emailConfData ||
                              propsFormik.errors.emailConfExtend) &&
                            propsFormik.submitCount != 0 ? (
                              <span className="u-fwBold u-fz11 a-color--pink">
                                {propsFormik.errors.emailConfData ||
                                  propsFormik.errors.emailConfExtend ||
                                  propsFormik.errors.emailConf}
                              </span>
                            ) : (
                              <></>
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="o-entry__notice">
                  <p className="o-entry__notice__title u-mb20pc u-mb10sp">
                    未設定の場合、本登録の手続きに進めません。
                  </p>
                  <ul className="m-dots-list">
                    <li>
                      ドメイン指定受信を設定されている方は「ani-com.com」を追加してください。
                    </li>
                    <li>
                      メール指定受信を設定されている方は「anivoice_noreply@ani-com.com」を追加してください。
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="t-footer-contents">
              <div className="t-footer-contents__body">
                <button
                  type="submit"
                  className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
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

export default memo(WithPrm(injectIntl(PreRegister)))
