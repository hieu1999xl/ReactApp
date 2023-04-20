import React, { memo, Fragment } from 'react'
import pathRoutes from '../../../../../helper/pathRoutes'

function Footer() {
  return (
    <div>
      <footer className="o-footer">
        <div className="o-footer__body">
          <div className="o-footer__inner">
            <img
              src="../assets/img/common/logo_footer.png"
              className="o-footer__logo"
              alt="anicom アニコム損害保険株式会社"
            />
            <div className="o-footer__info">
              <div className="o-footer__link-box">
                <a href={pathRoutes.terms} className="o-footer__link u-hover">
                  モニター規約
                </a>
              </div>
              <div className="o-footer__link-box">
                <a
                  href={pathRoutes.environment}
                  className="o-footer__link u-hover"
                >
                  推奨環境
                </a>
              </div>
            </div>
          </div>
          <small className="o-footer__copyright">
            Copyright&copy; Anicom Insurance,Inc.All right reserved.
          </small>
        </div>
      </footer>
    </div>
  )
}

export default memo(Footer)
