import React from 'react'
import pathRoutes from '../../../../helper/pathRoutes'

function UserExist() {
  return (
    <div>
      <main className="o-login" style={{ padding: 20 }}>
        <div className="u-not-found">
          <section className="l-container">
            <h2
              className="a-section-title u-mb30pc u-mb20sp"
              style={{ color: '#53AA32' }}
            >
              モニター登録はすでに
              <br />
              完了しています。
              <br />
            </h2>
            <div className="u-mb40">
              <div className="a-button-wrap a-button-wrap--cartoon">
                <div
                  className="a-button-wrap__img"
                  style={{ marginBottom: 30 }}
                >
                  <img src="assets/img/home/point-dog.png" alt="IMG" />
                </div>
              </div>
              <p className="u-fz20 u-fwBold u-textCenter u-mb30">
                <a className="u-textDecoration u-hover" href={pathRoutes.login}>
                  ログインはこちらから
                </a>
              </p>
              <ul style={{ marginTop: 50 }}>
                <li>
                  <a
                    href={pathRoutes.resetPassword}
                    className="a-color--green u-textDecoration u-fz16 u-hover"
                  >
                    ・パスワードを忘れた方
                  </a>
                </li>
                <li>
                  <a
                    href={pathRoutes.forgetId}
                    className="a-color--green u-textDecoration u-fz16 u-hover"
                  >
                    ・ログインIDを忘れた方
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default React.memo(UserExist)
