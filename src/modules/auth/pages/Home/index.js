import React, { memo, Fragment } from 'react'
import pathRoutes from '../../../../helper/pathRoutes'
import { WithPrm } from '../../../../hoc'

function Home() {
  return (
    <div>
      <main className="o-home">
        <div className="o-home__mv">
          <picture>
            <source
              srcSet="assets/img/home/mv.png 1x,assets/img/home/mv@2x.png 2x"
              media="(min-width:768px)"
            />
            <img
              srcSet="assets/img/home/mv-sp.png"
              alt="anivoice アニボイス どうぶつさんの声を聞かせてください"
              className="o-home__mv__img"
            />
          </picture>
          <div className="o-home__mv__catch">
            どうぶつも人も暮らしやすい
            <br />
            より良いペット共生社会を実現するために
            <br />
            アンケートを通じて
            <br />
            さまざまな商品やサービスの
            <br />
            開発・改善に携わってみませんか？
          </div>
          <div className="o-home__mv__buttons">
            <a
              href={pathRoutes.login}
              className="o-home__mv__buttons__button a-button a-button--green u-hover"
            >
              ログイン
            </a>
            <a
              href={pathRoutes.provisionalEntry}
              className="o-home__mv__buttons__button a-button a-button--yellow u-hover"
            >
              新規モニター登録はこちら
            </a>
          </div>
        </div>
        <div className="o-home__about">
          <div className="l-container">
            <h2 className="o-home__about__title">
              <picture>
                <source
                  srcSet="assets/img/home/about.svg"
                  media="(min-width:768px)"
                />
                <img
                  srcSet="assets/img/home/about-sp.svg"
                  alt="アニボイスとは？"
                />
              </picture>
            </h2>
            <div className="o-home__about__points">
              <div className="o-home__about__points__point">
                <div className="o-home__about__points__point__flex">
                  <div className="o-home__about__points__point__flex__img">
                    <img src="assets/img/home/point-dog.png" alt="IMG" />
                  </div>
                  <div className="o-home__about__points__point__flex__content">
                    <div className="o-home__about__points__point__flex__num">
                      point 1
                    </div>
                    <div className="o-home__about__points__point__flex__title">
                      無料のアンケートサイトです！<br></br>
                      アニコム損保のご契約者だけが参加いただけます。
                    </div>
                    <div className="o-home__about__points__point__flex__info">
                      <p>
                        ウェブアンケートを中心に、インタビューやモニター参加など、どうぶつに関わる様々なアンケートを実施していきます！
                      </p>
                    </div>
                  </div>
                </div>
                <div className="o-home__about__points__point__info">
                  <p>
                    ウェブアンケートを中心に、インタビューやモニター参加など、どうぶつに関わる様々なアンケートを実施します。
                  </p>
                </div>
              </div>
              <div className="o-home__about__points__point">
                <div className="o-home__about__points__point__flex">
                  <div className="o-home__about__points__point__flex__img">
                    <img src="assets/img/home/point-cat.png" alt="IMG" />
                  </div>
                  <div className="o-home__about__points__point__flex__content">
                    <div className="o-home__about__points__point__flex__num">
                      point 2
                    </div>
                    <div className="o-home__about__points__point__flex__title">
                      アンケートに答えると
                      <br className="u-pcHide" />
                      ポイントが貯まります！
                    </div>
                    <div className="o-home__about__points__point__flex__info">
                      <p>
                        1ポイント＝１円として、ご利用可能です。貯まったポイントでペット関連商品との交換や動物愛護団体への寄付が可能です。
                      </p>
                      <p>
                        <b>
                          <a
                            style={{ fontWeight: 'bold' }}
                            href={pathRoutes.point}
                          >
                            ポイントについて &gt;
                          </a>
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="o-home__about__points__point__info">
                  <p>
                    1ポイント＝１円として、ご利用可能です。貯まったポイントでペット関連商品との交換や動物愛護団体への寄付が可能です。
                  </p>
                  <p>
                    <a style={{ fontWeight: 'bold' }} href={pathRoutes.point}>
                      ポイントについて &gt;
                    </a>
                  </p>
                </div>
              </div>
              <div className="o-home__about__points__point">
                <div className="o-home__about__points__point__flex">
                  <div className="o-home__about__points__point__flex__img">
                    <img src="assets/img/home/point-rabbit.png" alt="IMG" />
                  </div>
                  <div className="o-home__about__points__point__flex__content">
                    <div className="o-home__about__points__point__flex__num">
                      point 3
                    </div>
                    <div className="o-home__about__points__point__flex__title">
                      新しい商品やサービスを
                      <br className="u-pcHide" />
                      優先的にご案内することも！
                    </div>
                    <div className="o-home__about__points__point__flex__info">
                      <p>
                        <small>
                          ※抽選または先着順により、一部のモニターさまのみにご案内差し上げる場合があります。また、全ての商品・サービスを優先的にご案内するとは限りません。
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="o-home__about__points__point__info">
                  <p>
                    <small>
                      ※抽選または先着順により、一部のモニターさまのみにご案内差し上げる場合があります。また、全ての商品・サービスを優先的にご案内するとは限りません。
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="o-home__links">
          <div className="l-container">
            <div className="o-home__links__register">
              <div className="a-button-wrap a-button-wrap--cartoon">
                <div className="a-button-wrap__img">
                  <picture>
                    <source
                      srcSet="assets/img/home/regist-pc.png 1x,assets/img/home/regist-pc@2x.png 2x"
                      media="(min-width:768px)"
                    />
                    <img
                      srcSet="assets/img/home/regist-sp.png"
                      alt="新規モニター登録で100ポイントGET!"
                    />
                  </picture>
                </div>
                <a
                  href={pathRoutes.provisionalEntry}
                  className="a-button a-button--line-yellow a-button--yellow a-button--round u-hover"
                >
                  新規モニター登録はこちら
                </a>
              </div>
            </div>
            <div className="m-sub-menu u-mt35 u-mt60sp">
              <div className="m-sub-menu__list">
                <a href={pathRoutes.faq} className="m-sub-menu__link u-hover">
                  よくある質問
                </a>
              </div>
              <div className="m-sub-menu__list">
                <a
                  href={pathRoutes.inquiry}
                  className="m-sub-menu__link u-hover"
                >
                  お問い合わせ
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default memo(WithPrm(Home))
