import React, { memo } from 'react'
import pathRoutes from '../../../../../helper/pathRoutes'
// import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
// import { useHistory, useLocation } from 'react-router';
import { logout } from '../../../../../modules/auth/redux'
import Storage from '../../../../../helper/storage'
import useToogle from '../Header/hook'
import LinkHeader from '../LinkHeader'

function AuthHeaderRight() {
  const dispatch = useDispatch()
  const { isShowing, toggle } = useToogle()

  const handleLogout = () => {
    dispatch(logout())
    Storage.clearAll()
    window.location.href = pathRoutes.home
  }
  return (
    <>
      <div className="o-header__body__sp-menu">
        <button
          className="o-header__body__sp-menu__sp-btn js-sp-menu"
          onClick={toggle}
        >
          <span className="o-header__body__sp-menu__sp-btn__sp-line"></span>
          <span className="o-header__body__sp-menu__sp-btn__sp-line"></span>
          <span className="o-header__body__sp-menu__sp-btn__sp-line"></span>
        </button>
      </div>
      <div
        className="o-header__body__nav"
        style={isShowing ? { display: 'block' } : { display: 'none' }}
      >
        <div className="o-header__body__btn">
          {!Storage.getAccessToken() ? (
            <>
              <a
                href={pathRoutes.provisionalEntry}
                className="a-button a-button--2column a-button--oval a-button--line-yellow a-button--yellow a-button--header u-hover"
              >
                新規モニター登録
              </a>
              <a
                href={pathRoutes.login}
                className="a-button a-button--2column a-button--oval a-button--line-green a-button--green a-button--header u-hover"
              >
                ログイン
              </a>
            </>
          ) : (
            <>
              <a
                href={pathRoutes.myPoint}
                className="a-button a-button--2column a-button--oval a-button--line-green a-button--white a-button--header u-hover"
              >
                マイページ TOP
              </a>
              <button
                onClick={handleLogout}
                className="a-button a-button--2column a-button--oval a-button--line-green a-button--green a-button--header u-hover"
              >
                ログアウト
              </button>
            </>
          )}
        </div>
        <div className="o-header__body__link">
          <LinkHeader />
        </div>
      </div>
    </>
  )
}

export default memo(AuthHeaderRight)
