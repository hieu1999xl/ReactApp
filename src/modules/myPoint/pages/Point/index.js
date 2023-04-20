import React, { memo, Fragment } from 'react'
import pathRoutes from '../../../../helper/pathRoutes'

function Point() {
  return (
    <div>
      <div className="m-pager-title">
        <div className="m-pager-title__inner">
          <p className="m-pager-title__inner__title">ポイントについて</p>
        </div>
      </div>
      <div className="m-animal-header">
        <p className="m-animal-header__image-title">
          <img
            src="/assets/img/point/title_point_title.png"
            className="m-animal-header__image-title__image"
            alt="アンケートにご協力いただくと謝礼としてポイントを付与します！"
          />
        </p>
        <div className="m-animal-header__animal-box">
          <div className="m-animal-header__animal-position">
            <img
              src="../assets/img/common/img_animals-image_2.png"
              className="m-animal-header__animal-image"
              alt=""
            />
          </div>
        </div>
      </div>
      <form id="form" action="#" method="post">
        <div className="t-contents t-contents--bg-ivory">
          <div className="t-contents__body">
            <div className="o-point">
              <p className="u-fz20 u-fwBold u-textCenter u-mb30">
                １ポイント＝１円としてご利用可能です。<br></br>
                貯まったポイントはペット関連商品との交換や<br></br>
                動物愛護団体への寄付が可能です。
              </p>
              <img
                src="../assets/img/point/img_point_donate_new.png"
                className="o-point__point-illust"
                alt="貯まったポイントについてのイラスト"
              />
              <div className="o-point-exchange">
                <img
                  src="../assets/img/point/txt_point_exchange.png"
                  className="o-point-exchange__title-image"
                  alt="ポイント交換対象の一部をご紹介！"
                />
                <div className="o-point-exchange__list">
                  <div className="o-point-exchange__list__item">
                    <img
                      src="../assets/img/point/img_exchange-item_1.png"
                      className="o-point-exchange__list__item__image"
                      alt="お腹の健康を考えたおやつ"
                    />
                    <div className="o-point-exchange__list__item--text-area">
                      <span className="o-point-exchange__list__item__text">
                        ワンちゃん・ネコちゃん向けの
                      </span>
                      <br></br>
                      <span className="o-point-exchange__list__item__large-green">
                        お腹の健康を考えたおやつ
                      </span>
                    </div>
                  </div>
                  <div className="o-point-exchange__list__item">
                    <img
                      src="../assets/img/point/img_exchange-item_2.png"
                      className="o-point-exchange__list__item__image"
                      alt="消臭グッズ"
                    />
                    <div className="o-point-exchange__list__item--text-area">
                      <span className="o-point-exchange__list__item__small">
                        ペットとの暮らしには欠かせない消臭グッズ！
                      </span>
                      <br></br>
                      <span className="o-point-exchange__list__item__text">
                        どうぶつが舐めても安心の
                      </span>
                      <br></br>
                      <span className="o-point-exchange__list__item__large-green">
                        天然成分100%の消臭スプレー
                      </span>
                    </div>
                  </div>
                  <div className="o-point-exchange__list__item">
                    <img
                      src="../assets/img/point/img_exchange-item_3.png"
                      className="o-point-exchange__list__item__image"
                      alt="犬と猫の画像"
                    />
                    <div className="o-point-exchange__list__item--text-area">
                      <span className="o-point-exchange__list__item__large-green">
                        各地の動物愛護団体を支援
                      </span>
                      <br></br>
                      <span className="u-fwBold u-fz12">
                        少しでもどうぶつの殺処分を減らし、<br></br>
                        どうぶつと人が幸せに暮らせるペット共生社会を作ることを目指しています。
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="t-footer-contents">
          <div className="t-footer-contents__body">
            <div className="u-mb20">
              <p className="u-fwBold u-mb30">注意事項</p>
              <ul className="m-dots-list">
                <li className="m-dots-list__item">
                  質問数やアンケート内容によって獲得ポイント数が異なります。詳しくはアンケートをお願いする際のメールに明記しますので、そちらをご確認ください。
                </li>
                <li className="m-dots-list__item">
                  ポイントが付与されないアンケートもあります。
                </li>
                <li className="m-dots-list__item">
                  ポイントは付与月から5年間有効です。
                </li>
              </ul>
            </div>
            <div className="o-point-footer">
              <div className="a-button-wrap a-button-wrap--cartoon">
                <div className="a-button-wrap__img">
                  <picture>
                    <source
                      srcSet="../assets/img/home/regist-pc.png 1x,../assets/img/home/regist-pc@2x.png 2x"
                      media="(min-width:px)"
                    />
                    <img
                      srcSet="../assets/img/home/regist-sp.png"
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
          </div>
        </div>
      </form>
    </div>
  )
}

export default memo(Point)
