import React, { memo } from 'react'
import pathRoutes from '../../../../../helper/pathRoutes'
import { useLocation } from 'react-router'
import Storage from '../../../../../helper/storage'

function LinkHeader() {
  const location = useLocation()

  return (
    <>
      {Storage.getAccessToken() ? (
        <>
          <a
            href={pathRoutes.pointAcquisition}
            className={`o-header__body__link__item u-hover ${
              location?.pathname === pathRoutes.pointAcquisition
                ? 'is-current'
                : ''
            }`}
          >
            獲得ポイント履歴
          </a>
          <a
            href={pathRoutes.pointExchangeItem}
            className={`o-header__body__link__item u-hover ${
              location?.pathname === pathRoutes.pointExchangeItem
                ? 'is-current'
                : ''
            }`}
          >
            ポイント交換{' '}
          </a>
          <a
            href={pathRoutes.userProfile}
            className={`o-header__body__link__item u-hover ${
              location?.pathname === pathRoutes.userProfile ? 'is-current' : ''
            }`}
          >
            モニター情報確認・変更
          </a>
          <a
            href={pathRoutes.inquiry}
            className={`o-header__body__link__item u-hover ${
              location?.pathname === pathRoutes.inquiry ? 'is-current' : ''
            }`}
          >
            お問い合わせ
          </a>
          {window.innerWidth < 768 && (
            <a
              href={pathRoutes.closeAccount}
              className={`o-header__body__link__item u-hover ${
                location?.pathname === pathRoutes.closeAccount
                  ? 'is-current'
                  : ''
              }`}
            >
              退会
            </a>
          )}
        </>
      ) : (
        <>
          <a
            href={pathRoutes.point}
            className={`o-header__body__link__item u-hover ${
              location?.pathname === pathRoutes.point ? 'is-current' : ''
            }`}
          >
            ポイントについて
          </a>
          <a
            href={pathRoutes.faq}
            className={`o-header__body__link__item u-hover ${
              location?.pathname === pathRoutes.faq ? 'is-current' : ''
            }`}
          >
            よくある質問
          </a>
          <a
            href={pathRoutes.inquiry}
            className={`o-header__body__link__item u-hover ${
              location?.pathname === pathRoutes.inquiry ? 'is-current' : ''
            }`}
          >
            お問い合わせ
          </a>
        </>
      )}
    </>
  )
}

export default memo(LinkHeader)
