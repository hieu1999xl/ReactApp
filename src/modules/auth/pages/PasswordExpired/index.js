import React from 'react'
import pathRoutes from '../../../../helper/pathRoutes'

function PasswordExpired() {
  return (
    <div>
      <main className="o-login" style={{ padding: 20 }}>
        <div className="u-not-found">
          <section className="l-container">
            <h2
              className="a-section-title u-mb30pc u-mb20sp"
              style={{ color: '#53AA32' }}
            >
              アクセスいただいたURLは
              <br />
              有効期限が切れているか、
              <br />
              URLが正確でない（途切れている等の）
              <br />
              可能性があります。
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
                恐れ入りますが
                <br />
                もう一度お手続きをお願いします。
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
            <div class="u-mb20">
              <a
                href={pathRoutes.myPoint}
                class="a-button a-button--round a-button--green a-button--submit u-fz16 u-hover"
              >
                トップに戻る
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default React.memo(PasswordExpired)
