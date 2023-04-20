import React, { memo } from 'react'
import { listCity, listGender } from '../../../../../helper/utils'
import { Formik } from 'formik'
import * as Yup from 'yup'

function FormProfilePassword({ propsFormik, onBlurCheckPasswordAvai }) {
  return (
    <>
      <tr>
        <th className="m-table__head m-table__head--provisional-entry">
          現在のパスワード
        </th>
        <td className="m-table__body m-table__body--provisional-entry">
          <div className="m-table__body__2column">
            <input
              type="password"
              name="lrvPasswordCurrent"
              className={`a-input-text
								${
                  propsFormik.errors.lrvPasswordCurrent &&
                  propsFormik.submitCount != 0
                    ? 'is-required'
                    : ''
                }`}
              value={propsFormik.values.lrvPasswordCurrent}
              onChange={propsFormik.handleChange}
              onBlur={e => {
                propsFormik.handleBlur(e)
                onBlurCheckPasswordAvai(propsFormik)
              }}
            />
          </div>
          {propsFormik.errors.lrvPasswordCurrent &&
          propsFormik.submitCount != 0 ? (
            <span className="u-fwBold u-fz11 a-color--pink">
              {propsFormik.errors.lrvPasswordCurrent}
            </span>
          ) : (
            <></>
          )}
        </td>
      </tr>
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
          {propsFormik.errors.lrvPasswordNew && propsFormik.submitCount != 0 ? (
            <span className="u-fwBold u-fz11 a-color--pink">
              {propsFormik.errors.lrvPasswordNew}
            </span>
          ) : (
            <></>
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
          propsFormik.submitCount != 0 ? (
            <span className="u-fwBold u-fz11 a-color--pink">
              {propsFormik.errors.lrvPasswordNewCof}
            </span>
          ) : (
            <></>
          )}
        </td>
      </tr>
      <tr>
        <td colSpan={2}></td>
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
    // 								現在のパスワード
    //               </th>
    //             </tr>
    // 						<tr>
    // 							<td className="m-table__body m-table__body--provisional-entry">
    // 								<div className="m-table__body__2column">
    // 									<input
    // 										type="password"
    // 										name="lrvPasswordCurrent"
    // 										className={`a-input-text
    // 											${propsFormik.errors.lrvPasswordCurrent && propsFormik.touched.lrvPasswordCurrent ? 'is-required': ''}`}
    // 										value={propsFormik.values.lrvPasswordCurrent}
    // 										onChange={propsFormik.handleChange}
    // 										onBlur={propsFormik.handleBlur}
    // 									/>
    // 								</div>
    // 								{propsFormik.errors.lrvPasswordCurrent && propsFormik.touched.lrvPasswordCurrent && (<span className="u-fwBold u-fz11 a-color--pink">{propsFormik.errors.lrvPasswordCurrent}</span>)}
    // 							</td>
    // 						</tr>
    //             <tr>
    //               <th className="m-table__head m-table__head--provisional-entry">
    // 								新しいパスワード
    //               </th>
    //             </tr>
    // 						<tr>
    // 							<td className="m-table__body m-table__body--provisional-entry">
    // 								<div className="m-table__body__2column">
    // 									<input
    // 										type="password"
    // 										name="lrvPasswordNew"
    // 										className={`a-input-text
    // 											${propsFormik.errors.lrvPasswordNew && propsFormik.touched.lrvPasswordNew ? 'is-required': ''}`}
    // 										value={propsFormik.values.lrvPasswordNew}
    // 										onChange={propsFormik.handleChange}
    // 										onBlur={propsFormik.handleBlur}
    // 									/>
    // 								</div>
    // 								{propsFormik.errors.lrvPasswordNew && propsFormik.touched.lrvPasswordNew && (<span className="u-fwBold u-fz11 a-color--pink">{propsFormik.errors.lrvPasswordNew}</span>)}
    // 							</td>
    // 						</tr>
    // 						<tr>
    //               <th className="m-table__head m-table__head--provisional-entry">
    // 								＜確認用＞新しいパスワード
    //               </th>
    //             </tr>
    // 						<tr>
    // 							<td className="m-table__body m-table__body--provisional-entry">
    // 								<div className="m-table__body__2column">
    // 									<input
    // 										type="password"
    // 										name="lrvPasswordNewCof"
    // 										className={`a-input-text
    // 											${propsFormik.errors.lrvPasswordNewCof && propsFormik.touched.lrvPasswordNewCof ? 'is-required': ''}`}
    // 										value={propsFormik.values.lrvPasswordNewCof}
    // 										onChange={propsFormik.handleChange}
    // 										onBlur={propsFormik.handleBlur}
    // 									/>
    // 								</div>
    // 								{propsFormik.errors.lrvPasswordNewCof && propsFormik.touched.lrvPasswordNewCof && (<span className="u-fwBold u-fz11 a-color--pink">{propsFormik.errors.lrvPasswordNewCof}</span>)}
    // 							</td>
    // 						</tr>
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="">
    //     <div className="t-footer-contents__body">
    //       <button
    //         type="submit"
    //         className="a-button a-button--submit a-button--pc-w330 a-button--round u-fz16 js-validation"
    //       >
    //         使用可能か確認
    //       </button>
    //     </div>
    //   </div>
    // </div>
  )
}

export default memo(FormProfilePassword)
