import React from 'react'
import pathRoutes from '../../../../helper/pathRoutes'

function NotFound() {
  return (
    <div>
      <main className="o-login" style={{ padding: 20 }}>
        <div className="u-not-found">
          <section className="l-container">
            <h2
              className="a-section-title u-mb30pc u-mb20sp u-fz18"
              style={{ color: '#53AA32' }}
            >
              アクセスしようとしたページは
              <br />
              表示できませんでした。
              <br />
            </h2>
            <div className="u-mb40">
              <div className="a-button-wrap a-button-wrap--cartoon">
                <div
                  className="a-button-wrap__img"
                  style={{ marginBottom: 30, textAlign: 'center' }}
                >
                  <img
                    src="assets/img/register/harinezumi.png"
                    style={{ width: '60%' }}
                    alt="IMG"
                  />
                </div>
              </div>
              <p className="u-fz16 u-fwBold u-textCenter u-mb30">
                ani voiceはアニコム損保の
                <br />
                ご契約者専用の
                <br />
                アンケートサイトのため
                <br />
                アクセス方法に制限があります。
              </p>
              <p className="u-fz16 u-fwBold u-textCenter u-mb30">
                マイページ内にある
                <br />
                ani voiceのバナーから
                <br />
                アクセスしてください。
              </p>
              <p className="u-fwBold u-textCenter u-mb30 u-fz16">
                <a
                  href="https://cs.anicom-sompo.co.jp/user"
                  style={{ textDecoration: 'underline' }}
                >
                  アニコム損保のマイページはこちら
                </a>
              </p>

              <div
                className="u-p10 u-mb15"
                style={{
                  textAlign: 'center',
                  backgroundColor: '#fff',
                  border: 'solid 1px #53AA32'
                }}
              >
                <div style={{ backgroundColor: '#fff' }}>
                  <p>
                    <span className="o-faq-list__item__head__question u-fz25">
                      Q
                    </span>
                    <span className="o-faq-list__item__head__title u-fz16 u-fz15sp">
                      モニター登録をしようとしたら、「アクセスしようとしたページは表示できませんでした。」というエラーページが表示されました。
                    </span>
                  </p>
                </div>
                <div
                  className="u-p15 u-mt10"
                  style={{ backgroundColor: '#EFF7E1' }}
                >
                  <div>
                    <p className="o-faq-list__item__bodyo-faq-list__item__body__contents__text--contents__text">
                      <span
                        className="o-faq-list__item__body__contents__text o-faq-list__item__body__contents__text--initial u-fwBold"
                        style={{ color: '#53AA32' }}
                      >
                        A.&nbsp;
                      </span>
                      アニコム損保のマイページにあるani
                      voiceのバナーからアクセスしてください。ani
                      voiceではご契約者1名につき専用URLを１つ発行しており、専用URL以外から新規モニター登録のページへアクセスした場合、アクセス制限を設けています。
                    </p>
                  </div>

                  <div className="u-wh100p">
                    <p
                      className="u-fz18 u-fwBold u-pt20 u-pb15"
                      style={{ color: '#007048' }}
                    >
                      マイページからのアクセス方法
                    </p>
                    <p
                      className="u-fz16 u-fwBold u-pb10 has-text-left"
                      style={{ color: '#007048' }}
                    >
                      STEP1
                    </p>
                    <p className="u-fz16 u-fwBold has-text-left">
                      アニコム損保のマイページにログインしてください。
                    </p>
                  </div>
                  <img
                    className="u-wh100p"
                    src="assets/img/register/guidance_1.png"
                  />
                  <div style={{ width: '100%' }}>
                    <p
                      className="u-fz16 u-fwBold u-pb10 has-text-left"
                      style={{ color: '#007048' }}
                    >
                      STEP2
                    </p>
                    <p className="u-fz16 u-fwBold has-text-left">
                      「ani voice」のバナーをクリックしてください。
                    </p>
                  </div>
                  <img
                    className="u-wh100p"
                    src="assets/img/register/guidance_2.png"
                  />
                  <div style={{ width: '100%' }}>
                    <p
                      className="u-fz16 u-fwBold u-pb10 has-text-left"
                      style={{ color: '#007048' }}
                    >
                      STEP3
                    </p>
                    <p className="u-fz16 u-fwBold has-text-left">
                      「新規モニター登録はこちら」から、モニター登録を行ってください。
                    </p>
                  </div>
                  <img
                    className="u-wh100p"
                    src="assets/img/register/guidance_3.png"
                  />
                </div>
              </div>
              {/*<ul style={{marginTop: 50}}>
              <li>
                <a href={pathRoutes.provisionalEntry} className="a-color--green u-textDecoration u-fz16 u-hover">・新規モニター登録</a>
              </li>
  </ul>*/}
              <p className="u-fwBold u-textCenter u-mb30 u-fz16">
                <a
                  href="https://cs.anicom-sompo.co.jp/user"
                  style={{ textDecoration: 'underline' }}
                >
                  アニコム損保のマイページはこちら
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default React.memo(NotFound)
