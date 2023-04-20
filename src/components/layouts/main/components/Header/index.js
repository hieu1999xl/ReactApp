import React, { memo } from 'react'
import pathRoutes from '../../../../../helper/pathRoutes'
import { AuthHeaderRight, MainHeaderRight } from '../index'
import { useLocation } from 'react-router-dom'
import Storage from '../../../../../helper/storage'

function Header({ publicRouter }) {
  const location = useLocation()

  return (
    <div>
      <header className="o-header">
        <div className="o-header-wrap">
          <div className="o-header__body">
            <h1 className="o-header__body__logo">
              <a
                href={
                  !Storage.getAccessToken()
                    ? pathRoutes.home
                    : pathRoutes.myPoint
                }
                className="o-header__body__logo-link u-hover"
              >
                <img
                  src="../assets/img/common/logo.png"
                  className="o-header__body__logo-image"
                  alt="anivoice"
                />
              </a>
            </h1>
            {publicRouter.includes(location.pathname) ? (
              <AuthHeaderRight />
            ) : (
              <MainHeaderRight />
            )}
          </div>
        </div>
        <div className="o-header-overlay"></div>
      </header>
    </div>
  )
}

export default memo(Header)
