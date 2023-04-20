import React, { memo } from 'react'
import { validateEmail } from '../../../../../helper/utils'

function FormProfileID({ propsFormik, onBlurCheckUserAvai }) {
  const isInValidEmail = propsFormik => {
    const { errors, values, touched } = propsFormik
    if (
      !errors.emailData &&
      !errors.emailExtend &&
      values.emailData &&
      values.emailExtend
    ) {
      return !validateEmail(`${values.emailData}@${values.emailExtend}`)
    }
    return (
      propsFormik.submitCount != 0 && (errors.emailData || errors.emailExtend)
    )
  }

  const isInValidEmailConf = propsFormik => {
    const { errors, values, touched } = propsFormik
    if (
      !errors.emailConfData &&
      !errors.emailConfExtend &&
      values.emailConfData &&
      values.emailConfExtend
    ) {
      return !validateEmail(`${values.emailConfData}@${values.emailConfExtend}`)
    }
    return (
      propsFormik.submitCount != 0 &&
      (errors.emailConfData || errors.emailConfExtend)
    )
  }

  return (
    <>
      <tr>
        <th className="m-table__head m-table__head--provisional-entry">
          新しいログインID（メールアドレス）
        </th>
        <td className="m-table__body m-table__body--provisional-entry">
          <div className="m-table__body__2column">
            <input
              type="text"
              name="emailData"
              className={`a-input-text a-input-text--2column
								${
                  isInValidEmail(propsFormik) && propsFormik.submitCount != 0
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
              className={`a-input-text a-input-text--2column
								${
                  isInValidEmail(propsFormik) && propsFormik.submitCount != 0
                    ? 'is-required'
                    : ''
                }`}
              value={propsFormik.values.emailExtend}
              onChange={propsFormik.handleChange}
              onBlur={propsFormik.handleBlur}
            />
          </div>
          {isInValidEmail(propsFormik) && propsFormik.submitCount != 0 ? (
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
          ＜確認用＞新しいログインID（メールアドレス）
        </th>
        <td className="m-table__body m-table__body--provisional-entry">
          <div className="m-table__body__2column">
            <input
              type="text"
              name="emailConfData"
              className={`a-input-text a-input-text--2column
								${
                  isInValidEmailConf(propsFormik) &&
                  propsFormik.submitCount != 0
                    ? 'is-required'
                    : ''
                }`}
              value={propsFormik.values.emailConfData}
              onChange={propsFormik.handleChange}
              onBlur={e => {
                propsFormik.handleBlur(e)
                onBlurCheckUserAvai(propsFormik)
              }}
            />
            <span className="a-color--green">@</span>
            <input
              type="text"
              name="emailConfExtend"
              className={`a-input-text a-input-text--2column
								${
                  isInValidEmailConf(propsFormik) &&
                  propsFormik.submitCount != 0
                    ? 'is-required'
                    : ''
                }`}
              value={propsFormik.values.emailConfExtend}
              onChange={propsFormik.handleChange}
              onBlur={e => {
                propsFormik.handleBlur(e)
                onBlurCheckUserAvai(propsFormik)
              }}
            />
          </div>
          {isInValidEmailConf(propsFormik) && propsFormik.submitCount != 0 ? (
            <span className="u-fwBold u-fz11 a-color--pink">
              {propsFormik.errors.emailConfData ||
                propsFormik.errors.emailConfExtend ||
                propsFormik.errors.emailConf}
            </span>
          ) : (
            <></>
          )}
        </td>
      </tr>
    </>
    // <div>
    //   <div className="">
    //     <div className="o-entry">
    //       <div className="o-entry__table o-entry__table--provisional-entry">
    //         <table className="m-table">
    //           <tbody>
    //             <tr>
    //               <th className="m-table__head m-table__head--provisional-entry">
    //                 新しいログインID（メールアドレス）
    //               </th>
    //             </tr>
    // 						<tr>
    // 							<td className="m-table__body m-table__body--provisional-entry">
    // 								<div className="m-table__body__2column">
    // 									<input
    // 										type="text"
    // 										name="emailData"
    // 										className={`a-input-text a-input-text--2column ${isInValidEmail() ? 'is-required' : ''}`}
    // 										value={propsFormik.values.emailData}
    // 										onChange={propsFormik.handleChange}
    // 										onBlur={propsFormik.handleBlur}
    // 									/>
    // 									<span className="a-color--green">@</span>
    // 									<input
    // 										type="text"
    // 										name="emailExtend"
    // 										className={`a-input-text a-input-text--2column ${isInValidEmail() ? 'is-required' : ''}`}
    // 										value={propsFormik.values.emailExtend}
    // 										onChange={propsFormik.handleChange}
    // 										onBlur={propsFormik.handleBlur}
    // 									/>
    // 								</div>
    // 								{isInValidEmail() && (<span className="u-fwBold u-fz11 a-color--pink">{propsFormik.errors.emailData || propsFormik.errors.emailExtend}</span>)}
    // 							</td>
    // 						</tr>
    //             <tr>
    //               <th className="m-table__head m-table__head--provisional-entry">
    //                 ＜確認用＞新しいログインID（メールアドレス）
    //               </th>
    //             </tr>
    // 						<tr>
    // 							<td className="m-table__body m-table__body--provisional-entry">
    // 								<div className="m-table__body__2column">
    // 									<input
    // 										type="text"
    // 										name="emailConfData"
    // 										className={`a-input-text a-input-text--2column ${isInValidEmailConf() ? 'is-required' : ''}`}
    // 										value={propsFormik.values.emailConfExtend}
    // 										onChange={propsFormik.handleChange}
    // 										onBlur={propsFormik.handleBlur}
    // 									/>
    // 									<span className="a-color--green">@</span>
    // 									<input
    // 										type="text"
    // 										name="emailConfExtend"
    // 										className={`a-input-text a-input-text--2column ${isInValidEmailConf() ? 'is-required' : ''}`}
    // 										value={propsFormik.values.emailConfExtend}
    // 										onChange={propsFormik.handleChange}
    // 										onBlur={propsFormik.handleBlur}
    // 									/>
    // 								</div>
    // 								{isInValidEmailConf() && (<span className="u-fwBold u-fz11 a-color--pink">{propsFormik.errors.emailConfData || propsFormik.errors.emailConfExtend}</span>)}
    // 							</td>
    // 						</tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // <div className="">
    //   <div className="t-footer-contents__body">
    //     <button
    //       type="submit"
    //       className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
    //     >
    //       使用可能か確認
    //     </button>
    //   </div>
    // </div>
    // </div >
  )
}

export default memo(FormProfileID)
